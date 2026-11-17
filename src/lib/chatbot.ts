import type { LanguageCode } from "@/lib/i18n";
import { zones } from "./properties";
import { site } from "./site";

type ReplyRule = {
  keywords: string[];
  reply: Record<LanguageCode, string>;
};

const zoneList = zones.filter((z) => z !== "Todas").join(", ");

const rules: ReplyRule[] = [
  {
    keywords: [
      "visita",
      "agendar",
      "cita",
      "recorrido",
      "ver la casa",
      "ver propiedad",
      "visit",
      "schedule",
      "appointment",
      "tour",
      "agendar visita",
      "agendar uma visita",
    ],
    reply: {
      es: `Podés agendar una visita desde el botón «Agendar visita» en el sitio o escribirnos a ${site.email} / ${site.phone}. Un asesor te confirma día y horario (8:00 a.m. – 4:00 p.m.).`,
      en: `You can schedule a visit with the «Schedule visit» button on the site, or email ${site.email} / call ${site.phone}. An advisor will confirm day and time (8:00 a.m. – 4:00 p.m.).`,
      pt: `Voce pode agendar uma visita pelo botao «Agendar visita» no site ou escrever para ${site.email} / ${site.phone}. Um assessor confirma dia e horario (8:00 – 16:00).`,
    },
  },
  {
    keywords: [
      "vender",
      "vendo",
      "poner en venta",
      "valuacion",
      "valuación",
      "sell",
      "selling",
      "valuation",
      "vender minha",
      "vender mi",
    ],
    reply: {
      es: `Para vender tu propiedad usá el formulario «Vender propiedad» o contactanos en ${site.email}. Te ayudamos con valuación, marketing y cierre.`,
      en: `To sell your property, use the «Sell your home» form or contact us at ${site.email}. We help with valuation, marketing and closing.`,
      pt: `Para vender sua propriedade, use o formulario «Vender propriedade» ou fale conosco em ${site.email}. Ajudamos com avaliacao, marketing e fechamento.`,
    },
  },
  {
    keywords: [
      "construir",
      "construccion",
      "construcción",
      "casa nueva",
      "lote",
      "build",
      "construction",
      "lot",
      "construir casa",
      "construir minha",
    ],
    reply: {
      es: `En «Construí tu casa» podés indicar si ya tenés lote, presupuesto y si necesitás ayuda buscando terreno. También escribinos a ${site.email}.`,
      en: `In «Build your home» you can tell us if you already have a lot, your budget, and whether you need help finding land. You can also email ${site.email}.`,
      pt: `Em «Construir sua casa» voce pode indicar se ja tem lote, orcamento e se precisa de ajuda para encontrar terreno. Tambem escreva para ${site.email}.`,
    },
  },
  {
    keywords: [
      "zona",
      "zonas",
      "area",
      "areas",
      "cartago",
      "pitahaya",
      "region",
      "regioes",
      "regiões",
      "where",
      "locations",
    ],
    reply: {
      es: `Trabajamos principalmente en ${zoneList}. Oficinas en ${site.address}. ¿Qué zona te interesa?`,
      en: `We mainly work in ${zoneList}. Offices at ${site.address}. Which area are you interested in?`,
      pt: `Atuamos principalmente em ${zoneList}. Escritorios em ${site.address}. Qual zona te interessa?`,
    },
  },
  {
    keywords: ["alquiler", "rentar", "arrendar", "rent", "rental", "aluguel", "alugar"],
    reply: {
      es: "Tenemos apartamentos y casas en alquiler premium en el catálogo. Filtrá por «Alquiler» en propiedades o contanos tu presupuesto y zona.",
      en: "We have premium apartments and houses for rent in the catalog. Filter by «Rent» in properties, or tell us your budget and preferred area.",
      pt: "Temos apartamentos e casas para aluguel premium no catalogo. Filtre por «Aluguel» nas propriedades, ou diga seu orcamento e zona.",
    },
  },
  {
    keywords: [
      "comprar",
      "compra",
      "invertir",
      "inversion",
      "inversión",
      "buy",
      "purchase",
      "invest",
      "investment",
      "comprar casa",
      "investir",
    ],
    reply: {
      es: "En el catálogo hay casas, apartamentos, penthouse y terrenos en venta. Podés filtrar por zona y precio, o agendar una visita con un asesor.",
      en: "The catalog has houses, apartments, penthouses and land for sale. You can filter by area and price, or schedule a visit with an advisor.",
      pt: "No catalogo ha casas, apartamentos, penthouses e terrenos a venda. Voce pode filtrar por zona e preco, ou agendar uma visita com um assessor.",
    },
  },
  {
    keywords: [
      "contacto",
      "telefono",
      "teléfono",
      "correo",
      "whatsapp",
      "hablar",
      "contact",
      "phone",
      "email",
      "call",
      "contato",
      "telefone",
    ],
    reply: {
      es: `Contacto: ${site.phone} · ${site.email} · Oficinas: ${site.address}.`,
      en: `Contact: ${site.phone} · ${site.email} · Offices: ${site.address}.`,
      pt: `Contato: ${site.phone} · ${site.email} · Escritorios: ${site.address}.`,
    },
  },
  {
    keywords: ["hola", "buenas", "hey", "saludos", "hello", "hi", "ola", "olá", "bom dia", "boa tarde"],
    reply: {
      es: `¡Hola! Soy el asistente de ${site.brand}. Preguntame por propiedades, zonas, visitas, venta o construcción.`,
      en: `Hello! I'm the ${site.brand} assistant. Ask me about properties, areas, visits, selling or building.`,
      pt: `Ola! Sou o assistente da ${site.brand}. Pergunte sobre propriedades, zonas, visitas, venda ou construcao.`,
    },
  },
];

const defaultReply: Record<LanguageCode, string> = {
  es: `No estoy seguro de entender esa consulta. Podés preguntar por propiedades, zonas, agendar visita, vender o construir. También escribinos a ${site.email} o ${site.phone}.`,
  en: `I'm not sure I understood that. You can ask about properties, areas, scheduling a visit, selling or building. You can also email ${site.email} or call ${site.phone}.`,
  pt: `Nao tenho certeza se entendi. Voce pode perguntar sobre propriedades, zonas, agendar visita, vender ou construir. Tambem escreva para ${site.email} ou ligue ${site.phone}.`,
};

export function getChatResponse(
  message: string,
  locale: LanguageCode = "es"
): string {
  const normalized = message
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");

  for (const rule of rules) {
    if (
      rule.keywords.some((kw) =>
        normalized.includes(kw.normalize("NFD").replace(/\p{Diacritic}/gu, ""))
      )
    ) {
      return rule.reply[locale];
    }
  }

  return defaultReply[locale];
}
