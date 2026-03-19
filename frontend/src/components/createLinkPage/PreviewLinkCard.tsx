interface PreviewLinkCardProps {
  ogTitle?: string | null;
  ogDescription?: string | null;
  ogImage?: string | null;
  ogUrl: string;
  ogSiteName?: string | null;
  className?: string;
}
import { cn } from "@/lib/utils";
import { Card } from "@heroui/react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
const PreviewLinkCard = ({
  ogTitle,
  ogDescription = null,
  ogImage = null,
  ogUrl,
  ogSiteName = null,
  className,
}: PreviewLinkCardProps) => {
    const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <meta property="og:title" content={ogTitle || t("common.title.home")} />
        <meta
          property="og:description"
          content={ogDescription || t("common.title.home")}
        />
        {ogImage && <meta property="og:image" content={ogImage} />}
        <meta property="og:url" content={ogUrl} />
        {ogSiteName && <meta property="og:site_name" content={ogSiteName} />}
        <title>{t("common.title.redirect")}</title>
      </Helmet>
      <Card className={cn("w-full p-4", className)} shadow="md">
        {ogImage && (
          <div className="w-full aspect-video mb-4 rounded-lg overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={ogImage}
              alt={ogTitle || t("common.title.home")}
            />
          </div>
        )}
        <h2 className="text-lg font-semibold mb-1">
          {ogTitle || t("common.title.home")}
        </h2>
        <p className="text-sm text-gray-600 mb-3">
          {ogDescription || t("common.title.home")}
        </p>
        {ogUrl && (
          <a
            href={ogUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {ogSiteName || ogUrl}
          </a>
        )}
      </Card>
    </>
  );
};

export default PreviewLinkCard;
