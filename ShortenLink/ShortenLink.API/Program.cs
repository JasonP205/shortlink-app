using Microsoft.EntityFrameworkCore;
using ShortenLink.API.Services;
using ShortenLink.Data;
using System.Web;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy
                .WithOrigins("http://localhost:5173")
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
        });
});
builder.Services.AddOpenApi();
builder.Services.AddControllers();
builder.Services.AddHttpClient<IPageMetadataService, PageMetadataService>(client =>
{
    client.Timeout = TimeSpan.FromSeconds(15);
    client.DefaultRequestHeaders.UserAgent.ParseAdd("ShortenLinkBot/1.0");
});
builder.Services.AddDbContext<ShortenLinkDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddScoped<ILinkService, SqlLinkService>();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<ShortenLinkDbContext>();
    dbContext.Database.EnsureCreated();
    dbContext.Database.ExecuteSqlRaw("""
                                     IF COL_LENGTH('ShortLinks', 'OgTitle') IS NULL
                                         ALTER TABLE [ShortLinks] ADD [OgTitle] nvarchar(500) NULL;
                                     IF COL_LENGTH('ShortLinks', 'OgDescription') IS NULL
                                         ALTER TABLE [ShortLinks] ADD [OgDescription] nvarchar(2000) NULL;
                                     IF COL_LENGTH('ShortLinks', 'OgImage') IS NULL
                                         ALTER TABLE [ShortLinks] ADD [OgImage] nvarchar(2048) NULL;
                                     IF COL_LENGTH('ShortLinks', 'OgSiteName') IS NULL
                                         ALTER TABLE [ShortLinks] ADD [OgSiteName] nvarchar(500) NULL;
                                     IF NOT EXISTS (
                                         SELECT 1
                                         FROM sys.indexes
                                         WHERE name = 'IX_ShortLinks_OriginalUrl'
                                           AND object_id = OBJECT_ID('ShortLinks')
                                     )
                                         CREATE UNIQUE INDEX [IX_ShortLinks_OriginalUrl] ON [ShortLinks] ([OriginalUrl]);
                                     """);
}

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors("AllowFrontend");
app.UseHttpsRedirection();
app.MapControllers();

app.MapGet("/", () => Results.Redirect("http://localhost:4243"));
app.MapGet("/api", () => Results.Ok(new
{
    name = "ShortenLink API",
    endpoints = new[]
    {
        "POST /api/create",
        "GET /api/check?alias={alias}",
        "GET /api/{code}"
    }
}));

app.MapGet("/{code}", async (
    string code,
    ILinkService linkService,
    IConfiguration configuration,
    CancellationToken cancellationToken) =>
{
    var existingLink = await linkService.GetByCodeAsync(code, cancellationToken);
    if (existingLink is null)
    {
        return Results.NotFound(new { message = $"Short code '{code}' was not found." });
    }

    if (!existingLink.IsActive)
    {
        return Results.BadRequest(new { message = "This short link has been disabled." });
    }

    var trackedLink = await linkService.RegisterClickAsync(code, cancellationToken);
    if (trackedLink is null)
    {
        return Results.NotFound(new { message = $"Short code '{code}' was not found." });
    }

    var clientUrl = configuration.GetValue<string>("ClientUrl");
    if (string.IsNullOrWhiteSpace(clientUrl))
    {
        return Results.Problem("ClientUrl is not configured.");
    }

    var query = HttpUtility.ParseQueryString(string.Empty);

    query["url"] = trackedLink.OriginalUrl;

    if (!string.IsNullOrEmpty(trackedLink.OgTitle))
        query["ogtitle"] = trackedLink.OgTitle;

    if (!string.IsNullOrEmpty(trackedLink.OgDescription))
        query["ogdescription"] = trackedLink.OgDescription;

    if (!string.IsNullOrEmpty(trackedLink.OgImage))
        query["ogimage"] = trackedLink.OgImage;
    if (!string.IsNullOrEmpty(trackedLink.OgSiteName))
        query["ogsitename"] = trackedLink.OgSiteName;

    var redirectUrl = $"{clientUrl.TrimEnd('/')}/app/redirect?{query}";
    return Results.Redirect(redirectUrl);
});
app.Run();