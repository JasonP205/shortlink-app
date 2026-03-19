using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using ShortenLink.API.Contracts;
using ShortenLink.Data;
using ShortenLink.Data.Entities;

namespace ShortenLink.API.Services;

public sealed class SqlLinkService(
    ShortenLinkDbContext dbContext,
    IPageMetadataService pageMetadataService) : ILinkService
{
    private static readonly char[] CodeChars =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".ToCharArray();

    public Task<ShortLinkEntity?> GetByCodeAsync(string code, CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(code))
        {
            return Task.FromResult<ShortLinkEntity?>(null);
        }

        return dbContext.ShortLinks
            .FirstOrDefaultAsync(link => link.Code == code, cancellationToken);
    }

    public async Task<bool> AliasExistsAsync(string alias, CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(alias))
        {
            return false;
        }

        var normalizedAlias = alias.Trim();
        return await dbContext.ShortLinks
            .AnyAsync(link => link.Code == normalizedAlias, cancellationToken);
    }

    public async Task<ShortLinkEntity> CreateAsync(CreateShortLinkRequest request, CancellationToken cancellationToken = default)
    {
        var originalUrl = NormalizeUrl(request.OriginalUrl);
        var existingByUrl = await dbContext.ShortLinks
            .FirstOrDefaultAsync(link => link.OriginalUrl == originalUrl, cancellationToken);
        if (existingByUrl is not null)
        {
            // throw new InvalidOperationException("Original URL already exists.");
            return existingByUrl;
        }

        var code = string.IsNullOrWhiteSpace(request.CustomAlias)
            ? await GenerateUniqueCodeAsync(cancellationToken)
            : request.CustomAlias.Trim();

        var exists = await dbContext.ShortLinks
            .AnyAsync(link => link.Code == code, cancellationToken);
        if (exists)
        {
            throw new InvalidOperationException("Short code already exists.");
        }

        var metadata = await pageMetadataService.GetMetadataAsync(originalUrl, cancellationToken);

        var entity = new ShortLinkEntity
        {
            Id = Guid.NewGuid(),
            Code = code,
            OriginalUrl = originalUrl,
            CreatedAtUtc = DateTimeOffset.UtcNow,
            OgTitle = TrimToMax(metadata.OgTitle, 500),
            OgDescription = TrimToMax(metadata.OgDescription, 2000),
            OgImage = TrimToMax(metadata.OgImage, 2048),
            OgSiteName = TrimToMax(metadata.OgSiteName, 500)
        };

        dbContext.ShortLinks.Add(entity);
        await dbContext.SaveChangesAsync(cancellationToken);
        return entity;
    }

    public async Task<ShortLinkEntity?> RegisterClickAsync(string code, CancellationToken cancellationToken = default)
    {
        var entity = await GetByCodeAsync(code, cancellationToken);
        if (entity is null)
        {
            return null;
        }

        entity.ClickCount++;
        entity.LastAccessedAtUtc = DateTimeOffset.UtcNow;
        await dbContext.SaveChangesAsync(cancellationToken);
        return entity;
    }

    private async Task<string> GenerateUniqueCodeAsync(CancellationToken cancellationToken)
    {
        for (var attempt = 0; attempt < 20; attempt++)
        {
            var code = CreateRandomCode(6);
            var exists = await dbContext.ShortLinks
                .AnyAsync(link => link.Code == code, cancellationToken);
            if (!exists)
            {
                return code;
            }
        }

        throw new InvalidOperationException("Unable to generate a unique short code.");
    }

    private static string CreateRandomCode(int length)
    {
        Span<char> buffer = stackalloc char[length];

        for (var i = 0; i < buffer.Length; i++)
        {
            buffer[i] = CodeChars[Random.Shared.Next(CodeChars.Length)];
        }

        return new string(buffer);
    }

    private static string NormalizeUrl(string rawUrl)
    {
        if (!Uri.TryCreate(rawUrl, UriKind.Absolute, out var uri))
        {
            throw new ArgumentException("OriginalUrl must be a valid absolute URL.");
        }

        if (uri.Scheme is not ("http" or "https"))
        {
            throw new ArgumentException("Only http and https URLs are supported.");
        }

        return uri.ToString();
    }

    private static string? TrimToMax(string? value, int maxLength)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            return null;
        }

        return value.Length <= maxLength
            ? value
            : value[..maxLength];
    }
}
