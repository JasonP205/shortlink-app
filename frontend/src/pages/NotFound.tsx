import { Button } from "@heroui/react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { House } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
interface NotFoundProps {
  isRedirectFailed?: boolean;
}

const NotFound = ({ isRedirectFailed }: NotFoundProps) => {
  const { t } = useTranslation();
  if (isRedirectFailed) {
    return (
      <div className="w-full flex flex-col justify-center items-center gap-3">
          <Helmet>
            <title>{t("400.title")}</title>
          </Helmet>
        <DotLottieReact
          style={{ width: "50%", height: "50%" }}
          src="/lotties/400-animate.lottie"
          autoplay
          loop
        />
        <h2 className="text-3xl font-bold text-primary dark:text-indigo-300">
          {t("400.title")}
        </h2>
        <p className="text-md text-balance font-semibold text-foreground">
          {t("400.description")}
        </p>
        <Button
          startContent={<House size={20} />}
          as={Link}
          href="/"
          variant="solid"
          color="primary"
          size="lg"
          radius="full"
        >
          {t("400.homeButton")}
        </Button>
      </div>
    );
  }
  return (
    <div className="w-full flex flex-col justify-center items-center gap-3">
      <DotLottieReact
        style={{ width: "50%", height: "50%" }}
        src="/lotties/404-animate.lottie"
        autoplay
        loop
      />
      <h2 className="text-3xl font-bold text-primary dark:text-indigo-300">
        {t("404.title")}
      </h2>
      <p className="text-md text-balance font-semibold text-foreground">
        {t("404.description")}
      </p>
      <Button
        startContent={<House size={20} />}
        variant="solid"
        color="primary"
        size="lg"
        radius="full"
      >
        <Link to="/"> {t("404.homeButton")} </Link>
      </Button>
    </div>
  );
};

export default NotFound;
