import { useTranslation } from "react-i18next";

const LANGS = [
  { code: "en", label: "EN" },
  { code: "vi", label: "VI" },
  { code: "zh", label: "ZH" },
];

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const current = i18n.language?.slice(0, 2) ?? "en";

  return (
    <div className="flex items-center gap-0.5 bg-white/60 rounded-full px-1 py-0.5 border border-[var(--brand-border)]">
      {LANGS.map((lang) => (
        <button
          key={lang.code}
          onClick={() => i18n.changeLanguage(lang.code)}
          className={`px-2 py-0.5 rounded-full text-xs font-semibold transition-all ${
            current === lang.code
              ? "bg-[var(--brand-primary)] text-[var(--brand-text)] shadow-sm"
              : "text-[var(--brand-muted)] hover:text-[var(--brand-text)]"
          }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
};
