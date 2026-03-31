import { useEffect, useRef } from 'react';
export default function SplashScreen({ onDone }) {
  const wordRef = useRef(null);
  const bgRef = useRef(null);
  const text = 'Finimundu';
  const splitAt = 4;
  useEffect(() => {
    const el = wordRef.current;
    const bg = bgRef.current;
    const fitText = () => {
      let size = 10;
      el.style.fontSize = size + 'px';
      while (el.scrollWidth < window.innerWidth * 0.82 && size < 1000) {
        size++;
        el.style.fontSize = size + 'px';
      }
      el.style.fontSize = (size - 1) + 'px';
      return size - 1;
    };
    el.textContent = text;
    let currentSize = fitText();
    el.textContent = '';
    const onResize = () => {
      el.textContent = text;
      currentSize = fitText();
    };
    window.addEventListener('resize', onResize);
    let i = 0;
    function typeChar() {
      if (i < text.length) {
        el.textContent += text[i];
        i++;
        const delay = i === splitAt ? 1200 : 110;
        setTimeout(typeChar, delay);
      } else {
        setTimeout(() => {
          el.style.top = 'calc(100% - 1.2em)';
          el.style.transform = 'translateX(-50%)';
          setTimeout(() => {
            bg.style.opacity = '0';
            setTimeout(() => onDone(currentSize), 950);
          }, 1400);
        }, 1000);
      }
    }
    setTimeout(typeChar, 500);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, overflow: 'hidden', pointerEvents: 'none' }}>
      {/* Background che fa fade */}
      <div ref={bgRef} style={{
        position: 'absolute',
        inset: 0,
        background: '#000',
        transition: 'opacity 0.95s cubic-bezier(.4,0,.2,1)',
      }} />
      {/* Testo — sibling separato, non fa fade col bg */}
      <span ref={wordRef} style={{
        fontSize: '10px',
        fontWeight: 700,
        color: '#ffffff',
        letterSpacing: '-0.03em',
        whiteSpace: 'nowrap',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        transition: 'top 1.1s cubic-bezier(.4,0,.2,1), transform 1.1s cubic-bezier(.4,0,.2,1)',
        fontFamily: 'inherit',
        lineHeight: 1,
        userSelect: 'none',
      }} />
    </div>
  );
}
