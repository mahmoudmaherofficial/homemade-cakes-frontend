"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ModeToggle } from "@/components/ModeToggle";
import ChangeLangBtn from "@/components/changeLangBtn";
import { NavLink } from "@/types/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const MobileMenu = ({ setIsOpen }: { setIsOpen: (value: boolean) => void }) => {
  const t = useTranslations("header");
  const { isAuthenticated, loading, clearUser } = useAuth();
  const navLinks = isAuthenticated ? t.raw("privateNavLinks") : t.raw("publicNavLinks");

  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.25 }}
      className="md:hidden absolute top-20 left-0 w-full bg-card shadow-lg border-b border-border rounded-lg z-40">
      <ul className="flex flex-col space-y-3 p-4">
        {navLinks.map((item: NavLink) => (
          <li key={item.key}>
            <a
              href={item.href}
              className="block py-2 px-3 rounded-sm text-foreground hover:bg-accent/10 hover:text-accent transition">
              {item.label}
            </a>
          </li>
        ))}
        <div className="flex items-center gap-2 *:flex-1 border-t border-border pt-3">
          <p>{t("changeMode")}</p>
          <p>{t("changeLang")}</p>
        </div>
        <div className="flex items-center gap-2 *:flex-1">
          <ModeToggle />
          <ChangeLangBtn />
        </div>
        {!isAuthenticated && !loading ? (
          <Link href={t("buttons.login.href")}>
            <Button className="w-full" onClick={() => setIsOpen(false)} variant={"secondary"}>
              {t("buttons.login.label")}
            </Button>
          </Link>
        ) : (
          <Button
            variant={"destructive"}
            onClick={() => {
              clearUser();
              setIsOpen(false);
            }}>
            {t("buttons.logout.label")}
          </Button>
        )}
      </ul>
    </motion.div>
  );
};

export default MobileMenu;
