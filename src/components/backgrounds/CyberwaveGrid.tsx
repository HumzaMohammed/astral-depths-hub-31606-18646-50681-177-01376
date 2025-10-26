import { useEffect, useRef } from "react";

export const CyberwaveGrid = () => {
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

    const gridSize = 50;
    const horizonY = canvas.height * 0.6;

    const animate = () => {
      const time = Date.now() * 0.0005;
      
      ctx.fillStyle = "rgba(4, 8, 20, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Perspective grid floor
      const perspectiveDepth = 30;
      
      for (let row = 0; row < perspectiveDepth; row++) {
        const depth = row / perspectiveDepth;
        const scale = 1 - depth * 0.8;
        const y = horizonY + (row * gridSize * scale);
        
        if (y > canvas.height) break;
        
        const wave = Math.sin(time * 2 + row * 0.1) * 20 * scale;
        const opacity = (0.5 - depth * 0.3) * (1 + Math.sin(time + row * 0.2) * 0.5);
        const hue = 180 + depth * 100 + time * 20;
        
        // Horizontal lines with wave
        ctx.beginPath();
        for (let x = 0; x <= canvas.width; x += 5) {
          const waveOffset = Math.sin(x * 0.01 + time * 2 + row * 0.3) * wave;
          const px = x;
          const py = y + waveOffset;
          
          if (x === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        
        const gradient = ctx.createLinearGradient(0, y - 20, 0, y + 20);
        gradient.addColorStop(0, "transparent");
        gradient.addColorStop(0.5, `hsla(${hue}, 100%, 60%, ${opacity})`);
        gradient.addColorStop(1, "transparent");
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1 + depth * 2;
        ctx.stroke();
      }

      // Vertical grid lines with perspective
      const verticalLines = 20;
      for (let i = 0; i < verticalLines; i++) {
        const x = (i / verticalLines) * canvas.width;
        const hue = 200 + (i / verticalLines) * 80;
        
        ctx.beginPath();
        ctx.moveTo(x, horizonY);
        
        for (let row = 0; row < perspectiveDepth; row++) {
          const depth = row / perspectiveDepth;
          const scale = 1 - depth * 0.8;
          const y = horizonY + (row * gridSize * scale);
          const wave = Math.sin(time * 2 + row * 0.1) * 20 * scale;
          const waveOffset = Math.sin(x * 0.01 + time * 2 + row * 0.3) * wave;
          
          ctx.lineTo(x, y + waveOffset);
        }
        
        const opacity = 0.2 + Math.sin(time + i * 0.5) * 0.2;
        ctx.strokeStyle = `hsla(${hue}, 100%, 60%, ${opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Energy pulses along grid
      for (let i = 0; i < 5; i++) {
        const pulseProgress = (time * 0.3 + i * 0.4) % 1;
        const pulseRow = Math.floor(pulseProgress * perspectiveDepth);
        const depth = pulseRow / perspectiveDepth;
        const scale = 1 - depth * 0.8;
        const y = horizonY + (pulseRow * gridSize * scale);
        
        if (y < canvas.height) {
          const hue = 280 + i * 40;
          const pulseGradient = ctx.createLinearGradient(0, y - 30, 0, y + 30);
          pulseGradient.addColorStop(0, "transparent");
          pulseGradient.addColorStop(0.5, `hsla(${hue}, 100%, 70%, 0.6)`);
          pulseGradient.addColorStop(1, "transparent");
          
          ctx.fillStyle = pulseGradient;
          ctx.fillRect(0, y - 30, canvas.width, 60);
        }
      }

      // Floating data orbs
      for (let i = 0; i < 15; i++) {
        const angle = (i / 15) * Math.PI * 2 + time;
        const radius = 150 + Math.sin(time + i) * 50;
        const x = canvas.width / 2 + Math.cos(angle) * radius;
        const y = horizonY - 100 + Math.sin(angle * 1.5 + time) * 80;
        const size = 3 + Math.sin(time * 2 + i) * 2;
        
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        const hue = 180 + (i / 15) * 120 + time * 30;
        const orbGradient = ctx.createRadialGradient(x, y, 0, x, y, size * 3);
        orbGradient.addColorStop(0, `hsla(${hue}, 100%, 70%, 0.8)`);
        orbGradient.addColorStop(1, "transparent");
        ctx.fillStyle = orbGradient;
        ctx.fill();
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
      style={{ background: "linear-gradient(180deg, #040814 0%, #080c20 60%, #0a0e28 100%)" }}
    />
  );
};
