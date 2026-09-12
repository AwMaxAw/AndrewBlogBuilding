/// <reference types="@cloudflare/workers-types" />

// Next.js webpack provides import.meta.glob at build time,
// but TS needs an explicit type declaration.
interface ImportMeta {
  glob(
    pattern: string,
    options?: { query?: string; import?: string; eager?: boolean; as?: string }
  ): Record<string, unknown>;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      blog_db: D1Database;
    }
  }
}

export {};
