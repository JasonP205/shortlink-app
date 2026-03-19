namespace ShortenLink.API.Contracts;

public sealed class ShortLinkResponse
{
    public string Code { get; init; } = string.Empty;
    public string OriginalUrl { get; init; } = string.Empty;
    public string ShortUrl { get; init; } = string.Empty;
    public string? OgTitle { get; init; }
    public string? OgDescription { get; init; }
    public string? OgImage { get; init; }
    public string? OgSiteName { get; init; }
}
