import { TimerReset } from "lucide-react";

import { LogoutButton } from "@/components/logout-button";
import type { AuthUser } from "@/lib/auth";

type DashboardHeaderProps = {
  user: AuthUser;
};

export function DashboardHeader({ user }: DashboardHeaderProps) {
  return (
    <header className="space-y-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-2">
          <div className="space-y-3">
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl xl:text-6xl">
              Bienvenido, {user.name}
            </h1>
            <p className="max-w-2xl text-sm leading-7 text-white/62 sm:text-base">Panel privado con JWT.</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 lg:items-end">
          <div className="flex flex-wrap items-center gap-3 text-sm text-white/72 lg:justify-end">
            <span className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
              <span className="size-2 rounded-full bg-[#F0386B]" />
              Sesión activa
            </span>
            <span className="inline-flex items-center gap-2 text-[#FAF33E]">
              <TimerReset className="size-4" />
              30 min
            </span>
          </div>
          <LogoutButton />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Nombre", value: user.name },
          { label: "Correo", value: user.email, breakValue: true },
          { label: "Rol", value: user.role },
          { label: "ID", value: user.id, breakValue: true }
        ].map((item) => (
          <div
            key={item.label}
            className="min-w-0 rounded-xl border border-white/10 bg-white/5 px-4 py-4"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-[#FF5376]">{item.label}</p>
            <p
              className={`mt-2 text-sm font-medium text-white/88 ${
                item.breakValue ? "break-all" : "break-words"
              }`}
            >
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </header>
  );
}
