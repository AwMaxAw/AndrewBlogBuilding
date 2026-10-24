import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-[85vh] flex flex-col justify-center">
      <div className="max-w-3xl md:max-w-4xl lg:max-w-5xl mx-auto px-6 md:px-8 py-20">
        <p className="text-sm md:text-base text-accent mb-6 md:mb-8 tracking-widest uppercase animate-fade-in-up">
          Welcome to my blog
        </p>
        <h1
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold leading-[1.05] tracking-tight mb-8 md:mb-10 animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          Capture thoughts,
          <br />
          <span className="text-accent">share life.</span>
        </h1>
        <p
          className="text-base md:text-lg lg:text-xl text-muted max-w-lg md:max-w-xl leading-relaxed animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          This is where I gather my ideas — on technology, design, reading, and the small moments of everyday life worth remembering.
        </p>
        <div
          className="mt-10 md:mt-12 flex flex-wrap items-center gap-4 md:gap-6 animate-fade-in-up"
          style={{ animationDelay: "0.3s" }}
        >
          <Link
            href="/blog"
            className="glass-btn text-sm md:text-base font-medium text-foreground z-10"
          >
            <span className="z-10 relative">Browse Posts</span>
          </Link>
          <Link
            href="/about"
            className="glass-btn text-sm md:text-base text-foreground z-10"
          >
            <span className="z-10 relative">About Me →</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
