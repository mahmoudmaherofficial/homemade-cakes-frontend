"use client";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ModeToggle } from "@/components/ModeToggle";
import ChangeLangBtn from "@/components/changeLangBtn";
import { NavLink } from "@/types/types";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const DesktopNav = () => {
  const t = useTranslations("header");
  const { isAuthenticated, loading, clearUser } = useAuth();
  const navLinks = isAuthenticated ? t.raw("privateNavLinks") : t.raw("publicNavLinks");

  return (
    <div className="hidden md:flex items-center gap-5">
      <ul className="hidden md:flex md:space-x-6">
        {navLinks.map((link: NavLink) => (
          <Link key={link.key} href={link.href} className="hover:text-accent transition">
            {link.label}
          </Link>
        ))}
      </ul>
      <div className="flex items-center gap-2">
        <ModeToggle />
        <ChangeLangBtn />
        {!loading && !isAuthenticated ? (
          <Link href={t("buttons.login.href")}>
            <Button variant={"secondary"}>{t("buttons.login.label")}</Button>
          </Link>
        ) : (
          <Button variant={"outline"} onClick={() => clearUser()}>
            {t("buttons.logout.label")}
          </Button>
        )}
      </div>
    </div>
  );
};

export default DesktopNav;
