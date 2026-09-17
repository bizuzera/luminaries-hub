import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Check, Crown } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { plans } from "@/data/mockData";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/planos")({
  head: () => ({
    meta: [
      { title: "Planos e Assinaturas | Pallas Academy" },
      {
        name: "description",
        content:
          "Escolha entre Explorador, Formação Pro e Mentoria VIP e acesse cursos, Astro-Tools e certificados.",
      },
      { property: "og:title", content: "Planos — Pallas Academy" },
      {
        property: "og:description",
        content: "Assinaturas mensais com acesso a trilhas, ferramentas e mentoria.",
      },
    ],
  }),
  component: PlanosPage,
});

function PlanosPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <div className="text-center">
        <h1 className="font-display text-3xl font-semibold sm:text-4xl">
          Estude com <span className="text-gradient-solar">acesso completo</span>
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Planos mensais sem fidelidade. Todos incluem comunidade de alunos e atualizações
          contínuas do acervo.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {plans.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -6 }}
            className={cn(
              "surface-panel flex flex-col p-6",
              p.highlight && "border-primary/50 glow-solar",
            )}
          >
            {p.highlight && (
              <span className="mb-3 inline-flex w-fit items-center gap-1 rounded-full bg-gradient-solar px-3 py-1 text-xs font-medium text-primary-foreground">
                <Crown className="size-3" /> Mais escolhido
              </span>
            )}
            <h2 className="font-display text-xl font-semibold">{p.name}</h2>
            <p className="mt-3">
              <span className="font-display text-4xl font-semibold">{p.price}</span>
              <span className="text-muted-foreground">{p.period}</span>
            </p>
            <ul className="mt-6 flex-1 space-y-3">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                  {f}
                </li>
              ))}
            </ul>
            <Button
              onClick={() => toast.success(`Plano ${p.name} selecionado — simulação de checkout.`)}
              className={cn(
                "mt-6 w-full",
                p.highlight
                  ? "bg-gradient-solar text-primary-foreground hover:opacity-90"
                  : "bg-secondary text-secondary-foreground hover:bg-accent",
              )}
            >
              Assinar {p.name}
            </Button>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
