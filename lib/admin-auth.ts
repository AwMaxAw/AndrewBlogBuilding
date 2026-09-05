import { createToken, verifyToken, getTokenFromHeader } from "./auth";

// 管理后台密码，可通过环境变量 ADMIN_PASSWORD 配置
// 默认密码为 "admin123"，生产环境务必修改
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

// 用密码作为 HMAC secret 来签发 token
const TOKEN_SECRET = process.env.ADMIN_SECRET || ADMIN_PASSWORD + "_token_secret";

export async function login(password: string): Promise<string | null> {
  if (password !== ADMIN_PASSWORD) return null;
  return createToken(TOKEN_SECRET);
}

export async function verifyAdminRequest(req: Request): Promise<boolean> {
  // 先检查 Authorization header，再检查 cookie
  const token = getTokenFromHeader(req) || getTokenFromCookie(req);
  if (!token) return false;
  return verifyToken(token, TOKEN_SECRET);
}

export function getAdminToken(req: Request): string | null {
  return getTokenFromHeader(req);
}

// 用于从 cookie 中获取 token（管理后台页面使用）
export function getTokenFromCookie(req: Request): string | null {
  const cookie = req.headers.get("cookie");
  if (!cookie) return null;
  const match = cookie.match(/admin_token=([^;]+)/);
  if (!match) return null;
  try {
    return decodeURIComponent(match[1]);
  } catch {
    return match[1];
  }
}

export async function verifyAdminCookie(req: Request): Promise<boolean> {
  const token = getTokenFromCookie(req);
  if (!token) return false;
  return verifyToken(token, TOKEN_SECRET);
}
