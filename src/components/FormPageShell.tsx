import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BackLink } from "@/components/BackLink";

type FormPageShellProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export default function FormPageShell({ title, description, children }: FormPageShellProps) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream pt-24 pb-20 md:pt-28">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <BackLink href="/">← Volver al inicio</BackLink>
          <p className="section-label mt-8">Formulario</p>
          <h1 className="font-display mt-3 text-4xl font-medium tracking-tight text-charcoal md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-slate-warm">{description}</p>
          <div className="mt-10 border border-charcoal/8 bg-white p-6 shadow-sm md:p-8">{children}</div>
        </div>
      </main>
      <Footer />
    </>
  );
}
