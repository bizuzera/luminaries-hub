import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, PlayCircle, Sparkles, Telescope } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CourseCard } from "@/components/courses/CourseCard";
import { categoryLabels, courses, learningTracks, seniorityLabels } from "@/data/mockData";
import type { CourseCategory, Seniority } from "@/types/astrology";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pallas Academy — Trilhas de Astrologia Ocidental e Védica" },
      {
        name: "description",
        content:
          "Dashboard de estudos da Pallas Academy: trilhas, cursos com certificado e ferramentas de cálculo astrológico.",
      },
      { property: "og:title", content: "Pallas Academy — Escola de Astrologia" },
      {
        property: "og:description",
        content: "Trilhas de formação, Astro-Tools e Banco de Mapas para astrólogos.",
      },
    ],
  }),
  component: Dashboard,
});

const filters: ({ id: "todos" } | { id: Seniority })[] = [
  { id: "todos" },
  { id: "iniciante" },
  { id: "intermediario" },
  { id: "avancado" },
];

function Dashboard() {
  const [filter, setFilter] = useState<"todos" | Seniority>("todos");
  const mainTrack = learningTracks[0]!;

  const visible = courses.filter((c) => filter === "todos" || c.level === filter);
  const categories = Object.keys(categoryLabels) as CourseCategory[];

  return (
    <main>
      {/* Hero */}
      <section className="starfield border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1.25fr_1fr] lg:items-center lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs text-primary">
              <Sparkles className="size-3" />
              Trilha de Formação em destaque
            </span>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-tight sm:text-5xl">
              Do Zero ao <span className="text-gradient-solar">Astrólogo Profissional</span>
            </h1>
            <p className="mt-4 max-w-xl text-muted-foreground">{mainTrack.description}</p>

            <div className="mt-8 max-w-md">
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-muted-foreground">Seu progresso na trilha</span>
                <span className="font-medium text-primary">{mainTrack.progress}%</span>
              </div>
              <Progress value={mainTrack.progress} className="h-2" />
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="bg-gradient-solar text-primary-foreground hover:opacity-90"
              >
                <Link to="/curso/$slug" params={{ slug: mainTrack.courseSlugs[0]! }}>
                  <PlayCircle className="mr-1 size-4" /> Continuar Trilha
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/astro-tools">
                  <Telescope className="mr-1 size-4" /> Abrir Astro-Tools
                </Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="surface-panel glow-violet p-6"
          >
            <p className="font-display text-sm font-semibold">Suas trilhas ativas</p>
            <div className="mt-4 space-y-4">
              {learningTracks.map((t) => (
                <div key={t.id} className="rounded-xl border border-border bg-background/40 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium">{t.title}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {seniorityLabels[t.level]} · {t.courseSlugs.length} cursos
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-primary">{t.progress}%</span>
                  </div>
                  <Progress value={t.progress} className="mt-3 h-1.5" />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filtros */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => {
            const label = f.id === "todos" ? "Todos" : seniorityLabels[f.id];
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm transition-all",
                  active
                    ? "border-transparent bg-gradient-solar font-medium text-primary-foreground"
                    : "border-border text-muted-foreground hover:text-foreground",
                )}
              >
                {label}
              </button>
            );
          })}
        </div>

        {categories.map((cat) => {
          const list = visible.filter((c) => c.category === cat);
          if (!list.length) return null;
          return (
            <div key={cat} className="mt-12">
              <div className="mb-5 flex items-end justify-between">
                <h2 className="font-display text-xl font-semibold">{categoryLabels[cat]}</h2>
                <Link
                  to="/planos"
                  className="flex items-center gap-1 text-sm text-primary hover:underline"
                >
                  Ver planos <ArrowRight className="size-3.5" />
                </Link>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}
