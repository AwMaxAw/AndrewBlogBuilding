import Link from "next/link";
import { Github, Twitter, Mail, Rss } from "lucide-react";

export default function Footer() {
  return (
    <footer className="glass-footer mt-24 z-10">
      <div className="relative z-10 max-w-3xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-sm text-muted">
            © {new Date().getFullYear()} Andrew&apos;s Blog
          </div>
          <div className="flex items-center gap-5">
            <Link
              href="https://github.com/AwMaxAw"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github size={18} />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-foreground transition-colors"
              aria-label="Twitter"
            >
              <Twitter size={18} />
            </Link>
            <Link
              href="mailto:max.li.ggm@gmail.com"
              className="text-muted hover:text-foreground transition-colors"
              aria-label="Email"
            >
              <Mail size={18} />
            </Link>
            <Link
              href="/rss.xml"
              className="text-muted hover:text-foreground transition-colors"
              aria-label="RSS"
            >
              <Rss size={18} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
