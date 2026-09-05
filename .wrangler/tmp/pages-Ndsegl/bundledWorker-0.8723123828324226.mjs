var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// _worker.js/index.js
import("node:buffer").then(({ Buffer: Buffer2 }) => {
  globalThis.Buffer = Buffer2;
}).catch(() => null);
var __ALSes_PROMISE__ = import("node:async_hooks").then(({ AsyncLocalStorage }) => {
  globalThis.AsyncLocalStorage = AsyncLocalStorage;
  const envAsyncLocalStorage = new AsyncLocalStorage();
  const requestContextAsyncLocalStorage = new AsyncLocalStorage();
  globalThis.process = {
    env: new Proxy(
      {},
      {
        ownKeys: /* @__PURE__ */ __name(() => Reflect.ownKeys(envAsyncLocalStorage.getStore()), "ownKeys"),
        getOwnPropertyDescriptor: /* @__PURE__ */ __name((_2, ...args) => Reflect.getOwnPropertyDescriptor(envAsyncLocalStorage.getStore(), ...args), "getOwnPropertyDescriptor"),
        get: /* @__PURE__ */ __name((_2, property) => Reflect.get(envAsyncLocalStorage.getStore(), property), "get"),
        set: /* @__PURE__ */ __name((_2, property, value) => Reflect.set(envAsyncLocalStorage.getStore(), property, value), "set")
      }
    )
  };
  globalThis[/* @__PURE__ */ Symbol.for("__cloudflare-request-context__")] = new Proxy(
    {},
    {
      ownKeys: /* @__PURE__ */ __name(() => Reflect.ownKeys(requestContextAsyncLocalStorage.getStore()), "ownKeys"),
      getOwnPropertyDescriptor: /* @__PURE__ */ __name((_2, ...args) => Reflect.getOwnPropertyDescriptor(requestContextAsyncLocalStorage.getStore(), ...args), "getOwnPropertyDescriptor"),
      get: /* @__PURE__ */ __name((_2, property) => Reflect.get(requestContextAsyncLocalStorage.getStore(), property), "get"),
      set: /* @__PURE__ */ __name((_2, property, value) => Reflect.set(requestContextAsyncLocalStorage.getStore(), property, value), "set")
    }
  );
  return { envAsyncLocalStorage, requestContextAsyncLocalStorage };
}).catch(() => null);
var se = Object.create;
var H = Object.defineProperty;
var re = Object.getOwnPropertyDescriptor;
var ne = Object.getOwnPropertyNames;
var oe = Object.getPrototypeOf;
var ie = Object.prototype.hasOwnProperty;
var M = /* @__PURE__ */ __name((e, t) => () => (e && (t = e(e = 0)), t), "M");
var V = /* @__PURE__ */ __name((e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports), "V");
var ce = /* @__PURE__ */ __name((e, t, s, a) => {
  if (t && typeof t == "object" || typeof t == "function") for (let n of ne(t)) !ie.call(e, n) && n !== s && H(e, n, { get: /* @__PURE__ */ __name(() => t[n], "get"), enumerable: !(a = re(t, n)) || a.enumerable });
  return e;
}, "ce");
var $ = /* @__PURE__ */ __name((e, t, s) => (s = e != null ? se(oe(e)) : {}, ce(t || !e || !e.__esModule ? H(s, "default", { value: e, enumerable: true }) : s, e)), "$");
var f;
var l = M(() => {
  f = { collectedLocales: [] };
});
var g;
var u = M(() => {
  g = { version: 3, routes: { none: [{ src: "^(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))/$", headers: { Location: "/$1" }, status: 308, continue: true }, { src: "^/_next/__private/trace$", dest: "/404", status: 404, continue: true }, { src: "^/404/?$", status: 404, continue: true, missing: [{ type: "header", key: "x-prerender-revalidate" }] }, { src: "^/500$", status: 500, continue: true }, { src: "^/?$", has: [{ type: "header", key: "rsc", value: "1" }], dest: "/index.rsc", headers: { vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }, continue: true, override: true }, { src: "^/((?!.+\\.rsc).+?)(?:/)?$", has: [{ type: "header", key: "rsc", value: "1" }], dest: "/$1.rsc", headers: { vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }, continue: true, override: true }], filesystem: [{ src: "^/index(\\.action|\\.rsc)$", dest: "/", continue: true }, { src: "^/_next/data/(.*)$", dest: "/_next/data/$1", check: true }, { src: "^/\\.prefetch\\.rsc$", dest: "/__index.prefetch.rsc", check: true }, { src: "^/(.+)/\\.prefetch\\.rsc$", dest: "/$1.prefetch.rsc", check: true }, { src: "^/\\.rsc$", dest: "/index.rsc", check: true }, { src: "^/(.+)/\\.rsc$", dest: "/$1.rsc", check: true }], miss: [{ src: "^/_next/static/.+$", status: 404, check: true, dest: "/_next/static/not-found.txt", headers: { "content-type": "text/plain; charset=utf-8" } }], rewrite: [{ src: "^/_next/data/(.*)$", dest: "/404", status: 404 }, { src: "^/blog/(?<nxtPslug>[^/]+?)(?:\\.rsc)(?:/)?$", dest: "/blog/[slug].rsc?nxtPslug=$nxtPslug" }, { src: "^/blog/(?<nxtPslug>[^/]+?)(?:/)?$", dest: "/blog/[slug]?nxtPslug=$nxtPslug" }, { src: "^/changelog/(?<nxtPslug>[^/]+?)(?:\\.rsc)(?:/)?$", dest: "/changelog/[slug].rsc?nxtPslug=$nxtPslug" }, { src: "^/changelog/(?<nxtPslug>[^/]+?)(?:/)?$", dest: "/changelog/[slug]?nxtPslug=$nxtPslug" }, { src: "^/docs(?:/(?<nxtPslug>.+?))?(?:\\.rsc)(?:/)?$", dest: "/docs/[[...slug]].rsc?nxtPslug=$nxtPslug" }, { src: "^/docs(?:/(?<nxtPslug>.+?))?(?:/)?$", dest: "/docs/[[...slug]]?nxtPslug=$nxtPslug" }], resource: [{ src: "^/.*$", status: 404 }], hit: [{ src: "^/_next/static/(?:[^/]+/pages|pages|chunks|runtime|css|image|media|ZlVbiKVLa7k0PUAewS58u)/.+$", headers: { "cache-control": "public,max-age=31536000,immutable" }, continue: true, important: true }, { src: "^/index(?:/)?$", headers: { "x-matched-path": "/" }, continue: true, important: true }, { src: "^/((?!index$).*?)(?:/)?$", headers: { "x-matched-path": "/$1" }, continue: true, important: true }], error: [{ src: "^/.*$", dest: "/404", status: 404, headers: { "x-next-error-status": "404" } }, { src: "^/.*$", dest: "/500", status: 500, headers: { "x-next-error-status": "500" } }] }, images: { domains: [], sizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840, 16, 32, 48, 64, 96, 128, 256, 384], remotePatterns: [], minimumCacheTTL: 60, formats: ["image/webp"], dangerouslyAllowSVG: false, contentSecurityPolicy: "script-src 'none'; frame-src 'none'; sandbox;", contentDispositionType: "inline" }, overrides: { "404.html": { path: "404", contentType: "text/html; charset=utf-8" }, "500.html": { path: "500", contentType: "text/html; charset=utf-8" }, "_app.rsc.json": { path: "_app.rsc", contentType: "application/json" }, "_error.rsc.json": { path: "_error.rsc", contentType: "application/json" }, "_document.rsc.json": { path: "_document.rsc", contentType: "application/json" }, "404.rsc.json": { path: "404.rsc", contentType: "application/json" }, "_next/static/not-found.txt": { contentType: "text/plain" } }, framework: { slug: "nextjs", version: "14.2.5" }, crons: [] };
});
var _;
var h = M(() => {
  _ = { "/404.html": { type: "override", path: "/404.html", headers: { "content-type": "text/html; charset=utf-8" } }, "/404.rsc.json": { type: "override", path: "/404.rsc.json", headers: { "content-type": "application/json" } }, "/500.html": { type: "override", path: "/500.html", headers: { "content-type": "text/html; charset=utf-8" } }, "/_app.rsc.json": { type: "override", path: "/_app.rsc.json", headers: { "content-type": "application/json" } }, "/_document.rsc.json": { type: "override", path: "/_document.rsc.json", headers: { "content-type": "application/json" } }, "/_error.rsc.json": { type: "override", path: "/_error.rsc.json", headers: { "content-type": "application/json" } }, "/_next/static/ZlVbiKVLa7k0PUAewS58u/_buildManifest.js": { type: "static" }, "/_next/static/ZlVbiKVLa7k0PUAewS58u/_ssgManifest.js": { type: "static" }, "/_next/static/chunks/231-39ba487928325fc9.js": { type: "static" }, "/_next/static/chunks/526-9ea1a71e6298c2fb.js": { type: "static" }, "/_next/static/chunks/app/_not-found/page-f444ca605ac6cf0d.js": { type: "static" }, "/_next/static/chunks/app/about/page-6d70ba9054598bd9.js": { type: "static" }, "/_next/static/chunks/app/blog/[slug]/page-246a6d688f115f74.js": { type: "static" }, "/_next/static/chunks/app/blog/page-58b474c539cd136d.js": { type: "static" }, "/_next/static/chunks/app/changelog/[slug]/page-899292daaf4e3dc7.js": { type: "static" }, "/_next/static/chunks/app/changelog/page-a71413f920da4f56.js": { type: "static" }, "/_next/static/chunks/app/docs/[[...slug]]/page-da6ef9c133879517.js": { type: "static" }, "/_next/static/chunks/app/layout-15beeb89d0e31bbb.js": { type: "static" }, "/_next/static/chunks/app/more/page-d5b41b3188eb96eb.js": { type: "static" }, "/_next/static/chunks/app/page-60a39e6a830901c8.js": { type: "static" }, "/_next/static/chunks/app/search/page-4505b5b0190b3101.js": { type: "static" }, "/_next/static/chunks/fd9d1056-dd161187184bf178.js": { type: "static" }, "/_next/static/chunks/framework-f66176bb897dc684.js": { type: "static" }, "/_next/static/chunks/main-9cb7e7eb51af3369.js": { type: "static" }, "/_next/static/chunks/main-app-9f5037b3d4e09dc3.js": { type: "static" }, "/_next/static/chunks/pages/_app-6a626577ffa902a4.js": { type: "static" }, "/_next/static/chunks/pages/_error-1be831200e60c5c0.js": { type: "static" }, "/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js": { type: "static" }, "/_next/static/chunks/webpack-b92be795f7b5b54d.js": { type: "static" }, "/_next/static/css/872ca72b05604470.css": { type: "static" }, "/_next/static/media/19cfc7226ec3afaa-s.woff2": { type: "static" }, "/_next/static/media/21350d82a1f187e9-s.woff2": { type: "static" }, "/_next/static/media/28a2004cf8372660-s.woff2": { type: "static" }, "/_next/static/media/47f136985ef5b5cb-s.woff2": { type: "static" }, "/_next/static/media/4ead58c4dcc3f285-s.woff2": { type: "static" }, "/_next/static/media/8e9860b6e62d6359-s.woff2": { type: "static" }, "/_next/static/media/ba9851c3c22cd980-s.woff2": { type: "static" }, "/_next/static/media/c5fe6dc8356a8c31-s.woff2": { type: "static" }, "/_next/static/media/df0a9ae256c0569c-s.woff2": { type: "static" }, "/_next/static/media/e4af272ccee01ff0-s.p.woff2": { type: "static" }, "/_next/static/media/eaead17c7dbfcd5d-s.p.woff2": { type: "static" }, "/_next/static/not-found.txt": { type: "static" }, "/pic/IMG_9165.jpeg": { type: "static" }, "/pic/IMG_9166.png": { type: "static" }, "/docs/[[...slug]]": { type: "function", entrypoint: "__next-on-pages-dist__/functions/docs/[[...slug]].func.js" }, "/docs/[[...slug]].rsc": { type: "function", entrypoint: "__next-on-pages-dist__/functions/docs/[[...slug]].func.js" }, "/404": { type: "override", path: "/404.html", headers: { "content-type": "text/html; charset=utf-8" } }, "/500": { type: "override", path: "/500.html", headers: { "content-type": "text/html; charset=utf-8" } }, "/_app.rsc": { type: "override", path: "/_app.rsc.json", headers: { "content-type": "application/json" } }, "/_error.rsc": { type: "override", path: "/_error.rsc.json", headers: { "content-type": "application/json" } }, "/_document.rsc": { type: "override", path: "/_document.rsc.json", headers: { "content-type": "application/json" } }, "/404.rsc": { type: "override", path: "/404.rsc.json", headers: { "content-type": "application/json" } }, "/about.html": { type: "override", path: "/about.html", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/about/layout,_N_T_/about/page,_N_T_/about", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" } }, "/about": { type: "override", path: "/about.html", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/about/layout,_N_T_/about/page,_N_T_/about", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" } }, "/about.rsc": { type: "override", path: "/about.rsc", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/about/layout,_N_T_/about/page,_N_T_/about", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch", "content-type": "text/x-component" } }, "/blog/2024-mid-year-review.html": { type: "override", path: "/blog/2024-mid-year-review.html", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/blog/layout,_N_T_/blog/[slug]/layout,_N_T_/blog/[slug]/page,_N_T_/blog/2024-mid-year-review", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" } }, "/blog/2024-mid-year-review": { type: "override", path: "/blog/2024-mid-year-review.html", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/blog/layout,_N_T_/blog/[slug]/layout,_N_T_/blog/[slug]/page,_N_T_/blog/2024-mid-year-review", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" } }, "/blog/2024-mid-year-review.rsc": { type: "override", path: "/blog/2024-mid-year-review.rsc", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/blog/layout,_N_T_/blog/[slug]/layout,_N_T_/blog/[slug]/page,_N_T_/blog/2024-mid-year-review", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch", "content-type": "text/x-component" } }, "/blog/about-design-and-minimalism.html": { type: "override", path: "/blog/about-design-and-minimalism.html", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/blog/layout,_N_T_/blog/[slug]/layout,_N_T_/blog/[slug]/page,_N_T_/blog/about-design-and-minimalism", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" } }, "/blog/about-design-and-minimalism": { type: "override", path: "/blog/about-design-and-minimalism.html", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/blog/layout,_N_T_/blog/[slug]/layout,_N_T_/blog/[slug]/page,_N_T_/blog/about-design-and-minimalism", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" } }, "/blog/about-design-and-minimalism.rsc": { type: "override", path: "/blog/about-design-and-minimalism.rsc", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/blog/layout,_N_T_/blog/[slug]/layout,_N_T_/blog/[slug]/page,_N_T_/blog/about-design-and-minimalism", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch", "content-type": "text/x-component" } }, "/blog/hello-world.html": { type: "override", path: "/blog/hello-world.html", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/blog/layout,_N_T_/blog/[slug]/layout,_N_T_/blog/[slug]/page,_N_T_/blog/hello-world", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" } }, "/blog/hello-world": { type: "override", path: "/blog/hello-world.html", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/blog/layout,_N_T_/blog/[slug]/layout,_N_T_/blog/[slug]/page,_N_T_/blog/hello-world", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" } }, "/blog/hello-world.rsc": { type: "override", path: "/blog/hello-world.rsc", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/blog/layout,_N_T_/blog/[slug]/layout,_N_T_/blog/[slug]/page,_N_T_/blog/hello-world", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch", "content-type": "text/x-component" } }, "/blog.html": { type: "override", path: "/blog.html", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/blog/layout,_N_T_/blog/page,_N_T_/blog", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" } }, "/blog": { type: "override", path: "/blog.html", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/blog/layout,_N_T_/blog/page,_N_T_/blog", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" } }, "/blog.rsc": { type: "override", path: "/blog.rsc", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/blog/layout,_N_T_/blog/page,_N_T_/blog", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch", "content-type": "text/x-component" } }, "/changelog/site-launched.html": { type: "override", path: "/changelog/site-launched.html", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/changelog/layout,_N_T_/changelog/[slug]/layout,_N_T_/changelog/[slug]/page,_N_T_/changelog/site-launched", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" } }, "/changelog/site-launched": { type: "override", path: "/changelog/site-launched.html", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/changelog/layout,_N_T_/changelog/[slug]/layout,_N_T_/changelog/[slug]/page,_N_T_/changelog/site-launched", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" } }, "/changelog/site-launched.rsc": { type: "override", path: "/changelog/site-launched.rsc", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/changelog/layout,_N_T_/changelog/[slug]/layout,_N_T_/changelog/[slug]/page,_N_T_/changelog/site-launched", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch", "content-type": "text/x-component" } }, "/changelog.html": { type: "override", path: "/changelog.html", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/changelog/layout,_N_T_/changelog/page,_N_T_/changelog", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" } }, "/changelog": { type: "override", path: "/changelog.html", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/changelog/layout,_N_T_/changelog/page,_N_T_/changelog", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" } }, "/changelog.rsc": { type: "override", path: "/changelog.rsc", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/changelog/layout,_N_T_/changelog/page,_N_T_/changelog", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch", "content-type": "text/x-component" } }, "/index.html": { type: "override", path: "/index.html", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/page,_N_T_/", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" } }, "/index": { type: "override", path: "/index.html", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/page,_N_T_/", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" } }, "/": { type: "override", path: "/index.html", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/page,_N_T_/", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" } }, "/index.rsc": { type: "override", path: "/index.rsc", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/page,_N_T_/", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch", "content-type": "text/x-component" } }, "/more.html": { type: "override", path: "/more.html", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/more/layout,_N_T_/more/page,_N_T_/more", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" } }, "/more": { type: "override", path: "/more.html", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/more/layout,_N_T_/more/page,_N_T_/more", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" } }, "/more.rsc": { type: "override", path: "/more.rsc", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/more/layout,_N_T_/more/page,_N_T_/more", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch", "content-type": "text/x-component" } }, "/search.html": { type: "override", path: "/search.html", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/search/layout,_N_T_/search/page,_N_T_/search", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" } }, "/search": { type: "override", path: "/search.html", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/search/layout,_N_T_/search/page,_N_T_/search", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" } }, "/search.rsc": { type: "override", path: "/search.rsc", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/search/layout,_N_T_/search/page,_N_T_/search", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch", "content-type": "text/x-component" } } };
});
var q = V((ze, F) => {
  "use strict";
  l();
  u();
  h();
  function R(e, t) {
    e = String(e || "").trim();
    let s = e, a, n = "";
    if (/^[^a-zA-Z\\\s]/.test(e)) {
      a = e[0];
      let i = e.lastIndexOf(a);
      n += e.substring(i + 1), e = e.substring(1, i);
    }
    let r = 0;
    return e = he(e, (i) => {
      if (/^\(\?[P<']/.test(i)) {
        let c = /^\(\?P?[<']([^>']+)[>']/.exec(i);
        if (!c) throw new Error(`Failed to extract named captures from ${JSON.stringify(i)}`);
        let d = i.substring(c[0].length, i.length - 1);
        return t && (t[r] = c[1]), r++, `(${d})`;
      }
      return i.substring(0, 3) === "(?:" || r++, i;
    }), e = e.replace(/\[:([^:]+):\]/g, (i, c) => R.characterClasses[c] || i), new R.PCRE(e, n, s, n, a);
  }
  __name(R, "R");
  function he(e, t) {
    let s = 0, a = 0, n = false;
    for (let o = 0; o < e.length; o++) {
      let r = e[o];
      if (n) {
        n = false;
        continue;
      }
      switch (r) {
        case "(":
          a === 0 && (s = o), a++;
          break;
        case ")":
          if (a > 0 && (a--, a === 0)) {
            let i = o + 1, c = s === 0 ? "" : e.substring(0, s), d = e.substring(i), p = String(t(e.substring(s, i)));
            e = c + p + d, o = s;
          }
          break;
        case "\\":
          n = true;
          break;
        default:
          break;
      }
    }
    return e;
  }
  __name(he, "he");
  (function(e) {
    class t extends RegExp {
      static {
        __name(this, "t");
      }
      constructor(a, n, o, r, i) {
        super(a, n), this.pcrePattern = o, this.pcreFlags = r, this.delimiter = i;
      }
    }
    e.PCRE = t, e.characterClasses = { alnum: "[A-Za-z0-9]", word: "[A-Za-z0-9_]", alpha: "[A-Za-z]", blank: "[ \\t]", cntrl: "[\\x00-\\x1F\\x7F]", digit: "\\d", graph: "[\\x21-\\x7E]", lower: "[a-z]", print: "[\\x20-\\x7E]", punct: "[\\]\\[!\"#$%&'()*+,./:;<=>?@\\\\^_`{|}~-]", space: "\\s", upper: "[A-Z]", xdigit: "[A-Fa-f0-9]" };
  })(R || (R = {}));
  R.prototype = R.PCRE.prototype;
  F.exports = R;
});
var Q = V((U) => {
  "use strict";
  l();
  u();
  h();
  U.parse = Te;
  U.serialize = we;
  var Ne = Object.prototype.toString, k = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
  function Te(e, t) {
    if (typeof e != "string") throw new TypeError("argument str must be a string");
    for (var s = {}, a = t || {}, n = a.decode || ve, o = 0; o < e.length; ) {
      var r = e.indexOf("=", o);
      if (r === -1) break;
      var i = e.indexOf(";", o);
      if (i === -1) i = e.length;
      else if (i < r) {
        o = e.lastIndexOf(";", r - 1) + 1;
        continue;
      }
      var c = e.slice(o, r).trim();
      if (s[c] === void 0) {
        var d = e.slice(r + 1, i).trim();
        d.charCodeAt(0) === 34 && (d = d.slice(1, -1)), s[c] = Ce(d, n);
      }
      o = i + 1;
    }
    return s;
  }
  __name(Te, "Te");
  function we(e, t, s) {
    var a = s || {}, n = a.encode || Se;
    if (typeof n != "function") throw new TypeError("option encode is invalid");
    if (!k.test(e)) throw new TypeError("argument name is invalid");
    var o = n(t);
    if (o && !k.test(o)) throw new TypeError("argument val is invalid");
    var r = e + "=" + o;
    if (a.maxAge != null) {
      var i = a.maxAge - 0;
      if (isNaN(i) || !isFinite(i)) throw new TypeError("option maxAge is invalid");
      r += "; Max-Age=" + Math.floor(i);
    }
    if (a.domain) {
      if (!k.test(a.domain)) throw new TypeError("option domain is invalid");
      r += "; Domain=" + a.domain;
    }
    if (a.path) {
      if (!k.test(a.path)) throw new TypeError("option path is invalid");
      r += "; Path=" + a.path;
    }
    if (a.expires) {
      var c = a.expires;
      if (!Pe(c) || isNaN(c.valueOf())) throw new TypeError("option expires is invalid");
      r += "; Expires=" + c.toUTCString();
    }
    if (a.httpOnly && (r += "; HttpOnly"), a.secure && (r += "; Secure"), a.priority) {
      var d = typeof a.priority == "string" ? a.priority.toLowerCase() : a.priority;
      switch (d) {
        case "low":
          r += "; Priority=Low";
          break;
        case "medium":
          r += "; Priority=Medium";
          break;
        case "high":
          r += "; Priority=High";
          break;
        default:
          throw new TypeError("option priority is invalid");
      }
    }
    if (a.sameSite) {
      var p = typeof a.sameSite == "string" ? a.sameSite.toLowerCase() : a.sameSite;
      switch (p) {
        case true:
          r += "; SameSite=Strict";
          break;
        case "lax":
          r += "; SameSite=Lax";
          break;
        case "strict":
          r += "; SameSite=Strict";
          break;
        case "none":
          r += "; SameSite=None";
          break;
        default:
          throw new TypeError("option sameSite is invalid");
      }
    }
    return r;
  }
  __name(we, "we");
  function ve(e) {
    return e.indexOf("%") !== -1 ? decodeURIComponent(e) : e;
  }
  __name(ve, "ve");
  function Se(e) {
    return encodeURIComponent(e);
  }
  __name(Se, "Se");
  function Pe(e) {
    return Ne.call(e) === "[object Date]" || e instanceof Date;
  }
  __name(Pe, "Pe");
  function Ce(e, t) {
    try {
      return t(e);
    } catch {
      return e;
    }
  }
  __name(Ce, "Ce");
});
l();
u();
h();
l();
u();
h();
l();
u();
h();
var N = "INTERNAL_SUSPENSE_CACHE_HOSTNAME.local";
l();
u();
h();
l();
u();
h();
l();
u();
h();
l();
u();
h();
var D = $(q());
function S(e, t, s) {
  if (t == null) return { match: null, captureGroupKeys: [] };
  let a = s ? "" : "i", n = [];
  return { match: (0, D.default)(`%${e}%${a}`, n).exec(t), captureGroupKeys: n };
}
__name(S, "S");
function T(e, t, s, { namedOnly: a } = {}) {
  return e.replace(/\$([a-zA-Z0-9_]+)/g, (n, o) => {
    let r = s.indexOf(o);
    return a && r === -1 ? n : (r === -1 ? t[parseInt(o, 10)] : t[r + 1]) || "";
  });
}
__name(T, "T");
function A(e, { url: t, cookies: s, headers: a, routeDest: n }) {
  switch (e.type) {
    case "host":
      return { valid: t.hostname === e.value };
    case "header":
      return e.value !== void 0 ? I(e.value, a.get(e.key), n) : { valid: a.has(e.key) };
    case "cookie": {
      let o = s[e.key];
      return o && e.value !== void 0 ? I(e.value, o, n) : { valid: o !== void 0 };
    }
    case "query":
      return e.value !== void 0 ? I(e.value, t.searchParams.get(e.key), n) : { valid: t.searchParams.has(e.key) };
  }
}
__name(A, "A");
function I(e, t, s) {
  let { match: a, captureGroupKeys: n } = S(e, t);
  return s && a && n.length ? { valid: !!a, newRouteDest: T(s, a, n, { namedOnly: true }) } : { valid: !!a };
}
__name(I, "I");
l();
u();
h();
function B(e) {
  let t = new Headers(e.headers);
  return e.cf && (t.set("x-vercel-ip-city", encodeURIComponent(e.cf.city)), t.set("x-vercel-ip-country", e.cf.country), t.set("x-vercel-ip-country-region", e.cf.regionCode), t.set("x-vercel-ip-latitude", e.cf.latitude), t.set("x-vercel-ip-longitude", e.cf.longitude)), t.set("x-vercel-sc-host", N), new Request(e, { headers: t });
}
__name(B, "B");
l();
u();
h();
function y(e, t, s) {
  let a = t instanceof Headers ? t.entries() : Object.entries(t);
  for (let [n, o] of a) {
    let r = n.toLowerCase(), i = s?.match ? T(o, s.match, s.captureGroupKeys) : o;
    r === "set-cookie" ? e.append(r, i) : e.set(r, i);
  }
}
__name(y, "y");
function w(e) {
  return /^https?:\/\//.test(e);
}
__name(w, "w");
function x(e, t) {
  for (let [s, a] of t.entries()) {
    let n = /^nxtP(.+)$/.exec(s), o = /^nxtI(.+)$/.exec(s);
    n?.[1] ? (e.set(s, a), e.set(n[1], a)) : o?.[1] ? e.set(o[1], a.replace(/(\(\.+\))+/, "")) : (!e.has(s) || !!a && !e.getAll(s).includes(a)) && e.append(s, a);
  }
}
__name(x, "x");
function L(e, t) {
  let s = new URL(t, e.url);
  return x(s.searchParams, new URL(e.url).searchParams), s.pathname = s.pathname.replace(/\/index.html$/, "/").replace(/\.html$/, ""), new Request(s, e);
}
__name(L, "L");
function v(e) {
  return new Response(e.body, e);
}
__name(v, "v");
function j(e) {
  return e.split(",").map((t) => {
    let [s, a] = t.split(";"), n = parseFloat((a ?? "q=1").replace(/q *= */gi, ""));
    return [s.trim(), isNaN(n) ? 1 : n];
  }).sort((t, s) => s[1] - t[1]).map(([t]) => t === "*" || t === "" ? [] : t).flat();
}
__name(j, "j");
l();
u();
h();
function O(e) {
  switch (e) {
    case "none":
      return "filesystem";
    case "filesystem":
      return "rewrite";
    case "rewrite":
      return "resource";
    case "resource":
      return "miss";
    default:
      return "miss";
  }
}
__name(O, "O");
async function P(e, { request: t, assetsFetcher: s, ctx: a }, { path: n, searchParams: o }) {
  let r, i = new URL(t.url);
  x(i.searchParams, o);
  let c = new Request(i, t);
  try {
    switch (e?.type) {
      case "function":
      case "middleware": {
        let d = await import(e.entrypoint);
        try {
          r = await d.default(c, a);
        } catch (p) {
          let m = p;
          throw m.name === "TypeError" && m.message.endsWith("default is not a function") ? new Error(`An error occurred while evaluating the target edge function (${e.entrypoint})`) : p;
        }
        break;
      }
      case "override": {
        r = v(await s.fetch(L(c, e.path ?? n))), e.headers && y(r.headers, e.headers);
        break;
      }
      case "static": {
        r = await s.fetch(L(c, n));
        break;
      }
      default:
        r = new Response("Not Found", { status: 404 });
    }
  } catch (d) {
    return console.error(d), new Response("Internal Server Error", { status: 500 });
  }
  return v(r);
}
__name(P, "P");
function G(e, t) {
  let s = "^//?(?:", a = ")/(.*)$";
  return !e.startsWith(s) || !e.endsWith(a) ? false : e.slice(s.length, -a.length).split("|").every((o) => t.has(o));
}
__name(G, "G");
l();
u();
h();
function de(e, { protocol: t, hostname: s, port: a, pathname: n }) {
  return !(t && e.protocol.replace(/:$/, "") !== t || !new RegExp(s).test(e.hostname) || a && !new RegExp(a).test(e.port) || n && !new RegExp(n).test(e.pathname));
}
__name(de, "de");
function pe(e, t) {
  if (e.method !== "GET") return;
  let { origin: s, searchParams: a } = new URL(e.url), n = a.get("url"), o = Number.parseInt(a.get("w") ?? "", 10), r = Number.parseInt(a.get("q") ?? "75", 10);
  if (!n || Number.isNaN(o) || Number.isNaN(r) || !t?.sizes?.includes(o) || r < 0 || r > 100) return;
  let i = new URL(n, s);
  if (i.pathname.endsWith(".svg") && !t?.dangerouslyAllowSVG) return;
  let c = n.startsWith("//"), d = n.startsWith("/") && !c;
  if (!d && !t?.domains?.includes(i.hostname) && !t?.remotePatterns?.find((b) => de(i, b))) return;
  let p = e.headers.get("Accept") ?? "", m = t?.formats?.find((b) => p.includes(b))?.replace("image/", "");
  return { isRelative: d, imageUrl: i, options: { width: o, quality: r, format: m } };
}
__name(pe, "pe");
function ge(e, t, s) {
  let a = new Headers();
  if (s?.contentSecurityPolicy && a.set("Content-Security-Policy", s.contentSecurityPolicy), s?.contentDispositionType) {
    let o = t.pathname.split("/").pop(), r = o ? `${s.contentDispositionType}; filename="${o}"` : s.contentDispositionType;
    a.set("Content-Disposition", r);
  }
  e.headers.has("Cache-Control") || a.set("Cache-Control", `public, max-age=${s?.minimumCacheTTL ?? 60}`);
  let n = v(e);
  return y(n.headers, a), n;
}
__name(ge, "ge");
async function K(e, { buildOutput: t, assetsFetcher: s, imagesConfig: a }) {
  let n = pe(e, a);
  if (!n) return new Response("Invalid image resizing request", { status: 400 });
  let { isRelative: o, imageUrl: r } = n, c = await (o && r.pathname in t ? s.fetch.bind(s) : fetch)(r);
  return ge(c, r, a);
}
__name(K, "K");
l();
u();
h();
l();
u();
h();
l();
u();
h();
async function C(e) {
  return import(e);
}
__name(C, "C");
var _e = "x-vercel-cache-tags";
var fe = "x-next-cache-soft-tags";
var me = /* @__PURE__ */ Symbol.for("__cloudflare-request-context__");
async function J(e) {
  let t = `https://${N}/v1/suspense-cache/`;
  if (!e.url.startsWith(t)) return null;
  try {
    let s = new URL(e.url), a = await ye();
    if (s.pathname === "/v1/suspense-cache/revalidate") {
      let o = s.searchParams.get("tags")?.split(",") ?? [];
      for (let r of o) await a.revalidateTag(r);
      return new Response(null, { status: 200 });
    }
    let n = s.pathname.replace("/v1/suspense-cache/", "");
    if (!n.length) return new Response("Invalid cache key", { status: 400 });
    switch (e.method) {
      case "GET": {
        let o = z(e, fe), r = await a.get(n, { softTags: o });
        return r ? new Response(JSON.stringify(r.value), { status: 200, headers: { "Content-Type": "application/json", "x-vercel-cache-state": "fresh", age: `${(Date.now() - (r.lastModified ?? Date.now())) / 1e3}` } }) : new Response(null, { status: 404 });
      }
      case "POST": {
        let o = globalThis[me], r = /* @__PURE__ */ __name(async () => {
          let i = await e.json();
          i.data.tags === void 0 && (i.tags ??= z(e, _e) ?? []), await a.set(n, i);
        }, "r");
        return o ? o.ctx.waitUntil(r()) : await r(), new Response(null, { status: 200 });
      }
      default:
        return new Response(null, { status: 405 });
    }
  } catch (s) {
    return console.error(s), new Response("Error handling cache request", { status: 500 });
  }
}
__name(J, "J");
async function ye() {
  return process.env.__NEXT_ON_PAGES__KV_SUSPENSE_CACHE ? W("kv") : W("cache-api");
}
__name(ye, "ye");
async function W(e) {
  let t = `./__next-on-pages-dist__/cache/${e}.js`, s = await C(t);
  return new s.default();
}
__name(W, "W");
function z(e, t) {
  return e.headers.get(t)?.split(",")?.filter(Boolean);
}
__name(z, "z");
function X() {
  globalThis[Z] || (xe(), globalThis[Z] = true);
}
__name(X, "X");
function xe() {
  let e = globalThis.fetch;
  globalThis.fetch = async (...t) => {
    let s = new Request(...t), a = await Re(s);
    return a || (a = await J(s), a) ? a : (be(s), e(s));
  };
}
__name(xe, "xe");
async function Re(e) {
  if (e.url.startsWith("blob:")) try {
    let s = `./__next-on-pages-dist__/assets/${new URL(e.url).pathname}.bin`, a = (await C(s)).default, n = { async arrayBuffer() {
      return a;
    }, get body() {
      return new ReadableStream({ start(o) {
        let r = Buffer.from(a);
        o.enqueue(r), o.close();
      } });
    }, async text() {
      return Buffer.from(a).toString();
    }, async json() {
      let o = Buffer.from(a);
      return JSON.stringify(o.toString());
    }, async blob() {
      return new Blob(a);
    } };
    return n.clone = () => ({ ...n }), n;
  } catch {
  }
  return null;
}
__name(Re, "Re");
function be(e) {
  e.headers.has("user-agent") || e.headers.set("user-agent", "Next.js Middleware");
}
__name(be, "be");
var Z = /* @__PURE__ */ Symbol.for("next-on-pages fetch patch");
l();
u();
h();
var Y = $(Q());
var E = class {
  static {
    __name(this, "E");
  }
  constructor(t, s, a, n, o) {
    this.routes = t;
    this.output = s;
    this.reqCtx = a;
    this.url = new URL(a.request.url), this.cookies = (0, Y.parse)(a.request.headers.get("cookie") || ""), this.path = this.url.pathname || "/", this.headers = { normal: new Headers(), important: new Headers() }, this.searchParams = new URLSearchParams(), x(this.searchParams, this.url.searchParams), this.checkPhaseCounter = 0, this.middlewareInvoked = [], this.wildcardMatch = o?.find((r) => r.domain === this.url.hostname), this.locales = new Set(n.collectedLocales);
  }
  url;
  cookies;
  wildcardMatch;
  path;
  status;
  headers;
  searchParams;
  body;
  checkPhaseCounter;
  middlewareInvoked;
  locales;
  checkRouteMatch(t, { checkStatus: s, checkIntercept: a }) {
    let n = S(t.src, this.path, t.caseSensitive);
    if (!n.match || t.methods && !t.methods.map((r) => r.toUpperCase()).includes(this.reqCtx.request.method.toUpperCase())) return;
    let o = { url: this.url, cookies: this.cookies, headers: this.reqCtx.request.headers, routeDest: t.dest };
    if (!t.has?.find((r) => {
      let i = A(r, o);
      return i.newRouteDest && (o.routeDest = i.newRouteDest), !i.valid;
    }) && !t.missing?.find((r) => A(r, o).valid) && !(s && t.status !== this.status)) {
      if (a && t.dest) {
        let r = /\/(\(\.+\))+/, i = r.test(t.dest), c = r.test(this.path);
        if (i && !c) return;
      }
      return { routeMatch: n, routeDest: o.routeDest };
    }
  }
  processMiddlewareResp(t) {
    let s = "x-middleware-override-headers", a = t.headers.get(s);
    if (a) {
      let c = new Set(a.split(",").map((d) => d.trim()));
      for (let d of c.keys()) {
        let p = `x-middleware-request-${d}`, m = t.headers.get(p);
        this.reqCtx.request.headers.get(d) !== m && (m ? this.reqCtx.request.headers.set(d, m) : this.reqCtx.request.headers.delete(d)), t.headers.delete(p);
      }
      t.headers.delete(s);
    }
    let n = "x-middleware-rewrite", o = t.headers.get(n);
    if (o) {
      let c = new URL(o, this.url), d = this.url.hostname !== c.hostname;
      this.path = d ? `${c}` : c.pathname, x(this.searchParams, c.searchParams), t.headers.delete(n);
    }
    let r = "x-middleware-next";
    t.headers.get(r) ? t.headers.delete(r) : !o && !t.headers.has("location") ? (this.body = t.body, this.status = t.status) : t.headers.has("location") && t.status >= 300 && t.status < 400 && (this.status = t.status), y(this.reqCtx.request.headers, t.headers), y(this.headers.normal, t.headers), this.headers.middlewareLocation = t.headers.get("location");
  }
  async runRouteMiddleware(t) {
    if (!t) return true;
    let s = t && this.output[t];
    if (!s || s.type !== "middleware") return this.status = 500, false;
    let a = await P(s, this.reqCtx, { path: this.path, searchParams: this.searchParams, headers: this.headers, status: this.status });
    return this.middlewareInvoked.push(t), a.status === 500 ? (this.status = a.status, false) : (this.processMiddlewareResp(a), true);
  }
  applyRouteOverrides(t) {
    !t.override || (this.status = void 0, this.headers.normal = new Headers(), this.headers.important = new Headers());
  }
  applyRouteHeaders(t, s, a) {
    !t.headers || (y(this.headers.normal, t.headers, { match: s, captureGroupKeys: a }), t.important && y(this.headers.important, t.headers, { match: s, captureGroupKeys: a }));
  }
  applyRouteStatus(t) {
    !t.status || (this.status = t.status);
  }
  applyRouteDest(t, s, a) {
    if (!t.dest) return this.path;
    let n = this.path, o = t.dest;
    this.wildcardMatch && /\$wildcard/.test(o) && (o = o.replace(/\$wildcard/g, this.wildcardMatch.value)), this.path = T(o, s, a);
    let r = /\/index\.rsc$/i.test(this.path), i = /^\/(?:index)?$/i.test(n), c = /^\/__index\.prefetch\.rsc$/i.test(n);
    r && !i && !c && (this.path = n);
    let d = /\.rsc$/i.test(this.path), p = /\.prefetch\.rsc$/i.test(this.path), m = this.path in this.output;
    d && !p && !m && (this.path = this.path.replace(/\.rsc/i, ""));
    let b = new URL(this.path, this.url);
    return x(this.searchParams, b.searchParams), w(this.path) || (this.path = b.pathname), n;
  }
  applyLocaleRedirects(t) {
    if (!t.locale?.redirect || !/^\^(.)*$/.test(t.src) && t.src !== this.path || this.headers.normal.has("location")) return;
    let { locale: { redirect: a, cookie: n } } = t, o = n && this.cookies[n], r = j(o ?? ""), i = j(this.reqCtx.request.headers.get("accept-language") ?? ""), p = [...r, ...i].map((m) => a[m]).filter(Boolean)[0];
    if (p) {
      !this.path.startsWith(p) && (this.headers.normal.set("location", p), this.status = 307);
      return;
    }
  }
  getLocaleFriendlyRoute(t, s) {
    return !this.locales || s !== "miss" ? t : G(t.src, this.locales) ? { ...t, src: t.src.replace(/\/\(\.\*\)\$$/, "(?:/(.*))?$") } : t;
  }
  async checkRoute(t, s) {
    let a = this.getLocaleFriendlyRoute(s, t), { routeMatch: n, routeDest: o } = this.checkRouteMatch(a, { checkStatus: t === "error", checkIntercept: t === "rewrite" }) ?? {}, r = { ...a, dest: o };
    if (!n?.match || r.middlewarePath && this.middlewareInvoked.includes(r.middlewarePath)) return "skip";
    let { match: i, captureGroupKeys: c } = n;
    if (this.applyRouteOverrides(r), this.applyLocaleRedirects(r), !await this.runRouteMiddleware(r.middlewarePath)) return "error";
    if (this.body !== void 0 || this.headers.middlewareLocation) return "done";
    this.applyRouteHeaders(r, i, c), this.applyRouteStatus(r);
    let p = this.applyRouteDest(r, i, c);
    if (r.check && !w(this.path)) if (p === this.path) {
      if (t !== "miss") return this.checkPhase(O(t));
      this.status = 404;
    } else if (t === "miss") {
      if (!(this.path in this.output) && !(this.path.replace(/\/$/, "") in this.output)) return this.checkPhase("filesystem");
      this.status === 404 && (this.status = void 0);
    } else return this.checkPhase("none");
    return !r.continue || r.status && r.status >= 300 && r.status <= 399 ? "done" : "next";
  }
  async checkPhase(t) {
    if (this.checkPhaseCounter++ >= 50) return console.error(`Routing encountered an infinite loop while checking ${this.url.pathname}`), this.status = 500, "error";
    this.middlewareInvoked = [];
    let s = true;
    for (let o of this.routes[t]) {
      let r = await this.checkRoute(t, o);
      if (r === "error") return "error";
      if (r === "done") {
        s = false;
        break;
      }
    }
    if (t === "hit" || w(this.path) || this.headers.normal.has("location") || !!this.body) return "done";
    if (t === "none") for (let o of this.locales) {
      let r = new RegExp(`/${o}(/.*)`), c = this.path.match(r)?.[1];
      if (c && c in this.output) {
        this.path = c;
        break;
      }
    }
    let a = this.path in this.output;
    if (!a && this.path.endsWith("/")) {
      let o = this.path.replace(/\/$/, "");
      a = o in this.output, a && (this.path = o);
    }
    if (t === "miss" && !a) {
      let o = !this.status || this.status < 400;
      this.status = o ? 404 : this.status;
    }
    let n = "miss";
    return a || t === "miss" || t === "error" ? n = "hit" : s && (n = O(t)), this.checkPhase(n);
  }
  async run(t = "none") {
    this.checkPhaseCounter = 0;
    let s = await this.checkPhase(t);
    return this.headers.normal.has("location") && (!this.status || this.status < 300 || this.status >= 400) && (this.status = 307), s;
  }
};
async function ee(e, t, s, a) {
  let n = new E(t.routes, s, e, a, t.wildcard), o = await te(n);
  return ke(e, o, s);
}
__name(ee, "ee");
async function te(e, t = "none", s = false) {
  return await e.run(t) === "error" || !s && e.status && e.status >= 400 ? te(e, "error", true) : { path: e.path, status: e.status, headers: e.headers, searchParams: e.searchParams, body: e.body };
}
__name(te, "te");
async function ke(e, { path: t = "/404", status: s, headers: a, searchParams: n, body: o }, r) {
  let i = a.normal.get("location");
  if (i) {
    if (i !== a.middlewareLocation) {
      let p = [...n.keys()].length ? `?${n.toString()}` : "";
      a.normal.set("location", `${i ?? "/"}${p}`);
    }
    return new Response(null, { status: s, headers: a.normal });
  }
  let c;
  if (o !== void 0) c = new Response(o, { status: s });
  else if (w(t)) {
    let p = new URL(t);
    x(p.searchParams, n), c = await fetch(p, e.request);
  } else c = await P(r[t], e, { path: t, status: s, headers: a, searchParams: n });
  let d = a.normal;
  return y(d, c.headers), y(d, a.important), c = new Response(c.body, { ...c, status: s || c.status, headers: d }), c;
}
__name(ke, "ke");
l();
u();
h();
function ae() {
  globalThis.__nextOnPagesRoutesIsolation ??= { _map: /* @__PURE__ */ new Map(), getProxyFor: Ee };
}
__name(ae, "ae");
function Ee(e) {
  let t = globalThis.__nextOnPagesRoutesIsolation._map.get(e);
  if (t) return t;
  let s = Me();
  return globalThis.__nextOnPagesRoutesIsolation._map.set(e, s), s;
}
__name(Ee, "Ee");
function Me() {
  let e = /* @__PURE__ */ new Map();
  return new Proxy(globalThis, { get: /* @__PURE__ */ __name((t, s) => e.has(s) ? e.get(s) : Reflect.get(globalThis, s), "get"), set: /* @__PURE__ */ __name((t, s, a) => Ie.has(s) ? Reflect.set(globalThis, s, a) : (e.set(s, a), true), "set") });
}
__name(Me, "Me");
var Ie = /* @__PURE__ */ new Set(["_nextOriginalFetch", "fetch", "__incrementalCache"]);
var Ae = Object.defineProperty;
var Le = /* @__PURE__ */ __name((...e) => {
  let t = e[0], s = e[1], a = "__import_unsupported";
  if (!(s === a && typeof t == "object" && t !== null && a in t)) return Ae(...e);
}, "Le");
globalThis.Object.defineProperty = Le;
globalThis.AbortController = class extends AbortController {
  constructor() {
    try {
      super();
    } catch (t) {
      if (t instanceof Error && t.message.includes("Disallowed operation called within global scope")) return { signal: { aborted: false, reason: null, onabort: /* @__PURE__ */ __name(() => {
      }, "onabort"), throwIfAborted: /* @__PURE__ */ __name(() => {
      }, "throwIfAborted") }, abort() {
      } };
      throw t;
    }
  }
};
var va = { async fetch(e, t, s) {
  ae(), X();
  let a = await __ALSes_PROMISE__;
  if (!a) {
    let r = new URL(e.url), i = await t.ASSETS.fetch(`${r.protocol}//${r.host}/cdn-cgi/errors/no-nodejs_compat.html`), c = i.ok ? i.body : "Error: Could not access built-in Node.js modules. Please make sure that your Cloudflare Pages project has the 'nodejs_compat' compatibility flag set.";
    return new Response(c, { status: 503 });
  }
  let { envAsyncLocalStorage: n, requestContextAsyncLocalStorage: o } = a;
  return n.run({ ...t, NODE_ENV: "production", SUSPENSE_CACHE_URL: N }, async () => o.run({ env: t, ctx: s, cf: e.cf }, async () => {
    if (new URL(e.url).pathname.startsWith("/_next/image")) return K(e, { buildOutput: _, assetsFetcher: t.ASSETS, imagesConfig: g.images });
    let i = B(e);
    return ee({ request: i, ctx: s, assetsFetcher: t.ASSETS }, g, _, f);
  }));
} };
export {
  va as default
};
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
//# sourceMappingURL=bundledWorker-0.8723123828324226.mjs.map
