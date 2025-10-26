import { useEffect, useRef } from "react";

export const DataStreamHorizon = () => {
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

    class Stream {
      x: number;
      y: number;
      speed: number;
      width: number;
      hue: number;
      opacity: number;
      amplitude: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.speed = 0.5 + Math.random() * 1.5;
        this.width = 2 + Math.random() * 4;
        this.hue = 180 + Math.random() * 80;
        this.opacity = 0.3 + Math.random() * 0.4;
        this.amplitude = 20 + Math.random() * 40;
      }

      update(time: number) {
        this.x += this.speed;
        if (this.x > canvas.width + 100) {
          this.x = -100;
          this.y = Math.random() * canvas.height;
        }
      }

      draw(ctx: CanvasRenderingContext2D, time: number) {
        ctx.beginPath();
        ctx.moveTo(this.x - 200, this.y);
        
        for (let i = 0; i < 200; i += 5) {
          const x = this.x - 200 + i;
          const wave = Math.sin((x + time * 0.5) * 0.01) * this.amplitude;
          ctx.lineTo(x, this.y + wave);
        }
        
        const gradient = ctx.createLinearGradient(this.x - 200, 0, this.x, 0);
        gradient.addColorStop(0, `hsla(${this.hue}, 100%, 60%, 0)`);
        gradient.addColorStop(0.5, `hsla(${this.hue}, 100%, 60%, ${this.opacity})`);
        gradient.addColorStop(1, `hsla(${this.hue}, 100%, 70%, ${this.opacity * 1.5})`);
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = this.width;
        ctx.lineCap = "round";
        ctx.stroke();

        // Glow effect
        ctx.strokeStyle = gradient;
        ctx.lineWidth = this.width * 2;
        ctx.globalAlpha = 0.3;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    }

    const streams: Stream[] = [];
    for (let i = 0; i < 25; i++) {
      streams.push(new Stream());
    }

    const animate = () => {
      const time = Date.now();
      
      ctx.fillStyle = "rgba(5, 10, 25, 0.12)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Horizon glow
      const horizonY = canvas.height * 0.6;
      const horizonGradient = ctx.createLinearGradient(0, horizonY - 200, 0, horizonY + 200);
      horizonGradient.addColorStop(0, "transparent");
      horizonGradient.addColorStop(0.5, "hsla(200, 100%, 50%, 0.1)");
      horizonGradient.addColorStop(1, "transparent");
      ctx.fillStyle = horizonGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      streams.forEach(stream => {
        stream.update(time);
        stream.draw(ctx, time);
      });

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
      style={{ background: "linear-gradient(180deg, #050a19 0%, #0a1228 50%, #050a19 100%)" }}
    />
  );
};
