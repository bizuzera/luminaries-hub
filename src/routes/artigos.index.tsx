import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Clock, Newspaper } from "lucide-react";

import { articles } from "@/data/mockData";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/artigos/")({
  head: () => ({
    meta: [
      { title: "Artigos & Estudo — Portal técnico | Pallas Academy" },
      {
        name: "description",
        content:
          "Artigos técnicos sobre Astrologia Védica, Sinastria, Previsões, Dracônica e carreira em astrologia.",
      },
      { property: "og:title", content: "Artigos & Estudo — Pallas Academy" },
      {
        property: "og:description",
        content: "Conteúdo técnico e ético para estudantes e astrólogos profissionais.",
      },
    ],
  }),
  component: ArtigosPage,
});

const allTags = Array.from(new Set(articles.flatMap((a) => a.tags)));

function ArtigosPage() {
  const [tag, setTag] = useState<string | null>(null);
  const list = tag ? articles.filter((a) => a.tags.includes(tag)) : articles;

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs text-primary">
        <Newspaper className="size-3" /> Portal de conteúdo
      </span>
      <h1 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
        Artigos & <span className="text-gradient-solar">Estudo</span>
      </h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Textos técnicos escritos pelo corpo docente da escola, com fontes clássicas e
        aplicação prática em consulta.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        <button
          onClick={() => setTag(null)}
          className={cn(
            "rounded-full border px-4 py-1.5 text-sm transition-all",
            !tag
              ? "border-transparent bg-gradient-solar font-medium text-primary-foreground"
              : "border-border text-muted-foreground hover:text-foreground",
          )}
        >
          Todos
        </button>
        {allTags.map((t) => (
          <button
            key={t}
            onClick={() => setTag(t)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm transition-all",
              tag === t
                ? "border-transparent bg-gradient-solar font-medium text-primary-foreground"
                : "border-border text-muted-foreground hover:text-foreground",
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {list.map((a, i) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -5 }}
          >
            <Link
              to="/artigos/$slug"
              params={{ slug: a.slug }}
              className="surface-panel flex h-full flex-col p-6 transition-shadow hover:glow-violet"
            >
              <span className="text-xs font-medium uppercase tracking-wide text-primary">
                {a.category}
              </span>
              <h2 className="mt-2 font-display text-lg font-semibold leading-snug">
                {a.title}
              </h2>
              <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{a.excerpt}</p>
              <div className="mt-auto flex items-center justify-between pt-5 text-xs text-muted-foreground">
                <span>{a.author}</span>
                <span className="flex items-center gap-1">
                  <Clock className="size-3" /> {a.readingTime} min
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
