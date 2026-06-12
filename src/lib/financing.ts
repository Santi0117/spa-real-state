export const MIN_DOWN_PAYMENT_RATIO = 0.2;

export const FINANCING_TERMS = [10, 15, 20, 25] as const;

export type FinancingTermYears = (typeof FINANCING_TERMS)[number];

export type FinancingLender = {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  fixedRate: number;
  monthlyInsurance?: number;
  minDownPaymentRatio?: number;
  featured?: boolean;
};

export const financingLenders: FinancingLender[] = [
  {
    id: "bac",
    name: "BAC Credomatic",
    shortName: "BAC",
    logo: "/banks/bac.svg",
    fixedRate: 7.8,
    monthlyInsurance: 45,
    featured: true,
  },
  {
    id: "bn",
    name: "Banco Nacional",
    shortName: "BN",
    logo: "/banks/bn.png",
    fixedRate: 8.5,
    monthlyInsurance: 40,
  },
  {
    id: "davivienda",
    name: "Davivienda",
    shortName: "Davivienda",
    logo: "/banks/davivienda.png",
    fixedRate: 9.25,
  },
  {
    id: "promerica",
    name: "Promerica",
    shortName: "Promerica",
    logo: "/banks/promerica.svg",
    fixedRate: 8.75,
    monthlyInsurance: 35,
  },
  {
    id: "bcr",
    name: "Banco de Costa Rica",
    shortName: "BCR",
    logo: "/banks/bcr.png",
    fixedRate: 7.95,
    monthlyInsurance: 38,
  },
  {
    id: "scotia",
    name: "Scotiabank",
    shortName: "Scotiabank",
    logo: "/banks/scotia.svg",
    fixedRate: 8.25,
    monthlyInsurance: 42,
  },
];

export function minDownPayment(
  propertyPrice: number,
  ratio: number = MIN_DOWN_PAYMENT_RATIO
): number {
  return Math.ceil(propertyPrice * ratio);
}

export function calculateBankPayment(
  propertyPrice: number,
  downPayment: number,
  annualRate: number,
  years: number
): number {
  const principal = Math.max(0, propertyPrice - downPayment);
  if (principal <= 0) return 0;

  const monthlyRate = annualRate / 100 / 12;
  const numPayments = years * 12;

  if (monthlyRate === 0) return principal / numPayments;

  const factor = Math.pow(1 + monthlyRate, numPayments);
  return (principal * monthlyRate * factor) / (factor - 1);
}

export function calculateMonthlyPayment(
  propertyPrice: number,
  downPayment: number,
  annualRate: number,
  years: number,
  monthlyInsurance = 0
) {
  const bankPayment = calculateBankPayment(
    propertyPrice,
    downPayment,
    annualRate,
    years
  );

  return {
    bankPayment,
    insurance: monthlyInsurance,
    total: bankPayment + monthlyInsurance,
  };
}

export function formatFinanceAmount(amount: number): string {
  return `$${amount
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

export function parseCurrencyInput(value: string): number {
  const cleaned = value.replace(/[^0-9.]/g, "");
  const parsed = Number.parseFloat(cleaned);
  return Number.isFinite(parsed) ? parsed : 0;
}
