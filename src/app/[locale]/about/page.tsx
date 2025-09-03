import { useTranslations } from "next-intl";
import React from "react";

const Page = () => {
  const t = useTranslations("AboutPage");
  return (
    <div>
      <h1 className="text-8xl bg-bg text-text p-6 text-center font-qwitcher-grypen text-primary">{t("name")}</h1>
    </div>
  );
};

export default Page;
