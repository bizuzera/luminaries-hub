export type Seniority = "iniciante" | "intermediario" | "avancado";

export type CourseCategory =
  | "ocidental"
  | "vedica"
  | "relacionamentos"
  | "previsoes"
  | "carreira";

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  summary: string;
  materials: { label: string; type: "pdf" | "tabela" | "planilha" }[];
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: CourseCategory;
  level: Seniority;
  hours: number;
  certificate: boolean;
  progress: number;
  instructor: string;
  cover: string;
  modules: Module[];
}

export interface LearningTrack {
  id: string;
  title: string;
  description: string;
  level: Seniority;
  progress: number;
  courseSlugs: string[];
}

export interface PlanetPosition {
  planet: string;
  sign: string;
  degree: string;
  house: number;
  retrograde: boolean;
}

export interface AstrologicalChart {
  id: string;
  name: string;
  birthDate: string;
  birthTime: string;
  city: string;
  system: "tropical" | "sideral";
  tags: string[];
  notes: string;
  positions: PlanetPosition[];
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  author: string;
  date: string;
  readingTime: number;
  sections: { heading: string; body: string }[];
}

export interface MentorshipProgram {
  id: string;
  title: string;
  description: string;
  duration: string;
  topics: string[];
}

export interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  highlight: boolean;
  features: string[];
}

export interface DashaPeriod {
  planet: string;
  start: string;
  end: string;
  years: number;
  theme: string;
  current: boolean;
}

export interface GunaScore {
  koota: string;
  points: number;
  max: number;
}
