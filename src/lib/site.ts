export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://spa-real-state.vercel.app";

export const site = {
  name: "Jopa",
  subtitle: "Real Estate",
  brand: "Jopa Real Estate",
  tagline: "Propiedades exclusivas en Costa Rica",
  url: siteUrl,
  description:
    "Asesoría inmobiliaria premium en Costa Rica. Casas, apartamentos, terrenos y proyectos de lujo en las mejores zonas.",
  email: "joparealestate@gmail.com",
  phone: "506 8640-4222",
  phoneTel: "+50686404222",
  whatsapp: "50686404222",
  address: "Pitahaya, Cartago, Costa Rica",
  handle: "@joparealestate",
  social: {
    instagram: "https://www.instagram.com/joparealestate",
    facebook: "https://www.facebook.com/joparealestate",
  },
} as const;

export const servicesMarqueeLines = [
  "Venta de propiedades",
  "Desarrollo inmobiliario",
  "Construcción de vivienda",
  "Asesoría personalizada",
] as const;

export const stats = [
  { value: "50", label: "Casas vendidas" },
  { value: "5", label: "Años de experiencia" },
  { value: "98%", label: "Clientes satisfechos" },
  { value: "4", label: "Zonas disponibles" },
] as const;

export const areas = [
  {
    name: "Jacó",
    description: "Propiedades frente al Pacífico",
    image: "/properties/7.jpg",
    count: 12,
  },
  {
    name: "Heredia",
    description: "Casas familiares en zonas tranquilas",
    image: "/properties/6.jpg",
    count: 15,
  },
  {
    name: "Cartago",
    description: "Viviendas con tradición y plusvalía",
    image: "/properties/2.jpg",
    count: 18,
  },
  {
    name: "San José",
    description: "Opciones urbanas y de fácil acceso",
    image: "/properties/4.jpg",
    count: 14,
  },
] as const;

export const services = [
  {
    title: "Compra y venta",
    description:
      "Te acompañamos en cada paso, negociación, trámites bancarios y cierre con total transparencia.",
  },
  {
    title: "Alquiler premium",
    description:
      "Propiedades seleccionadas para jóvenes, ejecutivos y familias que buscan calidad.",
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
      "Jopa nos encontró la casa perfecta en Cartago en menos de un mes. Profesionales, honestos y siempre disponibles.",
    name: "María & Carlos R.",
    role: "Compradores — Cartago",
  },
  {
    quote:
      "Vendí mi apartamento en Cartago al precio que quería. El marketing y las fotos hicieron toda la diferencia.",
    name: "Andrea V.",
    role: "Vendedora — Cartago",
  },
  {
    quote:
      "Como inversionista, necesitaba confianza. Jopa me guió en todo el proceso legal en Cartago sin complicaciones.",
    name: "James T.",
    role: "Inversionista — Cartago",
  },
] as const;
