"use client";

/**
 * Apple Liquid Glass SVG Filter
 * 用于创建真实的光线折射效果
 * 
 * 原理：feDisplacementMap 通过位移像素模拟光线穿过玻璃的折射
 * - R通道控制X方向位移，G通道控制Y方向位移
 * - 128 = 中性点（无位移）
 * - 负 scale 值产生放大/凸透镜效果
 */

export default function LiquidGlassFilter() {
  return (
    <svg
      width="0"
      height="0"
      style={{ position: "absolute", overflow: "hidden", pointerEvents: "none" }}
      aria-hidden="true"
    >
      <defs>
        {/* 导航栏用的液态玻璃滤镜 - 长条形状 */}
        <filter
          id="liquid-glass-nav"
          colorInterpolationFilters="sRGB"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
        >
          {/* 噪声生成 - 创建有机的玻璃纹理 */}
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.02"
            numOctaves="3"
            seed="15"
            result="noise"
          />
          {/* 模糊噪声使边缘更柔和 */}
          <feGaussianBlur in="noise" stdDeviation="1.5" result="blurred" />
          {/* 位移映射 - scale 负值产生凸透镜效果 */}
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurred"
            scale="-25"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* 通用液态玻璃滤镜 - 适用于卡片和按钮 */}
        <filter
          id="liquid-glass"
          colorInterpolationFilters="sRGB"
          x="-10%"
          y="-10%"
          width="120%"
          height="120%"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.015"
            numOctaves="3"
            seed="42"
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurred"
            scale="-30"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* 按钮专用 - 更强的折射效果 */}
        <filter
          id="liquid-glass-btn"
          colorInterpolationFilters="sRGB"
          x="-5%"
          y="-5%"
          width="110%"
          height="110%"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.025"
            numOctaves="2"
            seed="7"
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="1" result="blurred" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurred"
            scale="-20"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}