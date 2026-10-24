import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
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
};
