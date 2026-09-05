'use client';

import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const themes: { value: 'light' | 'dark' | 'system'; icon: typeof Sun; label: string }[] = [
    { value: 'light', icon: Sun, label: 'Light' },
    { value: 'system', icon: Monitor, label: 'System' },
    { value: 'dark', icon: Moon, label: 'Dark' },
  ];

  return (
    <div className="flex items-center gap-0.5 bg-secondary/50 rounded-md p-0.5">
      {themes.map((t) => {
        const Icon = t.icon;
        const isActive = theme === t.value;
        return (
          <button
            key={t.value}
            onClick={() => setTheme(t.value)}
            className={`p-1.5 rounded-md transition-all duration-200 ${
              isActive
                ? 'bg-background shadow-sm text-foreground'
                : 'text-muted hover:text-foreground'
            }`}
            aria-label={t.label}
            title={t.label}
          >
            <Icon size={16} />
          </button>
        );
      })}
    </div>
  );
}
