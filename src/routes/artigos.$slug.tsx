import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowLeft, Clock, User } from "lucide-react";

import { articles, getArticleBySlug } from "@/data/mockData";

export const Route = createFileRoute("/artigos/$slug")({
  loader: ({ params }) => {
    const article = getArticleBySlug(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Artigo não encontrado | Pallas Academy" }, { name: "robots", content: "noindex" }],
      };
    }
    const { article } = loaderData;
    return {
      meta: [
        { title: `${article.title} | Pallas Academy` },
        { name: "description", content: article.excerpt },
        { property: "og:title", content: article.title },
        { property: "og:description", content: article.excerpt },
      ],
    };
  },
  component: ArticlePage,
});

function ArticlePage() {
  const { article } = Route.useLoaderData();
  const related = articles
    .filter((a) => a.id !== article.id && a.tags.some((t) => article.tags.includes(t)))
    .slice(0, 3);

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <Link
        to="/artigos"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="size-4" /> Voltar para artigos
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_260px]">
        <motion.article
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl"
        >
          <span className="text-xs font-medium uppercase tracking-wide text-primary">
            {article.category}
          </span>
          <h1 className="mt-3 font-display text-3xl font-semibold leading-tight sm:text-4xl">
            {article.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <User className="size-4" /> {article.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-4" /> {article.readingTime} min de leitura
            </span>
            <span>{article.date}</span>
          </div>
          <p className="mt-6 text-lg text-muted-foreground">{article.excerpt}</p>

          <div className="mt-8 space-y-8">
            {article.sections.map((s) => (
              <section key={s.heading} id={slugify(s.heading)} className="scroll-mt-24">
                <h2 className="font-display text-xl font-semibold">{s.heading}</h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">{s.body}</p>
              </section>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-2">
            {article.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-border px-3 py-1 text-xs text-primary"
              >
                {t}
              </span>
            ))}
          </div>
        </motion.article>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:h-fit">
          <div className="surface-panel p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">
              Neste artigo
            </p>
            <ul className="mt-3 space-y-2">
              {article.sections.map((s) => (
                <li key={s.heading}>
                  <a
                    href={`#${slugify(s.heading)}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {s.heading}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {related.length > 0 && (
            <div className="surface-panel p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                Artigos relacionados
              </p>
              <ul className="mt-3 space-y-3">
                {related.map((r) => (
                  <li key={r.id}>
                    <Link
                      to="/artigos/$slug"
                      params={{ slug: r.slug }}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {r.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
