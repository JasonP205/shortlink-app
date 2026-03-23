import { Shield, BarChart3, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";

const AboutUs = () => {
  const { t } = useTranslation();

  const contributors = [
    {
      name: t("about.team.member.jason"),
      studentId: "GCS230327",
      email: "phucphgcs230327@fpt.edu.vn",
      avatar: "/contributor/phucphan.jpg",
      color: "#A0C4FF"
    },
    {
      name: t("about.team.member.hugo"),
      studentId: "GCS230377",
      email: "huylggcs230377@fpt.edu.vn",
      avatar: "/contributor/hugo.jpg",
      color: "#BDB2FF"
    },
    {
      name: t("about.team.member.tert"),
      studentId: "GCD230012",
      email: "tiennhtgcd230012@fpt.edu.vn",
      avatar: "/contributor/tert.png",
      color: "#FFC6FF"
    },
  ];

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

      {/* Team */}
      <section className="px-6 pb-16 sm:pb-24">
        <div className="brand-card p-8 max-w-6xl mx-auto space-y-10">
          <h2 className="text-center font-gelasio-700 text-3xl ">
            {t("about.team.title")}
          </h2>
          <div className="flex flex-col lg:flex-row items-center">
            {contributors.map((contributor) => (
              <div key={contributor.studentId} className={`flex-1 p-4 border w-81 hover:bg-[${contributor.color}] lg:w-full border-[${contributor.color}]/50 rounded-2xl bg-white/70 m-2 flex flex-col items-center`}>
                <div className="size-30">
                  <img className="w-full rounded-full h-full object-cover" src={contributor.avatar} alt={contributor.name} />
                </div>
                <div className="flex flex-col mt-2 justify-center items-center">
                  <span className="italic text-muted-foreground">{t("about.team.name")}</span>
                  <p className="font-gelasio-700">{contributor.name}</p>
                </div>
                <div className="flex flex-col mt-2 justify-center items-center">
                  <span className="italic text-muted-foreground">{t("about.team.studentId")}</span>
                  <p className="font-gelasio-700">{contributor.studentId}</p>
                </div>
                <div className="flex flex-col mt-2 justify-center items-center">
                  <span className="italic text-muted-foreground">{t("about.team.email")}</span>
                  <p className="font-gelasio-700">{contributor.email}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
