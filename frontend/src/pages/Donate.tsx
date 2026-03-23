import { Copy, HeartHandshake } from "lucide-react";
import { toast } from "@/lib/toast";
import { useTranslation } from "react-i18next";
import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@heroui/button";

const Donate = () => {
  const { t } = useTranslation();
  const bankName = "MBBank";
  const bankBin = "970422";
  const [accountNumber, setAccountNumber] = useState("4323032005");
  const transferNote = "Ung ho Min.io";

  const qrUrl = useMemo(() => {
    const cleanAccount = accountNumber.trim();
    return `https://img.vietqr.io/image/${bankBin}-${cleanAccount}-compact2.png?amount=0&addInfo=${encodeURIComponent(transferNote)}&accountName=${encodeURIComponent("MIN.IO")}`;
  }, [accountNumber]);

  const copyAccountNumber = async () => {
    await navigator.clipboard.writeText(accountNumber);
    toast.success(t("donate.copied"));
  };

  return (
    <div className="min-h-screen bg-brand-gradient bg-gradient-grid px-4 py-12 sm:py-16 text-[#2D3748]">
      <Helmet>
        <title>{t("common.title.donate")}</title>
      </Helmet>
      <div className="mx-auto max-w-5xl">
        <div className="brand-card p-6 sm:p-10">
          <div className="mb-8 text-center">
            <p className="inline-flex items-center gap-2 rounded-full bg-[#FFD6A5] px-4 py-1 text-xs font-semibold uppercase tracking-wide">
              <HeartHandshake size={14} />
              {t("donate.badge")}
            </p>
            <h1 className="mt-4 text-3xl sm:text-4xl font-gelasio-700 font-bold">
              {t("donate.title")}
            </h1>
            <p className="mt-3 text-sm sm:text-base text-[#718096]">
              {t("donate.description")}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-[#A0C4FF]/50 bg-white/80 p-5 sm:p-6">
              <img
                src={qrUrl}
                alt="Bank Transfer QR Code"
                className="mx-auto w-full max-w-xs rounded-xl"
              />
            </div>

            <div className="rounded-2xl border border-[#BDB2FF]/50 bg-white/80 p-5 sm:p-6">
              <h2 className="text-xl font-bold">{t("donate.bankInfo")}</h2>
              <div className="mt-4 space-y-3 text-sm sm:text-base">
                <div className="flex items-center justify-between rounded-xl bg-[#F8F9FA] px-4 py-3 border border-[#e2e8f0]">
                  <span className="font-semibold text-[#718096]">
                    {t("donate.bank")}
                  </span>
                  <span className="font-bold">{bankName}</span>
                </div>

                <div className="rounded-xl bg-[#F8F9FA] px-4 py-3 border border-[#e2e8f0]">
                  <label className="mb-2 block font-semibold text-[#718096]">
                    {t("donate.accountNumber")}
                  </label>
                  <input
                    value={accountNumber}
                    disabled
                    onChange={(e) =>
                      setAccountNumber(e.target.value.replace(/\s+/g, ""))
                    }
                    className="w-full rounded-lg border border-[#A0C4FF]/60 bg-white px-3 py-2 font-bold tracking-wide outline-none"
                  />
                </div>
                <Button
                  type="button"
                  color="primary"
                  fullWidth
                  onPress={copyAccountNumber}
                >
                  <Copy size={16} />
                  {t("donate.copyAccount")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donate;
