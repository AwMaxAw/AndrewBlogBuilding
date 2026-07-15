import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About me and this blog",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <header className="mb-16">
        <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-6">
          About Me
        </h1>
        <p className="text-lg text-muted leading-relaxed">
          Hi, I&apos;m Andrew — a person passionate about technology, design, and life.
        </p>
      </header>

      <section className="glass-card prose-custom z-10">
        <div className="relative z-10 p-8">
        <h2>About This Blog</h2>
        <p>
          This is where I record my thoughts and share pieces of life. You&apos;ll find articles on technology, design, reading, travel, and many other topics.
          I believe writing is one of the best ways to organize my thinking, and I hope these words can be of some inspiration to you.
        </p>

        <h2>What I Do</h2>
        <ul>
          <li>Write code and build interesting products</li>
          <li>Read books — dozens each year across all kinds of genres</li>
          <li>Travel to see different places and people</li>
          <li>Write, which is exactly what you&apos;re reading right now</li>
        </ul>

        <h2>Tech Stack</h2>
        <p>
          I mainly work with TypeScript, React, Node.js, and other front-end technologies in my day-to-day.
          I&apos;m also deeply interested in design, product, and system architecture.
        </p>

        <h2>Get in Touch</h2>
        <p>
          If you&apos;d like to chat, feel free to reach me through any of the following:
        </p>
        <ul>
          <li>Email: hello@example.com</li>
          <li>GitHub: @andrew</li>
          <li>Twitter: @andrew</li>
        </ul>

        <blockquote>
          Stay curious, stay passionate.
        </blockquote>
        </div>
      </section>
    </div>
  );
}
