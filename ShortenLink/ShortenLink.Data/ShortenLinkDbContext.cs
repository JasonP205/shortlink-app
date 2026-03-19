using Microsoft.EntityFrameworkCore;
using ShortenLink.Data.Entities;

namespace ShortenLink.Data;

public sealed class ShortenLinkDbContext(DbContextOptions<ShortenLinkDbContext> options) : DbContext(options)
{
    public DbSet<ShortLinkEntity> ShortLinks => Set<ShortLinkEntity>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        var shortLink = modelBuilder.Entity<ShortLinkEntity>();

        shortLink.ToTable("ShortLinks");
        shortLink.HasKey(link => link.Id);

        shortLink.Property(link => link.Code)
            .HasMaxLength(50)
            .IsRequired();

        shortLink.Property(link => link.OriginalUrl)
            .HasMaxLength(2048)
            .IsRequired();

        shortLink.Property(link => link.OgTitle)
            .HasMaxLength(500);

        shortLink.Property(link => link.OgDescription)
            .HasMaxLength(2000);

        shortLink.Property(link => link.OgImage)
            .HasMaxLength(2048);

        shortLink.Property(link => link.OgSiteName)
            .HasMaxLength(500);

        shortLink.Property(link => link.IsActive)
            .HasDefaultValue(true);

        shortLink.Property(link => link.CreatedAtUtc)
            .HasDefaultValueSql("SYSUTCDATETIME()");

        shortLink.HasIndex(link => link.OriginalUrl)
            .IsUnique();

        shortLink.HasIndex(link => link.Code)
            .IsUnique();
    }
}
