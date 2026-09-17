# Pallas Celestial Hub

Você é um Engenheiro de Software Principal e UI/UX Designer especialista em EdTechs e SaaS de Alta Performance. Seu objetivo é criar o ecossistema digital completo da "Pallas Academy" (ou Escola Palas), uma plataforma de educação, mentorias e ferramentas técnicas de Astrologia Ocidental, Védica e Espiritualidade.

O design deve misturar a navegabilidade em trilhas de conhecimento da Alura com a utilidade e precisão técnica de cálculo de mapas do Astro-Seek e a estética minimalista e moderna da Vaya.so.

---

### 1. ARQUITETURA E MANUTENÇÃO DE DADOS (CRÍTICO)
Para facilitar edições futuras de texto, cursos, tabelas e ferramentas:
1. Crie um arquivo centralizado `src/data/mockData.ts` contendo TODOS os dados da aplicação:
   - Catálogo de Cursos, Módulos, Aulas e Status de Conclusão.
   - Lista de Trilhas de Aprendizado e Níveis de Senioridade.
   - Lista de Artigos do Blog com categorias, autores e tempo de leitura.
   - Banco de Mapas de Personalidades (com posições planetárias fictícias completas).
   - Dados dos Planos de Assinatura e Mentoria.
2. Crie um arquivo `src/types/astrology.ts` com as interfaces TypeScript bem definidas para: `Course`, `Module`, `Lesson`, `AstrologicalChart`, `Article`, `MentorshipProgram`.

---

### 2. GUIA DE ESTILO E DESIGN SYSTEM (TAILWIND + SHADCN/UI)
- **Tema Dark Místico-Tech:**
  - Background Primário: `#070A10` (Preto Cósmico)
  - Surface/Cards: `#0F172A` / `#131B2E` (Azul Noturno Profundo)
  - Acentos Primários: `#F59E0B` (Dourado Solar/Astrológico) e `#8B5CF6` (Violeta Transmutação)
  - Textos: `#F8FAFC` (Títulos/Principais) e `#94A3B8` (Secundários)
- **Tipografia & Componentes:**
  - Fontes Sans-serif limpas e modernas.
  - Animações suaves usando Framer Motion (hover em cards, transição de abas e menus).
  - Ícones da biblioteca `lucide-react`.

---

### 3. ESTRUTURA DE NAVEGAÇÃO E PÁGINAS DO SISTEMA

#### A. Header Global & Mega Menu Interativo
- **Logo:** "Pallas Academy" com um ícone estilizado de constelação/asteroide em dourado.
- **Mega Menu Dropdown "Cursos & Formações":**
  - *Astrologia Ocidental:* Moderna, Tradicional e Dracônica (Mapa da Alma).
  - *Astrologia Védica (Jyotish):* Grahas, Nakshatras, Dashas e Leitura de Rasi.
  - *Relacionamentos:* Sinastria, Mapas Compostos e Kundali Matching Védico.
  - *Previsões & Kármica:* Padrões Kármicos, Trânsitos e Análise do Destino.
  - *Carreira & Atendimento:* Ética Profissional, Consultoria Clínica e Mentoria.
- **Mega Menu Dropdown "Astro-Tools (Ferramentas)":**
  - Gerador de Mapa Natal (Tropical e Sideral).
  - Calculadora de Sinastria e Kundali Matching.
  - Módulo de Astrologia Dracônica.
  - Tabela de Dashas e Trânsitos Futuros.
- **Links Diretos:** "Banco de Mapas", "Artigos & Estudo", "Mentoria VIP".
- **Ações:** Barra de busca global (Cmd+K modal), Botão "Ver Planos" e "Área do Aluno".

#### B. Home / Dashboard da Plataforma (Visão Geral estilo Alura/Netflix)
- **Hero Banner:** Destaque para a "Trilha de Formação do Zero ao Astrólogo Profissional" com progresso em tempo real e CTA "Continuar Trilha".
- **Filtro Rápido por Senioridade:** Botões pílula [Todos] [Iniciante / Autoconhecimento] [Intermediário] [Avançado / Profissional].
- **Carrosséis / Grids de Cursos:**
  - Organizados por categoria (Ex: "Especialização Védica", "Astrologia Dracônica e Kármica").
  - **Cards de Curso com:** Imagem de capa elegante, Tag de Nível, Carga Horária, Selo "Com Certificado", Barra de Progresso e Ícone da Categoria.

#### C. Seção / Dashboard "Astro-Tools" (Estilo Astro-Seek / Vaya.so)
Crie um painel de cálculo astrológico interativo simulado:
- Formulário de entrada: Nome, Data de Nascimento, Hora Exata e Cidade.
- Alternador de Sistema: **Zodíaco Tropical (Ocidental)** vs **Zodíaco Sideral (Védico - Lahiri)**.
- Abas de Visualização do Resultado:
  1. *Mapa Natal:* Gráfico simulado da roda astrológica (Chart Wheel) + Tabela de Planetas em Casas/Signos.
  2. *Sinastria & Kundali Matching:* Comparador de 2 mapas com indicador de pontuação de compatibilidade (Ex: 28/36 Gunas).
  3. *Mapa Dracónico:* Cálculo dos nós lunares e posições da alma.
  4. *Linha do Tempo de Dashas:* Tabela com períodos planetários védicos (Vimshottari Dasha).

#### D. Página do Banco de Mapas (Biblioteca de Casos Reais)
- Tabela interativa com busca e filtros por: Nome da Celebridade/Evento, Posições Planetárias (Ex: "Sol na Casa 10", "Saturno em Retrógrado").
- Card de visualização do mapa selecionado com notas de estudo para os alunos praticarem.

#### E. Hub de Mentoria Profissional & Código de Ética
- Página dedicada ao programa de acompanhamento para novos astrólogos.
- Módulos de Mentoria: Precificação de Consultas, Transparência com o Cliente, Postura Ética na Leitura Previsional e Gestão de Consultório Digital.
- Formulário de candidatura para o programa de mentoria individual.

#### F. Portal de Artigos & Conteúdo Científico/Técnico
- Layout de blog/portal educacional moderno.
- Grid de artigos com tags: `#AstrologiaVédica`, `#Sinastria`, `#Previsões`, `#Dracônica`.
- Leitor de artigo com índice lateral (Table of Contents), autor e artigos relacionados.

#### G. Player de Aula (Ambiente de Aprendizado do Aluno)
- Layout divido: Vídeo centralizado (simulado com player elegante) + Sidebar direita com lista de módulos e aulas com checkboxes.
- Aba inferior com 3 sub-abas:
  1. *Visão Geral & Ementa da Aula*
  2. *Materiais Complementares (PDFs de Apoio, Tabelas de Aspectos)*
  3. *Comunidade & Dúvidas dos Alunos*
- Card lateral destacando: "Ao concluir esta trilha, seu Certificado de Formação em Astrologia será liberado automaticamente".

### 4. REQUISITOS DE INTERATIVIDADE E ESTADO (REACT)
- Permita alternar entre abas e rotas sem recarregar a página.
- Faça o formulário da ferramenta "Astro-Tools" atualizar os dados simulados na tela ao clicar em "Gerar Mapa".
- Mantenha animações fluidas nos dropdowns e modais.

Gere a estrutura de componentes modularizada, bonita, limpa e pronta para uso no Lovable.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/f2bf32ff-6c88-4a2d-8ceb-1e469a6795f7).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
