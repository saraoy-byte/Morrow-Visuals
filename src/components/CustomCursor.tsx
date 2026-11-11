import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export interface CursorState {
  text: string;
  variant: 'default' | 'view' | 'play' | 'create';
  visible: boolean;
}

export const CustomCursor: React.FC<{ cursorState: CursorState }> = ({ cursorState }) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    // Check if device supports fine pointer (mouse)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsTouch(!mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsTouch(!e.matches);
    };

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleMediaChange as (e: MediaQueryListEvent) => void);
    } else if (typeof (mediaQuery as unknown as { addListener?: (cb: (e: MediaQueryList) => void) => void }).addListener === 'function') {
      (mediaQuery as unknown as { addListener: (cb: (e: MediaQueryList) => void) => void }).addListener(handleMediaChange);
    }

    const cursor = cursorRef.current;
    if (!cursor || !mediaQuery.matches) return;

    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.08, ease: 'power3.out' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.08, ease: 'power3.out' });

    const onMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      if (typeof mediaQuery.removeEventListener === 'function') {
        mediaQuery.removeEventListener('change', handleMediaChange as (e: MediaQueryListEvent) => void);
      } else if (typeof (mediaQuery as unknown as { removeListener?: (cb: (e: MediaQueryList) => void) => void }).removeListener === 'function') {
        (mediaQuery as unknown as { removeListener: (cb: (e: MediaQueryList) => void) => void }).removeListener(handleMediaChange);
      }
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  useEffect(() => {
    if (isTouch) return;
    const cursor = cursorRef.current;
    if (!cursor) return;

    if (!cursorState.visible) {
      gsap.to(cursor, { opacity: 0, scale: 0.5, duration: 0.2 });
      return;
    }

    if (cursorState.variant === 'default') {
      gsap.to(cursor, {
        width: 14,
        height: 14,
        backgroundColor: '#EDECE8',
        opacity: 0.8,
        scale: 1,
        borderRadius: '50%',
        duration: 0.25,
        ease: 'power2.out',
      });
    } else {
      gsap.to(cursor, {
        width: 'auto',
        height: 38,
        backgroundColor: '#0F0F12',
        border: '1px solid rgba(229, 169, 60, 0.4)',
        opacity: 1,
        scale: 1,
        borderRadius: '20px',
        paddingLeft: '16px',
        paddingRight: '16px',
        duration: 0.25,
        ease: 'power2.out',
      });
    }
  }, [cursorState, isTouch]);

  if (isTouch) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center backdrop-blur-md shadow-2xl transition-opacity will-change-transform"
      style={{ opacity: 0 }}
    >
      {cursorState.variant !== 'default' && (
        <span
          ref={textRef}
          className="text-[11px] font-semibold tracking-wider uppercase text-[#EDECE8] whitespace-nowrap flex items-center gap-1.5"
        >
          {cursorState.text}
        </span>
      )}
    </div>
  );
};
