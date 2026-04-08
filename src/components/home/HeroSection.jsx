import { useEffect, useRef, useState, useCallback } from "react";
import { Box } from "@mui/material";
import "../../assets/styles/hero/hero.css";

const desktopImages = [
  {
    src: require("../../assets/img/home/imgHero/desktop/1.webp"),
    position: "center center",
  },
  {
    src: require("../../assets/img/home/imgHero/desktop/2.webp"),
    position: "center center",
  },
  {
    src: require("../../assets/img/home/imgHero/desktop/3.webp"),
    position: "center center",
  },
  {
    src: require("../../assets/img/home/imgHero/desktop/4.webp"),
    position: "center center",
  },
  {
    src: require("../../assets/img/home/imgHero/desktop/5.webp"),
    position: "center center",
  },
  {
    src: require("../../assets/img/home/imgHero/desktop/6.webp"),
    position: "center center",
  },
  {
    src: require("../../assets/img/home/imgHero/desktop/7.webp"),
    position: "center center",
  },
  {
    src: require("../../assets/img/home/imgHero/desktop/8.webp"),
    position: "center center",
  },
  {
    src: require("../../assets/img/home/imgHero/desktop/9.webp"),
    position: "center center",
  },
  {
    src: require("../../assets/img/home/imgHero/desktop/10.webp"),
    position: "center center",
  },
  {
    src: require("../../assets/img/home/imgHero/desktop/11.webp"),
    position: "center center",
  },
  {
    src: require("../../assets/img/home/imgHero/desktop/12.webp"),
    position: "center center",
  },
  {
    src: require("../../assets/img/home/imgHero/desktop/13.webp"),
    position: "center center",
  },
  {
    src: require("../../assets/img/home/imgHero/desktop/14.webp"),
    position: "center center",
  },
  {
    src: require("../../assets/img/home/imgHero/desktop/15.webp"),
    position: "center center",
  },
];

const mobileImages = [
  {
    src: require("../../assets/img/home/imgHero/mobile/1.webp"),
    position: "center center",
  },
  {
    src: require("../../assets/img/home/imgHero/mobile/2.webp"),
    position: "center center",
  },
  {
    src: require("../../assets/img/home/imgHero/mobile/3.webp"),
    position: "center center",
  },
  {
    src: require("../../assets/img/home/imgHero/mobile/4.webp"),
    position: "center center",
  },
  {
    src: require("../../assets/img/home/imgHero/mobile/5.webp"),
    position: "center center",
  },
  {
    src: require("../../assets/img/home/imgHero/mobile/6.webp"),
    position: "center center",
  },
  {
    src: require("../../assets/img/home/imgHero/mobile/7.webp"),
    position: "center center",
  },
  {
    src: require("../../assets/img/home/imgHero/mobile/8.webp"),
    position: "center center",
  },
  {
    src: require("../../assets/img/home/imgHero/mobile/9.webp"),
    position: "center center",
  },
  {
    src: require("../../assets/img/home/imgHero/mobile/10.webp"),
    position: "center center",
  },
  {
    src: require("../../assets/img/home/imgHero/mobile/11.webp"),
    position: "center center",
  },
  {
    src: require("../../assets/img/home/imgHero/mobile/12.webp"),
    position: "center center",
  },
  {
    src: require("../../assets/img/home/imgHero/mobile/13.webp"),
    position: "center center",
  },
  {
    src: require("../../assets/img/home/imgHero/mobile/14.webp"),
    position: "center center",
  },
  {
    src: require("../../assets/img/home/imgHero/mobile/15.webp"),
    position: "center center",
  },
];

const cols = 5;
const rows = 3;

const baseImgStyle = {
  width: "100%",
  height: "auto",
  position: "absolute",
  top: "50%",
  left: 0,
  transform: "translateY(-50%)",
  display: "block",
};

