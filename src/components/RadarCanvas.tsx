import { useEffect, useRef } from 'react';

export default function RadarCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let angle = 0;
    const dots: { x: number; y: number; alpha: number; age: number }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      const r = Math.min(w, h) * 0.42;

      ctx.clearRect(0, 0, w, h);

      // Background circles
      ctx.strokeStyle = 'rgba(0, 174, 239, 0.12)';
      ctx.lineWidth = 1;
      [0.25, 0.5, 0.75, 1].forEach(ratio => {
        ctx.beginPath();
        ctx.arc(cx, cy, r * ratio, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Cross lines
      ctx.strokeStyle = 'rgba(0, 174, 239, 0.1)';
      ctx.beginPath();
      ctx.moveTo(cx - r, cy); ctx.lineTo(cx + r, cy);
      ctx.moveTo(cx, cy - r); ctx.lineTo(cx, cy + r);
      ctx.stroke();

      // Diagonal lines
      ctx.strokeStyle = 'rgba(0, 174, 239, 0.06)';
      ctx.beginPath();
      ctx.moveTo(cx - r * 0.7, cy - r * 0.7); ctx.lineTo(cx + r * 0.7, cy + r * 0.7);
      ctx.moveTo(cx + r * 0.7, cy - r * 0.7); ctx.lineTo(cx - r * 0.7, cy + r * 0.7);
      ctx.stroke();

      // Sweep gradient
      const sweepGrad = ctx.createConicalGradient
        ? null
        : null;

      const sweepEndX = cx + r * Math.cos(angle);
      const sweepEndY = cy + r * Math.sin(angle);
      const trailLen = Math.PI * 0.7;

      for (let i = 0; i < 60; i++) {
        const a = angle - (i / 60) * trailLen;
        const alpha = (1 - i / 60) * 0.4;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, r, a - 0.05, a + 0.05);
        ctx.closePath();
        ctx.fillStyle = `rgba(0, 174, 239, ${alpha})`;
        ctx.fill();
      }

      // Sweep line
      ctx.strokeStyle = 'rgba(0, 174, 239, 0.9)';
      ctx.lineWidth = 1.5;
      ctx.shadowColor = '#00AEEF';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(sweepEndX, sweepEndY);
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Random dot spawn
      if (Math.random() < 0.06) {
        const a = angle + (Math.random() - 0.5) * 0.3;
        const d = (0.3 + Math.random() * 0.65) * r;
        dots.push({ x: cx + d * Math.cos(a), y: cy + d * Math.sin(a), alpha: 1, age: 0 });
      }

      // Draw dots
      dots.forEach((dot, i) => {
        dot.age++;
        dot.alpha = Math.max(0, 1 - dot.age / 80);
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 210, 200, ${dot.alpha})`;
        ctx.shadowColor = '#00D2C8';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Remove old dots
      for (let i = dots.length - 1; i >= 0; i--) {
        if (dots[i].alpha <= 0) dots.splice(i, 1);
      }

      // Center dot
      ctx.beginPath();
      ctx.arc(cx, cy, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#00AEEF';
      ctx.shadowColor = '#00AEEF';
      ctx.shadowBlur = 15;
      ctx.fill();
      ctx.shadowBlur = 0;

      angle += 0.018;
      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: 'block' }}
    />
  );
}
