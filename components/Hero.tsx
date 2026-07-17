import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-[80vh] flex flex-col justify-center">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <p className="text-sm text-accent mb-6 tracking-widest uppercase animate-fade-in-up">
          Welcome to my blog
        </p>
        <h1
          className="font-serif text-5xl md:text-7xl font-semibold leading-[1.1] tracking-tight mb-8 animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          Capture thoughts,
          <br />
          <span className="text-accent">share life.</span>
        </h1>
        <p
          className="text-lg text-muted max-w-lg leading-relaxed animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          This is where I gather my ideas — on technology, design, reading, and the small moments of everyday life worth remembering.
        </p>
        <div
          className="mt-10 flex items-center gap-6 animate-fade-in-up"
          style={{ animationDelay: "0.3s" }}
        >
          <Link
            href="/blog"
            className="glass-btn text-sm font-medium text-foreground z-10"
          >
            <span className="z-10 relative">Browse Posts</span>
          </Link>
          <Link
            href="/about"
            className="glass-btn text-sm text-foreground z-10"
          >
            <span className="z-10 relative">About Me →</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
