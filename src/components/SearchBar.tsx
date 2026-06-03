"use client";

import { useState } from "react";
import { zones } from "@/lib/properties";

const types = ["Todos", "Casa", "Apartamento", "Terreno", "Penthouse"];

export default function SearchBar() {
  const [type, setType] = useState("Todos");
  const [zone, setZone] = useState("Todas");

  return (
    <form
      action="#listings"
      className="mx-auto w-full max-w-4xl rounded-sm bg-white p-2 shadow-2xl shadow-black/20 sm:p-3"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="grid gap-2 sm:grid-cols-4">
        <div className="sm:col-span-1">
          <label htmlFor="search-type" className="mb-1 block px-2 text-[10px] font-semibold uppercase tracking-wider text-slate-warm">
            Tipo
          </label>
          <select
            id="search-type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="input-field rounded-sm"
          >
            {types.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-1">
          <label htmlFor="search-zone" className="mb-1 block px-2 text-[10px] font-semibold uppercase tracking-wider text-slate-warm">
            Zona
          </label>
          <select
            id="search-zone"
            value={zone}
            onChange={(e) => setZone(e.target.value)}
            className="input-field rounded-sm"
          >
            {zones.map((z) => (
              <option key={z} value={z}>{z}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-1">
          <label htmlFor="search-status" className="mb-1 block px-2 text-[10px] font-semibold uppercase tracking-wider text-slate-warm">
            Operación
          </label>
          <select id="search-status" className="input-field rounded-sm">
            <option>Venta</option>
            <option>Alquiler</option>
            <option>Ambos</option>
          </select>
        </div>
        <div className="flex items-end sm:col-span-1">
          <a href="#listings" className="btn-gold w-full justify-center rounded-sm py-3.5">
            Buscar
          </a>
        </div>
      </div>
    </form>
  );
}
