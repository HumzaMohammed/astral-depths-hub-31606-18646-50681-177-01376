import { useEffect, useRef } from "react";

export const InteractiveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<any[]>([]);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Elegant 4D Particle System
    class Particle {
      x: number;
      y: number;
      z: number;
      w: number;
      vx: number;
      vy: number;
      vz: number;
      vw: number;
      size: number;
      baseSize: number;
      depth: number;
      hue: number;
      connections: number;
      orbitRadius: number;
      orbitAngle: number;
      orbitSpeed: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * 1000 - 500;
        this.w = Math.random() * Math.PI * 2;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.vz = (Math.random() - 0.5) * 0.2;
        this.vw = (Math.random() - 0.5) * 0.01;
        this.baseSize = Math.random() * 2 + 0.5;
        this.size = this.baseSize;
        this.depth = 1;
        this.hue = Math.random() * 60 + 180;
        this.connections = 0;
        this.orbitRadius = Math.random() * 150 + 50;
        this.orbitAngle = Math.random() * Math.PI * 2;
        this.orbitSpeed = (Math.random() - 0.5) * 0.01;
      }

      update() {
        const time = Date.now() * 0.001;
        
        // Autonomous smooth 4D flow fields
        this.vx += Math.sin(this.y * 0.005 + time + this.w) * 0.08;
        this.vy += Math.cos(this.x * 0.005 + time + this.w) * 0.08;
        this.vz += Math.sin((this.x + this.y) * 0.003 + this.w) * 0.03;
        this.w += this.vw;

        // Apply velocity with smooth damping
        this.x += this.vx;
        this.y += this.vy;
        this.z += this.vz;
        this.vx *= 0.98;
        this.vy *= 0.98;
        this.vz *= 0.99;

        // Smooth wrapping
        if (this.x < -50) this.x = canvas.width + 50;
        if (this.x > canvas.width + 50) this.x = -50;
        if (this.y < -50) this.y = canvas.height + 50;
        if (this.y > canvas.height + 50) this.y = -50;
        if (this.z > 500) this.z = -500;
        if (this.z < -500) this.z = 500;

        this.depth = 1 + this.z / 1000;
        this.size = this.baseSize * this.depth;
        this.connections = 0;
      }

      draw(ctx: CanvasRenderingContext2D) {
        const opacity = Math.max(0.4, Math.min(0.9, this.depth));
        const hue = (this.hue + this.w * 30) % 360;
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 1.5, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 1.5);
        gradient.addColorStop(0, `hsla(${hue}, 100%, 70%, ${opacity * 0.8})`);
        gradient.addColorStop(0.5, `hsla(${hue}, 100%, 50%, ${opacity * 0.4})`);
        gradient.addColorStop(1, `hsla(${hue}, 100%, 50%, 0)`);
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    }

    // Initialize particles
    const particleCount = 100;
    particlesRef.current = Array.from({ length: particleCount }, () => new Particle());

    // Animation loop
    const animate = () => {
      const time = Date.now() * 0.001;
      
      // Smooth fade trail effect
      ctx.fillStyle = "rgba(10, 14, 39, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Flowing energy field layers with autonomous movement
      for (let layer = 0; layer < 3; layer++) {
        const layerDepth = layer * 0.3;
        const layerOpacity = 0.06 - layer * 0.018;
        
        for (let x = 0; x < canvas.width; x += 4) {
          for (let y = 0; y < canvas.height; y += 4) {
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const dx = x - centerX;
            const dy = y - centerY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            const flowX = Math.sin(x * 0.004 + time * 0.3 + layerDepth) * 15;
            const flowY = Math.cos(y * 0.004 + time * 0.3 + layerDepth) * 15;
            const wave = Math.sin(distance * 0.015 - time * 0.8 + layerDepth) * 0.5 + 0.5;
            
            const hue = 180 + Math.sin(time * 0.5 + layer * 2) * 40 + (distance * 0.05);
            const brightness = wave * layerOpacity;
            
            if (brightness > 0.01) {
              ctx.fillStyle = `hsla(${hue}, 100%, 60%, ${brightness})`;
              ctx.fillRect(x + flowX, y + flowY, 1, 1);
            }
          }
        }
      }

      // Add neural network-style pulses
      const pulseCount = 8;
      for (let i = 0; i < pulseCount; i++) {
        const angle = (i / pulseCount) * Math.PI * 2;
        const pulseTime = time * 0.5 + i;
        const radius = (Math.sin(pulseTime) * 0.5 + 0.5) * Math.min(canvas.width, canvas.height) * 0.4;
        const x = canvas.width / 2 + Math.cos(angle + time * 0.2) * radius;
        const y = canvas.height / 2 + Math.sin(angle + time * 0.2) * radius;
        
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 40);
        gradient.addColorStop(0, `hsla(${200 + i * 20}, 100%, 60%, 0.15)`);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, 40, 0, Math.PI * 2);
        ctx.fill();
      }

      // Update and draw particles
      particlesRef.current.forEach((particle) => {
        particle.update();
        particle.draw(ctx);
      });

      // Draw elegant connections
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i];
          const p2 = particlesRef.current[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dz = p1.z - p2.z;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const distance3D = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (distance < 120 && distance3D < 150 && p1.connections < 3 && p2.connections < 3) {
            const depthOpacity = Math.min(p1.depth, p2.depth);
            const opacity = (1 - distance / 120) * 0.3 * depthOpacity;
            const avgHue = (p1.hue + p2.hue) / 2;
            
            const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
            gradient.addColorStop(0, `hsla(${p1.hue}, 100%, 60%, ${opacity})`);
            gradient.addColorStop(1, `hsla(${p2.hue}, 100%, 60%, ${opacity})`);
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            p1.connections++;
            p2.connections++;
          }
        }
      }

      // Subtle 4D perspective grid
      const gridSize = 80;
      const perspectiveDepth = 5;
      
      for (let depth = 0; depth < perspectiveDepth; depth++) {
        const scale = 1 - depth * 0.12;
        const opacity = (0.08 - depth * 0.015) * (1 + Math.sin(time * 0.3) * 0.3);
        const offset = depth * 40;
        
        ctx.strokeStyle = `hsla(${180 + depth * 20}, 100%, 60%, ${opacity})`;
        ctx.lineWidth = 0.5;
        
        // Horizontal lines
        for (let y = -canvas.height; y < canvas.height * 2; y += gridSize) {
          ctx.beginPath();
          const yOffset = y + Math.sin(time * 0.5 + depth) * 20 + offset;
          for (let x = 0; x < canvas.width; x += 5) {
            const wave = Math.sin(x * 0.005 + time + depth) * 15 * scale;
            const px = x * scale + (canvas.width * (1 - scale)) / 2;
            const py = (yOffset + wave) * scale + (canvas.height * (1 - scale)) / 2;
            if (x === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.stroke();
        }
        
        // Vertical lines
        for (let x = -canvas.width; x < canvas.width * 2; x += gridSize) {
          ctx.beginPath();
          const xOffset = x + Math.cos(time * 0.5 + depth) * 20 + offset;
          for (let y = 0; y < canvas.height; y += 5) {
            const wave = Math.cos(y * 0.005 + time + depth) * 15 * scale;
            const px = (xOffset + wave) * scale + (canvas.width * (1 - scale)) / 2;
            const py = y * scale + (canvas.height * (1 - scale)) / 2;
            if (y === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.stroke();
        }
      }

      // Central AI core glow
      const coreX = canvas.width / 2;
      const coreY = canvas.height / 2;
      const coreGradient = ctx.createRadialGradient(coreX, coreY, 0, coreX, coreY, 200);
      const coreIntensity = Math.sin(time * 0.8) * 0.5 + 0.5;
      coreGradient.addColorStop(0, `hsla(${(time * 15) % 360}, 100%, 70%, ${0.08 * coreIntensity})`);
      coreGradient.addColorStop(0.5, `hsla(${(time * 15 + 60) % 360}, 100%, 60%, ${0.04 * coreIntensity})`);
      coreGradient.addColorStop(1, 'transparent');
      ctx.fillStyle = coreGradient;
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
      style={{ background: "linear-gradient(135deg, #0a0e27 0%, #1a1e3f 50%, #0a0e27 100%)" }}
    />
  );
};
