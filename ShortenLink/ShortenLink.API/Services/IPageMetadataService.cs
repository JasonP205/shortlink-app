namespace ShortenLink.API.Services;

public interface IPageMetadataService
{
    Task<PageMetadata> GetMetadataAsync(string url, CancellationToken cancellationToken = default);
}
