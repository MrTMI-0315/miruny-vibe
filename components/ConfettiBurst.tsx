"use client";

import { useMemo, useState, useEffect, useRef } from "react";

type ConfettiPiece = {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  rotate: number;
  drift: number;
  color: string;
  opacity: number;
  burstIndex: number;
  rise: number;
  fall: number;
};

const COLORS = ["#f97316", "#fb923c", "#facc15", "#22c55e", "#38bdf8", "#a78bfa"];
let hasShownConfettiInSession = false;

function createPieces(bursts = 1, perBurst = 10): ConfettiPiece[] {
  const origins = Array.from({ length: bursts }, () => {
    return 45 + (Math.random() * 10 - 5);
  });

  const pieces: ConfettiPiece[] = [];

  origins.forEach((origin, burstIndex) => {
    for (let i = 0; i < perBurst; i += 1) {
      const id = burstIndex * perBurst + i;
      pieces.push({
        id,
        burstIndex,
        left: origin + (Math.random() * 10 - 5),
        size: 4 + Math.random() * 5,
        duration: 1.0 + Math.random() * 0.9,
        delay: Math.random() * 0.2,
        rotate: Math.random() * 360,
        drift: -90 + Math.random() * 180,
        rise: 10 + Math.random() * 12,
        fall: 14 + Math.random() * 18,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        opacity: 0.6 + Math.random() * 0.25,
      });
    }
  });

  return pieces;
}

export function ConfettiBurst() {
  const pieces = useMemo(() => createPieces(4, 12), []);
  const hasFiredRef = useRef(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (hasFiredRef.current || hasShownConfettiInSession) {
      return;
    }
    let timeoutId: number | null = null;

    const frameId = window.requestAnimationFrame(() => {
      hasFiredRef.current = true;
      hasShownConfettiInSession = true;
      setVisible(true);
      timeoutId = window.setTimeout(() => {
        setVisible(false);
      }, 1500);
    });

    return () => {
      window.cancelAnimationFrame(frameId);
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="confetti-piece absolute bottom-[-2vh]"
          style={{
            left: `${piece.left}%`,
            width: `${piece.size}px`,
            height: `${piece.size * 1.7}px`,
            backgroundColor: piece.color,
            opacity: piece.opacity,
            transform: `rotate(${piece.rotate}deg)`,
            animationDuration: `${piece.duration}s`,
            animationDelay: `${piece.delay}s`,
            ["--confetti-drift" as string]: `${piece.drift}px`,
            ["--confetti-rise" as string]: `${piece.rise}vh`,
            ["--confetti-fall" as string]: `${piece.fall}vh`,
            ["--confetti-spread" as string]: `${piece.burstIndex * 3}px`,
          }}
        />
      ))}

      <style jsx global>{`
        @keyframes confetti-fall {
          0% {
            transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
          }
          35% {
            transform: translate3d(
                calc(var(--confetti-drift) * 0.65 + var(--confetti-spread)),
                calc(var(--confetti-rise) * -1),
                0
              )
              rotate(320deg)
              scale(1);
            opacity: 1;
          }
          100% {
            transform: translate3d(
                calc(var(--confetti-drift) * 1.15 + var(--confetti-spread)),
                var(--confetti-fall),
                0
              )
              rotate(720deg)
              scale(0.92);
            opacity: 0;
          }
        }

        .confetti-piece {
          border-radius: 2px;
          animation-name: confetti-fall;
          animation-timing-function: ease-out;
          animation-fill-mode: forwards;
          will-change: transform, opacity;
        }
      `}</style>
    </div>
  );
}
