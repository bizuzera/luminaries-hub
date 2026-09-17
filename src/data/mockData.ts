import type {
  Article,
  AstrologicalChart,
  Course,
  CourseCategory,
  DashaPeriod,
  GunaScore,
  LearningTrack,
  MentorshipProgram,
  Plan,
  Seniority,
} from "@/types/astrology";

import coverOcidental from "@/assets/cover-ocidental.jpg";
import coverVedica from "@/assets/cover-vedica.jpg";
import coverRelacionamentos from "@/assets/cover-relacionamentos.jpg";
import coverPrevisoes from "@/assets/cover-previsoes.jpg";

export const covers = {
  ocidental: coverOcidental,
  vedica: coverVedica,
  relacionamentos: coverRelacionamentos,
  previsoes: coverPrevisoes,
  carreira: coverOcidental,
} satisfies Record<CourseCategory, string>;

export const categoryLabels: Record<CourseCategory, string> = {
  ocidental: "Astrologia Ocidental",
  vedica: "Astrologia Védica (Jyotish)",
  relacionamentos: "Relacionamentos",
  previsoes: "Previsões & Kármica",
  carreira: "Carreira & Atendimento",
};

export const seniorityLabels: Record<Seniority, string> = {
  iniciante: "Iniciante / Autoconhecimento",
  intermediario: "Intermediário",
  avancado: "Avançado / Profissional",
};

const baseMaterials = [
  { label: "Tabela de Aspectos Maiores (PDF)", type: "pdf" as const },
  { label: "Efemérides do mês", type: "tabela" as const },
  { label: "Planilha de interpretação guiada", type: "planilha" as const },
];

function buildModules(prefix: string, titles: string[][]) {
  return titles.map((lessons, mIndex) => ({
    id: `${prefix}-m${mIndex + 1}`,
    title: lessons[0],
    lessons: lessons.slice(1).map((title, lIndex) => ({
      id: `${prefix}-m${mIndex + 1}-a${lIndex + 1}`,
      title,
      duration: `${12 + ((lIndex * 7 + mIndex * 5) % 26)} min`,
      completed: mIndex === 0 && lIndex < 2,
      summary: `Nesta aula estudamos ${title.toLowerCase()} com exemplos práticos aplicados a mapas reais do Banco de Mapas da Pallas Academy.`,
      materials: baseMaterials,
    })),
  }));
}

