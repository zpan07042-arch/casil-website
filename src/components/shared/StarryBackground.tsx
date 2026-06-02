"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  r: number;
  opacity: number;
  speed: number;
}

export default function StarryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const stars: Star[] = [];
    const starCount = 60;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
        speed: Math.random() * 0.3 + 0.05,
      });
    }

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      for (const star of stars) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(62, 146, 204, ${star.opacity})`;
        ctx.fill();

        // Twinkle effect
        star.opacity += (Math.random() - 0.5) * 0.02;
        star.opacity = Math.max(0.05, Math.min(0.5, star.opacity));

        // Slow drift
        star.y -= star.speed;
        if (star.y < -10) {
          star.y = canvas.height + 10;
          star.x = Math.random() * canvas.width;
        }
      }

      // Draw subtle orbital arc
      const cx = canvas.width * 0.85;
      const cy = canvas.height * 0.15;
      ctx.beginPath();
      ctx.arc(cx, cy, 120, 0, Math.PI * 0.7);
      ctx.strokeStyle = "rgba(62, 146, 204, 0.06)";
      ctx.lineWidth = 0.5;
      ctx.stroke();

      const cx2 = canvas.width * 0.1;
      const cy2 = canvas.height * 0.85;
      ctx.beginPath();
      ctx.arc(cx2, cy2, 80, Math.PI * 0.8, Math.PI * 1.6);
      ctx.strokeStyle = "rgba(62, 146, 204, 0.05)";
      ctx.lineWidth = 0.5;
      ctx.stroke();

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
