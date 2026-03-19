import { QRCodeCanvas } from "qrcode.react";
import { useTranslation } from "react-i18next";
import { Card, Button } from "@heroui/react";
import { cn } from "@/lib/utils";
import { toPng } from "html-to-image";
import { useMemo, useRef, useState } from "react";
import { Download } from "lucide-react";

interface QrcodeProps {
  url: string;
  className?: string;
}

const Qrcode = ({ url, className }: QrcodeProps) => {
  const { t } = useTranslation();
  const qrRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const readableUrl = useMemo(() => {
    if (!url) return "";

    try {
      return new URL(url).host;
    } catch {
      return url;
    }
  }, [url]);

  const handleDownload = async () => {
    if (!qrRef.current || isDownloading) return;

    setIsDownloading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 0));

      const dataUrl = await toPng(qrRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#ffffff",
      });
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "Share QR Code - Min.io.png";
      link.click();
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Card
      className={cn(
        "relative w-full overflow-hidden border border-[#dbe4ff] bg-[linear-gradient(150deg,#f7f9ff_0%,#eef3ff_45%,#f9f7ff_100%)] shadow-[0_12px_32px_rgba(40,74,145,0.12)]",
        className,
      )}
    >
      <div className="pointer-events-none absolute -right-12 -top-16 h-40 w-40 rounded-full bg-[#c7d8ff]/40 blur-2xl" />

      <div className="relative z-10 flex flex-col items-center gap-4 p-4 sm:p-6">
        <div
          ref={qrRef}
          className="w-full rounded-2xl border border-[#e2e8f8] bg-white p-4 shadow-sm sm:p-5"
        >
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <span className="rounded-full bg-[#edf2ff] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#4b5cc4]">
                {t("qrcode.title")}
            </span>
            {readableUrl && (
              <span className="max-w-45 truncate text-xs text-[#64748b] sm:max-w-60">
                {readableUrl}
              </span>
            )}
          </div>

          <p className="text-sm leading-relaxed text-[#475569] sm:text-[15px]">
            {t("qrcode.cta")}
          </p>

          <div className="mt-4 flex justify-center rounded-2xl bg-[linear-gradient(135deg,#f8faff_0%,#f2edff_100%)] p-3 sm:p-4">
            <div className="rounded-xl bg-white p-2 shadow-[0_6px_20px_rgba(99,102,241,0.15)] sm:p-3">
              <QRCodeCanvas
                value={url}
                level="H"
                size={220}
                fgColor="#4f46e5"
                bgColor="#ffffff"
                includeMargin={true}
                imageSettings={{
                  src: "/min-io.png",
                  height: 36,
                  width: 36,
                  excavate: true,
                }}
              />
            </div>
          </div>
        </div>

        <Button
          color="primary"
          radius="full"
          className="w-full font-semibold"
          startContent={<Download size={18} />}
          onPress={handleDownload}
          isLoading={isDownloading}
          isDisabled={!url}
        >
          {isDownloading ? "Downloading..." : t("qrcode.download")}
        </Button>
      </div>
    </Card>
  );
};

export default Qrcode;
