import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Award, Clock, Compass, Heart, Moon, Sparkles, TrendingUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { categoryLabels, seniorityLabels } from "@/data/mockData";
import type { Course, CourseCategory } from "@/types/astrology";

const categoryIcon: Record<CourseCategory, typeof Moon> = {
  ocidental: Sparkles,
  vedica: Moon,
  relacionamentos: Heart,
  previsoes: TrendingUp,
  carreira: Compass,
};

export function CourseCard({ course }: { course: Course }) {
  const Icon = categoryIcon[course.category];

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="h-full"
    >
      <Link
        to="/curso/$slug"
        params={{ slug: course.slug }}
        className="surface-panel flex h-full w-full flex-col overflow-hidden transition-shadow hover:glow-violet"
      >
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src={course.cover}
            alt={course.title}
            loading="lazy"
            width={1024}
            height={640}
            className="size-full object-cover opacity-80 transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute left-3 top-3 flex items-center gap-2">
            <Badge className="border-0 bg-background/80 text-xs text-primary backdrop-blur">
              <Icon className="mr-1 size-3" />
              {categoryLabels[course.category]}
            </Badge>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-4">
          <div className="flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
            <span className="rounded-full border border-border px-2 py-0.5">
              {seniorityLabels[course.level]}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="size-3" />
              {course.hours}h
            </span>
            {course.certificate && (
              <span className="flex items-center gap-1 text-primary">
                <Award className="size-3" />
                Certificado
              </span>
            )}
          </div>

          <h3 className="mt-3 font-display text-base font-semibold leading-snug">
            {course.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {course.description}
          </p>

          <div className="mt-auto pt-4">
            <div className="mb-1.5 flex justify-between text-[11px] text-muted-foreground">
              <span>{course.instructor}</span>
              <span>{course.progress}%</span>
            </div>
            <Progress value={course.progress} className="h-1.5" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
