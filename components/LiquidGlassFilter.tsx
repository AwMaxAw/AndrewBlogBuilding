"use client";

export default function LiquidGlassFilter() {
  return (
    <svg
      width="0"
      height="0"
      style={{ position: "absolute", overflow: "hidden", pointerEvents: "none" }}
      aria-hidden="true"
    >
      <defs>
        <filter
          id="liquid-glass-nav"
          colorInterpolationFilters="sRGB"
          x="-5%"
          y="-5%"
          width="110%"
          height="110%"
        >
          <feGaussianBlur in="SourceGraphic" stdDeviation="1" result="blur" />

          <feImage
            href={`data:image/svg+xml,${encodeURIComponent(`
              <svg width='100%' height='100%' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'>
                <defs>
                  <linearGradient id='gX' x1='0%' y1='0%' x2='100%' y2='0%'>
                    <stop offset='0%' stop-color='#000'/>
                    <stop offset='50%' stop-color='#808080'/>
                    <stop offset='100%' stop-color='#F00'/>
                  </linearGradient>
                  <linearGradient id='gY' x1='0%' y1='0%' x2='0%' y2='100%'>
                    <stop offset='0%' stop-color='#000'/>
                    <stop offset='50%' stop-color='#808080'/>
                    <stop offset='100%' stop-color='#0F0'/>
                  </linearGradient>
                </defs>
                <rect x='0' y='0' width='100%' height='100%' fill='url(#gX)' style='mix-blend-mode:screen'/>
                <rect x='0' y='0' width='100%' height='100%' fill='url(#gY)' style='mix-blend-mode:screen'/>
                <rect width='100%' height='100%' fill='#808080CC' style='filter:blur(15px)'/>
              </svg>
            `)}`}
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            result="refractMap"
          />

          <feDisplacementMap
            in="blur"
            in2="refractMap"
            scale="-40"
            xChannelSelector="R"
            yChannelSelector="G"
            result="disp"
          />

          <feBlend
            in="disp"
            in2="SourceGraphic"
            mode="normal"
            result="blended"
          />
        </filter>

        <filter
          id="liquid-glass"
          colorInterpolationFilters="sRGB"
          x="-10%"
          y="-10%"
          width="120%"
          height="120%"
        >
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />

          <feImage
            href={`data:image/svg+xml,${encodeURIComponent(`
              <svg width='100%' height='100%' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'>
                <defs>
                  <linearGradient id='gX' x1='0%' y1='0%' x2='100%' y2='0%'>
                    <stop offset='0%' stop-color='#000'/>
                    <stop offset='50%' stop-color='#808080'/>
                    <stop offset='100%' stop-color='#F00'/>
                  </linearGradient>
                  <linearGradient id='gY' x1='0%' y1='0%' x2='0%' y2='100%'>
                    <stop offset='0%' stop-color='#000'/>
                    <stop offset='50%' stop-color='#808080'/>
                    <stop offset='100%' stop-color='#0F0'/>
                  </linearGradient>
                </defs>
                <rect x='0' y='0' width='100%' height='100%' fill='url(#gX)' style='mix-blend-mode:screen'/>
                <rect x='0' y='0' width='100%' height='100%' fill='url(#gY)' style='mix-blend-mode:screen'/>
                <rect width='100%' height='100%' fill='#808080CC' style='filter:blur(12px)'/>
              </svg>
            `)}`}
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            result="refractMap"
          />

          <feDisplacementMap
            in="blur"
            in2="refractMap"
            scale="-50"
            xChannelSelector="R"
            yChannelSelector="G"
            result="disp"
          />

          <feBlend
            in="disp"
            in2="SourceGraphic"
            mode="normal"
            result="blended"
          />
        </filter>

        <filter
          id="liquid-glass-btn"
          colorInterpolationFilters="sRGB"
          x="-5%"
          y="-5%"
          width="110%"
          height="110%"
        >
          <feGaussianBlur in="SourceGraphic" stdDeviation="1" result="blur" />

          <feImage
            href={`data:image/svg+xml,${encodeURIComponent(`
              <svg width='100%' height='100%' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'>
                <defs>
                  <linearGradient id='gX' x1='0%' y1='0%' x2='100%' y2='0%'>
                    <stop offset='0%' stop-color='#000'/>
                    <stop offset='50%' stop-color='#808080'/>
                    <stop offset='100%' stop-color='#F00'/>
                  </linearGradient>
                  <linearGradient id='gY' x1='0%' y1='0%' x2='0%' y2='100%'>
                    <stop offset='0%' stop-color='#000'/>
                    <stop offset='50%' stop-color='#808080'/>
                    <stop offset='100%' stop-color='#0F0'/>
                  </linearGradient>
                </defs>
                <rect x='0' y='0' width='100%' height='100%' fill='url(#gX)' style='mix-blend-mode:screen'/>
                <rect x='0' y='0' width='100%' height='100%' fill='url(#gY)' style='mix-blend-mode:screen'/>
                <rect width='100%' height='100%' fill='#808080CC' style='filter:blur(10px)'/>
              </svg>
            `)}`}
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            result="refractMap"
          />

          <feDisplacementMap
            in="blur"
            in2="refractMap"
            scale="-35"
            xChannelSelector="R"
            yChannelSelector="G"
            result="disp"
          />

          <feBlend
            in="disp"
            in2="SourceGraphic"
            mode="normal"
            result="blended"
          />
        </filter>
      </defs>
    </svg>
  );
}
