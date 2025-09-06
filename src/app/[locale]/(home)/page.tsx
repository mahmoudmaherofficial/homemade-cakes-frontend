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
      {/* Hero Section */}
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
              {t("buttons.orderNow")}
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

      {/* Features Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">{t("features.title")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { icon: "🎂", text: t("features.fresh") },
              { icon: "🍫", text: t("features.quality") },
              { icon: "🚚", text: t("features.delivery") },
            ].map((item, idx) => (
              <div key={idx} className="p-6 bg-card rounded-2xl shadow-md hover:shadow-xl transition">
                <div className="text-5xl mb-4">{item.icon}</div>
                <p className="text-lg text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">{t("gallery.title")}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* {[1, 2, 3, 4].map((img) => (
              <Image
                key={img}
                src={`/images/cake${img}.jpg`}
                alt={`cake ${img}`}
                width={300}
                height={200}
                className="rounded-xl shadow-md hover:scale-105 transition"
              />
            ))} */}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">{t("testimonials.title")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {["Sarah", "Omar", "Layla"].map((name, idx) => (
              <div key={idx} className="p-6 bg-card rounded-2xl shadow-md hover:shadow-xl transition">
                <p className="italic text-muted-foreground mb-4">{t(`testimonials.${idx + 1}`)}</p>
                <h4 className="font-semibold text-lg">{name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground text-center">
        <h2 className="text-4xl font-bold mb-6">{t("cta.title")}</h2>
        <p className="mb-8 text-lg">{t("cta.subtitle")}</p>
        <Button size="lg" variant="secondary" className="rounded-full text-xl py-6">
          {t("buttons.orderNow")}
        </Button>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-background text-center text-muted-foreground">
        <p>
          © {new Date().getFullYear()} Homemade Cakes. {t("footer.rights")}
        </p>
      </footer>
    </main>
  );
}
