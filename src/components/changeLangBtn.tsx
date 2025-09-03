import { useLocale } from "next-intl";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const ChangeLangBtn = () => {
  const locale = useLocale();
  return (
    <Link href={`/${locale.toLowerCase() === "en" ? "ar" : "en"}`}>
      <Button className="w-full flex items-center justify-center">{locale.toLowerCase() === "en" ? "ع" : "en"}</Button>
    </Link>
  );
};

export default ChangeLangBtn;
