import { useEffect, useRef } from "react";

export const FractalIntelligence = () => {
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

    const drawFractalBranch = (
      x: number,
      y: number,
      angle: number,
      depth: number,
      length: number,
      time: number,
      hue: number
    ) => {
      if (depth === 0) return;

      const endX = x + Math.cos(angle) * length;
      const endY = y + Math.sin(angle) * length;

      const opacity = depth / 8;
      const animatedHue = (hue + time * 10 + depth * 15) % 360;
      
      const gradient = ctx.createLinearGradient(x, y, endX, endY);
      gradient.addColorStop(0, `hsla(${animatedHue}, 100%, 60%, ${opacity * 0.6})`);
      gradient.addColorStop(1, `hsla(${animatedHue + 40}, 100%, 70%, ${opacity})`);
      
      ctx.strokeStyle = gradient;
      ctx.lineWidth = depth * 0.8;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(endX, endY);
      ctx.stroke();

      // Glow at branch points
      if (depth % 2 === 0) {
        ctx.beginPath();
        ctx.arc(endX, endY, depth * 1.5, 0, Math.PI * 2);
        const glowGradient = ctx.createRadialGradient(endX, endY, 0, endX, endY, depth * 3);
        glowGradient.addColorStop(0, `hsla(${animatedHue}, 100%, 70%, ${opacity * 0.8})`);
        glowGradient.addColorStop(1, "transparent");
        ctx.fillStyle = glowGradient;
        ctx.fill();
      }

      const angleVariation = Math.sin(time + depth) * 0.3;
      const branchAngle1 = angle - 0.4 + angleVariation;
      const branchAngle2 = angle + 0.4 - angleVariation;
      const newLength = length * (0.7 + Math.sin(time * 0.5 + depth) * 0.1);

      drawFractalBranch(endX, endY, branchAngle1, depth - 1, newLength, time, hue);
      drawFractalBranch(endX, endY, branchAngle2, depth - 1, newLength, time, hue);
    };

    const animate = () => {
      const time = Date.now() * 0.0003;
      
      ctx.fillStyle = "rgba(5, 8, 22, 0.12)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Multiple fractal trees from center
      const treeCount = 6;
      for (let i = 0; i < treeCount; i++) {
        const angle = (i / treeCount) * Math.PI * 2 + time * 0.2;
        const hue = 180 + (i / treeCount) * 120;
        const initialLength = 60 + Math.sin(time + i) * 20;
        
        drawFractalBranch(
          centerX,
          centerY,
          angle,
          7,
          initialLength,
          time + i,
          hue
        );
      }

      // Particle field emanating from center
      for (let i = 0; i < 100; i++) {
        const angle = (i / 100) * Math.PI * 2 + time * 0.1;
        const distance = 100 + (i % 10) * 40 + Math.sin(time * 2 + i) * 30;
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;
        
        const size = 1 + Math.sin(time * 3 + i) * 1.5;
        const hue = 180 + (i / 100) * 180 + time * 50;
        const opacity = 0.3 + Math.sin(time * 2 + i) * 0.3;
        
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        const particleGradient = ctx.createRadialGradient(x, y, 0, x, y, size * 2);
        particleGradient.addColorStop(0, `hsla(${hue}, 100%, 70%, ${opacity})`);
        particleGradient.addColorStop(1, "transparent");
        ctx.fillStyle = particleGradient;
        ctx.fill();
      }

      // Central core pulse
      const coreSize = 30 + Math.sin(time * 2) * 15;
      const coreGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, coreSize);
      coreGradient.addColorStop(0, `hsla(${(time * 50) % 360}, 100%, 80%, 0.8)`);
      coreGradient.addColorStop(0.5, `hsla(${(time * 50 + 60) % 360}, 100%, 60%, 0.4)`);
      coreGradient.addColorStop(1, "transparent");
      ctx.fillStyle = coreGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, coreSize, 0, Math.PI * 2);
      ctx.fill();

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
      style={{ background: "linear-gradient(135deg, #050816 0%, #0a0f28 50%, #050816 100%)" }}
    />
  );
};
