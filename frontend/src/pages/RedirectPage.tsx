import PreviewLinkCard from "@/components/createLinkPage/PreviewLinkCard";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider,
  Progress,
} from "@heroui/react";
import { ArrowRight, CirclePause, Globe } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import NotFound from "./NotFound";
import { useTranslation } from "react-i18next";

const REDIRECT_SECONDS = 5;

const safeDecode = (value: string | null) => {
  if (!value) return null;

  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

const RedirectPage = () => {
  const { t } = useTranslation();
  const [params] = useSearchParams();
  const [remainingSeconds, setRemainingSeconds] = useState(REDIRECT_SECONDS);
  const [isAutoRedirectEnabled, setIsAutoRedirectEnabled] = useState(true);
  const hasRedirectedRef = useRef(false);

  const preview = useMemo(
    () => ({
      url: safeDecode(params.get("url")),
      ogtitle: safeDecode(params.get("ogtitle")),
      ogdescription: safeDecode(params.get("ogdescription")),
      ogimage: safeDecode(params.get("ogimage")),
    }),
    [params],
  );

  const hostName = useMemo(() => {
    if (!preview.url) return null;

    try {
      return new URL(preview.url).host;
    } catch {
      return preview.url;
    }
  }, [preview.url]);

  const redirectNow = useCallback(() => {
    if (!preview.url || hasRedirectedRef.current) return;

    hasRedirectedRef.current = true;
    window.location.assign(preview.url);
  }, [preview.url]);

  useEffect(() => {
    if (!isAutoRedirectEnabled || !preview.url || remainingSeconds <= 0) return;

    const timer = window.setInterval(() => {
      setRemainingSeconds((previous) => {
        if (previous <= 1) {
          window.clearInterval(timer);
          redirectNow();
          return 0;
        }

        return previous - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [isAutoRedirectEnabled, preview.url, remainingSeconds, redirectNow]);

  const progressValue =
    ((REDIRECT_SECONDS - remainingSeconds) / REDIRECT_SECONDS) * 100;

  if (!preview.url) {
    return <NotFound isRedirectFailed />;
  }
  try {
    new URL(preview.url);
  } catch {
    return <NotFound isRedirectFailed={true} />;
  }

  return (
    <main className="relative flex-1 overflow-hidden bg-gradient-grid px-4 py-4 sm:px-6 sm:py-5">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(160,196,255,0.25),transparent_45%),radial-gradient(circle_at_80%_75%,rgba(255,198,255,0.2),transparent_50%)]" />

      <section className="relative z-10 mx-auto flex h-full w-full max-w-2xl items-center justify-center">
        <Card className="brand-card w-full border-0 px-1 py-2 sm:px-2">
          {preview.url && (
            <CardHeader className="flex flex-col items-start gap-2 pb-0">
              <Chip
                size="sm"
                color={preview.url ? "success" : "danger"}
                variant="flat"
                startContent={<Globe size={14} />}
              >
                {preview.url
                  ? t("redirectPreview.safeLink")
                  : t("redirectPreview.invalidLink")}
              </Chip>

              <div className="space-y-0.5">
                <h1 className="text-xl font-gelasio-700 text-[#2D3748] sm:text-2xl">
                  {t("redirectPreview.title")}
                </h1>
                <p className="text-sm text-[#718096]">
                  {t("redirectPreview.description")}
                </p>
              </div>
            </CardHeader>
          )}

          <CardBody className="mt-2 space-y-4">
            {preview.url ? (
              <>
                <PreviewLinkCard
                  className="border border-[#e2e8f0] bg-white/90 p-3 shadow-sm sm:p-4"
                  ogTitle={preview.ogtitle || hostName}
                  ogDescription={preview.ogdescription}
                  ogImage={preview.ogimage}
                  ogUrl={preview.url}
                  ogSiteName={hostName}
                />

                <Divider className="my-1" />

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm text-[#4a5568]">
                    <span>
                      {t("redirectPreview.autoRedirect", {
                        seconds: remainingSeconds,
                      })}
                    </span>
                    <span>{Math.round(progressValue)}%</span>
                  </div>

                  <Progress
                    aria-label="Redirect countdown"
                    value={progressValue}
                    color="primary"
                    className="max-w-full"
                  />
                </div>

                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button
                    color="primary"
                    radius="full"
                    className="w-full font-semibold"
                    endContent={<ArrowRight size={18} />}
                    onPress={redirectNow}
                  >
                    {t("redirectPreview.redirectNow")}
                  </Button>

                  <Button
                    variant="bordered"
                    radius="full"
                    className="w-full border-[#cbd5e1] font-semibold text-[#334155]"
                    startContent={<CirclePause size={18} />}
                    onPress={() => setIsAutoRedirectEnabled((state) => !state)}
                  >
                    {isAutoRedirectEnabled
                      ? t("redirectPreview.pauseAuto")
                      : t("redirectPreview.resumeAuto")}
                  </Button>
                </div>
              </>
            ) : null}
          </CardBody>
        </Card>
      </section>
    </main>
  );
};
export default RedirectPage;
