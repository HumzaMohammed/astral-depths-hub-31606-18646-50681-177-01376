import { useEffect, useRef } from "react";

export const QuantumMeshfield = () => {
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

    const gridSize = 40;
    const cols = Math.ceil(canvas.width / gridSize) + 1;
    const rows = Math.ceil(canvas.height / gridSize) + 1;

    const animate = () => {
      const time = Date.now() * 0.0005;
      
      ctx.fillStyle = "rgba(8, 12, 30, 0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw quantum mesh
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * gridSize;
          const y = row * gridSize;
          
          const dx = x - canvas.width / 2;
          const dy = y - canvas.height / 2;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          const wave1 = Math.sin(distance * 0.02 - time * 2) * 15;
          const wave2 = Math.cos(distance * 0.015 + time * 1.5) * 10;
          const finalX = x + wave1;
          const finalY = y + wave2;
          
          const depth = (Math.sin(distance * 0.01 - time) + 1) * 0.5;
          const hue = 180 + depth * 60 + time * 10;
          const brightness = 0.3 + depth * 0.5;
          
          // Draw point
          ctx.beginPath();
          ctx.arc(finalX, finalY, 1.5 + depth * 2, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${hue}, 100%, 60%, ${brightness})`;
          ctx.fill();
          
          // Draw connections
          if (col < cols - 1) {
            const nextX = (col + 1) * gridSize + Math.sin(distance * 0.02 - time * 2) * 15;
            const nextY = y + Math.cos(distance * 0.015 + time * 1.5) * 10;
            
            const gradient = ctx.createLinearGradient(finalX, finalY, nextX, nextY);
            gradient.addColorStop(0, `hsla(${hue}, 100%, 60%, ${brightness * 0.3})`);
            gradient.addColorStop(1, `hsla(${hue + 20}, 100%, 60%, ${brightness * 0.2})`);
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.5 + depth;
            ctx.beginPath();
            ctx.moveTo(finalX, finalY);
            ctx.lineTo(nextX, nextY);
            ctx.stroke();
          }
          
          if (row < rows - 1) {
            const nextX = x + Math.sin(distance * 0.02 - time * 2) * 15;
            const nextY = (row + 1) * gridSize + Math.cos(distance * 0.015 + time * 1.5) * 10;
            
            const gradient = ctx.createLinearGradient(finalX, finalY, nextX, nextY);
            gradient.addColorStop(0, `hsla(${hue}, 100%, 60%, ${brightness * 0.3})`);
            gradient.addColorStop(1, `hsla(${hue + 20}, 100%, 60%, ${brightness * 0.2})`);
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.5 + depth;
            ctx.beginPath();
            ctx.moveTo(finalX, finalY);
            ctx.lineTo(nextX, nextY);
            ctx.stroke();
          }
        }
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
      style={{ background: "linear-gradient(135deg, #080c1e 0%, #10163a 50%, #080c1e 100%)" }}
    />
  );
};