function Hero({ onSplashDone }) {
  const layerARef = useRef(null);
  const layerBRef = useRef(null);
  const layerAImgRef = useRef(null);
  const layerBImgRef = useRef(null);
  const activeLayer = useRef("A");
  const currentIdx = useRef(0);
  const imageConfigRef = useRef(
    window.innerWidth <= 768 ? mobileImages : desktopImages,
  );
  const splashBgRef = useRef(null);
  const splashDoneRef = useRef(false);
  const textRef = useRef(null);
  const onSplashDoneRef = useRef(onSplashDone);

  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);

  // 🔧 sync ref (fix warning senza retrigger)
  useEffect(() => {
    onSplashDoneRef.current = onSplashDone;
  }, [onSplashDone]);

  // Splash animation
  useEffect(() => {
    const el = textRef.current;
    const bg = splashBgRef.current;

    const fitText = () => {
      let size = 10;
      el.style.fontSize = size + "px";
      while (el.scrollWidth < window.innerWidth * 0.82 && size < 1000) {
        size++;
        el.style.fontSize = size + "px";
      }
      el.style.fontSize = size - 1 + "px";
    };

    el.textContent = "Finimundu";
    fitText();
    el.textContent = "";

    const onResize = () => {
      el.textContent = "Finimundu";
      fitText();
    };

    window.addEventListener("resize", onResize);

    let i = 0;
    const text = "Finimundu";
    const splitAt = 4;

    function typeChar() {
      if (i < text.length) {
        el.textContent += text[i];
        i++;
        setTimeout(typeChar, i === splitAt ? 1200 : 110);
      } else {
        setTimeout(() => {
          el.style.top = "calc(100% - 1.2em)";
          el.style.transform = "translateX(-50%)";

          setTimeout(() => {
            bg.style.opacity = "0";

            setTimeout(() => {
              bg.style.display = "none";
              splashDoneRef.current = true;

              // ✅ usa ref stabile
              onSplashDoneRef.current?.();
            }, 1000);
          }, 700);
        }, 1000);
      }
    }

    setTimeout(typeChar, 500);

    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // preload
  useEffect(() => {
    [...desktopImages, ...mobileImages].forEach(({ src }) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // breakpoint
  useEffect(() => {
    const config = isMobile ? mobileImages : desktopImages;
    imageConfigRef.current = config;
    currentIdx.current = 0;
    activeLayer.current = "A";

    if (layerAImgRef.current) {
      layerAImgRef.current.src = config[0].src;
    }
    if (layerBImgRef.current) {
      layerBImgRef.current.src = config[1].src;
    }

    if (layerARef.current) layerARef.current.style.opacity = "1";
    if (layerBRef.current) layerBRef.current.style.opacity = "0";
  }, [isMobile]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const crossfadeTo = useCallback((idx) => {
    if (idx === currentIdx.current) return;

    currentIdx.current = idx;

    const a = layerARef.current;
    const b = layerBRef.current;
    if (!a || !b) return;

    const { src, position } = imageConfigRef.current[idx];

    if (activeLayer.current === "A") {
      layerBImgRef.current.src = src;
      layerBImgRef.current.style.objectPosition = position;
      b.style.opacity = "1";
      a.style.opacity = "0";
      activeLayer.current = "B";
    } else {
      layerAImgRef.current.src = src;
      layerAImgRef.current.style.objectPosition = position;
      a.style.opacity = "1";
      b.style.opacity = "0";
      activeLayer.current = "A";
    }
  }, []);

  const handleMouseMove = useCallback(
    (e) => {
      if (!splashDoneRef.current) return;
      const { offsetWidth: w, offsetHeight: h } = e.currentTarget;
      const x = Math.floor((e.clientX / w) * cols);
      const y = Math.floor((e.clientY / h) * rows);
      crossfadeTo(Math.min(y * cols + x, imageConfigRef.current.length - 1));
    },
    [crossfadeTo],
  );

  const handleTouchMove = useCallback(
    (e) => {
      if (!splashDoneRef.current) return;
      const touch = e.touches[0];
      const rect = e.currentTarget.getBoundingClientRect();
      const x = Math.floor(((touch.clientX - rect.left) / rect.width) * cols);
      const y = Math.floor(((touch.clientY - rect.top) / rect.height) * rows);
      crossfadeTo(Math.min(y * cols + x, imageConfigRef.current.length - 1));
    },
    [crossfadeTo],
  );

  const layerStyle = {
    position: "absolute",
    inset: 0,
    transition: "opacity 0.45s ease",
  };

  const initialConfig = imageConfigRef.current;

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#000",
      }}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      <div ref={layerARef} style={{ ...layerStyle, opacity: 1 }}>
        <img
          ref={layerAImgRef}
          src={initialConfig[0].src}
          style={baseImgStyle}
          alt=""
        />
      </div>

      <div ref={layerBRef} style={{ ...layerStyle, opacity: 0 }}>
        <img
          ref={layerBImgRef}
          src={initialConfig[1].src}
          style={baseImgStyle}
          alt=""
        />
      </div>

      <div
        ref={splashBgRef}
        style={{
          position: "absolute",
          inset: 0,
          background: "#000",
          zIndex: 10,
        }}
      />

      <span
        ref={textRef}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "#fff",
          zIndex: 11,
        }}
      />
    </Box>
  );
}

export default Hero;
