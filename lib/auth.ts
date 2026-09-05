// 简单的 HMAC token 认证
const encoder = new TextEncoder();

async function sign(data: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(data));
  return btoa(String.fromCharCode(...new Uint8Array(sig))).replace(/=+$/, "");
}

export async function createToken(secret: string): Promise<string> {
  const exp = Date.now() + 1000 * 60 * 60 * 24; // 24 hours
  const payload = btoa(JSON.stringify({ exp }));
  const signature = await sign(payload, secret);
  return `${payload}.${signature}`;
}

export async function verifyToken(token: string, secret: string): Promise<boolean> {
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  const expectedSig = await sign(payload, secret);
  if (signature !== expectedSig) return false;

  try {
    const data = JSON.parse(atob(payload));
    return data.exp > Date.now();
  } catch {
    return false;
  }
}

export function getTokenFromHeader(req: Request): string | null {
  const auth = req.headers.get("authorization");
  if (auth?.startsWith("Bearer ")) {
    return auth.slice(7);
  }
  return null;
}