export const courses: Course[] = [
  {
    id: "c1",
    slug: "astrologia-moderna-fundamentos",
    title: "Astrologia Moderna: Fundamentos do Mapa Natal",
    description:
      "Signos, casas, planetas e aspectos sob a ótica psicológica moderna. A base para qualquer leitura.",
    category: "ocidental",
    level: "iniciante",
    hours: 32,
    certificate: true,
    progress: 68,
    instructor: "Helena Moraes",
    cover: coverOcidental,
    modules: buildModules("c1", [
      [
        "Módulo 1 — A roda zodiacal",
        "Os 12 signos e seus elementos",
        "Modalidades: cardinal, fixo e mutável",
        "Regências planetárias clássicas e modernas",
      ],
      [
        "Módulo 2 — Casas e Ascendente",
        "Cálculo e sentido do Ascendente",
        "Sistemas de casas: Placidus e Casas Iguais",
        "Eixos angulares: AC, MC, DC e FC",
      ],
      [
        "Módulo 3 — Aspectos",
        "Aspectos maiores e orbes",
        "Configurações: T-quadrada e Grande Trígono",
        "Síntese interpretativa do mapa",
      ],
    ]),
  },
  {
    id: "c2",
    slug: "astrologia-tradicional",
    title: "Astrologia Tradicional e Dignidades Essenciais",
    description:
      "Método helenístico e medieval: dignidades, recepções, seitas e almutens para leituras precisas.",
    category: "ocidental",
    level: "avancado",
    hours: 44,
    certificate: true,
    progress: 12,
    instructor: "Rafael Cordeiro",
    cover: coverOcidental,
    modules: buildModules("c2", [
      [
        "Módulo 1 — Seita e condição planetária",
        "Seita diurna e noturna",
        "Dignidades essenciais e acidentais",
        "Recepções mútuas",
      ],
      [
        "Módulo 2 — Técnicas preditivas tradicionais",
        "Direções primárias",
        "Profecções anuais",
        "Firdaria e senhores do tempo",
      ],
    ]),
  },
  {
    id: "c3",
    slug: "astrologia-draconica",
    title: "Astrologia Dracônica: o Mapa da Alma",
    description:
      "Recalcule o mapa a partir do Nodo Norte e revele o propósito essencial por trás da personalidade.",
    category: "previsoes",
    level: "avancado",
    hours: 24,
    certificate: true,
    progress: 0,
    instructor: "Isis Barreto",
    cover: coverPrevisoes,
    modules: buildModules("c3", [
      [
        "Módulo 1 — Fundamentos dracônicos",
        "O eixo dos nodos lunares",
        "Como recalcular o mapa dracônico",
        "Diferença entre alma e persona",
      ],
      [
        "Módulo 2 — Interpretação prática",
        "Sobreposição dracônico x tropical",
        "Vocação e missão de alma",
        "Estudos de caso do Banco de Mapas",
      ],
    ]),
  },
  {
    id: "c4",
    slug: "jyotish-grahas-nakshatras",
    title: "Jyotish I: Grahas, Rasis e Nakshatras",
    description:
      "Porta de entrada da Astrologia Védica: os nove grahas, leitura de Rasi e as 27 Nakshatras.",
    category: "vedica",
    level: "iniciante",
    hours: 38,
    certificate: true,
    progress: 45,
    instructor: "Arjun Mehta",
    cover: coverVedica,
    modules: buildModules("c4", [
      [
        "Módulo 1 — Os nove Grahas",
        "Surya, Chandra e Mangala",
        "Budha, Guru e Shukra",
        "Shani, Rahu e Ketu",
      ],
      [
        "Módulo 2 — Rasi Chart",
        "Leitura do quadrado norte e sul",
        "Bhavas e karakas",
        "Ayanamsa Lahiri na prática",
      ],
      [
        "Módulo 3 — Nakshatras",
        "As 27 mansões lunares",
        "Padas e sub-divisões",
        "Nakshatra da Lua e temperamento",
      ],
    ]),
  },
  {
    id: "c5",
    slug: "jyotish-dashas",
    title: "Jyotish II: Vimshottari Dasha e Previsão",
    description:
      "Domine o sistema de períodos planetários védicos e cronometre eventos com precisão.",
    category: "vedica",
    level: "intermediario",
    hours: 30,
    certificate: true,
    progress: 20,
    instructor: "Arjun Mehta",
    cover: coverVedica,
    modules: buildModules("c5", [
      [
        "Módulo 1 — Estrutura das Dashas",
        "Mahadasha, Antardasha e Pratyantar",
        "Cálculo a partir da Nakshatra natal",
        "Sequência Vimshottari completa",
      ],
      [
        "Módulo 2 — Previsão aplicada",
        "Dasha + trânsito (Gochara)",
        "Sade Sati de Shani",
        "Casos práticos de virada de ciclo",
      ],
    ]),
  },
  {
    id: "c6",
    slug: "sinastria-mapas-compostos",
    title: "Sinastria e Mapas Compostos",
    description:
      "Comparação de mapas, sobreposições de casas e o mapa composto como terceira entidade do vínculo.",
    category: "relacionamentos",
    level: "intermediario",
    hours: 26,
    certificate: true,
    progress: 55,
    instructor: "Helena Moraes",
    cover: coverRelacionamentos,
    modules: buildModules("c6", [
      [
        "Módulo 1 — Sinastria clássica",
        "Aspectos entre mapas",
        "Sobreposição de casas",
        "Vênus, Marte e o padrão de atração",
      ],
      [
        "Módulo 2 — Mapa composto",
        "Pontos médios e composto de Davison",
        "O propósito do vínculo",
        "Crises e ciclos do relacionamento",
      ],
    ]),
  },
  {
    id: "c7",
    slug: "kundali-matching",
    title: "Kundali Matching: os 36 Gunas",
    description:
      "O método védico de compatibilidade: Ashta Koota, Guna Milan e leitura ética do resultado.",
    category: "relacionamentos",
    level: "avancado",
    hours: 18,
    certificate: true,
    progress: 0,
    instructor: "Priya Nair",
    cover: coverRelacionamentos,
    modules: buildModules("c7", [
      [
        "Módulo 1 — Ashta Koota",
        "Varna, Vashya e Tara",
        "Yoni, Graha Maitri e Gana",
        "Bhakoot e Nadi dosha",
      ],
    ]),
  },
  {
    id: "c8",
    slug: "transitos-e-padroes-karmicos",
    title: "Trânsitos, Padrões Kármicos e Destino",
    description:
      "Revoluções solares, trânsitos lentos e a leitura kármica dos nodos, Quíron e Saturno.",
    category: "previsoes",
    level: "intermediario",
    hours: 34,
    certificate: true,
    progress: 8,
    instructor: "Isis Barreto",
    cover: coverPrevisoes,
    modules: buildModules("c8", [
      [
        "Módulo 1 — Ciclos planetários",
        "Retorno de Saturno e Júpiter",
        "Urano, Netuno e Plutão em trânsito",
        "Revolução solar anual",
      ],
      [
        "Módulo 2 — Leitura kármica",
        "Eixo nodal e repetições de padrão",
        "Quíron e a ferida estruturante",
        "Ética na previsão de eventos difíceis",
      ],
    ]),
  },
  {
    id: "c9",
    slug: "etica-e-consultoria",
    title: "Ética Profissional e Consultoria Clínica",
    description:
      "Como conduzir atendimentos com responsabilidade, escuta clínica, contrato claro e limites.",
    category: "carreira",
    level: "avancado",
    hours: 22,
    certificate: true,
    progress: 30,
    instructor: "Marina Salles",
    cover: coverOcidental,
    modules: buildModules("c9", [
      [
        "Módulo 1 — Postura de consultório",
        "Escuta ativa e acolhimento",
        "Contrato e combinados iniciais",
        "O que nunca dizer em consulta",
      ],
      [
        "Módulo 2 — Negócio e precificação",
        "Formação de preço e pacotes",
        "Consultório digital e agenda",
        "Marketing honesto e sem promessas",
      ],
    ]),
  },
];

