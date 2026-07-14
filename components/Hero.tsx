import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-[80vh] flex flex-col justify-center">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <p className="text-sm text-accent mb-6 tracking-widest uppercase animate-fade-in-up">
          欢迎来到我的博客
        </p>
        <h1
          className="font-serif text-5xl md:text-7xl font-semibold leading-[1.1] tracking-tight mb-8 animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          记录思考，
          <br />
          <span className="text-accent">分享生活。</span>
        </h1>
        <p
          className="text-lg text-muted max-w-lg leading-relaxed animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          这里是我沉淀想法的地方。关于技术、设计、阅读，以及那些日常生活中值得被记住的瞬间。
        </p>
        <div
          className="mt-10 flex items-center gap-6 animate-fade-in-up"
          style={{ animationDelay: "0.3s" }}
        >
          <a
            href="#posts"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground group"
          >
            浏览文章
            <span className="h-px w-8 bg-foreground transition-all duration-300 group-hover:w-12" />
          </a>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
          >
            关于我 →
          </Link>
        </div>
      </div>
    </section>
  );
}
