import { useEffect, useRef } from "react";

export const NeuralLightGrid = () => {
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

    // Neural nodes
    class Node {
      x: number;
      y: number;
      connections: Node[];
      pulse: number;
      hue: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.connections = [];
        this.pulse = Math.random() * Math.PI * 2;
        this.hue = 180 + Math.random() * 60;
      }

      update(time: number) {
        this.pulse = time * 0.002 + Math.random() * 0.1;
      }

      draw(ctx: CanvasRenderingContext2D) {
        const intensity = (Math.sin(this.pulse) + 1) * 0.5;
        const size = 3 + intensity * 4;
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, size, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, size * 2);
        gradient.addColorStop(0, `hsla(${this.hue}, 100%, 70%, ${0.9 * intensity})`);
        gradient.addColorStop(1, `hsla(${this.hue}, 100%, 50%, 0)`);
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    }

    const nodes: Node[] = [];
    const gridSize = 80;
    
    for (let x = 0; x < canvas.width; x += gridSize) {
      for (let y = 0; y < canvas.height; y += gridSize) {
        const offsetX = (Math.random() - 0.5) * 30;
        const offsetY = (Math.random() - 0.5) * 30;
        nodes.push(new Node(x + offsetX, y + offsetY));
      }
    }

    // Connect nearby nodes
    nodes.forEach(node => {
      nodes.forEach(other => {
        if (node !== other) {
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < gridSize * 1.5) {
            node.connections.push(other);
          }
        }
      });
    });

    const animate = () => {
      const time = Date.now();
      
      ctx.fillStyle = "rgba(6, 10, 28, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw connections with data flow
      nodes.forEach(node => {
        node.connections.forEach(other => {
          const dx = other.x - node.x;
          const dy = other.y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const flow = (Math.sin(time * 0.001 + distance * 0.01) + 1) * 0.5;
          const opacity = flow * 0.4;

          const gradient = ctx.createLinearGradient(node.x, node.y, other.x, other.y);
          gradient.addColorStop(0, `hsla(${node.hue}, 100%, 60%, ${opacity})`);
          gradient.addColorStop(1, `hsla(${other.hue}, 100%, 60%, ${opacity * 0.5})`);
          
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1 + flow;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(other.x, other.y);
          ctx.stroke();
        });
      });

      // Update and draw nodes
      nodes.forEach(node => {
        node.update(time);
        node.draw(ctx);
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
      style={{ background: "linear-gradient(135deg, #060a1c 0%, #0f1535 50%, #060a1c 100%)" }}
    />
  );
};