export const learningTracks: LearningTrack[] = [
  {
    id: "t1",
    title: "Do Zero ao Astrólogo Profissional",
    description:
      "Trilha completa de formação: fundamentos, técnica preditiva, ética e atendimento. 11 meses de estudo guiado.",
    level: "iniciante",
    progress: 42,
    courseSlugs: [
      "astrologia-moderna-fundamentos",
      "sinastria-mapas-compostos",
      "transitos-e-padroes-karmicos",
      "etica-e-consultoria",
    ],
  },
  {
    id: "t2",
    title: "Especialização Védica (Jyotish)",
    description: "Grahas, Nakshatras, Dashas e Kundali Matching com ayanamsa Lahiri.",
    level: "intermediario",
    progress: 27,
    courseSlugs: ["jyotish-grahas-nakshatras", "jyotish-dashas", "kundali-matching"],
  },
  {
    id: "t3",
    title: "Dracônica & Kármica",
    description: "O mapa da alma, nodos lunares e leitura de propósito.",
    level: "avancado",
    progress: 9,
    courseSlugs: ["astrologia-draconica", "transitos-e-padroes-karmicos"],
  },
];

export const charts: AstrologicalChart[] = [
  {
    id: "ch1",
    name: "Frida Kahlo",
    birthDate: "06/07/1907",
    birthTime: "08:30",
    city: "Coyoacán, México",
    system: "tropical",
    tags: ["Sol na Casa 10", "Lua em Touro", "Marte Retrógrado"],
    notes:
      "Caso clássico para estudar Quíron angular e a sublimação da dor em obra. Observe o eixo 4–10 e a regência de Vênus.",
    positions: [
      { planet: "Sol", sign: "Câncer", degree: "13°09'", house: 10, retrograde: false },
      { planet: "Lua", sign: "Touro", degree: "27°41'", house: 8, retrograde: false },
      { planet: "Mercúrio", sign: "Câncer", degree: "02°15'", house: 9, retrograde: false },
      { planet: "Vênus", sign: "Gêmeos", degree: "18°52'", house: 9, retrograde: false },
      { planet: "Marte", sign: "Escorpião", degree: "05°33'", house: 2, retrograde: true },
      { planet: "Júpiter", sign: "Câncer", degree: "21°10'", house: 10, retrograde: false },
      { planet: "Saturno", sign: "Peixes", degree: "11°44'", house: 6, retrograde: true },
      { planet: "Urano", sign: "Capricórnio", degree: "13°02'", house: 4, retrograde: true },
      { planet: "Netuno", sign: "Câncer", degree: "11°26'", house: 10, retrograde: false },
      { planet: "Plutão", sign: "Gêmeos", degree: "23°18'", house: 9, retrograde: false },
      { planet: "Nodo Norte", sign: "Peixes", degree: "07°55'", house: 6, retrograde: true },
    ],
  },
  {
    id: "ch2",
    name: "Carl Gustav Jung",
    birthDate: "26/07/1875",
    birthTime: "19:32",
    city: "Kesswil, Suíça",
    system: "tropical",
    tags: ["Sol em Leão", "Ascendente Aquário", "Saturno em Aquário"],
    notes:
      "Referência obrigatória para o estudo de arquétipos. Estude a oposição Sol–Ascendente e o Netuno em Touro.",
    positions: [
      { planet: "Sol", sign: "Leão", degree: "03°19'", house: 7, retrograde: false },
      { planet: "Lua", sign: "Touro", degree: "15°34'", house: 3, retrograde: false },
      { planet: "Mercúrio", sign: "Câncer", degree: "13°28'", house: 6, retrograde: false },
      { planet: "Vênus", sign: "Câncer", degree: "17°32'", house: 6, retrograde: false },
      { planet: "Marte", sign: "Sagitário", degree: "21°25'", house: 10, retrograde: false },
      { planet: "Júpiter", sign: "Libra", degree: "23°04'", house: 8, retrograde: false },
      { planet: "Saturno", sign: "Aquário", degree: "24°42'", house: 1, retrograde: true },
      { planet: "Urano", sign: "Leão", degree: "14°49'", house: 7, retrograde: false },
      { planet: "Netuno", sign: "Touro", degree: "01°12'", house: 3, retrograde: false },
      { planet: "Plutão", sign: "Touro", degree: "22°58'", house: 4, retrograde: false },
      { planet: "Nodo Norte", sign: "Áries", degree: "09°11'", house: 2, retrograde: true },
    ],
  },
  {
    id: "ch3",
    name: "Mahatma Gandhi",
    birthDate: "02/10/1869",
    birthTime: "07:11",
    city: "Porbandar, Índia",
    system: "sideral",
    tags: ["Jyotish", "Lua em Leão", "Saturno em Sagitário"],
    notes:
      "Mapa sideral (Lahiri) ideal para praticar Vimshottari Dasha e a força de Guru sobre o Lagna.",
    positions: [
      { planet: "Surya (Sol)", sign: "Virgem", degree: "16°44'", house: 1, retrograde: false },
      { planet: "Chandra (Lua)", sign: "Leão", degree: "05°10'", house: 12, retrograde: false },
      { planet: "Mangala (Marte)", sign: "Virgem", degree: "01°22'", house: 1, retrograde: false },
      { planet: "Budha (Mercúrio)", sign: "Libra", degree: "09°38'", house: 2, retrograde: false },
      { planet: "Guru (Júpiter)", sign: "Peixes", degree: "24°05'", house: 7, retrograde: true },
      { planet: "Shukra (Vênus)", sign: "Escorpião", degree: "02°47'", house: 3, retrograde: false },
      { planet: "Shani (Saturno)", sign: "Sagitário", degree: "22°19'", house: 4, retrograde: false },
      { planet: "Rahu", sign: "Áries", degree: "11°03'", house: 8, retrograde: true },
      { planet: "Ketu", sign: "Libra", degree: "11°03'", house: 2, retrograde: true },
    ],
  },
  {
    id: "ch4",
    name: "Marie Curie",
    birthDate: "07/11/1867",
    birthTime: "12:00",
    city: "Varsóvia, Polônia",
    system: "tropical",
    tags: ["Sol em Escorpião", "Plutão em Touro", "Saturno Retrógrado"],
    notes:
      "Excelente para estudar Plutão e pesquisa científica. Atenção ao stellium em Escorpião na Casa 9.",
    positions: [
      { planet: "Sol", sign: "Escorpião", degree: "14°51'", house: 9, retrograde: false },
      { planet: "Lua", sign: "Áries", degree: "09°26'", house: 2, retrograde: false },
      { planet: "Mercúrio", sign: "Escorpião", degree: "28°03'", house: 10, retrograde: false },
      { planet: "Vênus", sign: "Sagitário", degree: "06°17'", house: 10, retrograde: false },
      { planet: "Marte", sign: "Libra", degree: "19°44'", house: 9, retrograde: false },
      { planet: "Júpiter", sign: "Virgem", degree: "17°21'", house: 8, retrograde: false },
      { planet: "Saturno", sign: "Sagitário", degree: "03°39'", house: 10, retrograde: true },
      { planet: "Urano", sign: "Câncer", degree: "07°12'", house: 5, retrograde: true },
      { planet: "Netuno", sign: "Áries", degree: "14°55'", house: 2, retrograde: true },
      { planet: "Plutão", sign: "Touro", degree: "15°33'", house: 3, retrograde: true },
      { planet: "Nodo Norte", sign: "Peixes", degree: "20°08'", house: 1, retrograde: true },
    ],
  },
  {
    id: "ch5",
    name: "Nikola Tesla",
    birthDate: "10/07/1856",
    birthTime: "00:00",
    city: "Smiljan, Croácia",
    system: "tropical",
    tags: ["Sol na Casa 10", "Urano em Touro", "Mercúrio Retrógrado"],
    notes:
      "Mapa de estudo para Urano e genialidade técnica. Compare com a versão dracônica no módulo avançado.",
    positions: [
      { planet: "Sol", sign: "Câncer", degree: "17°53'", house: 10, retrograde: false },
      { planet: "Lua", sign: "Libra", degree: "23°14'", house: 1, retrograde: false },
      { planet: "Mercúrio", sign: "Câncer", degree: "27°41'", house: 10, retrograde: true },
      { planet: "Vênus", sign: "Gêmeos", degree: "02°36'", house: 9, retrograde: false },
      { planet: "Marte", sign: "Libra", degree: "15°27'", house: 1, retrograde: false },
      { planet: "Júpiter", sign: "Áries", degree: "11°09'", house: 7, retrograde: false },
      { planet: "Saturno", sign: "Câncer", degree: "05°18'", house: 9, retrograde: false },
      { planet: "Urano", sign: "Touro", degree: "22°45'", house: 8, retrograde: false },
      { planet: "Netuno", sign: "Peixes", degree: "17°02'", house: 6, retrograde: true },
      { planet: "Plutão", sign: "Touro", degree: "05°21'", house: 8, retrograde: false },
      { planet: "Nodo Norte", sign: "Touro", degree: "28°44'", house: 8, retrograde: true },
    ],
  },
  {
    id: "ch6",
    name: "Clarice Lispector",
    birthDate: "10/12/1920",
    birthTime: "03:15",
    city: "Chechelnyk, Ucrânia",
    system: "tropical",
    tags: ["Sol em Sagitário", "Lua em Peixes", "Netuno em Leão"],
    notes:
      "Estudo de Netuno e linguagem. Observe o regente do Ascendente em casa cadente e Mercúrio em Sagitário.",
    positions: [
      { planet: "Sol", sign: "Sagitário", degree: "17°48'", house: 2, retrograde: false },
      { planet: "Lua", sign: "Peixes", degree: "12°35'", house: 5, retrograde: false },
      { planet: "Mercúrio", sign: "Sagitário", degree: "29°04'", house: 3, retrograde: false },
      { planet: "Vênus", sign: "Capricórnio", degree: "08°19'", house: 3, retrograde: false },
      { planet: "Marte", sign: "Libra", degree: "26°57'", house: 12, retrograde: false },
      { planet: "Júpiter", sign: "Virgem", degree: "03°42'", house: 11, retrograde: false },
      { planet: "Saturno", sign: "Virgem", degree: "10°26'", house: 11, retrograde: false },
      { planet: "Urano", sign: "Peixes", degree: "04°11'", house: 5, retrograde: true },
      { planet: "Netuno", sign: "Leão", degree: "13°50'", house: 10, retrograde: false },
      { planet: "Plutão", sign: "Câncer", degree: "08°37'", house: 9, retrograde: true },
      { planet: "Nodo Norte", sign: "Virgem", degree: "01°29'", house: 11, retrograde: true },
    ],
  },
];

