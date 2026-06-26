export const MIN_DOWN_PAYMENT_RATIO = 0.1;

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
    monthlyInsurance: 23_000,
    featured: true,
  },
  {
    id: "bn",
    name: "Banco Nacional",
    shortName: "BN",
    logo: "/banks/bn.png",
    fixedRate: 8.5,
    monthlyInsurance: 21_000,
  },
  {
    id: "davivienda",
    name: "Davivienda",
    shortName: "Davivienda",
    logo: "/banks/davivienda.png",
    fixedRate: 9.25,
  },
  {
    id: "mucap",
    name: "MUCAP",
    shortName: "MUCAP",
    logo: "/banks/mucap.png",
    fixedRate: 8.75,
    monthlyInsurance: 18_000,
  },
  {
    id: "bcr",
    name: "Banco de Costa Rica",
    shortName: "BCR",
    logo: "/banks/bcr.png",
    fixedRate: 7.95,
    monthlyInsurance: 20_000,
  },
  {
    id: "scotia",
    name: "Scotiabank",
    shortName: "Scotiabank",
    logo: "/banks/scotia.svg",
    fixedRate: 8.25,
    monthlyInsurance: 22_000,
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
  const rounded = Math.round(amount);
  return `₡${rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
}

export function parseCurrencyInput(value: string): number {
  const cleaned = value.replace(/[^\d]/g, "");
  const parsed = Number.parseInt(cleaned, 10);
  return Number.isFinite(parsed) ? parsed : 0;
}
