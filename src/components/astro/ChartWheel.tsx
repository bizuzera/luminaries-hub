import { motion } from "motion/react";
import type { PlanetPosition } from "@/types/astrology";

const glyphs: Record<string, string> = {
  Sol: "☉",
  "Surya (Sol)": "☉",
  Lua: "☽",
  "Chandra (Lua)": "☽",
  "Mercúrio": "☿",
  "Budha (Mercúrio)": "☿",
  "Vênus": "♀",
  "Shukra (Vênus)": "♀",
  Marte: "♂",
  "Mangala (Marte)": "♂",
  "Júpiter": "♃",
  "Guru (Júpiter)": "♃",
  Saturno: "♄",
  "Shani (Saturno)": "♄",
  Urano: "♅",
  Netuno: "♆",
  "Plutão": "♇",
  "Nodo Norte": "☊",
  Rahu: "☊",
  Ketu: "☋",
};

const rnd = (n: number) => Math.round(n * 1000) / 1000;

export function ChartWheel({ positions }: { positions: PlanetPosition[] }) {
  const size = 320;
  const c = size / 2;

  return (
    <motion.svg
      key={positions.map((p) => p.degree).join("")}
      initial={{ opacity: 0, rotate: -8, scale: 0.95 }}
      animate={{ opacity: 1, rotate: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewBox={`0 0 ${size} ${size}`}
      className="mx-auto w-full max-w-[340px]"
      role="img"
      aria-label="Roda astrológica"
    >
      <circle cx={c} cy={c} r={150} className="fill-none stroke-border" strokeWidth={1} />
      <circle cx={c} cy={c} r={120} className="fill-none stroke-border" strokeWidth={1} />
      <circle cx={c} cy={c} r={70} className="fill-none stroke-border" strokeWidth={1} />

      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i * 30 * Math.PI) / 180;
        const houseAngle = ((i * 30 + 15) * Math.PI) / 180;
        return (
          <g key={i}>
            <line
              x1={rnd(c + 70 * Math.cos(a))}
              y1={rnd(c + 70 * Math.sin(a))}
              x2={rnd(c + 150 * Math.cos(a))}
              y2={rnd(c + 150 * Math.sin(a))}
              className="stroke-border"
              strokeWidth={1}
            />
            <text
              x={rnd(c + 135 * Math.cos(houseAngle))}
              y={rnd(c + 135 * Math.sin(houseAngle))}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-muted-foreground text-[9px]"
            >
              {i + 1}
            </text>
          </g>
        );
      })}

      {positions.map((p, i) => {
        const angle = ((i * (360 / positions.length) - 90) * Math.PI) / 180;
        const r = 95;
        return (
          <motion.g
            key={p.planet}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 + i * 0.05 }}
          >
            <circle
              cx={c + r * Math.cos(angle)}
              cy={c + r * Math.sin(angle)}
              r={13}
              className="fill-secondary stroke-primary/40"
            />
            <text
              x={c + r * Math.cos(angle)}
              y={c + r * Math.sin(angle)}
              textAnchor="middle"
              dominantBaseline="central"
              className="fill-primary text-[12px]"
            >
              {glyphs[p.planet] ?? "•"}
            </text>
          </motion.g>
        );
      })}

      <circle cx={c} cy={c} r={4} className="fill-primary" />
    </motion.svg>
  );
}