export const dashaTimeline: DashaPeriod[] = [
  { planet: "Ketu", start: "1994", end: "2001", years: 7, theme: "Desapego e busca interior", current: false },
  { planet: "Shukra (Vênus)", start: "2001", end: "2021", years: 20, theme: "Relações, arte e prosperidade", current: false },
  { planet: "Surya (Sol)", start: "2021", end: "2027", years: 6, theme: "Autoridade, visibilidade e propósito", current: true },
  { planet: "Chandra (Lua)", start: "2027", end: "2037", years: 10, theme: "Vida emocional, família e cuidado", current: false },
  { planet: "Mangala (Marte)", start: "2037", end: "2044", years: 7, theme: "Ação, coragem e disputas", current: false },
  { planet: "Rahu", start: "2044", end: "2062", years: 18, theme: "Expansão material e ruptura de padrões", current: false },
  { planet: "Guru (Júpiter)", start: "2062", end: "2078", years: 16, theme: "Sabedoria, ensino e fé", current: false },
];

export const gunaScores: GunaScore[] = [
  { koota: "Varna", points: 1, max: 1 },
  { koota: "Vashya", points: 2, max: 2 },
  { koota: "Tara", points: 3, max: 3 },
  { koota: "Yoni", points: 3, max: 4 },
  { koota: "Graha Maitri", points: 4, max: 5 },
  { koota: "Gana", points: 6, max: 6 },
  { koota: "Bhakoot", points: 1, max: 7 },
  { koota: "Nadi", points: 8, max: 8 },
];

