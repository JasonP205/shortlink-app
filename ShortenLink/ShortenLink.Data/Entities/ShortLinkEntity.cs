namespace ShortenLink.Data.Entities;

public sealed class ShortLinkEntity
{
    public Guid Id { get; set; }
    public string Code { get; set; } = string.Empty;
    public string OriginalUrl { get; set; } = string.Empty;
    public string? OgTitle { get; set; }
    public string? OgDescription { get; set; }
    public string? OgImage { get; set; }
    public string? OgSiteName { get; set; }
    public bool IsActive { get; set; } = true;
    public int ClickCount { get; set; }
    public DateTimeOffset CreatedAtUtc { get; set; }
    public DateTimeOffset? LastAccessedAtUtc { get; set; }
    public DateTimeOffset? ExpiresAtUtc { get; set; }
}
