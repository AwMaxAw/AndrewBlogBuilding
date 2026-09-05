import { NextRequest, NextResponse } from "next/server";
import { login, verifyAdminRequest } from "@/lib/admin-auth";

export const runtime = "edge";

// 登录
export async function POST(req: NextRequest) {
  const body = (await req.json()) as { password?: string };
  const token = await login(body.password || "");

  if (!token) {
    return NextResponse.json({ error: "密码错误" }, { status: 401 });
  }

  // 设置 cookie
  const res = NextResponse.json({ success: true, token });
  res.cookies.set("admin_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24, // 24 小时
  });
  return res;
}

// 验证登录状态
export async function GET(req: NextRequest) {
  const valid = await verifyAdminRequest(req);
  return NextResponse.json({ authenticated: valid });
}
