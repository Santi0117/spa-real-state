/** Plano SVG de lotes — estilo mapa interactivo (como CoverageMap) */

export const lotMapViewBox = "0 0 920 520";

export type LotMapShape = {
  path: string;
  labelX: number;
  labelY: number;
};

function lotRect(x: number, y: number, w: number, h: number, leftSlant = 0): string {
  if (leftSlant === 0) {
    return `M ${x} ${y} L ${x + w} ${y} L ${x + w} ${y + h} L ${x} ${y + h} Z`;
  }
  return `M ${x} ${y} L ${x + w} ${y} L ${x + w} ${y + h} L ${x - leftSlant} ${y + h} Z`;
}

const W = 196;
const H = 116;
const G = 14;
const X0 = 48;
const col = (i: number) => X0 + i * (W + G);
const ROW = { A: 36, B: 196, C: 356 } as const;

function gridLot(
  row: keyof typeof ROW,
  column: 0 | 1 | 2 | 3,
  leftSlant = 0
): LotMapShape {
  const x = col(column);
  const y = ROW[row];
  return {
    path: lotRect(x, y, W, H, leftSlant),
    labelX: x + W / 2,
    labelY: y + H / 2 + 5,
  };
}

export const lotMapShapes: Record<string, LotMapShape> = {
  "lote-a1": gridLot("A", 0, 14),
  "lote-a2": gridLot("A", 1),
  "lote-a3": gridLot("A", 2),
  "lote-a4": gridLot("A", 3),
  "lote-b1": gridLot("B", 0, 12),
  "lote-b2": gridLot("B", 1),
  "lote-b3": gridLot("B", 2),
  "lote-b4": gridLot("B", 3),
  "lote-c1": gridLot("C", 0),
  "lote-c2": gridLot("C", 1),
  "lote-c3": gridLot("C", 2),
  "lote-c4": gridLot("C", 3),
};

export const lotMapRoads = [
  { x: 36, y: 160, width: 848, height: 22 },
  { x: 36, y: 320, width: 848, height: 22 },
] as const;

export const lotMapAmenities = {
  clubHouse: {
    path: "M 758 36 L 884 36 L 884 128 L 758 128 Z",
    labelX: 821,
    labelY: 88,
    label: "Club house",
  },
} as const;

export function getLotMapShape(lotId: string): LotMapShape | undefined {
  return lotMapShapes[lotId];
}
