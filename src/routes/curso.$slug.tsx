import { useMemo, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import {
  Award,
  CheckCircle2,
  Circle,
  Clock,
  FileText,
  MessageCircle,
  Play,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { categoryLabels, courses, getCourseBySlug, seniorityLabels } from "@/data/mockData";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/curso/$slug")({
  loader: ({ params }) => {
    const course = getCourseBySlug(params.slug);
    if (!course) throw notFound();
    return { course };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Curso não encontrado | Pallas Academy" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { course } = loaderData;
    return {
      meta: [
        { title: `${course.title} | Pallas Academy` },
        { name: "description", content: course.description },
        { property: "og:title", content: course.title },
        { property: "og:description", content: course.description },
      ],
    };
  },
  component: LessonPlayer,
});

const communityThreads = [
  {
    author: "Bruna R.",
    time: "há 2 dias",
    text: "Fiquei em dúvida no cálculo do Ascendente para nascimentos próximos à meia-noite. Alguém tem um exemplo?",
    replies: 4,
  },
  {
    author: "Prof. Helena Moraes",
    time: "há 1 dia",
    text: "Ótima pergunta. Use sempre o horário local convertido para TU antes de calcular — postei a planilha nos materiais.",
    replies: 2,
  },
  {
    author: "Diego M.",
    time: "há 6 horas",
    text: "Pratiquei com o mapa da Frida no Banco de Mapas e a Casa 10 ficou clara. Recomendo o exercício!",
    replies: 1,
  },
];

function LessonPlayer() {
  const { course } = Route.useLoaderData();
  const allLessons = useMemo(() => course.modules.flatMap((m) => m.lessons), [course]);
  const [doneIds, setDoneIds] = useState<string[]>(() =>
    allLessons.filter((l) => l.completed).map((l) => l.id),
  );
  const [activeId, setActiveId] = useState(allLessons[0]!.id);

  const active = allLessons.find((l) => l.id === activeId)!;
  const progress = Math.round((doneIds.length / allLessons.length) * 100);

  const toggle = (id: string) =>
    setDoneIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-primary">
          Dashboard
        </Link>
        <span>/</span>
        <span className="text-primary">{categoryLabels[course.category]}</span>
      </div>
      <h1 className="mt-3 font-display text-2xl font-semibold sm:text-3xl">{course.title}</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {course.instructor} · {seniorityLabels[course.level]} · {course.hours}h
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_340px]">
        <div>
          {/* Player */}
          <motion.div
            key={active.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="surface-panel starfield relative flex aspect-video items-center justify-center overflow-hidden"
          >
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="flex size-20 items-center justify-center rounded-full bg-gradient-solar glow-solar"
              aria-label="Reproduzir aula"
            >
              <Play className="size-8 text-primary-foreground" />
            </motion.button>
            <div className="absolute inset-x-0 bottom-0 bg-background/70 p-4 backdrop-blur">
              <p className="text-sm font-medium">{active.title}</p>
              <div className="mt-2 h-1 w-full rounded-full bg-secondary">
                <div className="h-1 w-1/3 rounded-full bg-gradient-solar" />
              </div>
            </div>
          </motion.div>

          {/* Abas inferiores */}
          <Tabs defaultValue="visao" className="mt-6">
            <TabsList className="bg-background/50">
              <TabsTrigger value="visao">Visão Geral & Ementa</TabsTrigger>
              <TabsTrigger value="materiais">Materiais</TabsTrigger>
              <TabsTrigger value="comunidade">Comunidade</TabsTrigger>
            </TabsList>

            <TabsContent value="visao" className="surface-panel mt-4 p-6">
              <h2 className="font-display text-lg font-semibold">{active.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{active.summary}</p>
              <p className="mt-4 text-sm text-muted-foreground">{course.description}</p>
              <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="size-3" /> {active.duration}
                </span>
                <span>{course.modules.length} módulos</span>
                <span>{allLessons.length} aulas</span>
              </div>
            </TabsContent>

            <TabsContent value="materiais" className="surface-panel mt-4 p-6">
              <ul className="space-y-3">
                {active.materials.map((m) => (
                  <li
                    key={m.label}
                    className="flex items-center justify-between rounded-xl border border-border bg-background/40 p-4"
                  >
                    <span className="flex items-center gap-3 text-sm">
                      <FileText className="size-4 text-primary" />
                      {m.label}
                    </span>
                    <Button size="sm" variant="outline">
                      Baixar
                    </Button>
                  </li>
                ))}
              </ul>
            </TabsContent>

            <TabsContent value="comunidade" className="surface-panel mt-4 p-6">
              <div className="space-y-4">
                {communityThreads.map((t) => (
                  <div
                    key={t.text}
                    className="rounded-xl border border-border bg-background/40 p-4"
                  >
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">{t.author}</span>
                      <span>{t.time}</span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{t.text}</p>
                    <p className="mt-3 flex items-center gap-1 text-xs text-primary">
                      <MessageCircle className="size-3" /> {t.replies} respostas
                    </p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <aside className="space-y-5">
          <div className="surface-panel p-5">
            <div className="mb-1 flex justify-between text-sm">
              <span className="text-muted-foreground">Progresso do curso</span>
              <span className="font-medium text-primary">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="surface-panel max-h-[520px] overflow-auto p-5">
            <p className="font-display text-sm font-semibold">Conteúdo do curso</p>
            <div className="mt-4 space-y-5">
              {course.modules.map((m) => (
                <div key={m.id}>
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                    {m.title}
                  </p>
                  <ul className="mt-2 space-y-1">
                    {m.lessons.map((l) => {
                      const done = doneIds.includes(l.id);
                      return (
                        <li key={l.id}>
                          <div
                            className={cn(
                              "flex items-start gap-2 rounded-lg p-2 transition-colors",
                              l.id === activeId ? "bg-secondary" : "hover:bg-secondary/60",
                            )}
                          >
                            <button
                              onClick={() => toggle(l.id)}
                              aria-label="Marcar como concluída"
                              className="mt-0.5"
                            >
                              {done ? (
                                <CheckCircle2 className="size-4 text-primary" />
                              ) : (
                                <Circle className="size-4 text-muted-foreground" />
                              )}
                            </button>
                            <button
                              onClick={() => setActiveId(l.id)}
                              className="flex-1 text-left"
                            >
                              <span
                                className={cn(
                                  "text-sm",
                                  done && "text-muted-foreground line-through",
                                )}
                              >
                                {l.title}
                              </span>
                              <span className="block text-xs text-muted-foreground">
                                {l.duration}
                              </span>
                            </button>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="surface-panel glow-solar border-primary/40 p-5"
            >
              <Award className="size-5 text-primary" />
              <p className="mt-2 text-sm font-medium">
                Ao concluir esta trilha, seu Certificado de Formação em Astrologia será
                liberado automaticamente.
              </p>
              <Button asChild variant="outline" size="sm" className="mt-4 w-full">
                <Link to="/planos">Ver requisitos do certificado</Link>
              </Button>
            </motion.div>
          </AnimatePresence>

          <div className="surface-panel p-5">
            <p className="font-display text-sm font-semibold">Continue estudando</p>
            <ul className="mt-3 space-y-2">
              {courses
                .filter((c) => c.category === course.category && c.id !== course.id)
                .slice(0, 3)
                .map((c) => (
                  <li key={c.id}>
                    <Link
                      to="/curso/$slug"
                      params={{ slug: c.slug }}
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      {c.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </aside>
      </div>
    </main>
  );
}
