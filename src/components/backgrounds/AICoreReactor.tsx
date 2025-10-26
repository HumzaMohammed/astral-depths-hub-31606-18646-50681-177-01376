import { useEffect, useRef } from "react";

export const AICoreReactor = () => {
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
      
      ctx.fillStyle = "rgba(4, 7, 18, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const maxRadius = Math.min(canvas.width, canvas.height) * 0.4;

      // Core reactor sphere
      const coreRadius = 80 + Math.sin(time * 2) * 20;
      const coreGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, coreRadius);
      coreGradient.addColorStop(0, `hsla(${(time * 100) % 360}, 100%, 90%, 0.9)`);
      coreGradient.addColorStop(0.4, `hsla(${(time * 100 + 60) % 360}, 100%, 70%, 0.6)`);
      coreGradient.addColorStop(0.7, `hsla(${(time * 100 + 120) % 360}, 100%, 50%, 0.3)`);
      coreGradient.addColorStop(1, "transparent");
      
      ctx.fillStyle = coreGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, coreRadius, 0, Math.PI * 2);
      ctx.fill();

      // Rotating energy rings
      const ringCount = 8;
      for (let ring = 0; ring < ringCount; ring++) {
        const ringRadius = coreRadius + (ring * 30) + Math.sin(time + ring) * 10;
        const rotation = time * (1 + ring * 0.1) + ring;
        const hue = 180 + ring * 30 + time * 20;
        const opacity = 0.6 - ring * 0.06;
        
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(rotation);
        
        // Draw ring segments
        const segments = 24;
        for (let seg = 0; seg < segments; seg++) {
          if (seg % 2 === 0) continue; // Create gaps
          
          const startAngle = (seg / segments) * Math.PI * 2;
          const endAngle = ((seg + 1) / segments) * Math.PI * 2;
          
          ctx.beginPath();
          ctx.arc(0, 0, ringRadius, startAngle, endAngle);
          ctx.strokeStyle = `hsla(${hue}, 100%, 60%, ${opacity})`;
          ctx.lineWidth = 3 + Math.sin(time * 2 + ring) * 2;
          ctx.stroke();
          
          // Glow effect
          ctx.strokeStyle = `hsla(${hue}, 100%, 70%, ${opacity * 0.3})`;
          ctx.lineWidth = 8;
          ctx.stroke();
        }
        
        ctx.restore();
      }

      // Energy beams
      const beamCount = 12;
      for (let i = 0; i < beamCount; i++) {
        const angle = (i / beamCount) * Math.PI * 2 + time * 0.5;
        const beamLength = maxRadius + Math.sin(time * 2 + i) * 50;
        const endX = centerX + Math.cos(angle) * beamLength;
        const endY = centerY + Math.sin(angle) * beamLength;
        
        const hue = 180 + (i / beamCount) * 120 + time * 30;
        const beamGradient = ctx.createLinearGradient(centerX, centerY, endX, endY);
        beamGradient.addColorStop(0, `hsla(${hue}, 100%, 80%, 0.6)`);
        beamGradient.addColorStop(0.5, `hsla(${hue}, 100%, 60%, 0.3)`);
        beamGradient.addColorStop(1, "transparent");
        
        ctx.strokeStyle = beamGradient;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      }

      // Orbiting energy nodes
      const nodeCount = 16;
      for (let i = 0; i < nodeCount; i++) {
        const orbitRadius = maxRadius * 0.7 + Math.sin(time + i) * 30;
        const angle = (i / nodeCount) * Math.PI * 2 + time * (1 + (i % 3) * 0.2);
        const x = centerX + Math.cos(angle) * orbitRadius;
        const y = centerY + Math.sin(angle) * orbitRadius;
        const size = 4 + Math.sin(time * 3 + i) * 3;
        
        const hue = 200 + (i / nodeCount) * 160 + time * 40;
        const nodeGradient = ctx.createRadialGradient(x, y, 0, x, y, size * 3);
        nodeGradient.addColorStop(0, `hsla(${hue}, 100%, 80%, 0.9)`);
        nodeGradient.addColorStop(0.5, `hsla(${hue}, 100%, 60%, 0.5)`);
        nodeGradient.addColorStop(1, "transparent");
        
        ctx.fillStyle = nodeGradient;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Data flow particles
      for (let i = 0; i < 50; i++) {
        const particleTime = time * 2 + i * 0.1;
        const progress = (particleTime % 2) / 2;
        const angle = (i / 50) * Math.PI * 2 + time;
        const distance = coreRadius + progress * (maxRadius - coreRadius);
        
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;
        const size = 2 * (1 - progress);
        
        const hue = 180 + progress * 180 + time * 50;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hue}, 100%, 70%, ${1 - progress})`;
        ctx.fill();
      }

      // Outer containment field
      for (let layer = 0; layer < 3; layer++) {
        const fieldRadius = maxRadius + layer * 40;
        const segments = 32;
        
        for (let seg = 0; seg < segments; seg++) {
          const intensity = Math.sin(time * 3 + seg * 0.3 + layer) * 0.5 + 0.5;
          if (intensity < 0.3) continue;
          
          const startAngle = (seg / segments) * Math.PI * 2;
          const endAngle = ((seg + 1) / segments) * Math.PI * 2;
          
          ctx.beginPath();
          ctx.arc(centerX, centerY, fieldRadius, startAngle, endAngle);
          const hue = 280 + layer * 40;
          ctx.strokeStyle = `hsla(${hue}, 100%, 60%, ${intensity * 0.4})`;
          ctx.lineWidth = 2;
          ctx.stroke();
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
      style={{ background: "linear-gradient(135deg, #040712 0%, #080e20 50%, #040712 100%)" }}
    />
  );
};
