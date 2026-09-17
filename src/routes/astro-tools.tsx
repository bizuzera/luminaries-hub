import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Calculator, Globe2, Moon, Sparkles, Timer, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartWheel } from "@/components/astro/ChartWheel";
import { charts, dashaTimeline, gunaScores } from "@/data/mockData";
import type { PlanetPosition } from "@/types/astrology";
import { cn } from "@/lib/utils";

type Search = { tab?: string | undefined };

export const Route = createFileRoute("/astro-tools")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    tab: typeof search["tab"] === "string" ? search["tab"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Astro-Tools — Mapa Natal, Sinastria e Dashas | Pallas Academy" },
      {
        name: "description",
        content:
          "Painel de cálculo astrológico: mapa natal tropical e sideral, sinastria com 36 Gunas, mapa dracônico e linha do tempo de Dashas.",
      },
      { property: "og:title", content: "Astro-Tools — Pallas Academy" },
      {
        property: "og:description",
        content: "Ferramentas técnicas de cálculo astrológico ocidental e védico.",
      },
    ],
  }),
  component: AstroTools,
});

const SIGNS = [
  "Áries",
  "Touro",
  "Gêmeos",
  "Câncer",
  "Leão",
  "Virgem",
  "Libra",
  "Escorpião",
  "Sagitário",
  "Capricórnio",
  "Aquário",
  "Peixes",
];

const PLANETS = [
  "Sol",
  "Lua",
  "Mercúrio",
  "Vênus",
  "Marte",
  "Júpiter",
  "Saturno",
  "Urano",
  "Netuno",
  "Plutão",
  "Nodo Norte",
];

function hashString(value: string) {
  let h = 0;
  for (let i = 0; i < value.length; i++) h = (h * 31 + value.charCodeAt(i)) % 100000;
  return h;
}

function computeChart(
  name: string,
  date: string,
  time: string,
  city: string,
  system: "tropical" | "sideral",
): PlanetPosition[] {
  const seed = hashString(`${name}${date}${time}${city}${system}`);
  const offset = system === "sideral" ? 24 : 0;
  return PLANETS.map((planet, i) => {
    const raw = (seed + i * 37) % 360;
    const shifted = (raw - offset + 360) % 360;
    return {
      planet,
      sign: SIGNS[Math.floor(shifted / 30)]!,
      degree: `${String(Math.floor(shifted % 30)).padStart(2, "0")}°${String(
        (seed + i * 13) % 60,
      ).padStart(2, "0")}'`,
      house: ((seed + i * 5) % 12) + 1,
      retrograde: (seed + i) % 7 === 0,
    };
  });
}

