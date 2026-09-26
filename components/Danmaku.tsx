"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Play, Square } from "lucide-react";

interface DanmakuMessage {
  name: string;
  message: string;
}

interface ActiveItem {
  id: number;
  name: string;
  text: string;
  top: number;
  duration: number;
}

export default function Danmaku({ messages }: { messages: DanmakuMessage[] }) {
  const [active, setActive] = useState(false);
  const [items, setItems] = useState<ActiveItem[]>([]);
  const idRef = useRef(0);

  // 弹幕生成循环
  useEffect(() => {
    if (!active || messages.length === 0) {
      setItems([]);
      return;
    }

    let cancelled = false;
    const timeouts: number[] = [];
    // 打乱顺序
    const shuffled = [...messages].sort(() => Math.random() - 0.5);
    let idx = 0;

    const spawn = () => {
      if (cancelled) return;
      const m = shuffled[idx % shuffled.length];
      idx++;
      const id = ++idRef.current;
      // 避开 navbar (顶部 ~70px) 和底部 (留 ~120px)
      const top = 80 + Math.random() * Math.max(120, window.innerHeight - 220);
      const duration = 8 + Math.random() * 6; // 8-14 秒
      setItems((prev) => [...prev, { id, name: m.name, text: m.message, top, duration }]);

      // 动画结束后移除
      const t1 = window.setTimeout(() => {
        setItems((prev) => prev.filter((x) => x.id !== id));
      }, duration * 1000 + 200);
      timeouts.push(t1);

      // 随机间隔生成下一条
      const nextDelay = 280 + Math.random() * 460;
      const t2 = window.setTimeout(spawn, nextDelay);
      timeouts.push(t2);
    };

    spawn();

    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, [active, messages]);

  const toggle = () => setActive((v) => !v);

  return (
    <>
      {/* 弹幕渲染层：用 Portal 渲染到 body，避免被 glass-card 的 backdrop-filter 裁剪 */}
      {active &&
        typeof document !== "undefined" &&
        createPortal(
          <div className="fixed inset-0 z-[45] pointer-events-none">
            {items.map((item) => (
              <div
                key={item.id}
                className="danmaku-item"
                style={{
                  top: `${item.top}px`,
                  animationDuration: `${item.duration}s`,
                }}
              >
                <span className="text-accent font-medium">{item.name}: </span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>,
          document.body
        )}

      {/* 启动按钮 */}
      <button
        onClick={toggle}
        disabled={messages.length === 0}
        className="glass-btn w-full text-xs text-accent z-10 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="relative z-10 inline-flex items-center justify-center gap-1">
          {active ? (
            <>
              <Square size={12} />
              Stop
            </>
          ) : (
            <>
              <Play size={12} />
              Launch
            </>
          )}
        </span>
      </button>
    </>
  );
}
