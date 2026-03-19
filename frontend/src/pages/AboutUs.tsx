import { Mail, Phone, MapPin, Shield, BarChart3, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";

const AboutUs = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-brand-gradient bg-gradient-grid text-[#2D3748]">
      {/* HERO */}
      <Helmet>
        <title>{t("common.title.about")}</title>
      </Helmet>
      <section className="px-6 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="brand-card p-8 sm:p-12">
            <div className="mb-10 text-center">
              <p className="inline-flex rounded-full bg-[#CAFFBF] px-4 py-1 text-xs font-semibold uppercase tracking-wide">
                {t("about.badge")}
              </p>

              <h1 className="mt-4 text-3xl sm:text-5xl font-gelasio-700 font-bold leading-tight">
                {t("about.title")}
              </h1>

              <p className="mx-auto mt-4 max-w-3xl text-sm sm:text-lg text-[#718096]">
                {t("about.description")}
              </p>
            </div>

            {/* FEATURES */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-[#A0C4FF]/50 bg-white/70 p-5">
                <Zap className="mb-3 text-[#6B9FE4]" />
                <h3 className="mb-2 font-bold">
                  {t("about.features.instant.title")}
                </h3>
                <p className="text-sm text-[#718096]">
                  {t("about.features.instant.desc")}
                </p>
              </div>

              <div className="rounded-2xl border border-[#BDB2FF]/50 bg-white/70 p-5">
                <BarChart3 className="mb-3 text-[#7E70D6]" />
                <h3 className="mb-2 font-bold">
                  {t("about.features.analytics.title")}
                </h3>
                <p className="text-sm text-[#718096]">
                  {t("about.features.analytics.desc")}
                </p>
              </div>

              <div className="rounded-2xl border border-[#FFC6FF]/60 bg-white/70 p-5">
                <Shield className="mb-3 text-[#CC7FCC]" />
                <h3 className="mb-2 font-bold">
                  {t("about.features.secure.title")}
                </h3>
                <p className="text-sm text-[#718096]">
                  {t("about.features.secure.desc")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="px-6 pb-16 sm:pb-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-2">
          
          {/* FORM */}
          <div className="brand-card p-8">
            <h2 className="mb-6 text-2xl sm:text-3xl font-gelasio-700 font-bold">
              {t("about.contactForm.title")}
            </h2>

            <form className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-semibold">
                    {t("about.contactForm.name")}
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-xl border border-[#A0C4FF]/60 bg-white px-3 py-2.5 outline-none transition focus:border-[#6B9FE4]"
                    placeholder={t("about.contactForm.placeholders.name")}
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-semibold">
                    {t("about.contactForm.email")}
                  </label>
                  <input
                    type="email"
                    className="w-full rounded-xl border border-[#A0C4FF]/60 bg-white px-3 py-2.5 outline-none transition focus:border-[#6B9FE4]"
                    placeholder={t("about.contactForm.placeholders.email")}
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold">
                  {t("about.contactForm.subject")}
                </label>
                <input
                  type="text"
                  className="w-full rounded-xl border border-[#BDB2FF]/60 bg-white px-3 py-2.5 outline-none transition focus:border-[#7E70D6]"
                  placeholder={t("about.contactForm.placeholders.subject")}
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold">
                  {t("about.contactForm.message")}
                </label>
                <textarea
                  rows={5}
                  className="w-full rounded-xl border border-[#FFC6FF]/70 bg-white px-3 py-2.5 outline-none transition focus:border-[#CC7FCC]"
                  placeholder={t("about.contactForm.placeholders.message")}
                />
              </div>

              <button
                type="button"
                className="w-full rounded-xl bg-[#A0C4FF] py-3 font-bold text-[#2D3748] transition hover:bg-[#8CB6F8]"
              >
                {t("about.contactForm.submit")}
              </button>
            </form>
          </div>

          {/* CONTACT INFO */}
          <div className="brand-card p-8">
            <h2 className="mb-3 text-2xl sm:text-3xl font-gelasio-700 font-bold">
              {t("about.contactInfo.title")}
            </h2>

            <p className="mb-8 text-[#718096]">
              {t("about.contactInfo.desc")}
            </p>

            <div className="space-y-5">
              <div className="flex items-start gap-4 rounded-xl bg-white/70 p-4 border border-[#A0C4FF]/40">
                <div className="rounded-full bg-[#A0C4FF]/40 p-3 text-[#2D3748]">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-bold">
                    {t("about.contactInfo.email")}
                  </h4>
                  <p className="text-[#718096]">contact@shorten.io</p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl bg-white/70 p-4 border border-[#BDB2FF]/40">
                <div className="rounded-full bg-[#BDB2FF]/40 p-3 text-[#2D3748]">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="font-bold">
                    {t("about.contactInfo.phone")}
                  </h4>
                  <p className="text-[#718096]">+84 798 020 513</p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl bg-white/70 p-4 border border-[#FFC6FF]/50">
                <div className="rounded-full bg-[#FFC6FF]/50 p-3 text-[#2D3748]">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-bold">
                    {t("about.contactInfo.address")}
                  </h4>
                  <p className="leading-relaxed text-[#718096]">
                    20 Cong Hoa Garden, Ward 12, Tan Binh District,
                    Ho Chi Minh City, Vietnam
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default AboutUs;