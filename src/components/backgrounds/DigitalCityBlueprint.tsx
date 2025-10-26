import { useEffect, useRef } from "react";

export const DigitalCityBlueprint = () => {
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

    class Building {
      x: number;
      width: number;
      height: number;
      depth: number;
      floors: number;
      hue: number;
      pulse: number;

      constructor(x: number, depth: number) {
        this.x = x;
        this.width = 40 + Math.random() * 60;
        this.height = 100 + Math.random() * 300;
        this.depth = depth;
        this.floors = Math.floor(this.height / 20);
        this.hue = 180 + Math.random() * 60;
        this.pulse = Math.random() * Math.PI * 2;
      }

      draw(ctx: CanvasRenderingContext2D, time: number) {
        const baseY = canvas.height * 0.7;
        const scale = 0.4 + this.depth * 0.6;
        const opacity = 0.3 + this.depth * 0.5;
        
        const scaledWidth = this.width * scale;
        const scaledHeight = this.height * scale;
        const scaledX = this.x * scale + (canvas.width * (1 - scale)) / 2;
        
        // Building outline
        ctx.strokeStyle = `hsla(${this.hue}, 100%, 60%, ${opacity})`;
        ctx.lineWidth = 1;
        ctx.strokeRect(scaledX, baseY - scaledHeight, scaledWidth, scaledHeight);
        
        // Floors
        for (let floor = 0; floor < this.floors; floor++) {
          const y = baseY - (floor * 20 * scale);
          ctx.beginPath();
          ctx.moveTo(scaledX, y);
          ctx.lineTo(scaledX + scaledWidth, y);
          ctx.strokeStyle = `hsla(${this.hue}, 100%, 60%, ${opacity * 0.3})`;
          ctx.stroke();
          
          // Windows with pulse
          const pulseIntensity = (Math.sin(time * 0.001 + this.pulse + floor * 0.5) + 1) * 0.5;
          const windowCount = Math.floor(scaledWidth / 15);
          for (let w = 0; w < windowCount; w++) {
            if (Math.random() > 0.3) {
              const wx = scaledX + (w * 15) + 5;
              const wy = y - 10 * scale;
              ctx.fillStyle = `hsla(${this.hue}, 100%, 70%, ${opacity * pulseIntensity * 0.8})`;
              ctx.fillRect(wx, wy, 8 * scale, 8 * scale);
            }
          }
        }
        
        // 3D depth lines
        const depthOffset = 30 * scale;
        ctx.strokeStyle = `hsla(${this.hue}, 100%, 60%, ${opacity * 0.5})`;
        ctx.beginPath();
        ctx.moveTo(scaledX + scaledWidth, baseY - scaledHeight);
        ctx.lineTo(scaledX + scaledWidth + depthOffset, baseY - scaledHeight - depthOffset);
        ctx.lineTo(scaledX + scaledWidth + depthOffset, baseY - depthOffset);
        ctx.stroke();
      }
    }

    const buildings: Building[] = [];
    const buildingCount = 15;
    
    for (let i = 0; i < buildingCount; i++) {
      const depth = i / buildingCount;
      const x = (i * canvas.width / buildingCount) + Math.random() * 50;
      buildings.push(new Building(x, depth));
    }

    const animate = () => {
      const time = Date.now();
      
      ctx.fillStyle = "rgba(5, 9, 22, 0.12)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Grid
      const gridSize = 50;
      ctx.strokeStyle = "hsla(200, 100%, 60%, 0.08)";
      ctx.lineWidth = 0.5;
      
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      buildings.sort((a, b) => a.depth - b.depth);
      buildings.forEach(building => building.draw(ctx, time));

      // Scan line
      const scanY = (Math.sin(time * 0.0005) + 1) * 0.5 * canvas.height;
      const scanGradient = ctx.createLinearGradient(0, scanY - 30, 0, scanY + 30);
      scanGradient.addColorStop(0, "transparent");
      scanGradient.addColorStop(0.5, "hsla(180, 100%, 60%, 0.2)");
      scanGradient.addColorStop(1, "transparent");
      ctx.fillStyle = scanGradient;
      ctx.fillRect(0, scanY - 30, canvas.width, 60);

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
      style={{ background: "linear-gradient(180deg, #050916 0%, #0a1020 70%, #050916 100%)" }}
    />
  );
};
