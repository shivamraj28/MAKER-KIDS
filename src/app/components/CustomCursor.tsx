import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ cx: 0, cy: 0, rx: 0, ry: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      posRef.current.cx = e.clientX;
      posRef.current.cy = e.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    const animate = () => {
      posRef.current.rx += (posRef.current.cx - posRef.current.rx) * 0.12;
      posRef.current.ry += (posRef.current.cy - posRef.current.ry) * 0.12;
      
      if (ringRef.current) {
        ringRef.current.style.left = `${posRef.current.rx}px`;
        ringRef.current.style.top = `${posRef.current.ry}px`;
      }
      
      requestAnimationFrame(animate);
    };

    const handleMouseOver = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, [role="button"]')) {
        document.body.classList.add('cg');
      }
    };

    const handleMouseOut = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, [role="button"]')) {
        document.body.classList.remove('cg');
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    animate();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <>
      <div
        id="cur"
        ref={cursorRef}
        style={{
          position: 'fixed',
          zIndex: 99999,
          pointerEvents: 'none',
          width: '16px',
          height: '16px',
          borderRadius: '50%',
          background: 'var(--c-purple)',
          transform: 'translate(-50%, -50%)',
          mixBlendMode: 'multiply',
          top: 0,
          left: 0,
          transition: 'width 0.15s, height 0.15s'
        }}
      />
      <div
        id="cur-r"
        ref={ringRef}
        style={{
          position: 'fixed',
          zIndex: 99998,
          pointerEvents: 'none',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: '2px solid var(--c-purple)',
          transform: 'translate(-50%, -50%)',
          top: 0,
          left: 0,
          opacity: 0.4,
          transition: 'width 0.2s, height 0.2s'
        }}
      />
    </>
  );
}
