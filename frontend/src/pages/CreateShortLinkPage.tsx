import CreateLinkForm from "@/components/createLinkPage/CreateLinkForm";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Chip } from "@heroui/react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { useLinkStore } from "@/stores/useLinkStore";
import Qrcode from "@/components/createLinkPage/Qrcode";

const CreateShortLinkPage = () => {
  const { t } = useTranslation();
  const { createdLink, copyMode } = useLinkStore();
  return (
    <div className="bg-grid-sphere w-full flex-1 flex justify-center overflow-hidden">
      <Helmet>
        <title>{t("common.title.home")}</title>
      </Helmet>
      <div className="mt-20 sm:mt-0 w-full px-4 flex flex-col sm:flex-row justify-center items-center gap-2 md:gap-5">
        <div className="md:flex-1 flex flex-col gap-4 max-w-2xl">
          <Chip
            classNames={{
              content: "font-bold text-[#2D3748] text-xs sm:text-sm",
            }}
            variant="flat"
            color="primary"
          >
            {t("home.badge")}
          </Chip>
          <h2 className="text-2xl sm:text-4xl font-gelasio-700 font-bold text-[#2D3748]">
            {t("home.title")}
          </h2>
          <p className="text-xs sm:text-sm mb-6 text-balance font-semibold text-[#718096]">
            {t("home.description")}
          </p>
          <CreateLinkForm />
        </div>
        <div className="flex-1 max-w-md md:max-w-xl aspect-square rounded-md overflow-hidden">
          {copyMode ? (
            <div className="max-w-sm md:max-w-xl mx-auto">
              <Qrcode url={createdLink?.shortUrl!} />
            </div>
          ) : (
            <DotLottieReact src="/lotties/hero.lottie" autoplay loop />
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateShortLinkPage;
