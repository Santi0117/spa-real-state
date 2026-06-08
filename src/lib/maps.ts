export function googleMapsUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function wazeUrl(query: string) {
  return `https://waze.com/ul?q=${encodeURIComponent(query)}&navigate=yes`;
}

export const mapQueries = {
  office: "Pitahaya, Cartago, Costa Rica",
  vistaVerde: "Condominio Vista Verde, Santa Ana, San José, Costa Rica",
} as const;
