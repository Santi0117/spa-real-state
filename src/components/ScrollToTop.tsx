"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Fuerza el tope al cambiar de ruta (evita aterrizar a mitad o al final de la página). */
export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    // Si la URL trae # (ej. /#listings), dejamos que el ancla haga su trabajo.
    if (window.location.hash) return;

    // Instantáneo: el smooth del html a veces deja la vista a mitad o abajo.
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  return null;
}
