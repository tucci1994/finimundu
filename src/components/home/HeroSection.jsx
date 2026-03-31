import { useEffect, useRef, useState, useCallback } from "react";
import { Box } from "@mui/material";
import "../../assets/styles/hero/hero.css";

const desktopImages = [
  { src: require("../../assets/img/home/imgHero/desktop/1.webp"),  position: 'center center' },
  { src: require("../../assets/img/home/imgHero/desktop/2.webp"),  position: 'center center' },
  { src: require("../../assets/img/home/imgHero/desktop/3.webp"),  position: 'center center' },
  { src: require("../../assets/img/home/imgHero/desktop/4.webp"),  position: 'center center' },
  { src: require("../../assets/img/home/imgHero/desktop/5.webp"),  position: 'center center' },
  { src: require("../../assets/img/home/imgHero/desktop/6.webp"),  position: 'center center' },
  { src: require("../../assets/img/home/imgHero/desktop/7.webp"),  position: 'center center' },
  { src: require("../../assets/img/home/imgHero/desktop/8.webp"),  position: 'center center' },
  { src: require("../../assets/img/home/imgHero/desktop/9.webp"),  position: 'center center' },
  { src: require("../../assets/img/home/imgHero/desktop/10.webp"), position: 'center center' },
  { src: require("../../assets/img/home/imgHero/desktop/11.webp"), position: 'center center' },
  { src: require("../../assets/img/home/imgHero/desktop/12.webp"), position: 'center center' },
  { src: require("../../assets/img/home/imgHero/desktop/13.webp"), position: 'center center' },
  { src: require("../../assets/img/home/imgHero/desktop/14.webp"), position: 'center center' },
  { src: require("../../assets/img/home/imgHero/desktop/15.webp"), position: 'center center' },
];

const mobileImages = [
  { src: require("../../assets/img/home/imgHero/mobile/1.webp"),  position: 'center center' },
  { src: require("../../assets/img/home/imgHero/mobile/2.webp"),  position: 'center center' },
  { src: require("../../assets/img/home/imgHero/mobile/3.webp"),  position: 'center center' },
  { src: require("../../assets/img/home/imgHero/mobile/4.webp"),  position: 'center center' },
  { src: require("../../assets/img/home/imgHero/mobile/5.webp"),  position: 'center center' },
  { src: require("../../assets/img/home/imgHero/mobile/6.webp"),  position: 'center center' },
  { src: require("../../assets/img/home/imgHero/mobile/7.webp"),  position: 'center center' },
  { src: require("../../assets/img/home/imgHero/mobile/8.webp"),  position: 'center center' },
  { src: require("../../assets/img/home/imgHero/mobile/9.webp"),  position: 'center center' },
  { src: require("../../assets/img/home/imgHero/mobile/10.webp"), position: 'center center' },
  { src: require("../../assets/img/home/imgHero/mobile/11.webp"), position: 'center center' },
  { src: require("../../assets/img/home/imgHero/mobile/12.webp"), position: 'center center' },
  { src: require("../../assets/img/home/imgHero/mobile/13.webp"), position: 'center center' },
  { src: require("../../assets/img/home/imgHero/mobile/14.webp"), position: 'center center' },
  { src: require("../../assets/img/home/imgHero/mobile/15.webp"), position: 'center center' },
];

const cols = 5;
const rows = 3;

const baseImgStyle = {
  width: '100%',
  height: 'auto',
  position: 'absolute',
  top: '50%',
  left: 0,
  transform: 'translateY(-50%)',
  display: 'block',
};


