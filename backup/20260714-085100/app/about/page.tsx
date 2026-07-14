import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "关于",
  description: "关于我和这个博客",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <header className="mb-16">
        <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-6">
          关于我
        </h1>
        <p className="text-lg text-muted leading-relaxed">
          你好，我是 Andrew。一个热爱技术、设计与生活的人。
        </p>
      </header>

      <section className="prose-custom">
        <h2>关于这个博客</h2>
        <p>
          这里是我记录思考和分享生活的地方。你会在这里看到关于技术、设计、阅读、旅行等各种主题的文章。
          我相信写作是整理思路最好的方式，也希望这些文字能对你有所启发。
        </p>

        <h2>我在做什么</h2>
        <ul>
          <li>写代码，构建有趣的产品</li>
          <li>读书，每年读几十本各种类型的书</li>
          <li>旅行，去看不同的风景和人</li>
          <li>写作，就是你现在看到的这些</li>
        </ul>

        <h2>技术栈</h2>
        <p>
          我日常工作中主要使用 TypeScript、React、Node.js 等前端相关技术。
          同时也对设计、产品、系统架构等方向很感兴趣。
        </p>

        <h2>联系我</h2>
        <p>
          如果你想聊点什么，欢迎通过以下方式找到我：
        </p>
        <ul>
          <li>邮箱：hello@example.com</li>
          <li>GitHub：@andrew</li>
          <li>Twitter：@andrew</li>
        </ul>

        <blockquote>
          保持好奇，保持热爱。
        </blockquote>
      </section>
    </div>
  );
}
