import { useEffect, useRef } from "react";

export const AuroraMatrix = () => {
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

    const animate = () => {
      const time = Date.now() * 0.0003;
      
      ctx.fillStyle = "rgba(5, 8, 20, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Aurora waves with organic movement
      const layers = 5;
      for (let layer = 0; layer < layers; layer++) {
        const layerOffset = layer * 0.2;
        const yBase = canvas.height * 0.3 + layer * 60;
        
        ctx.beginPath();
        for (let x = 0; x <= canvas.width; x += 3) {
          const wave1 = Math.sin(x * 0.003 + time + layerOffset) * 80;
          const wave2 = Math.cos(x * 0.005 - time * 0.7 + layerOffset) * 50;
          const wave3 = Math.sin(x * 0.002 + time * 1.3 + layerOffset) * 30;
          const y = yBase + wave1 + wave2 + wave3;
          
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        
        const hue = 180 + layer * 30 + time * 20;
        const gradient = ctx.createLinearGradient(0, yBase - 100, 0, yBase + 200);
        gradient.addColorStop(0, `hsla(${hue}, 100%, 60%, ${0.15 - layer * 0.02})`);
        gradient.addColorStop(0.5, `hsla(${hue + 40}, 100%, 50%, ${0.1 - layer * 0.015})`);
        gradient.addColorStop(1, "transparent");
        
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      // Organic particles
      for (let i = 0; i < 50; i++) {
        const angle = (i / 50) * Math.PI * 2;
        const radius = 200 + Math.sin(time + i) * 100;
        const x = canvas.width / 2 + Math.cos(angle + time * 0.5) * radius;
        const y = canvas.height / 2 + Math.sin(angle + time * 0.3) * (radius * 0.6);
        
        const hue = 180 + (i / 50) * 120 + time * 30;
        const size = 2 + Math.sin(time * 2 + i) * 2;
        
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, size * 3);
        gradient.addColorStop(0, `hsla(${hue}, 100%, 70%, 0.6)`);
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      // Flowing energy streams
      for (let i = 0; i < 3; i++) {
        const streamY = canvas.height * (0.2 + i * 0.25);
        ctx.beginPath();
        
        for (let x = 0; x <= canvas.width; x += 5) {
          const flow = Math.sin(x * 0.01 + time * (1 + i * 0.3)) * 40;
          const y = streamY + flow;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        
        const hue = 200 + i * 60 + time * 15;
        const gradient = ctx.createLinearGradient(0, streamY - 50, 0, streamY + 50);
        gradient.addColorStop(0, "transparent");
        gradient.addColorStop(0.5, `hsla(${hue}, 100%, 60%, 0.3)`);
        gradient.addColorStop(1, "transparent");
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 3;
        ctx.stroke();
      }

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
      style={{ background: "linear-gradient(180deg, #050814 0%, #0a1028 50%, #050814 100%)" }}
    />
  );
};
