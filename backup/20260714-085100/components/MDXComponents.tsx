import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h1: ({ children }) => <h1 className="font-serif text-4xl font-semibold mt-10 mb-4">{children}</h1>,
  h2: ({ children }) => <h2 className="font-serif text-3xl font-semibold mt-10 mb-4">{children}</h2>,
  h3: ({ children }) => <h3 className="font-serif text-2xl font-semibold mt-8 mb-3">{children}</h3>,
  p: ({ children }) => <p className="my-5 leading-[1.8] text-foreground/90">{children}</p>,
  a: ({ href, children }) => (
    <a href={href} className="text-accent underline underline-offset-4 hover:text-accent/80 transition-colors">
      {children}
    </a>
  ),
  ul: ({ children }) => <ul className="my-5 pl-6 list-disc space-y-2">{children}</ul>,
  ol: ({ children }) => <ol className="my-5 pl-6 list-decimal space-y-2">{children}</ol>,
  li: ({ children }) => <li className="leading-[1.8]">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-accent/60 pl-5 my-8 italic text-muted">
      {children}
    </blockquote>
  ),
  code: ({ className, children }) => {
    const isInline = !className;
    if (isInline) {
      return (
        <code className="bg-foreground/[0.08] px-1.5 py-0.5 rounded text-sm font-mono">
          {children}
        </code>
      );
    }
    return <code className={className}>{children}</code>;
  },
  pre: ({ children }) => (
    <pre className="bg-foreground text-background rounded-lg p-5 my-6 overflow-x-auto text-sm leading-relaxed">
      {children}
    </pre>
  ),
  hr: () => <hr className="my-12 border-border/60" />,
  strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
};
