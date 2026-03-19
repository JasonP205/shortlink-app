using System.Net;
using System.Text.RegularExpressions;

namespace ShortenLink.API.Services;

public sealed partial class PageMetadataService(HttpClient httpClient) : IPageMetadataService
{
    public async Task<PageMetadata> GetMetadataAsync(string url, CancellationToken cancellationToken = default)
    {
        using var response = await httpClient.GetAsync(url, cancellationToken);
        response.EnsureSuccessStatusCode();

        var html = await response.Content.ReadAsStringAsync(cancellationToken);

        return new PageMetadata
        {
            OgTitle = FirstNonEmpty(
                MatchMetaContent(html, "og:title"),
                MatchTitle(html)),
            OgDescription = MatchMetaContent(html, "og:description"),
            OgImage = MatchMetaContent(html, "og:image"),
            OgSiteName = MatchMetaContent(html, "og:site_name")
        };
    }

    private static string? MatchMetaContent(string html, string propertyName)
    {
        var pattern =
            $"""<meta\s+(?:property|name)\s*=\s*["']{Regex.Escape(propertyName)}["']\s+content\s*=\s*["'](?<content>[^"']*)["'][^>]*>|<meta\s+content\s*=\s*["'](?<content>[^"']*)["']\s+(?:property|name)\s*=\s*["']{Regex.Escape(propertyName)}["'][^>]*>""";

        var match = Regex.Match(html, pattern, RegexOptions.IgnoreCase | RegexOptions.Singleline);
        if (!match.Success)
        {
            return null;
        }

        return NormalizeHtmlValue(match.Groups["content"].Value);
    }

    private static string? MatchTitle(string html)
    {
        var match = TitleRegex().Match(html);
        return !match.Success
            ? null
            : NormalizeHtmlValue(match.Groups["content"].Value);
    }

    private static string? NormalizeHtmlValue(string? value)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            return null;
        }

        return WebUtility.HtmlDecode(value.Trim());
    }

    private static string? FirstNonEmpty(params string?[] values) =>
        values.FirstOrDefault(value => !string.IsNullOrWhiteSpace(value));

    [GeneratedRegex("<title[^>]*>(?<content>.*?)</title>", RegexOptions.IgnoreCase | RegexOptions.Singleline)]
    private static partial Regex TitleRegex();
}