export const articles: Article[] = [
  {
    id: "a1",
    slug: "nakshatras-guia-pratico",
    title: "Nakshatras: o guia prático das 27 mansões lunares",
    excerpt:
      "Por que a Lua é o coração do Jyotish e como a Nakshatra natal descreve o temperamento com precisão cirúrgica.",
    category: "Védica",
    tags: ["#AstrologiaVédica", "#Nakshatras"],
    author: "Arjun Mehta",
    date: "12/08/2026",
    readingTime: 11,
    sections: [
      {
        heading: "O que é uma Nakshatra",
        body: "As Nakshatras dividem a eclíptica em 27 setores de 13°20', cada um regido por uma divindade e um graha. Enquanto o signo descreve o cenário, a Nakshatra descreve a textura fina do comportamento — é ali que o Jyotish ganha precisão diagnóstica.",
      },
      {
        heading: "Padas e sub-divisões",
        body: "Cada Nakshatra se divide em quatro padas de 3°20', que conectam a mansão lunar ao Navamsa. Esse cruzamento revela nuances de vocação, casamento e maturidade que o Rasi sozinho não mostra.",
      },
      {
        heading: "Aplicação na Dasha",
        body: "A Nakshatra da Lua natal define o ponto de partida da Vimshottari Dasha. Sem ela, não há cronologia védica possível: é literalmente o relógio do mapa.",
      },
      {
        heading: "Erros comuns de iniciante",
        body: "O mais frequente é usar o ayanamsa errado. Lahiri é o padrão da escola; mudar de ayanamsa desloca posições e pode trocar a Nakshatra da Lua — e, com ela, toda a previsão.",
      },
    ],
  },
  {
    id: "a2",
    slug: "sinastria-alem-de-venus-e-marte",
    title: "Sinastria além de Vênus e Marte",
    excerpt:
      "Sobreposição de casas, regentes cruzados e nodos: o que realmente sustenta um vínculo no longo prazo.",
    category: "Relacionamentos",
    tags: ["#Sinastria", "#Relacionamentos"],
    author: "Helena Moraes",
    date: "28/07/2026",
    readingTime: 9,
    sections: [
      {
        heading: "A atração não é o vínculo",
        body: "Contatos Vênus–Marte explicam a química inicial, mas raramente a permanência. O que sustenta é a sobreposição de casas: onde os planetas de uma pessoa caem na estrutura de vida da outra.",
      },
      {
        heading: "Regentes cruzados",
        body: "Quando o regente do Ascendente de A toca o Ascendente de B, existe reconhecimento de identidade. É um dos indicadores mais estáveis de convivência.",
      },
      {
        heading: "O eixo nodal na sinastria",
        body: "Contatos com os nodos descrevem sensação de destino. Não confunda intensidade com saúde do vínculo — esse é um limite ético central na leitura.",
      },
    ],
  },
  {
    id: "a3",
    slug: "mapa-draconico-o-que-e",
    title: "Mapa Dracônico: quando a alma fala antes da personalidade",
    excerpt:
      "Como recalcular o mapa a partir do Nodo Norte em Áries e o que a sobreposição revela sobre o propósito.",
    category: "Dracônica",
    tags: ["#Dracônica", "#Kármica"],
    author: "Isis Barreto",
    date: "03/07/2026",
    readingTime: 8,
    sections: [
      {
        heading: "A mecânica do cálculo",
        body: "Coloca-se o Nodo Norte em 0° de Áries e giram-se todas as posições pela mesma diferença. O resultado é uma segunda camada do mesmo mapa.",
      },
      {
        heading: "Conjunções dracônico–tropical",
        body: "Quando um planeta ocupa quase o mesmo grau nos dois mapas, alma e persona estão alinhadas naquele tema. É o ponto de maior naturalidade da vida.",
      },
      {
        heading: "Leitura responsável",
        body: "Dracônica não determina destino. Ela oferece uma narrativa de sentido — e narrativa exige cuidado clínico.",
      },
    ],
  },
  {
    id: "a4",
    slug: "transitos-de-saturno-sem-medo",
    title: "Trânsitos de Saturno sem catastrofismo",
    excerpt:
      "Um protocolo de previsão que informa sem assustar, com linguagem ética para a consulta.",
    category: "Previsões",
    tags: ["#Previsões", "#Ética"],
    author: "Marina Salles",
    date: "19/06/2026",
    readingTime: 7,
    sections: [
      {
        heading: "O problema do determinismo",
        body: "Dizer 'você vai perder o emprego' transforma o astrólogo em profeta e o cliente em refém. Descreva o ciclo, não a sentença.",
      },
      {
        heading: "Protocolo em três frases",
        body: "Nomeie o tema, descreva a janela temporal e ofereça a pergunta útil. Essa estrutura mantém a consulta informativa e não invasiva.",
      },
      {
        heading: "Quando encaminhar",
        body: "Sofrimento psíquico agudo não é campo da astrologia. Ter uma rede de encaminhamento faz parte do preparo profissional.",
      },
    ],
  },
  {
    id: "a5",
    slug: "kundali-matching-uso-etico",
    title: "Kundali Matching: uso ético dos 36 Gunas",
    excerpt:
      "Pontuação alta não é garantia e pontuação baixa não é condenação. Como contextualizar o Guna Milan.",
    category: "Védica",
    tags: ["#AstrologiaVédica", "#Sinastria"],
    author: "Priya Nair",
    date: "05/06/2026",
    readingTime: 10,
    sections: [
      {
        heading: "O que os Kootas medem",
        body: "Os oito Kootas avaliam compatibilidades distintas — física, mental, energética e genética simbólica. Somá-los sem contexto empobrece a análise.",
      },
      {
        heading: "Nadi e Bhakoot dosha",
        body: "São os pesos mais altos e também os mais mal usados. Existem regras clássicas de cancelamento que a maioria dos apps ignora.",
      },
      {
        heading: "O papel do astrólogo",
        body: "Traduzir o número em conversa. O Guna Milan é ponto de partida do diálogo, nunca veredito sobre uma união.",
      },
    ],
  },
  {
    id: "a6",
    slug: "precificacao-consultas-astrologicas",
    title: "Como precificar consultas astrológicas",
    excerpt:
      "Custo, tempo de preparo, posicionamento e pacotes: uma metodologia simples para não trabalhar de graça.",
    category: "Carreira",
    tags: ["#Carreira", "#Ética"],
    author: "Marina Salles",
    date: "21/05/2026",
    readingTime: 6,
    sections: [
      {
        heading: "Conte o tempo invisível",
        body: "Uma consulta de 90 minutos costuma exigir 2h de preparo e 30min de pós-atendimento. Precificar só a hora de fala é o erro mais comum.",
      },
      {
        heading: "Pacotes e recorrência",
        body: "Retorno anual e acompanhamento trimestral estabilizam a agenda e melhoram a qualidade do trabalho.",
      },
      {
        heading: "Transparência de escopo",
        body: "Diga por escrito o que a consulta entrega e o que não entrega. Isso reduz frustração e protege os dois lados.",
      },
    ],
  },
];

