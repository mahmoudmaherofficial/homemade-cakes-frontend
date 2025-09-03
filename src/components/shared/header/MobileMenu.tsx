"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ModeToggle } from "@/components/ModeToggle";
import ChangeLangBtn from "@/components/changeLangBtn";
import { NavLink } from "@/types/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const MobileMenu = ({ setIsOpen }: { setIsOpen: (value: boolean) => void }) => {
  const t = useTranslations();
  const navLinks = t.raw("header.navLinks");

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
          <p>{t("header.changeMode")}</p>
          <p>{t("header.changeLang")}</p>
        </div>
        <div className="flex items-center gap-2 *:flex-1">
          <ModeToggle />
          <ChangeLangBtn />
        </div>
        <Link href={t("header.loginBtn.href")} onClick={() => setIsOpen(false)}>
          <Button className="w-full mt-2" variant={"secondary"}>
            {t("header.loginBtn.label")}
          </Button>
        </Link>
      </ul>
    </motion.div>
  );
};

export default MobileMenu;
