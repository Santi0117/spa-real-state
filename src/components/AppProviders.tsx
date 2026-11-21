"use client";

import { LanguageProvider } from "@/components/LanguageProvider";
import ScrollToTop from "@/components/ScrollToTop";

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <ScrollToTop />
      {children}
    </LanguageProvider>
  );
}
