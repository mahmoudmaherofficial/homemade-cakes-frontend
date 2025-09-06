"use client";
import { useTranslations } from "next-intl";
import { ModeToggle } from "@/components/ModeToggle";
import ChangeLangBtn from "@/components/changeLangBtn";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { NavLink } from "@/types/types";
import { CircleChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const DesktopNav = () => {
  const t = useTranslations("header");
  const { isAuthenticated, user, loading, clearUser } = useAuth();
  const navLinks = isAuthenticated ? t.raw("privateNavLinks") : t.raw("publicNavLinks");

  return (
    <div className="hidden md:flex items-center gap-5">
      <div className="flex items-center gap-2">
        <ModeToggle />
        <ChangeLangBtn />
        {!loading && !isAuthenticated && (
          <Link href={t("buttons.login.href")}>
            <Button variant={"secondary"}>{t("buttons.login.label")}</Button>
          </Link>
        )}
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger className="flex gap-1 items-center">
          {user ? user.name : "Menu"} <CircleChevronDown size={18} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-50 mt-2">
          {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
          {/* <DropdownMenuSeparator /> */}
          {navLinks.map((link: NavLink) => (
            <Link key={link.key} href={link.href}>
              <DropdownMenuItem className="flex justify-center">{link.label}</DropdownMenuItem>
            </Link>
          ))}
          {isAuthenticated && (
            <>
              <DropdownMenuSeparator />
              <Button variant={"destructive"} className="w-full" onClick={() => clearUser()}>
                {t("buttons.logout.label")}
              </Button>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DesktopNav;
