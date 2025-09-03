import { useTranslations } from "next-intl";
import Image from "next/image";
import Background from "./background";
import "./home.css";
import PatternBG from "@/components/ui/pattern-bg/PatternBG";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const t = useTranslations("HomePage");

  return (
    <main>
      <section
        id="hero"
        className="relative min-h-svh flex items-center justify-center overflow-hidden bg-background text-foreground pt-18">
        <PatternBG />
        <div className="relative z-10 container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center px-6">
          {/* text */}
          <div className="space-y-6">
            <h1 className="text-5xl font-extrabold leading-tight">
              {t.rich("title", {
                highlight: (chunks) => <span className="text-primary">{chunks}</span>,
              })}
            </h1>
            <p className="text-lg text-muted-foreground">{t("description")}</p>
            <Button size={"lg"} className="rounded-full text-xl py-6 cursor-pointer">
              {t("orderNow")}
            </Button>
          </div>

          {/* cake image */}
          <div className="relative flex justify-center">
            <Background /> {/* blob هنا ورا الكيكة */}
            <Image
              src={"/images/cake.png"}
              alt="cake"
              width={500}
              height={400}
              className="drop-shadow-2xl animate-float relative z-10"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
