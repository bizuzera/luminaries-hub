import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Library, Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChartWheel } from "@/components/astro/ChartWheel";
import { charts } from "@/data/mockData";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/mapas")({
  head: () => ({
    meta: [
      { title: "Banco de Mapas — Casos reais para estudo | Pallas Academy" },
      {
        name: "description",
        content:
          "Biblioteca de mapas natais de personalidades com posições planetárias completas e notas de estudo.",
      },
      { property: "og:title", content: "Banco de Mapas — Pallas Academy" },
      {
        property: "og:description",
        content: "Busque por nome, posição planetária ou configuração e pratique interpretação.",
      },
    ],
  }),
  component: MapasPage,
});

const quickFilters = ["Sol na Casa 10", "Lua em Touro", "Jyotish", "Saturno Retrógrado"];

function MapasPage() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(charts[0]!.id);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return charts;
    return charts.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q)) ||
        c.positions.some(
          (p) =>
            `${p.planet} ${p.sign} casa ${p.house}`.toLowerCase().includes(q) ||
            (q.includes("retr") && p.retrograde),
        ),
    );
  }, [query]);

  const selected = charts.find((c) => c.id === selectedId)!;

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs text-primary">
        <Library className="size-3" /> Banco de Mapas
      </span>
      <h1 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
        Biblioteca de <span className="text-gradient-solar">casos reais</span>
      </h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Estude mapas de personalidades com posições completas, notas do corpo docente e
        sugestões de exercício.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Buscar: "Sol na Casa 10", "Saturno Retrógrado", nome...'
            className="pl-9"
          />
        </div>
        {quickFilters.map((f) => (
          <button
            key={f}
            onClick={() => setQuery(f)}
            className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.35fr_1fr]">
        <div className="surface-panel overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Nascimento</TableHead>
                <TableHead>Local</TableHead>
                <TableHead>Sistema</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((c) => (
                <TableRow
                  key={c.id}
                  onClick={() => setSelectedId(c.id)}
                  className={cn(
                    "cursor-pointer",
                    c.id === selectedId && "bg-primary/10 hover:bg-primary/10",
                  )}
                >
                  <TableCell className="font-medium">{c.name}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {c.birthDate} · {c.birthTime}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{c.city}</TableCell>
                  <TableCell className="text-primary">
                    {c.system === "tropical" ? "Tropical" : "Sideral"}
                  </TableCell>
                </TableRow>
              ))}
              {!filtered.length && (
                <TableRow>
                  <TableCell colSpan={4} className="py-10 text-center text-muted-foreground">
                    Nenhum mapa encontrado para esta busca.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <motion.div
          key={selected.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="surface-panel p-6"
        >
          <h2 className="font-display text-xl font-semibold">{selected.name}</h2>
          <p className="text-sm text-muted-foreground">
            {selected.birthDate} · {selected.birthTime} · {selected.city}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {selected.tags.map((t) => (
              <Badge key={t} variant="outline" className="border-border text-xs text-primary">
                {t}
              </Badge>
            ))}
          </div>

          <div className="mt-6">
            <ChartWheel positions={selected.positions} />
          </div>

          <div className="mt-6 rounded-xl border border-border bg-background/40 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">
              Notas de estudo
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{selected.notes}</p>
          </div>

          <div className="mt-6 max-h-72 overflow-auto rounded-xl border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Planeta</TableHead>
                  <TableHead>Signo</TableHead>
                  <TableHead>Grau</TableHead>
                  <TableHead>Casa</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selected.positions.map((p) => (
                  <TableRow key={p.planet}>
                    <TableCell className="font-medium">
                      {p.planet}
                      {p.retrograde && <span className="ml-1 text-xs text-primary">R</span>}
                    </TableCell>
                    <TableCell className="text-primary">{p.sign}</TableCell>
                    <TableCell className="text-muted-foreground">{p.degree}</TableCell>
                    <TableCell className="text-muted-foreground">{p.house}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
