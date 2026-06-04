"use client";

import { useState } from "react";
import FormSuccess from "./FormSuccess";

export default function SellPropertyForm() {
  const [sent, setSent] = useState(false);

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
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-charcoal/80">
          Correo
        </label>
        <input id="email" name="email" type="email" required className="input-field rounded-sm" />
      </div>
      <div>
        <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-charcoal/80">
          Número
        </label>
        <input id="phone" name="phone" type="tel" required className="input-field rounded-sm" />
      </div>
      <div>
        <label htmlFor="location" className="mb-1.5 block text-sm font-medium text-charcoal/80">
          ¿Dónde se encuentra la propiedad?
        </label>
        <input
          id="location"
          name="location"
          required
          className="input-field rounded-sm"
          placeholder="Provincia, cantón, distrito o dirección aproximada"
        />
      </div>
      <div>
        <label htmlFor="price" className="mb-1.5 block text-sm font-medium text-charcoal/80">
          Precio estimado (USD o CRC)
        </label>
        <input id="price" name="price" required className="input-field rounded-sm" placeholder="Ej. $350,000" />
      </div>
      <div>
        <label htmlFor="negotiable" className="mb-1.5 block text-sm font-medium text-charcoal/80">
          ¿Precio negociable?
        </label>
        <select id="negotiable" name="negotiable" required className="input-field rounded-sm">
          <option value="">Seleccioná una opción</option>
          <option value="si">Sí, es negociable</option>
          <option value="no">No, precio fijo</option>
          <option value="parcial">Parcialmente negociable</option>
        </select>
      </div>
      <button type="submit" className="btn-gold w-full justify-center rounded-sm">
        Enviar solicitud
      </button>
    </form>
  );
}