export const mentorshipPrograms: MentorshipProgram[] = [
  {
    id: "m1",
    title: "Precificação e Modelo de Negócio",
    description:
      "Construa sua tabela de preços, pacotes e política de reagendamento com base em custo real e posicionamento.",
    duration: "4 encontros",
    topics: ["Custo-hora e tempo de preparo", "Pacotes e recorrência", "Política de cancelamento"],
  },
  {
    id: "m2",
    title: "Transparência com o Cliente",
    description:
      "Contrato de atendimento, escopo claro, consentimento informado e comunicação sem promessas mágicas.",
    duration: "3 encontros",
    topics: ["Contrato de consulta", "Consentimento informado", "Marketing honesto"],
  },
  {
    id: "m3",
    title: "Postura Ética na Leitura Previsional",
    description:
      "Como falar de trânsitos difíceis, riscos e prazos sem determinismo e sem induzir medo.",
    duration: "5 encontros",
    topics: ["Linguagem não determinista", "Temas sensíveis", "Rede de encaminhamento"],
  },
  {
    id: "m4",
    title: "Gestão de Consultório Digital",
    description:
      "Agenda, gravações, arquivos de mapas, LGPD e organização do acervo de clientes.",
    duration: "4 encontros",
    topics: ["Agenda e automações", "Guarda de dados e LGPD", "Acervo de mapas"],
  },
];

