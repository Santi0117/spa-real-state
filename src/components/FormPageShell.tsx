"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BackLink } from "@/components/BackLink";
import { useTranslations } from "@/components/LanguageProvider";

type FormPageShellProps = {
  title: string;
  description: string;
  children: React.ReactNode;
  wide?: boolean;
  stepLabel?: string;
  unboxed?: boolean;
  backHref?: string;
};

export default function FormPageShell({
  title,
  description,
  children,
  wide = false,
  stepLabel,
  unboxed = false,
  backHref = "/",
}: FormPageShellProps) {
  const { t } = useTranslations();
  const backLabel =
    backHref === "/" || backHref === "" ? t.common.backToHome : t.common.backToCatalog;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-sand pt-28 pb-20 md:pt-32">
        <div
          className={`mx-auto px-4 sm:px-6 ${
            wide ? "max-w-6xl" : "max-w-2xl"
          }`}
        >
          <BackLink href={backHref}>{backLabel}</BackLink>
          {stepLabel ? (
            <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
              {stepLabel}
            </p>
          ) : (
            <p className="section-label mt-8">{t.common.formLabel}</p>
          )}
          <h1 className="font-display mt-4 text-4xl font-normal tracking-tight text-navy md:text-6xl">
            {title}
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-slate-warm">{description}</p>
          {unboxed ? (
            <div className="mt-10">{children}</div>
          ) : (
            <div className="mt-10 rounded-2xl bg-white p-6 shadow-sm shadow-navy/5 md:p-10">{children}</div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
