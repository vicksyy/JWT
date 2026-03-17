import type { ReactNode } from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type InfoCardProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
};

export function InfoCard({ eyebrow, title, description, children }: InfoCardProps) {
  return (
    <Card className="h-full border-white/10 bg-[#171219]/82">
      <CardHeader className="space-y-3">
        <span className="text-xs font-semibold uppercase tracking-[0.26em] text-[#FAF33E]">
          {eyebrow}
        </span>
        <CardTitle className="text-2xl text-white">{title}</CardTitle>
        <CardDescription className="text-white/68">{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
