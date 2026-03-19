using ShortenLink.API.Contracts;
using ShortenLink.Data.Entities;

namespace ShortenLink.API.Services;

public interface ILinkService
{
    Task<ShortLinkEntity?> GetByCodeAsync(string code, CancellationToken cancellationToken = default);
    Task<bool> AliasExistsAsync(string alias, CancellationToken cancellationToken = default);
    Task<ShortLinkEntity> CreateAsync(CreateShortLinkRequest request, CancellationToken cancellationToken = default);
    Task<ShortLinkEntity?> RegisterClickAsync(string code, CancellationToken cancellationToken = default);
}