function Hero({ onSplashDone }) {
  const layerARef = useRef(null);
  const layerBRef = useRef(null);
  const layerAImgRef = useRef(null);
  const layerBImgRef = useRef(null);
  const activeLayer = useRef('A');
  const currentIdx = useRef(0);
  const imageConfigRef = useRef(
    window.innerWidth <= 768 ? mobileImages : desktopImages
  );
  const splashBgRef = useRef(null);
  const splashDoneRef = useRef(false);
  const textRef = useRef(null);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);

  // Splash animation
  useEffect(() => {
    const el = textRef.current;
    const bg = splashBgRef.current;
    const fitText = () => {
      let size = 10;
      el.style.fontSize = size + 'px';
      while (el.scrollWidth < window.innerWidth * 0.82 && size < 1000) {
        size++;
        el.style.fontSize = size + 'px';
      }
      el.style.fontSize = (size - 1) + 'px';
    };
    el.textContent = 'Finimundu';
    fitText();
    el.textContent = '';
    const onResize = () => { el.textContent = 'Finimundu'; fitText(); };
    window.addEventListener('resize', onResize);
    let i = 0;
    const text = 'Finimundu';
    const splitAt = 4;
    function typeChar() {
      if (i < text.length) {
        el.textContent += text[i];
        i++;
        setTimeout(typeChar, i === splitAt ? 1200 : 110);
      } else {
        setTimeout(() => {
          el.style.top = 'calc(100% - 1.2em)';
          el.style.transform = 'translateX(-50%)';
          setTimeout(() => {
            bg.style.opacity = '0';
            setTimeout(() => { bg.style.display = 'none'; splashDoneRef.current = true; onSplashDone?.(); }, 1000);
          }, 700);
        }, 1000);
      }
    }
    setTimeout(typeChar, 500);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Preload all images on mount
  useEffect(() => {
    [...desktopImages, ...mobileImages].forEach(({ src }) => {
      const img = new Image();
      img.src = src;
      img.decoding = "async";
    });
  }, []);

  // Sync imageConfigRef and reset layers when breakpoint changes
  useEffect(() => {
    const config = isMobile ? mobileImages : desktopImages;
    imageConfigRef.current = config;
    currentIdx.current = 0;
    activeLayer.current = 'A';
    if (layerAImgRef.current) {
      layerAImgRef.current.src = config[0].src;
      layerAImgRef.current.style.objectPosition = config[0].position;
    }
    if (layerBImgRef.current) {
      layerBImgRef.current.src = config[1].src;
      layerBImgRef.current.style.objectPosition = config[1].position;
    }
    if (layerARef.current) layerARef.current.style.opacity = '1';
    if (layerBRef.current) layerBRef.current.style.opacity = '0';
  }, [isMobile]);

  // Responsive breakpoint listener
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const crossfadeTo = useCallback((idx) => {
    if (idx === currentIdx.current) return;
    currentIdx.current = idx;
    const a = layerARef.current;
    const b = layerBRef.current;
    if (!a || !b) return;

    const { src, position } = imageConfigRef.current[idx];

    if (activeLayer.current === 'A') {
      layerBImgRef.current.src = src;
      layerBImgRef.current.style.objectPosition = position;
      b.style.opacity = '1';
      a.style.opacity = '0';
      activeLayer.current = 'B';
    } else {
      layerAImgRef.current.src = src;
      layerAImgRef.current.style.objectPosition = position;
      a.style.opacity = '1';
      b.style.opacity = '0';
      activeLayer.current = 'A';
    }
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!splashDoneRef.current) return;
    const { offsetWidth: w, offsetHeight: h } = e.currentTarget;
    const x = Math.floor((e.clientX / w) * cols);
    const y = Math.floor((e.clientY / h) * rows);
    const idx = Math.min(y * cols + x, imageConfigRef.current.length - 1);
    crossfadeTo(idx);
  }, [crossfadeTo]);

  const handleTouchMove = useCallback((e) => {
    if (!splashDoneRef.current) return;
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.floor(((touch.clientX - rect.left) / rect.width) * cols);
    const y = Math.floor(((touch.clientY - rect.top) / rect.height) * rows);
    const idx = Math.min(y * cols + x, imageConfigRef.current.length - 1);
    crossfadeTo(idx);
  }, [crossfadeTo]);

  const layerStyle = {
    position: 'absolute',
    inset: 0,
    transition: 'opacity 0.45s ease',
    willChange: 'opacity',
  };

  const initialConfig = imageConfigRef.current;

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#000',
      }}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      {/* Layer A */}
      <div ref={layerARef} style={{ ...layerStyle, opacity: 1, zIndex: 1 }}>
        <img
          ref={layerAImgRef}
          src={initialConfig[0].src}
          style={{ ...baseImgStyle, objectPosition: initialConfig[0].position }}
          alt=""
        />
      </div>

      {/* Layer B */}
      <div ref={layerBRef} style={{ ...layerStyle, opacity: 0, zIndex: 2 }}>
        <img
          ref={layerBImgRef}
          src={initialConfig[1].src}
          style={{ ...baseImgStyle, objectPosition: initialConfig[1].position }}
          alt=""
        />
      </div>

      {/* Vignette */}
      <Box sx={{
        position: 'absolute',
        inset: 0,
        zIndex: 3,
        background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.18) 35%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      {/* Hover grid */}
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        position: 'absolute',
        inset: 0,
        zIndex: 4,
      }}>
        {Array.from({ length: cols * rows }).map((_, i) => (
          <Box key={i} className="area--cell" />
        ))}
      </Box>

      {/* Splash background */}
      <div ref={splashBgRef} style={{
        position: 'absolute',
        inset: 0,
        background: '#000',
        zIndex: 10,
        transition: 'opacity 0.95s cubic-bezier(.4,0,.2,1)',
      }} />

      {/* Testo Finimundu — rimane fisso in fondo */}
      <span ref={textRef} style={{
        fontSize: '10px',
        fontWeight: 700,
        color: '#fff',
        letterSpacing: '-0.03em',
        whiteSpace: 'nowrap',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        transition: 'top 1.1s cubic-bezier(.4,0,.2,1), transform 1.1s cubic-bezier(.4,0,.2,1)',
        zIndex: 11,
        lineHeight: 1,
        pointerEvents: 'none',
        userSelect: 'none',
      }} />

      {/* Scroll indicator */}
      <Box sx={{
        position: 'absolute',
        bottom: '0px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 5,
        opacity: 0.6,
        pointerEvents: 'none',
        '& .icon': { width: '60px', height: '60px' },
      }}>
        <div className="hero-scroll-div">
          <div className="icon" />
        </div>
      </Box>

    </Box>
  );
}

export default Hero;
