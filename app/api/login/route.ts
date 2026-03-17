import { NextResponse } from "next/server";

import { createToken, getJwtCookieName, getJwtMaxAgeSeconds } from "@/lib/auth";
import { DEMO_USER } from "@/lib/constants";

export async function POST(request: Request) {
  try {
    const { email, password } = (await request.json()) as {
      email?: string;
      password?: string;
    };

    if (email !== DEMO_USER.email || password !== DEMO_USER.password) {
      return NextResponse.json(
        { error: "Credenciales incorrectas. Prueba con admin@tomates.com / 1234." },
        { status: 401 }
      );
    }

    const token = await createToken({
      id: DEMO_USER.id,
      name: DEMO_USER.name,
      email: DEMO_USER.email,
      role: DEMO_USER.role
    });

    const response = NextResponse.json({
      ok: true,
      token,
      user: {
        id: DEMO_USER.id,
        name: DEMO_USER.name,
        email: DEMO_USER.email,
        role: DEMO_USER.role
      }
    });

    response.cookies.set({
      name: getJwtCookieName(),
      value: token,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: getJwtMaxAgeSeconds()
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: "No se pudo procesar la autenticación." },
      { status: 400 }
    );
  }
}
