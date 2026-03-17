import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

import { JWT_ALGORITHM, JWT_COOKIE, JWT_MAX_AGE_SECONDS } from "@/lib/auth-config";

const encoder = new TextEncoder();

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: string;
};

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET no está definido en las variables de entorno.");
  }

  return encoder.encode(secret);
}

export async function createToken(user: AuthUser) {
  return new SignJWT(user)
    .setProtectedHeader({ alg: JWT_ALGORITHM })
    .setIssuedAt()
    .setExpirationTime(`${JWT_MAX_AGE_SECONDS}s`)
    .sign(getJwtSecret());
}

export async function verifyToken(token: string) {
  const { payload } = await jwtVerify<AuthUser>(token, getJwtSecret());
  return payload;
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(JWT_COOKIE)?.value;

  if (!token) {
    return null;
  }

  try {
    const payload = await verifyToken(token);

    return {
      token,
      user: {
        id: payload.id,
        name: payload.name,
        email: payload.email,
        role: payload.role
      }
    };
  } catch {
    return null;
  }
}

export function getJwtCookieName() {
  return JWT_COOKIE;
}

export function getJwtMaxAgeSeconds() {
  return JWT_MAX_AGE_SECONDS;
}
