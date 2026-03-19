import { useNavigate, useLocation, Link } from "react-router-dom";
import { ToastProvider } from "@heroui/toast";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Menu, X, Link2 } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const base = import.meta.env.VITE_DEFAULT_APP_PATH || "/app";

  const navLinks = [
    { href: base, label: t("nav.home") },
    { href: `${base}/about`, label: t("nav.about") },
    { href: `${base}/donate`, label: t("nav.donate") },
  ];

  const isActive = (href: string) =>
    location.pathname === href || (href === base && location.pathname === "/");

  return (
    <div
      className="flex min-h-screen w-full flex-col"
      style={{ background: "#F8F9FA" }}
    >
      <ToastProvider placement="top-right" />

      {/* ── Navbar ────────────────────────────────────── */}
      <nav
        className="sticky top-0 z-50 w-full backdrop-blur-md border-b"
        style={{ background: "rgba(255,255,255,0.85)", borderColor: "#e2e8f0" }}
      >
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 shrink-0"
          >
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: "#A0C4FF" }}
            >
              <Link2 size={16} color="#2D3748" />
            </div>
            <span className="text-xl font-bold hidden sm:block text-brand-gradient">
              Min.io
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  isActive(link.href)
                    ? "bg-[#A0C4FF] text-[#2D3748]"
                    : "text-[#718096] hover:text-[#2D3748] hover:bg-[#A0C4FF]/30"
                }`}
              >
                <span>{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Right */}
          <div className="flex items-center gap-2 shrink-0">
            <LanguageSwitcher />
            <button
              className="md:hidden p-1.5 rounded-full text-[#718096]"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div
            className="md:hidden border-t px-4 py-3 flex flex-col gap-1"
            style={{
              background: "rgba(255,255,255,0.97)",
              borderColor: "#e2e8f0",
            }}
          >
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => {
                  navigate(link.href);
                  setMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                  isActive(link.href)
                    ? "bg-[#A0C4FF] text-[#2D3748]"
                    : "text-[#718096] hover:bg-[#A0C4FF]/20"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      <main className="flex-1 flex flex-col">{children}</main>
    </div>
  );
};

export default Layout;
