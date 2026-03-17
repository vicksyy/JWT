import { ShieldEllipsis } from "lucide-react";
import { redirect } from "next/navigation";

import { LoginForm } from "@/components/login-form";
import { getSession } from "@/lib/auth";

export default async function LoginPage() {
  const session = await getSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="relative isolate min-h-screen overflow-hidden px-6 py-10 sm:px-10">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl items-center justify-center">
        <section className="mx-auto flex w-full max-w-xl flex-col gap-6">
          <div className="inline-flex items-center gap-2 rounded-xl border border-[#FAF33E]/30 bg-[#FAF33E]/10 px-4 py-2 text-sm font-semibold text-[#FAF33E] backdrop-blur">
            <ShieldEllipsis className="size-4" />
            Autenticación JWT
          </div>

          <LoginForm />
        </section>
      </div>
    </main>
  );
}
