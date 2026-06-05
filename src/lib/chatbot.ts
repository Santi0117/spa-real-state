import { site } from "./site";

type ReplyRule = {
  keywords: string[];
  reply: string;
};

const rules: ReplyRule[] = [
  {
    keywords: ["visita", "agendar", "cita", "recorrido", "ver la casa", "ver propiedad"],
    reply:
      `Podés agendar una visita desde el botón «Agendar visita» en el sitio o escribirnos a ${site.email} / ${site.phone}. Un asesor te confirma día y horario (8:00 a.m. – 4:00 p.m.).`,
  },
  {
    keywords: ["vender", "vendo", "poner en venta", "valuacion", "valuación"],
    reply:
      `Para vender tu propiedad usá el formulario «Vender propiedad» o contactanos en ${site.email}. Te ayudamos con valuación, marketing y cierre.`,
  },
  {
    keywords: ["construir", "construccion", "construcción", "casa nueva", "lote"],
    reply:
      `En «Construí tu casa» podés indicar si ya tenés lote, presupuesto y si necesitás ayuda buscando terreno. También escribinos a ${site.email}.`,
  },
  {
    keywords: ["zona", "escazu", "santa ana", "heredia", "jaco", "curridabat", "cartago", "pitahaya"],
    reply:
      `Trabajamos en Escazú, Santa Ana, Heredia, Jacó, Curridabat y zonas premium de Costa Rica. Oficinas en ${site.address}. ¿Qué zona te interesa?`,
  },
  {
    keywords: ["alquiler", "rentar", "arrendar"],
    reply:
      "Tenemos apartamentos y casas en alquiler premium en el catálogo. Filtrá por «Alquiler» en propiedades o contanos tu presupuesto y zona.",
  },
  {
    keywords: ["comprar", "compra", "invertir", "inversion", "inversión"],
    reply:
      "En el catálogo hay casas, apartamentos, penthouse y terrenos en venta. Podés filtrar por zona y precio, o agendar una visita con un asesor.",
  },
  {
    keywords: ["contacto", "telefono", "teléfono", "correo", "whatsapp", "hablar"],
    reply: `Contacto: ${site.phone} · ${site.email} · Oficinas: ${site.address}.`,
  },
  {
    keywords: ["hola", "buenas", "hey", "saludos"],
    reply: `¡Hola! Soy el asistente de ${site.brand}. Preguntame por propiedades, zonas, visitas, venta o construcción.`,
  },
];

const defaultReply =
  `No estoy seguro de entender esa consulta. Podés preguntar por propiedades, zonas, agendar visita, vender o construir. También escribinos a ${site.email} o ${site.phone}.`;

export function getChatResponse(message: string): string {
  const normalized = message
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");

  for (const rule of rules) {
    if (rule.keywords.some((kw) => normalized.includes(kw))) {
      return rule.reply;
    }
  }

  return defaultReply;
}

export const welcomeMessage =
  `¡Hola! Soy el asistente de ${site.brand}. Te ayudo con propiedades, zonas, visitas y nuestros servicios. ¿En qué te puedo ayudar?`;

export const quickReplies = [
  "¿Cómo agendo una visita?",
  "Quiero vender mi propiedad",
  "¿En qué zonas tienen casas?",
  "¿Cómo los contacto?",
] as const;
