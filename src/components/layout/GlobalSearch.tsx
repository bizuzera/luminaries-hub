import { useNavigate } from "@tanstack/react-router";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { articles, charts, courses } from "@/data/mockData";

export function GlobalSearch({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const navigate = useNavigate();

  const go = (fn: () => void) => {
    onOpenChange(false);
    fn();
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Buscar cursos, artigos, mapas e ferramentas..." />
      <CommandList>
        <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
        <CommandGroup heading="Cursos">
          {courses.map((c) => (
            <CommandItem
              key={c.id}
              value={c.title}
              onSelect={() =>
                go(() => navigate({ to: "/curso/$slug", params: { slug: c.slug } }))
              }
            >
              {c.title}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Artigos">
          {articles.map((a) => (
            <CommandItem
              key={a.id}
              value={a.title}
              onSelect={() =>
                go(() => navigate({ to: "/artigos/$slug", params: { slug: a.slug } }))
              }
            >
              {a.title}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Banco de Mapas">
          {charts.map((c) => (
            <CommandItem
              key={c.id}
              value={c.name}
              onSelect={() => go(() => navigate({ to: "/mapas" }))}
            >
              {c.name}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Astro-Tools">
          <CommandItem value="Mapa Natal" onSelect={() => go(() => navigate({ to: "/astro-tools" }))}>
            Gerador de Mapa Natal
          </CommandItem>
          <CommandItem value="Sinastria" onSelect={() => go(() => navigate({ to: "/astro-tools" }))}>
            Sinastria & Kundali Matching
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
