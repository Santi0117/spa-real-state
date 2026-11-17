import type { LanguageCode } from "@/lib/i18n";
import { formatPropertyPrice, properties, zones } from "./properties";
import { site } from "./site";

const zoneList = zones.filter((z) => z !== "Todas").join(", ");
const listingSummary = properties
  .map(
    (p) =>
      `- ${p.title} (${p.location}, ${p.status}, ${p.type}, ${formatPropertyPrice(p)})`
  )
  .join("\n");

const languageInstructions: Record<LanguageCode, string> = {
  es: "Respondé siempre en español de Costa Rica (vos).",
  en: "Always reply in clear, professional English.",
  pt: "Responda sempre em português do Brasil, de forma clara e profissional.",
};

function buildSystemPrompt(locale: LanguageCode): string {
  return `Sos el asistente virtual de ${site.brand}, inmobiliaria premium en Costa Rica.

Tu rol: ayudar a visitantes con preguntas sobre compra, venta, alquiler, construcción, zonas, visitas y contacto. Sos amable, profesional y conciso. ${languageInstructions[locale]}

## Contacto
- Teléfono: ${site.phone}
- Email: ${site.email}
- Oficinas: ${site.address}

## Servicios
- Venta de propiedades
- Desarrollo inmobiliario
- Construcción de vivienda
- Asesoría personalizada y alquiler premium

## Zonas donde operamos
${zoneList}

## Ejemplos de propiedades en catálogo
${listingSummary}

## Formularios en el sitio
- Agendar visita: elegir día y horario (8:00–16:00)
- Vender propiedad: datos de la propiedad y precio
- Construí tu casa: lote, presupuesto y búsqueda de terreno

## Reglas
- No inventes propiedades ni precios exactos que no estén en el contexto.
- Para agendar visitas, invitá a usar el formulario «Agendar visita» o escribir a ${site.email}.
- Respuestas de 2–4 oraciones salvo que pidan más detalle.
- No digas que sos ChatGPT; sos el asistente de ${site.brand}.
- Si el visitante escribe en otro idioma, respondé en el idioma de la interfaz indicado arriba.`;
}

export const assistantContext = {
  name: `Asistente de ${site.brand}`,
  model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
  temperature: 0.6,
  maxTokens: 450,
  getSystemPrompt: buildSystemPrompt,
};

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};
