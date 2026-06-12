/** URL del formulario de agendar visita, con propiedad precargada si aplica. */
export function agendarVisitaHref(options?: {
  propertyId?: string;
  propertyName?: string;
}): string {
  if (options?.propertyId) {
    return `/agendar-visita?id=${encodeURIComponent(options.propertyId)}`;
  }
  if (options?.propertyName) {
    return `/agendar-visita?propiedad=${encodeURIComponent(options.propertyName)}`;
  }
  return "/agendar-visita";
}

/** URL del formulario de financiamiento, con propiedad precargada si aplica. */
export function financiarHref(options?: {
  propertyId?: string;
  propertyName?: string;
}): string {
  if (options?.propertyId) {
    return `/financiar?id=${encodeURIComponent(options.propertyId)}`;
  }
  if (options?.propertyName) {
    return `/financiar?propiedad=${encodeURIComponent(options.propertyName)}`;
  }
  return "/financiar";
}

/** Detecta si la ruta actual es detalle de propiedad y devuelve su id. */
export function propertyIdFromPathname(pathname: string): string | undefined {
  const match = pathname.match(/^\/propiedades\/([^/]+)$/);
  return match?.[1];
}
