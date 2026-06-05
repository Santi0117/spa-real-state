export const site = {
  name: "Jopa",
  brand: "Jopa Real Estate",
  tagline: "Propiedades exclusivas en Costa Rica",
  description:
    "Asesoría inmobiliaria premium en Costa Rica. Casas, apartamentos, terrenos y proyectos de lujo en las mejores zonas.",
  email: "joparealestate@gmail.com",
  phone: "506 8640-4222",
  phoneTel: "+50686404222",
  whatsapp: "50686404222",
  address: "Pitahaya, Cartago, Costa Rica",
  handle: "@joparealestate",
} as const;

export const servicesMarqueeLines = [
  "Venta de propiedades",
  "Desarrollo inmobiliario",
  "Construcción de vivienda",
  "Asesoría personalizada",
] as const;

export const stats = [
  { value: "180+", label: "Propiedades vendidas" },
  { value: "12", label: "Años de experiencia" },
  { value: "98%", label: "Clientes satisfechos" },
  { value: "6", label: "Zonas premium" },
] as const;

export const areas = [
  {
    name: "Escazú",
    description: "Villas modernas con vista a la ciudad",
    image: "/properties/2.jpg",
    count: 24,
  },
  {
    name: "Santa Ana",
    description: "Condominios de lujo y naturaleza",
    image: "/properties/4.jpg",
    count: 18,
  },
  {
    name: "Heredia",
    description: "Casas familiares en zonas tranquilas",
    image: "/properties/6.jpg",
    count: 15,
  },
  {
    name: "Jacó & Pacífico",
    description: "Propiedades frente al mar",
    image: "/properties/7.jpg",
    count: 12,
  },
] as const;

export const services = [
  {
    title: "Compra y venta",
    description:
      "Te acompañamos en cada paso: valuación, negociación y cierre con total transparencia.",
  },
  {
    title: "Alquiler premium",
    description:
      "Propiedades seleccionadas para expatriados, ejecutivos y familias que buscan calidad.",
  },
  {
    title: "Inversión",
    description:
      "Análisis de mercado y oportunidades en desarrollos con alto potencial de plusvalía.",
  },
  {
    title: "Asesoría legal",
    description:
      "Red de abogados y notarios especializados en transacciones inmobiliarias en CR.",
  },
] as const;

export const testimonials = [
  {
    quote:
      "Jopa nos encontró la casa perfecta en Escazú en menos de un mes. Profesionales, honestos y siempre disponibles.",
    name: "María & Carlos R.",
    role: "Compradores — Escazú",
  },
  {
    quote:
      "Vendí mi apartamento al precio que quería. El marketing y las fotos hicieron toda la diferencia.",
    name: "Andrea V.",
    role: "Vendedora — Santa Ana",
  },
  {
    quote:
      "Como inversionista extranjero, necesitaba confianza. Jopa me guió en todo el proceso legal sin complicaciones.",
    name: "James T.",
    role: "Inversionista — Heredia",
  },
] as const;
