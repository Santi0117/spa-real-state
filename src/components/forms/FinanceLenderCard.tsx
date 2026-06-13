"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  calculateMonthlyPayment,
  FINANCING_TERMS,
  formatFinanceAmount,
  minDownPayment,
  parseCurrencyInput,
  type FinancingLender,
  type FinancingTermYears,
} from "@/lib/financing";
import { formatMessage } from "@/lib/i18n";
import { useTranslations } from "@/components/LanguageProvider";

type FinanceLenderCardProps = {
  lender: FinancingLender;
  propertyPrice: number;
  defaultDownPayment: number;
};

export default function FinanceLenderCard({
  lender,
  propertyPrice,
  defaultDownPayment,
}: FinanceLenderCardProps) {
  const { t } = useTranslations();
  const minimumDown = minDownPayment(
    propertyPrice,
    lender.minDownPaymentRatio
  );
  const [downPayment, setDownPayment] = useState(defaultDownPayment);
  const [downPaymentInput, setDownPaymentInput] = useState(
    String(defaultDownPayment)
  );
  const [termYears, setTermYears] = useState<FinancingTermYears>(15);

  useEffect(() => {
    setDownPayment(defaultDownPayment);
    setDownPaymentInput(String(defaultDownPayment));
  }, [defaultDownPayment, propertyPrice]);

  const effectiveDownPayment = Math.max(downPayment, 0);
  const belowMinimum = effectiveDownPayment < minimumDown;

  const payment = useMemo(
    () =>
      calculateMonthlyPayment(
        propertyPrice,
        belowMinimum ? minimumDown : effectiveDownPayment,
        lender.fixedRate,
        termYears,
        lender.monthlyInsurance ?? 0
      ),
    [
      propertyPrice,
      effectiveDownPayment,
      belowMinimum,
      minimumDown,
      lender.fixedRate,
      lender.monthlyInsurance,
      termYears,
    ]
  );

  function applyDownPayment() {
    const parsed = parseCurrencyInput(downPaymentInput);
    setDownPayment(parsed);
  }

  return (
    <article
      className={`flex h-full flex-col rounded-sm border bg-white p-4 sm:p-5 ${
        lender.featured
          ? "border-gold shadow-md shadow-gold/10"
          : "border-charcoal/10"
      }`}
    >
      <div className="flex min-h-[4rem] items-center justify-center border-b border-charcoal/8 px-2 pb-4">
        <Image
          src={lender.logo}
          alt={lender.name}
          width={180}
          height={56}
          unoptimized={lender.logo.endsWith(".svg")}
          className="max-h-11 w-auto max-w-[170px] object-contain object-center"
        />
      </div>

      <dl className="mt-4 space-y-4 text-sm">
        <div>
          <dt className="text-slate-warm">{t.financeCard.fixedRate}</dt>
          <dd className="mt-1 text-lg font-semibold text-charcoal">
            {lender.fixedRate.toFixed(2)}%
          </dd>
        </div>

        <div>
          <dt className="text-slate-warm">{t.financeCard.downPayment}</dt>
          <dd className="mt-2">
            <div className="flex gap-2">
              <input
                type="text"
                inputMode="decimal"
                value={downPaymentInput}
                onChange={(e) => setDownPaymentInput(e.target.value)}
                onBlur={applyDownPayment}
                className="input-field rounded-sm py-2 text-sm"
                aria-label={`Prima ${lender.name}`}
              />
              <button
                type="button"
                onClick={applyDownPayment}
                className="btn-gold shrink-0 !px-3 !py-2 !text-[10px]"
                aria-label={t.financeCard.calculate}
              >
                →
              </button>
            </div>
            {belowMinimum ? (
              <p className="mt-2 text-xs text-amber-700">
                {formatMessage(t.financeCard.minDownPayment, {
                  amount: formatFinanceAmount(minimumDown),
                })}
              </p>
            ) : null}
          </dd>
        </div>

        <div>
          <dt className="mb-2 text-slate-warm">{t.financeCard.term}</dt>
          <dd className="flex flex-wrap gap-2">
            {FINANCING_TERMS.map((years) => (
              <label
                key={years}
                className={`cursor-pointer rounded-sm border px-2.5 py-1.5 text-xs font-medium transition ${
                  termYears === years
                    ? "border-gold bg-gold/10 text-charcoal"
                    : "border-charcoal/10 text-slate-warm hover:border-gold/40"
                }`}
              >
                <input
                  type="radio"
                  name={`term-${lender.id}`}
                  value={years}
                  checked={termYears === years}
                  onChange={() => setTermYears(years)}
                  className="sr-only"
                />
                {formatMessage(t.financeCard.years, { n: years })}
              </label>
            ))}
          </dd>
        </div>
      </dl>

      <div className="mt-auto space-y-3 border-t border-charcoal/8 pt-4">
        <div className="flex items-end justify-between gap-3 text-sm">
          <span className="text-slate-warm">{t.financeCard.bankPayment}</span>
          <span className="font-medium text-charcoal">
            {formatFinanceAmount(payment.bankPayment)}
          </span>
        </div>

        {lender.monthlyInsurance ? (
          <div className="flex items-end justify-between gap-3 text-sm">
            <span className="text-slate-warm">{t.financeCard.insurance}</span>
            <span className="font-medium text-charcoal">
              + {formatFinanceAmount(payment.insurance)}
            </span>
          </div>
        ) : null}

        <div className="rounded-sm bg-cream/80 px-3 py-3">
          <p className="text-xs uppercase tracking-wide text-slate-warm">{t.financeCard.monthlyPayment}</p>
          <p className="font-display mt-1 text-3xl font-semibold text-gold">
            {formatFinanceAmount(payment.total)}
          </p>
        </div>
      </div>
    </article>
  );
}
