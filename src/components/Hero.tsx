import Image from "next/image";
import { site } from "@/lib/site";
import SearchBar from "./SearchBar";

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden">
      <Image
        src="/hero/hero.jpg"
        alt="Propiedad de lujo en Costa Rica"
        fill
        priority
        quality={95}
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-charcoal/30" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 pt-32 sm:px-6 sm:pb-20 lg:pb-28">
        <div className="max-w-2xl">
          <p className="section-label text-gold-light">Costa Rica · Propiedades premium</p>
          <h1 className="font-display mt-4 text-[clamp(2.75rem,6vw,4.75rem)] font-medium leading-[1.05] tracking-tight text-white">
            Encontrá el hogar
            <span className="block italic text-gold-light">que merecés</span>
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-white/75">
            {site.description}
          </p>
        </div>

        <div className="mt-10 lg:mt-14">
          <SearchBar />
        </div>
      </div>
    </section>
  );
}
