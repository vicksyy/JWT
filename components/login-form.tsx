"use client";

import { FormEvent, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LoaderCircle, LockKeyhole, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    startTransition(async () => {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setError(data.error ?? "No se pudo iniciar sesión.");
        return;
      }

      router.replace("/dashboard");
      router.refresh();
    });
  }

  return (
    <Card className="overflow-hidden border-white/10 bg-[#171219]/82">
      <CardHeader className="space-y-3 pb-2">
        <CardTitle className="text-3xl text-white">Iniciar sesión</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-white/45" />
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="admin@tomates.com"
                defaultValue="admin@tomates.com"
                className="pl-11"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <div className="relative">
              <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-white/45" />
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="1234"
                defaultValue="1234"
                className="pl-11 pr-12"
                required
              />
              <button
                type="button"
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/45 transition hover:text-white"
                onClick={() => setShowPassword((current) => !current)}
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          {error ? (
            <p className="rounded-2xl border border-[#FF5376]/35 bg-[#FF5376]/12 px-4 py-3 text-sm text-[#FFD7E1]">
              {error}
            </p>
          ) : null}

          <Button type="submit" className="w-full" size="lg" disabled={isPending}>
            {isPending ? <LoaderCircle className="size-4 animate-spin" /> : null}
            Entrar
          </Button>

          <div className="px-1 text-sm">
            <p className="font-medium text-[#8b8b95]">Credenciales demo:</p>
            <p className="text-[#6f6f78]">Usuario: admin@tomates.com</p>
            <p className="text-[#6f6f78]">Contraseña: 1234</p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
