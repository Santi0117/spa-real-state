"use client";

import { useState } from "react";
import FormSuccess from "./FormSuccess";

export default function BuildHouseForm() {
  const [sent, setSent] = useState(false);
  const [hasLot, setHasLot] = useState("");

  if (sent) return <FormSuccess />;

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="mb-1.5 block text-sm font-medium text-charcoal/80">
            Nombre
          </label>
          <input id="firstName" name="firstName" required className="input-field rounded-sm" />
        </div>
        <div>
          <label htmlFor="lastName" className="mb-1.5 block text-sm font-medium text-charcoal/80">
            Apellido
          </label>
          <input id="lastName" name="lastName" required className="input-field rounded-sm" />
        </div>
      </div>
      <div>
        <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-charcoal/80">
          Número
        </label>
        <input id="phone" name="phone" type="tel" required className="input-field rounded-sm" />
      </div>
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-charcoal/80">
          Correo
        </label>
        <input id="email" name="email" type="email" required className="input-field rounded-sm" />
      </div>
      <div>
        <p className="mb-2 text-sm font-medium text-charcoal/80">¿Ya tiene lote?</p>
        <div className="flex flex-wrap gap-4">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-charcoal">
            <input
              type="radio"
              name="hasLot"
              value="si"
              required
              checked={hasLot === "si"}
              onChange={() => setHasLot("si")}
              className="accent-gold"
            />
            Sí, ya tengo lote
          </label>
          <label className="flex cursor-pointer items-center gap-2 text-sm text-charcoal">
            <input
              type="radio"
              name="hasLot"
              value="no"
              checked={hasLot === "no"}
              onChange={() => setHasLot("no")}
              className="accent-gold"
            />
            No, aún no tengo lote
          </label>
        </div>
      </div>
      <div className="rounded-sm border border-charcoal/10 bg-cream/40 p-4">
        <label className="flex cursor-pointer items-start gap-3 text-sm text-charcoal">
          <input type="checkbox" name="findLot" value="si" className="mt-1 accent-gold" />
          <span>
            <span className="font-medium">Opcional:</span> me gustaría que Jopa me ayude a buscar lote
          </span>
        </label>
      </div>
      <div>
        <label htmlFor="budget" className="mb-1.5 block text-sm font-medium text-charcoal/80">
          Presupuesto estimado
        </label>
        <input
          id="budget"
          name="budget"
          required
          className="input-field rounded-sm"
          placeholder="Construcción + lote si aplica"
        />
      </div>
      <button type="submit" className="btn-gold w-full justify-center rounded-sm">
        Enviar consulta
      </button>
    </form>
  );
}
