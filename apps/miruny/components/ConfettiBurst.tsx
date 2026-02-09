"use client";

import { useMemo, useState, useEffect } from "react";

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
};

const COLORS = ["#f97316", "#fb923c", "#facc15", "#22c55e", "#38bdf8", "#a78bfa"];

function createPieces(count: number): ConfettiPiece[] {
  return Array.from({ length: count }, (_, index) => ({
    id: index,
    left: Math.random() * 100,
    size: 6 + Math.random() * 8,
    duration: 1.8 + Math.random() * 1.6,
    delay: Math.random() * 0.35,
    rotate: Math.random() * 360,
    drift: -40 + Math.random() * 80,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    opacity: 0.7 + Math.random() * 0.3,
  }));
}

export function ConfettiBurst() {
  const pieces = useMemo(() => createPieces(48), []);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setVisible(false);
    }, 2800);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="confetti-piece absolute top-[-10vh]"
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
          }}
        />
      ))}

      <style jsx global>{`
        @keyframes confetti-fall {
          0% {
            transform: translate3d(0, -12vh, 0) rotate(0deg);
          }
          100% {
            transform: translate3d(var(--confetti-drift), 105vh, 0) rotate(720deg);
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
