import { useEffect, useRef } from "react";

export const FloatingCodeParticles = () => {
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

    const codeChars = ['0', '1', '{', '}', '<', '>', '/', 'λ', 'Σ', '∫', 'π', 'Δ', 'α', 'β'];

    class CodeParticle {
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
      char: string;
      size: number;
      hue: number;
      rotation: number;
      rotationSpeed: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * 1000;
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = (Math.random() - 0.5) * 0.2;
        this.vz = (Math.random() - 0.5) * 0.5;
        this.char = codeChars[Math.floor(Math.random() * codeChars.length)];
        this.size = 10 + Math.random() * 20;
        this.hue = 180 + Math.random() * 80;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.z += this.vz;
        this.rotation += this.rotationSpeed;

        if (this.x < -50) this.x = canvas.width + 50;
        if (this.x > canvas.width + 50) this.x = -50;
        if (this.y < -50) this.y = canvas.height + 50;
        if (this.y > canvas.height + 50) this.y = -50;
        if (this.z > 1000) this.z = 0;
        if (this.z < 0) this.z = 1000;
      }

      draw(ctx: CanvasRenderingContext2D) {
        const depth = 1 - this.z / 1000;
        const scale = 0.3 + depth * 0.7;
        const opacity = 0.2 + depth * 0.6;
        const finalSize = this.size * scale;

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        ctx.font = `${finalSize}px 'Courier New', monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        
        // Glow effect
        ctx.shadowBlur = 20 * scale;
        ctx.shadowColor = `hsla(${this.hue}, 100%, 60%, ${opacity})`;
        
        ctx.fillStyle = `hsla(${this.hue}, 100%, 70%, ${opacity})`;
        ctx.fillText(this.char, 0, 0);
        
        ctx.restore();
      }
    }

    const particles: CodeParticle[] = [];
    for (let i = 0; i < 80; i++) {
      particles.push(new CodeParticle());
    }

    const animate = () => {
      ctx.fillStyle = "rgba(7, 11, 25, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.sort((a, b) => a.z - b.z);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw(ctx);
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
      style={{ background: "linear-gradient(135deg, #070b19 0%, #0e1430 50%, #070b19 100%)" }}
    />
  );
};
