/// <reference types="@cloudflare/workers-types" />

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      blog_db: D1Database;
    }
  }
}

export {};
