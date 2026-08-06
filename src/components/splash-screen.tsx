"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { m, useReducedMotion } from "motion/react";

const FLAG = "igor_splash_seen";
const CJK_FONT_HREF =
  "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;600&family=Noto+Sans+KR:wght@400;600&family=Noto+Sans+SC:wght@400;600&display=swap";

function useCjkFont(active: boolean) {
  useEffect(() => {
    if (!active || typeof document === "undefined") return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = CJK_FONT_HREF;
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, [active]);
}

export function SplashScreen() {
  const reduce = useReducedMotion();
  const [hidden, setHidden] = useState(false);
  useCjkFont(!hidden);
  const [done, setDone] = useState(false);
  const [index, setIndex] = useState(0);
  const finishedRef = useRef(false);

  const sequence = useMemo(() => {
    const middle = [
      "Hola",
      "Bonjour",
      "Hallo",
      "你好",
      "こんにちは",
      "안녕하세요",
    ];
    for (let i = middle.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [middle[i], middle[j]] = [middle[j], middle[i]];
    }
    return ["Olá", "Hello", ...middle, "Привет"];
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem(FLAG)) {
      setHidden(true);
      return;
    }

    function finish() {
      if (finishedRef.current) return;
      finishedRef.current = true;
      setDone(true);
      document.body.style.overflow = "";
      sessionStorage.setItem(FLAG, "1");
      setTimeout(() => setHidden(true), 1200);
    }

    document.body.style.overflow = "hidden";

    if (reduce) {
      const end = setTimeout(finish, 1200);
      return () => {
        clearTimeout(end);
        document.body.style.overflow = "";
      };
    }

    const step = 340;
    const pause = 250;
    let i = 0;
    let timer: ReturnType<typeof setTimeout> = setTimeout(function tick() {
      setIndex(i);
      if (i >= sequence.length - 1) {
        setTimeout(finish, pause + 1000);
        return;
      }
      i += 1;
      timer = setTimeout(tick, step);
    }, step);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [reduce, sequence.length]);

  if (hidden) return null;

  return (
    <m.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      animate={{ opacity: done ? 0 : 1 }}
      transition={{ duration: 1.2 }}
    >
      <span
        className="text-5xl font-semibold tracking-tight text-foreground sm:text-7xl"
        style={{
          fontFamily:
            '"Noto Sans", "Noto Sans JP", "Noto Sans KR", "Noto Sans SC", sans-serif',
        }}
      >
        {sequence[index]}
      </span>
    </m.div>
  );
}
