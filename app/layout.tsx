import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "JWT Tomatoes",
  description: "Autenticación JWT con Next.js."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
