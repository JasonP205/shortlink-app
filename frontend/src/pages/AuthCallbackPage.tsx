import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";
import { useTranslation } from "react-i18next";

/**
 * Landing page after OAuth redirect.
 * URL: /app/auth/callback?token=<JWT_ACCESS_TOKEN>
 * Reads the token, fetches user info, then navigates home.
 */
const AuthCallbackPage = () => {
  const { t } = useTranslation();
  const [params] = useSearchParams();
  const { handleOAuthCallback } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const token = params.get("token");
    const error = params.get("error");

    if (error || !token) {
      navigate("/app/auth/login?error=oauth_failed", { replace: true });
      return;
    }

    handleOAuthCallback(token).then(() => {
      navigate("/app", { replace: true });
    });
  }, []);

  return (
    <div className="flex-1 flex items-center justify-center bg-brand-gradient">
      <div className="brand-card p-10 text-center">
        <div className="mb-4 text-4xl animate-spin inline-block">✨</div>
        <p className="text-brand-muted font-medium">{t("auth.loggingIn")}</p>
      </div>
    </div>
  );
};

export default AuthCallbackPage;
