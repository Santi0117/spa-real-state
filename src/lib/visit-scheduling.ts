import { getPropertyById, isReservationProperty, type Property } from "@/lib/properties";

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

/** URL del formulario de agendar reserva (alquiler por día/noche). */
export function agendarReservaHref(options?: {
  propertyId?: string;
  propertyName?: string;
}): string {
  if (options?.propertyId) {
    return `/agendar-reserva?id=${encodeURIComponent(options.propertyId)}`;
  }
  if (options?.propertyName) {
    return `/agendar-reserva?propiedad=${encodeURIComponent(options.propertyName)}`;
  }
  return "/agendar-reserva";
}

/** Visita presencial o reserva según el tipo de propiedad. */
export function schedulingHref(property: Property): string {
  if (isReservationProperty(property)) {
    return agendarReservaHref({ propertyId: property.id });
  }
  return agendarVisitaHref({ propertyId: property.id });
}

export function schedulingHrefById(propertyId: string): string {
  const property = getPropertyById(propertyId);
  if (property && isReservationProperty(property)) {
    return agendarReservaHref({ propertyId });
  }
  return agendarVisitaHref({ propertyId });
}

/** Enlace a la sección de financiamiento en el landing, con propiedad precargada si aplica. */
export function financiarHref(options?: {
  propertyId?: string;
  propertyName?: string;
}): string {
  if (options?.propertyId) {
    return `/?id=${encodeURIComponent(options.propertyId)}#financiamiento`;
  }
  if (options?.propertyName) {
    return `/?propiedad=${encodeURIComponent(options.propertyName)}#financiamiento`;
  }
  return "/#financiamiento";
}

/** Detecta si la ruta actual es detalle de propiedad y devuelve su id. */
export function propertyIdFromPathname(pathname: string): string | undefined {
  const match = pathname.match(/^\/propiedades\/([^/]+)$/);
  return match?.[1];
}