export const plans: Plan[] = [
  {
    id: "p1",
    name: "Explorador",
    price: "R$ 49",
    period: "/mês",
    highlight: false,
    features: [
      "Acesso a 12 cursos iniciantes",
      "Astro-Tools básico (mapa natal)",
      "Portal de artigos completo",
      "Comunidade de alunos",
    ],
  },
  {
    id: "p2",
    name: "Formação Pro",
    price: "R$ 129",
    period: "/mês",
    highlight: true,
    features: [
      "Todos os cursos e trilhas",
      "Astro-Tools completo (Sideral, Dracônica, Dashas)",
      "Banco de Mapas com notas de estudo",
      "Certificados de formação",
      "Encontros mensais ao vivo",
    ],
  },
  {
    id: "p3",
    name: "Mentoria VIP",
    price: "R$ 397",
    period: "/mês",
    highlight: false,
    features: [
      "Tudo do Formação Pro",
      "Mentoria individual quinzenal",
      "Supervisão de casos reais",
      "Código de ética e consultoria clínica",
      "Suporte prioritário de carreira",
    ],
  },
];

export const megaMenu = {
  cursos: [
    {
      title: "Astrologia Ocidental",
      items: ["Moderna", "Tradicional", "Dracônica (Mapa da Alma)"],
      slug: "astrologia-moderna-fundamentos",
    },
    {
      title: "Astrologia Védica (Jyotish)",
      items: ["Grahas", "Nakshatras", "Dashas", "Leitura de Rasi"],
      slug: "jyotish-grahas-nakshatras",
    },
    {
      title: "Relacionamentos",
      items: ["Sinastria", "Mapas Compostos", "Kundali Matching Védico"],
      slug: "sinastria-mapas-compostos",
    },
    {
      title: "Previsões & Kármica",
      items: ["Padrões Kármicos", "Trânsitos", "Análise do Destino"],
      slug: "transitos-e-padroes-karmicos",
    },
    {
      title: "Carreira & Atendimento",
      items: ["Ética Profissional", "Consultoria Clínica", "Mentoria"],
      slug: "etica-e-consultoria",
    },
  ],
  tools: [
    { title: "Gerador de Mapa Natal", desc: "Tropical e Sideral (Lahiri)", tab: "natal" },
    { title: "Sinastria & Kundali Matching", desc: "Comparador com 36 Gunas", tab: "sinastria" },
    { title: "Astrologia Dracônica", desc: "Nodos lunares e posições da alma", tab: "draconico" },
    { title: "Dashas & Trânsitos", desc: "Linha do tempo Vimshottari", tab: "dashas" },
  ],
};

export function getCourseBySlug(slug: string) {
  return courses.find((c) => c.slug === slug);
}

export function getArticleBySlug(slug: string) {
  return articles.find((a) => a.slug === slug);
}
