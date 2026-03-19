using Microsoft.AspNetCore.Mvc;
using ShortenLink.API.Contracts;
using ShortenLink.API.Services;
using ShortenLink.Data.Entities;

namespace ShortenLink.API.Controllers;

[ApiController]
[Route("api")]
public sealed class ShortLinkController(ILinkService linkService) : ControllerBase
{
    [HttpPost("create")]
    public async Task<ActionResult<ShortLinkResponse>> Create(
        [FromBody] CreateShortLinkRequest request,
        CancellationToken cancellationToken)
    {
        try
        {
            var link = await linkService.CreateAsync(request, cancellationToken);
            return Ok(ToResponse(link, GetShortUrl(link.Code)));
        }
        catch (ArgumentException exception)
        {
            return ValidationProblem(detail: exception.Message);
        }
        catch (HttpRequestException exception)
        {
            return BadRequest(new { message = $"Could not fetch metadata from the URL. {exception.Message}" });
        }
        catch (InvalidOperationException exception)
        {
            return BadRequest(new { message = exception.Message });
        }
    }

    [HttpGet("check")]
    public async Task<IActionResult> CheckAlias([FromQuery] string alias, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(alias))
        {
            return BadRequest(new { message = "Alias is required." });
        }

        var exists = await linkService.AliasExistsAsync(alias, cancellationToken);
        return exists
            ? Ok(new { isTaken = true, message = "Alias already exists." })
            : NotFound(new { isTaken = false, message = "Alias not found." });
    }

    private string GetShortUrl(string code) =>
        $"{Request.Scheme}://{Request.Host}/{code}";

    private static ShortLinkResponse ToResponse(ShortLinkEntity link, string shortUrl) =>
        new()
        {
            Code = link.Code,
            OriginalUrl = link.OriginalUrl,
            ShortUrl = shortUrl,
            OgTitle = link.OgTitle,
            OgDescription = link.OgDescription,
            OgImage = link.OgImage,
            OgSiteName = link.OgSiteName
        };
}