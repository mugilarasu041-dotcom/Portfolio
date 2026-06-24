import { useEffect, useRef } from 'react';

interface RainColumn {
  x: number;
  y: number;
  speed: number;
  chars: string[];
  length: number;
  opacity: number;
}

export default function DigitalRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let isVisible = true;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*';

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const columns: RainColumn[] = [];
    const colCount = Math.floor(window.innerWidth / 20);

    for (let i = 0; i < colCount; i++) {
      columns.push({
        x: i * 20 + Math.random() * 10,
        y: Math.random() * canvas.height * 2 - canvas.height,
        speed: 1.5 + Math.random() * 3,
        chars: [],
        length: 8 + Math.floor(Math.random() * 12),
        opacity: 0.3 + Math.random() * 0.7,
      });
      // Pre-fill characters
      for (let j = 0; j < columns[i].length; j++) {
        columns[i].chars.push(chars[Math.floor(Math.random() * chars.length)]);
      }
    }

    const draw = () => {
      if (!isVisible) {
        animationId = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Fade overlay at bottom 20%
      const gradient = ctx.createLinearGradient(0, canvas.height * 0.6, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(5, 5, 5, 0)');
      gradient.addColorStop(1, 'rgba(5, 5, 5, 1)');

      columns.forEach((col) => {
        for (let i = 0; i < col.length; i++) {
          const charY = col.y - i * 14;
          if (charY < -14 || charY > canvas.height + 14) continue;

          // Trail fading: head is brightest, tail fades
          const trailPos = i / col.length;
          const alpha = col.opacity * (1 - trailPos) * 0.6;

          if (i === 0) {
            // Head character — brightest, white-green
            ctx.fillStyle = `rgba(220, 255, 240, ${col.opacity * 0.9})`;
            ctx.font = 'bold 12px "JetBrains Mono", monospace';
          } else {
            // Trail characters — green fading
            const greenIntensity = 211 + Math.floor(trailPos * 44); // 211 to 255
            ctx.fillStyle = `rgba(52, ${greenIntensity}, 153, ${alpha})`;
            ctx.font = '12px "JetBrains Mono", monospace';
          }

          ctx.fillText(col.chars[i] || chars[Math.floor(Math.random() * chars.length)], col.x, charY);
        }

        // Update position
        if (!prefersReducedMotion) {
          col.y += col.speed;

          // Regenerate characters periodically
          if (Math.random() < 0.05) {
            col.chars[Math.floor(Math.random() * col.length)] = chars[Math.floor(Math.random() * chars.length)];
          }

          // Reset when off screen
          if (col.y - col.length * 14 > canvas.height) {
            col.y = -Math.random() * 100;
            col.speed = 1.5 + Math.random() * 3;
            col.opacity = 0.3 + Math.random() * 0.7;
            // Regenerate all characters
            col.chars = [];
            for (let j = 0; j < col.length; j++) {
              col.chars.push(chars[Math.floor(Math.random() * chars.length)]);
            }
          }
        }
      });

      // Apply bottom fade
      ctx.fillStyle = gradient;
      ctx.fillRect(0, canvas.height * 0.6, canvas.width, canvas.height * 0.4);

      animationId = requestAnimationFrame(draw);
    };

    draw();

    // Visibility handling
    const handleVisibility = () => {
      isVisible = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, opacity: 0.15 }}
    />
  );
}
