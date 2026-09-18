import React, { useEffect, useRef } from 'react';

export const BackgroundEffects: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const particleColors = [
      'rgba(255, 95, 172, ',  // Bright Pink
      'rgba(216, 172, 106, ', // Warm Gold
      'rgba(255, 142, 196, ', // Soft Rose Pink
      'rgba(248, 223, 165, '  // Shimmer Gold
    ];

    const count = Math.min(Math.floor(window.innerWidth / 20), 70);
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      colorBase: string;
      alpha: number;
      fadeSpeed: number;
      twinkleDir: number;
    }> = [];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.2 + 0.8,
        speedY: Math.random() * 0.45 + 0.2,
        speedX: (Math.random() - 0.5) * 0.25,
        colorBase: particleColors[Math.floor(Math.random() * particleColors.length)],
        alpha: Math.random() * 0.55 + 0.2,
        fadeSpeed: Math.random() * 0.003 + 0.001,
        twinkleDir: Math.random() > 0.5 ? 1 : -1,
      });
    }

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += p.speedX;

        // Twinkle
        p.alpha += p.fadeSpeed * p.twinkleDir;
        if (p.alpha >= 0.75) p.twinkleDir = -1;
        else if (p.alpha <= 0.15) p.twinkleDir = 1;

        // Wrap around
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.colorBase}${p.alpha})`;
        ctx.shadowBlur = p.size * 4;
        ctx.shadowColor = p.colorBase.includes('255, 95') ? '#ff5fac' : '#d8ac6a';
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      {/* 60fps Rising HTML5 Canvas Particles */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Floating Glowing Ambient Orbs */}
      <div className="ambient-orb orb-pink-1" aria-hidden="true" />
      <div className="ambient-orb orb-gold-1" aria-hidden="true" />
      <div className="ambient-orb orb-pink-2" aria-hidden="true" />
      <div className="ambient-orb orb-gold-2" aria-hidden="true" />

      {/* Subtle Grid Pattern */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0" />
    </>
  );
};
