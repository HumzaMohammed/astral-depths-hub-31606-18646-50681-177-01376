import { useEffect, useRef } from "react";

export const SimpleElegantBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Floating orbs
    class Orb {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      radius: number;
      hue: number;
      speed: number;
      angle: number;

      constructor() {
        this.baseX = Math.random() * canvas.width;
        this.baseY = Math.random() * canvas.height;
        this.x = this.baseX;
        this.y = this.baseY;
        this.radius = 80 + Math.random() * 120;
        this.hue = 180 + Math.random() * 80;
        this.speed = 0.2 + Math.random() * 0.3;
        this.angle = Math.random() * Math.PI * 2;
      }

      update(time: number) {
        this.angle += this.speed * 0.01;
        this.x = this.baseX + Math.sin(this.angle) * 50;
        this.y = this.baseY + Math.cos(this.angle) * 50;
      }

      draw(ctx: CanvasRenderingContext2D, time: number) {
        const pulse = Math.sin(time * 0.001 + this.angle) * 0.3 + 0.7;
        const gradient = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.radius * pulse
        );
        
        gradient.addColorStop(0, `hsla(${this.hue}, 80%, 60%, 0.15)`);
        gradient.addColorStop(0.5, `hsla(${this.hue}, 70%, 50%, 0.08)`);
        gradient.addColorStop(1, `hsla(${this.hue}, 60%, 40%, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * pulse, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const orbs: Orb[] = [];
    const orbCount = 8;
    
    for (let i = 0; i < orbCount; i++) {
      orbs.push(new Orb());
    }

    const animate = () => {
      const time = Date.now();
      
      // Animated gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      const hueShift = Math.sin(time * 0.0001) * 20;
      
      gradient.addColorStop(0, `hsl(${220 + hueShift}, 50%, 8%)`);
      gradient.addColorStop(0.5, `hsl(${240 + hueShift}, 45%, 12%)`);
      gradient.addColorStop(1, `hsl(${260 + hueShift}, 50%, 10%)`);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw orbs
      orbs.forEach(orb => {
        orb.update(time);
        orb.draw(ctx, time);
      });

      // Subtle overlay gradient
      const overlayGradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height) / 2
      );
      overlayGradient.addColorStop(0, "rgba(255, 255, 255, 0.02)");
      overlayGradient.addColorStop(1, "rgba(0, 0, 0, 0.3)");
      
      ctx.fillStyle = overlayGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
    />
  );
};
