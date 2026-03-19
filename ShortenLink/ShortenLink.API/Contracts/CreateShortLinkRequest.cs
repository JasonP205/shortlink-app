using System.ComponentModel.DataAnnotations;

namespace ShortenLink.API.Contracts;

public sealed class CreateShortLinkRequest
{
    [Required]
    [MaxLength(2048)]
    public string OriginalUrl { get; set; } = string.Empty;

    [MaxLength(50)]
    [RegularExpression("^[a-zA-Z0-9_-]+$")]
    public string? CustomAlias { get; set; }
}
