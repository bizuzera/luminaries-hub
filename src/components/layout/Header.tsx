import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import {
  BookOpen,
  ChevronDown,
  Menu,
  Search,
  Sparkles,
  Telescope,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { megaMenu } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { GlobalSearch } from "./GlobalSearch";

const directLinks = [
  { to: "/mapas", label: "Banco de Mapas" },
  { to: "/artigos", label: "Artigos & Estudo" },
  { to: "/mentoria", label: "Mentoria VIP" },
] as const;

export function Header() {
  const [openMenu, setOpenMenu] = useState<"cursos" | "tools" | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl"
      onMouseLeave={() => setOpenMenu(null)}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-2 px-4 sm:px-6">
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <span className="relative flex size-9 items-center justify-center rounded-xl bg-gradient-solar glow-solar">
            <Sparkles className="size-5 text-primary-foreground" />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">
            Pallas <span className="text-gradient-solar">Academy</span>
          </span>
        </Link>

        <nav className="ml-6 hidden items-center gap-1 lg:flex">
          <MenuTrigger
            label="Cursos & Formações"
            icon={<BookOpen className="size-4" />}
            active={openMenu === "cursos"}
            onEnter={() => setOpenMenu("cursos")}
          />
          <MenuTrigger
            label="Astro-Tools"
            icon={<Telescope className="size-4" />}
            active={openMenu === "tools"}
            onEnter={() => setOpenMenu("tools")}
          />
          {directLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onMouseEnter={() => setOpenMenu(null)}
              className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "text-primary" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={() => setSearchOpen(true)}
            className="hidden items-center gap-2 rounded-lg border border-border bg-secondary/60 px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground md:flex"
          >
            <Search className="size-4" />
            Buscar
            <kbd className="rounded border border-border px-1.5 py-0.5 text-[10px]">⌘K</kbd>
          </button>
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link to="/planos">Ver Planos</Link>
          </Button>
          <Button
            asChild
            size="sm"
            className="bg-gradient-solar font-medium text-primary-foreground hover:opacity-90"
          >
            <Link to="/curso/$slug" params={{ slug: "astrologia-moderna-fundamentos" }}>
              Área do Aluno
            </Link>
          </Button>
          <button
            className="rounded-lg p-2 text-muted-foreground lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {openMenu && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute inset-x-0 top-16 hidden border-b border-border bg-popover/95 backdrop-blur-xl lg:block"
            onMouseEnter={() => setOpenMenu(openMenu)}
          >
            <div className="mx-auto max-w-7xl px-6 py-8">
              {openMenu === "cursos" ? (
                <div className="grid grid-cols-5 gap-6">
                  {megaMenu.cursos.map((group) => (
                    <div key={group.title}>
                      <Link
                        to="/curso/$slug"
                        params={{ slug: group.slug }}
                        onClick={() => setOpenMenu(null)}
                        className="font-display text-sm font-semibold text-primary"
                      >
                        {group.title}
                      </Link>
                      <ul className="mt-3 space-y-2">
                        {group.items.map((item) => (
                          <li key={item}>
                            <Link
                              to="/curso/$slug"
                              params={{ slug: group.slug }}
                              onClick={() => setOpenMenu(null)}
                              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                            >
                              {item}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-4">
                  {megaMenu.tools.map((tool) => (
                    <Link
                      key={tool.title}
                      to="/astro-tools"
                      search={{ tab: tool.tab }}
                      onClick={() => setOpenMenu(null)}
                      className="surface-panel group p-4 transition-all hover:-translate-y-1 hover:glow-violet"
                    >
                      <p className="font-display text-sm font-semibold text-foreground group-hover:text-primary">
                        {tool.title}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">{tool.desc}</p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border bg-popover lg:hidden"
          >
            <div className="flex flex-col gap-1 p-4">
              <Link to="/astro-tools" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2 text-sm">
                Astro-Tools
              </Link>
              {directLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm"
                >
                  {l.label}
                </Link>
              ))}
              <Link to="/planos" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2 text-sm">
                Ver Planos
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <GlobalSearch open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
}

function MenuTrigger({
  label,
  icon,
  active,
  onEnter,
}: {
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onEnter: () => void;
}) {
  return (
    <button
      onMouseEnter={onEnter}
      onClick={onEnter}
      className={cn(
        "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
        active ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground",
      )}
    >
      {icon}
      {label}
      <ChevronDown
        className={cn("size-3.5 transition-transform", active && "rotate-180 text-primary")}
      />
    </button>
  );
}
