import {
  Boxes,
  Code2,
  GitBranch,
  Hand,
  ListTree,
  Navigation,
  Route,
  ServerCog,
  Share2
} from "lucide-react";
import { redirect } from "next/navigation";

import { DashboardHeader } from "@/components/dashboard-header";
import { HtmlTagsChart } from "@/components/html-tags-chart";
import { InfoCard } from "@/components/info-card";
import { COURSE_FUNCTIONS, type CourseIconName, HTML_TAG_USAGE } from "@/lib/constants";
import { getSession } from "@/lib/auth";

const courseIcons: Record<CourseIconName, typeof GitBranch> = {
  state: GitBranch,
  blocks: Boxes,
  share: Share2,
  route: Route,
  code: Code2,
  list: ListTree,
  pointer: Hand,
  navigation: Navigation,
  server: ServerCog
} as const;

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen px-6 py-8 sm:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <DashboardHeader user={session.user} />

        <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <section className="flex h-full flex-col rounded-2xl border border-white/10 bg-[#171219]/84 p-7 shadow-panel backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FAF33E]">
              HTML
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-white">15 etiquetas más usadas</h2>
            <p className="mt-2 text-sm text-white/62">Frecuencia de uso aproximada.</p>

            <div className="mt-6 w-full min-w-0 self-center">
              <HtmlTagsChart data={HTML_TAG_USAGE} />
            </div>
          </section>

          <InfoCard
            eyebrow="Curso"
            title="Funciones y recursos usados en clase"
            description="Resumen de funciones usadas en clase."
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {COURSE_FUNCTIONS.map((item) => (
                <article key={item.name} className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-start gap-4">
                    <div className="rounded-xl bg-[#225560]/28 p-2.5 text-[#FAF33E]">
                      {(() => {
                        const Icon = courseIcons[item.icon];
                        return <Icon className="size-5" />;
                      })()}
                    </div>
                    <div className="min-w-0">
                      <p className="text-base font-semibold text-white">{item.name}</p>
                      <p className="mt-1.5 text-sm leading-relaxed text-white/68">{item.description}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </InfoCard>
        </section>
      </div>
    </main>
  );
}
