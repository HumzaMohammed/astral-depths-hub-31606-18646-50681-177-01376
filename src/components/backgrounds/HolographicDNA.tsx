import { useEffect, useRef } from "react";

export const HolographicDNA = () => {
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
      const time = Date.now() * 0.0008;
      
      ctx.fillStyle = "rgba(6, 9, 24, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const helixHeight = Math.min(canvas.height * 0.8, 600);
      const helixRadius = Math.min(canvas.width * 0.15, 120);
      const segments = 80;

      // Draw DNA helix strands
      for (let strand = 0; strand < 2; strand++) {
        const offset = strand * Math.PI;
        
        ctx.beginPath();
        for (let i = 0; i <= segments; i++) {
          const progress = i / segments;
          const y = centerY - helixHeight / 2 + progress * helixHeight;
          const angle = progress * Math.PI * 4 + time + offset;
          const x = centerX + Math.cos(angle) * helixRadius;
          
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        
        const hue = 180 + strand * 60 + time * 30;
        const gradient = ctx.createLinearGradient(centerX, centerY - helixHeight / 2, centerX, centerY + helixHeight / 2);
        gradient.addColorStop(0, `hsla(${hue}, 100%, 60%, 0.2)`);
        gradient.addColorStop(0.5, `hsla(${hue}, 100%, 70%, 0.6)`);
        gradient.addColorStop(1, `hsla(${hue}, 100%, 60%, 0.2)`);
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 3;
        ctx.stroke();
      }

      // Draw connecting base pairs
      for (let i = 0; i < segments; i++) {
        const progress = i / segments;
        const y = centerY - helixHeight / 2 + progress * helixHeight;
        const angle1 = progress * Math.PI * 4 + time;
        const angle2 = progress * Math.PI * 4 + time + Math.PI;
        
        const x1 = centerX + Math.cos(angle1) * helixRadius;
        const x2 = centerX + Math.cos(angle2) * helixRadius;
        
        const hue = 200 + (progress * 80) + time * 20;
        const opacity = 0.3 + Math.sin(progress * Math.PI) * 0.3;
        
        ctx.beginPath();
        ctx.moveTo(x1, y);
        ctx.lineTo(x2, y);
        ctx.strokeStyle = `hsla(${hue}, 100%, 60%, ${opacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Base pair nodes
        [x1, x2].forEach(x => {
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, Math.PI * 2);
          const nodeGradient = ctx.createRadialGradient(x, y, 0, x, y, 8);
          nodeGradient.addColorStop(0, `hsla(${hue}, 100%, 70%, ${opacity + 0.4})`);
          nodeGradient.addColorStop(1, "transparent");
          ctx.fillStyle = nodeGradient;
          ctx.fill();
        });
      }

      // Holographic scan effect
      const scanPosition = (Math.sin(time * 0.5) + 1) * 0.5;
      const scanY = centerY - helixHeight / 2 + scanPosition * helixHeight;
      
      ctx.beginPath();
      ctx.arc(centerX, scanY, helixRadius * 1.5, 0, Math.PI * 2);
      const scanGradient = ctx.createRadialGradient(centerX, scanY, 0, centerX, scanY, helixRadius * 1.5);
      scanGradient.addColorStop(0, "hsla(180, 100%, 70%, 0.3)");
      scanGradient.addColorStop(0.7, "hsla(200, 100%, 60%, 0.1)");
      scanGradient.addColorStop(1, "transparent");
      ctx.fillStyle = scanGradient;
      ctx.fill();

      // Orbital particles
      for (let i = 0; i < 20; i++) {
        const orbitAngle = (i / 20) * Math.PI * 2 + time;
        const orbitRadius = helixRadius * 2;
        const px = centerX + Math.cos(orbitAngle) * orbitRadius;
        const py = centerY + Math.sin(orbitAngle) * (orbitRadius * 0.5);
        
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        const hue = 180 + (i / 20) * 120;
        ctx.fillStyle = `hsla(${hue}, 100%, 70%, 0.6)`;
        ctx.shadowBlur = 15;
        ctx.shadowColor = `hsla(${hue}, 100%, 60%, 0.8)`;
        ctx.fill();
        ctx.shadowBlur = 0;
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
      style={{ background: "linear-gradient(135deg, #060918 0%, #0d1230 50%, #060918 100%)" }}
    />
  );
};