function AstroTools() {
  const { tab } = Route.useSearch();
  const [system, setSystem] = useState<"tropical" | "sideral">("tropical");
  const [form, setForm] = useState({
    name: "Alexia Vilar",
    date: "1994-03-21",
    time: "14:35",
    city: "São Paulo, BR",
  });
  const [result, setResult] = useState<PlanetPosition[]>(() =>
    computeChart("Alexia Vilar", "1994-03-21", "14:35", "São Paulo, BR", "tropical"),
  );

  const generate = () =>
    setResult(computeChart(form.name, form.date, form.time, form.city, system));

  const gunaTotal = gunaScores.reduce((s, g) => s + g.points, 0);

  const draconic = result.map((p, i) => ({
    ...p,
    sign: SIGNS[(SIGNS.indexOf(p.sign) + 5 + i * 0) % 12]!,
  }));

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs text-primary">
            <Calculator className="size-3" /> Astro-Tools
          </span>
          <h1 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
            Painel de <span className="text-gradient-solar">cálculo astrológico</span>
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Gere mapas natais nos zodíacos Tropical e Sideral (Lahiri), compare sinastrias,
            calcule o mapa dracônico e acompanhe as Dashas védicas.
          </p>
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[360px_1fr]">
        {/* Formulário */}
        <div className="surface-panel h-fit p-6">
          <p className="font-display text-sm font-semibold">Dados de nascimento</p>
          <div className="mt-5 space-y-4">
            <Field label="Nome">
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </Field>
            <Field label="Data de nascimento">
              <Input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
            </Field>
            <Field label="Hora exata">
              <Input
                type="time"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
              />
            </Field>
            <Field label="Cidade">
              <Input
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
              />
            </Field>

            <div>
              <Label className="text-xs text-muted-foreground">Sistema zodiacal</Label>
              <div className="mt-2 grid grid-cols-2 gap-2 rounded-xl border border-border bg-background/50 p-1">
                {(
                  [
                    { id: "tropical", label: "Tropical", icon: Globe2 },
                    { id: "sideral", label: "Sideral (Lahiri)", icon: Moon },
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSystem(opt.id)}
                    className={cn(
                      "flex items-center justify-center gap-1.5 rounded-lg px-2 py-2 text-xs transition-all",
                      system === opt.id
                        ? "bg-gradient-solar font-medium text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <opt.icon className="size-3.5" />
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <Button
              onClick={generate}
              className="w-full bg-gradient-solar text-primary-foreground hover:opacity-90"
            >
              <Sparkles className="mr-1 size-4" /> Gerar Mapa
            </Button>
          </div>
        </div>

        {/* Resultado */}
        <div className="surface-panel p-6">
          <Tabs defaultValue={tab ?? "natal"}>
            <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1 bg-background/50">
              <TabsTrigger value="natal">Mapa Natal</TabsTrigger>
              <TabsTrigger value="sinastria">Sinastria & Kundali</TabsTrigger>
              <TabsTrigger value="draconico">Mapa Dracônico</TabsTrigger>
              <TabsTrigger value="dashas">Dashas</TabsTrigger>
            </TabsList>

            <TabsContent value="natal">
              <AnimatePresence mode="wait">
                <motion.div
                  key={result[0]?.degree}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid gap-8 pt-6 lg:grid-cols-[320px_1fr]"
                >
                  <div>
                    <ChartWheel positions={result} />
                    <p className="mt-3 text-center text-xs text-muted-foreground">
                      {form.name} · {form.city} ·{" "}
                      {system === "tropical" ? "Zodíaco Tropical" : "Zodíaco Sideral (Lahiri)"}
                    </p>
                  </div>
                  <PositionsTable positions={result} />
                </motion.div>
              </AnimatePresence>
            </TabsContent>

            <TabsContent value="sinastria" className="pt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-xl border border-border bg-background/40 p-4">
                  <p className="text-sm font-medium">Mapa A — {form.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {form.date} · {form.time} · {form.city}
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-background/40 p-4">
                  <p className="text-sm font-medium">Mapa B — Convidado</p>
                  <p className="text-xs text-muted-foreground">
                    12/11/1991 · 09:20 · Belo Horizonte, BR
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-6 md:grid-cols-[260px_1fr]">
                <div className="surface-panel flex flex-col items-center justify-center p-6 text-center">
                  <Users className="size-5 text-primary" />
                  <p className="mt-3 font-display text-4xl font-semibold text-gradient-solar">
                    {gunaTotal}/36
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">Guna Milan (Ashta Koota)</p>
                  <Progress value={(gunaTotal / 36) * 100} className="mt-4 h-2" />
                  <p className="mt-3 text-xs text-muted-foreground">
                    Compatibilidade alta — analisar Bhakoot dosha em consulta.
                  </p>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Koota</TableHead>
                      <TableHead>Pontos</TableHead>
                      <TableHead>Máximo</TableHead>
                      <TableHead>Nível</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {gunaScores.map((g) => (
                      <TableRow key={g.koota}>
                        <TableCell className="font-medium">{g.koota}</TableCell>
                        <TableCell className="text-primary">{g.points}</TableCell>
                        <TableCell className="text-muted-foreground">{g.max}</TableCell>
                        <TableCell className="w-40">
                          <Progress value={(g.points / g.max) * 100} className="h-1.5" />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="draconico" className="pt-6">
              <p className="text-sm text-muted-foreground">
                Mapa recalculado com o Nodo Norte posicionado em 0° de Áries — as posições
                abaixo descrevem a camada de alma por trás da personalidade.
              </p>
              <div className="mt-6 grid gap-8 lg:grid-cols-[320px_1fr]">
                <ChartWheel positions={draconic} />
                <PositionsTable positions={draconic} />
              </div>
            </TabsContent>

            <TabsContent value="dashas" className="pt-6">
              <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                <Timer className="size-4 text-primary" />
                Linha do tempo Vimshottari Dasha (120 anos)
              </div>
              <div className="space-y-3">
                {dashaTimeline.map((d) => (
                  <motion.div
                    key={d.planet}
                    whileHover={{ x: 4 }}
                    className={cn(
                      "flex flex-wrap items-center gap-4 rounded-xl border p-4",
                      d.current
                        ? "border-primary/50 bg-primary/5 glow-solar"
                        : "border-border bg-background/40",
                    )}
                  >
                    <div className="w-44">
                      <p className="font-display text-sm font-semibold">{d.planet}</p>
                      <p className="text-xs text-muted-foreground">
                        {d.start} – {d.end} · {d.years} anos
                      </p>
                    </div>
                    <p className="flex-1 text-sm text-muted-foreground">{d.theme}</p>
                    {d.current && (
                      <Badge className="border-0 bg-gradient-solar text-primary-foreground">
                        Período atual
                      </Badge>
                    )}
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <p className="mt-8 text-xs text-muted-foreground">
        Os cálculos desta área são simulados para fins didáticos, com base no acervo de{" "}
        {charts.length} mapas do Banco de Mapas da escola.
      </p>
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}

function PositionsTable({ positions }: { positions: PlanetPosition[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Planeta</TableHead>
          <TableHead>Signo</TableHead>
          <TableHead>Grau</TableHead>
          <TableHead>Casa</TableHead>
          <TableHead>Mov.</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {positions.map((p) => (
          <TableRow key={p.planet}>
            <TableCell className="font-medium">{p.planet}</TableCell>
            <TableCell className="text-primary">{p.sign}</TableCell>
            <TableCell className="text-muted-foreground">{p.degree}</TableCell>
            <TableCell className="text-muted-foreground">{p.house}</TableCell>
            <TableCell className="text-xs text-muted-foreground">
              {p.retrograde ? "Retrógrado" : "Direto"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
