import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { CheckCircle2, ShieldCheck, Users } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { mentorshipPrograms } from "@/data/mockData";

export const Route = createFileRoute("/mentoria")({
  head: () => ({
    meta: [
      { title: "Mentoria Profissional & Código de Ética | Pallas Academy" },
      {
        name: "description",
        content:
          "Programa de acompanhamento para novos astrólogos: precificação, transparência, ética previsional e consultório digital.",
      },
      { property: "og:title", content: "Mentoria VIP — Pallas Academy" },
      {
        property: "og:description",
        content: "Acompanhamento individual para estruturar sua carreira de astrólogo.",
      },
    ],
  }),
  component: MentoriaPage,
});

const ethicsCode = [
  "Não fazemos previsões deterministas nem diagnósticos de saúde.",
  "O consulente é informado do escopo e dos limites da consulta por escrito.",
  "Dados de nascimento e gravações são tratados com confidencialidade.",
  "Encaminhamos para profissionais de saúde quando o caso exige.",
  "Não usamos medo como estratégia de venda ou de fidelização.",
];

function MentoriaPage() {
  const [sent, setSent] = useState(false);

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs text-primary">
        <Users className="size-3" /> Mentoria VIP
      </span>
      <h1 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
        Hub de <span className="text-gradient-solar">Mentoria Profissional</span>
      </h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Um programa de acompanhamento para quem já estuda e quer atender com segurança
        técnica, clareza comercial e responsabilidade ética.
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {mentorshipPrograms.map((m, i) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ y: -4 }}
            className="surface-panel p-6 transition-shadow hover:glow-violet"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold">{m.title}</h2>
              <span className="rounded-full border border-border px-2.5 py-1 text-xs text-primary">
                {m.duration}
              </span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{m.description}</p>
            <ul className="mt-4 space-y-2">
              {m.topics.map((t) => (
                <li key={t} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                  {t}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        <div className="surface-panel p-6">
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-5 text-primary" />
            <h2 className="font-display text-lg font-semibold">Código de Ética Pallas</h2>
          </div>
          <ul className="mt-4 space-y-3">
            {ethicsCode.map((e) => (
              <li key={e} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {e}
              </li>
            ))}
          </ul>
        </div>

        <div className="surface-panel p-6">
          <h2 className="font-display text-lg font-semibold">
            Candidatura à mentoria individual
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Recebemos um novo grupo a cada trimestre. Conte seu momento atual.
          </p>

          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6 rounded-xl border border-primary/40 bg-primary/5 p-6 text-center"
            >
              <CheckCircle2 className="mx-auto size-8 text-primary" />
              <p className="mt-3 font-display font-semibold">Candidatura registrada</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Nossa equipe responde em até 5 dias úteis com os próximos passos.
              </p>
            </motion.div>
          ) : (
            <form
              className="mt-6 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
                toast.success("Candidatura enviada para a coordenação da Pallas Academy.");
              }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Nome completo</Label>
                  <Input required placeholder="Seu nome" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">E-mail</Label>
                  <Input required type="email" placeholder="voce@email.com" />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Tempo de estudo</Label>
                <Input required placeholder="Ex: 3 anos de astrologia moderna" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">
                  Onde você trava hoje no atendimento?
                </Label>
                <Textarea required rows={4} placeholder="Descreva seu momento atual..." />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-solar text-primary-foreground hover:opacity-90"
              >
                Enviar candidatura
              </Button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
