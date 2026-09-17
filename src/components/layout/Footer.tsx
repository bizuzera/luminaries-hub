import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-popover/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-solar">
              <Sparkles className="size-4 text-primary-foreground" />
            </span>
            <span className="font-display font-semibold">Pallas Academy</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Educação, ferramentas técnicas e mentoria em Astrologia Ocidental, Védica e
            Espiritualidade.
          </p>
        </div>
        <FooterCol
          title="Plataforma"
          links={[
            { to: "/", label: "Dashboard" },
            { to: "/astro-tools", label: "Astro-Tools" },
            { to: "/mapas", label: "Banco de Mapas" },
          ]}
        />
        <FooterCol
          title="Conteúdo"
          links={[
            { to: "/artigos", label: "Artigos & Estudo" },
            { to: "/mentoria", label: "Mentoria VIP" },
            { to: "/planos", label: "Planos" },
          ]}
        />
        <div>
          <p className="font-display text-sm font-semibold">Código de Ética</p>
          <p className="mt-3 text-sm text-muted-foreground">
            Toda leitura previsional na Pallas é feita sem determinismo, com transparência
            de escopo e respeito ao livre-arbítrio do consulente.
          </p>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © 2026 Pallas Academy — Escola Palas. Conteúdo educacional.
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { to: "/" | "/astro-tools" | "/mapas" | "/artigos" | "/mentoria" | "/planos"; label: string }[];
}) {
  return (
    <div>
      <p className="font-display text-sm font-semibold">{title}</p>
      <ul className="mt-3 space-y-2">
        {links.map((l) => (
          <li key={l.label}>
            <Link to={l.to} className="text-sm text-muted-foreground hover:text-primary">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
