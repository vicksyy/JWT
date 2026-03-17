import { JWT_COOKIE } from "@/lib/auth-config";

function base64UrlToUint8Array(input: string) {
  const normalized = input.replace(/-/g, "+").replace(/_/g, "/");
  const padding = normalized.length % 4 === 0 ? "" : "=".repeat(4 - (normalized.length % 4));
  const decoded = atob(`${normalized}${padding}`);

  return Uint8Array.from(decoded, (char) => char.charCodeAt(0));
}

function decodePayload(token: string) {
  const [, payload] = token.split(".");

  if (!payload) {
    throw new Error("JWT inválido");
  }

  const decoded = new TextDecoder().decode(base64UrlToUint8Array(payload));
  return JSON.parse(decoded) as { exp?: number };
}

export async function verifyEdgeToken(token: string, secret: string) {
  const [header, payload, signature] = token.split(".");

  if (!header || !payload || !signature) {
    throw new Error("JWT incompleto");
  }

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signedContent = new TextEncoder().encode(`${header}.${payload}`);
  const expectedSignature = await crypto.subtle.sign("HMAC", key, signedContent);
  const expectedSignatureBytes = new Uint8Array(expectedSignature);
  const tokenSignatureBytes = base64UrlToUint8Array(signature);

  if (expectedSignatureBytes.length !== tokenSignatureBytes.length) {
    throw new Error("Firma JWT inválida");
  }

  const isSame = expectedSignatureBytes.every(
    (byte, index) => byte === tokenSignatureBytes[index]
  );

  if (!isSame) {
    throw new Error("Firma JWT inválida");
  }

  const decodedPayload = decodePayload(token);

  if (decodedPayload.exp && decodedPayload.exp <= Math.floor(Date.now() / 1000)) {
    throw new Error("JWT expirado");
  }

  return decodedPayload;
}

export function getEdgeJwtCookieName() {
  return JWT_COOKIE;
}
