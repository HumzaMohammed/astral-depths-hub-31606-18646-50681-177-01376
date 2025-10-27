import { useEffect, useState, useRef } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const statusMessages = [
  "Initializing quantum processors…",
  "Synchronizing neural networks…",
  "Calibrating holographic matrix…",
  "Optimizing data pathways…",
  "Establishing secure connections…",
  "Loading experience protocols…",
  "System ready"
];

export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [smoothProgress, setSmoothProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [statusIndex, setStatusIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [completionBurst, setCompletionBurst] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [prefersReducedMotion] = useState(
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    if (!prefersReducedMotion) {
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [prefersReducedMotion]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      hue: number;
      layer: number;
    }> = [];

    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 0.5,
        opacity: Math.random() * 0.5 + 0.3,
        hue: Math.random() * 30 + 175,
        layer: Math.floor(Math.random() * 3),
      });
    }

    const gridLines: Array<{
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      opacity: number;
      phase: number;
    }> = [];

    for (let i = 0; i < 30; i++) {
      gridLines.push({
        x1: Math.random() * canvas.width,
        y1: Math.random() * canvas.height,
        x2: Math.random() * canvas.width,
        y2: Math.random() * canvas.height,
        opacity: Math.random() * 0.3,
        phase: Math.random() * Math.PI * 2,
      });
    }

    let animationFrame: number;
    let time = 0;

    const animate = () => {
      time += 0.01;
      ctx.fillStyle = "rgba(10, 10, 15, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const parallaxX = (mousePos.x - 0.5) * 50;
      const parallaxY = (mousePos.y - 0.5) * 50;

      ctx.strokeStyle = `rgba(6, 182, 212, 0.05)`;
      ctx.lineWidth = 1;
      for (let i = -1; i < canvas.width / 40; i++) {
        for (let j = -1; j < canvas.height / 40; j++) {
          const x = i * 40 + (Math.sin(time + j * 0.3) * 10);
          const y = j * 40 + (Math.cos(time + i * 0.3) * 10);
          ctx.beginPath();
          ctx.moveTo(x + parallaxX * 0.1, y + parallaxY * 0.1);
          ctx.lineTo(x + 40 + parallaxX * 0.1, y + parallaxY * 0.1);
          ctx.lineTo(x + 40 + parallaxX * 0.1, y + 40 + parallaxY * 0.1);
          ctx.lineTo(x + parallaxX * 0.1, y + 40 + parallaxY * 0.1);
          ctx.closePath();
          ctx.stroke();
        }
      }

      gridLines.forEach((line) => {
        line.phase += 0.02;
        line.opacity = Math.sin(line.phase) * 0.15 + 0.2;

        const gradient = ctx.createLinearGradient(line.x1, line.y1, line.x2, line.y2);
        gradient.addColorStop(0, `hsla(193, 100%, 50%, 0)`);
        gradient.addColorStop(0.5, `hsla(193, 100%, 50%, ${line.opacity})`);
        gradient.addColorStop(1, `hsla(193, 100%, 50%, 0)`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(line.x1 + parallaxX * 0.3, line.y1 + parallaxY * 0.3);
        ctx.lineTo(line.x2 + parallaxX * 0.3, line.y2 + parallaxY * 0.3);
        ctx.stroke();
      });

      particles.forEach((particle) => {
        const layerParallax = (3 - particle.layer) * 0.3;

        particle.x += particle.vx + parallaxX * layerParallax * 0.01;
        particle.y += particle.vy + parallaxY * layerParallax * 0.01;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));

        const pulseOpacity = Math.sin(time * 2 + particle.x * 0.01) * 0.2 + particle.opacity;

        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 3
        );
        gradient.addColorStop(0, `hsla(${particle.hue}, 100%, 60%, ${pulseOpacity})`);
        gradient.addColorStop(1, `hsla(${particle.hue}, 100%, 60%, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `hsla(${particle.hue}, 100%, 80%, ${pulseOpacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            const opacity = (1 - distance / 120) * 0.15;
            const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
            gradient.addColorStop(0, `hsla(${p1.hue}, 100%, 60%, ${opacity})`);
            gradient.addColorStop(1, `hsla(${p2.hue}, 100%, 60%, ${opacity})`);

            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      const scanY = (Math.sin(time * 0.5) * 0.5 + 0.5) * canvas.height;
      const scanGradient = ctx.createLinearGradient(0, scanY - 100, 0, scanY + 100);
      scanGradient.addColorStop(0, "rgba(6, 182, 212, 0)");
      scanGradient.addColorStop(0.5, "rgba(6, 182, 212, 0.15)");
      scanGradient.addColorStop(1, "rgba(6, 182, 212, 0)");
      ctx.fillStyle = scanGradient;
      ctx.fillRect(0, scanY - 100, canvas.width, 200);

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", handleResize);
    };
  }, [mousePos, prefersReducedMotion]);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return Math.min(prev + Math.random() * 4 + 1, 100);
      });
    }, 120);

    return () => clearInterval(progressInterval);
  }, []);

  useEffect(() => {
    const smoothInterval = setInterval(() => {
      setSmoothProgress((prev) => {
        const diff = progress - prev;
        if (Math.abs(diff) < 0.1) return progress;
        return prev + diff * 0.2;
      });
    }, 16);

    return () => clearInterval(smoothInterval);
  }, [progress]);

  useEffect(() => {
    const thresholds = [20, 40, 60, 75, 85, 95];
    thresholds.forEach((threshold, index) => {
      if (smoothProgress >= threshold && statusIndex === index) {
        setStatusIndex(index + 1);
      }
    });
  }, [smoothProgress, statusIndex]);

  useEffect(() => {
    if (progress >= 100) {
      setCompletionBurst(true);
      const completeTimer = setTimeout(() => {
        setFadeOut(true);
        setTimeout(onComplete, 800);
      }, 600);
      return () => clearTimeout(completeTimer);
    }
  }, [progress, onComplete]);

  const progressPercentage = Math.floor(smoothProgress);
  const hexCount = 24;
  const filledHexes = Math.floor((smoothProgress / 100) * hexCount);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-700 ${
        fadeOut ? "opacity-0 scale-110" : "opacity-100 scale-100"
      }`}
      style={{
        background: "linear-gradient(135deg, #0a0a0f 0%, #0d1420 25%, #0a0f1e 50%, #0d1420 75%, #0a0a0f 100%)",
      }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: prefersReducedMotion ? 0 : 1 }}
      />

      {completionBurst && !prefersReducedMotion && (
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.6), transparent 60%)",
              animation: "burstExpand 0.8s ease-out forwards",
            }}
          />
          {[...Array(16)].map((_, i) => {
            const angle = (i / 16) * 360;
            return (
              <div
                key={`burst-${i}`}
                className="absolute left-1/2 top-1/2 w-1 h-40 origin-bottom"
                style={{
                  background: "linear-gradient(to top, rgba(6, 182, 212, 0.8), transparent)",
                  transform: `translate(-50%, -100%) rotate(${angle}deg)`,
                  animation: "burstRay 0.6s ease-out forwards",
                }}
              />
            );
          })}
        </div>
      )}

      <div className="relative flex flex-col items-center gap-12 z-10">
        <div className="relative w-80 h-80 flex items-center justify-center">
          {!prefersReducedMotion && (
            <>
              {[...Array(3)].map((_, ringIndex) => {
                const radius = 140 - ringIndex * 15;
                const rotation = ringIndex % 2 === 0 ? "spin" : "spin-reverse";
                return (
                  <svg
                    key={`ring-${ringIndex}`}
                    className="absolute w-full h-full"
                    style={{
                      animation: `${rotation} ${8 + ringIndex * 2}s linear infinite`,
                      opacity: 0.3 + ringIndex * 0.1,
                    }}
                  >
                    <circle
                      cx="160"
                      cy="160"
                      r={radius}
                      fill="none"
                      stroke={`hsla(193, 100%, ${50 + ringIndex * 10}%, 0.4)`}
                      strokeWidth="1"
                      strokeDasharray="10 20"
                    />
                  </svg>
                );
              })}

              {[...Array(6)].map((_, i) => {
                const angle = (i / 6) * 360;
                return (
                  <div
                    key={`hex-shield-${i}`}
                    className="absolute"
                    style={{
                      width: "80px",
                      height: "80px",
                      left: "50%",
                      top: "50%",
                      transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-110px) rotate(-${angle}deg)`,
                      animation: "hexFloat 4s ease-in-out infinite",
                      animationDelay: `${i * 0.2}s`,
                    }}
                  >
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <polygon
                        points="50,10 90,30 90,70 50,90 10,70 10,30"
                        fill="none"
                        stroke="rgba(6, 182, 212, 0.3)"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                );
              })}

              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 70%)",
                  filter: "blur(50px)",
                  animation: "gyroPulse 3s ease-in-out infinite",
                }}
              />

              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(0, 191, 255, 0.2) 0%, transparent 70%)",
                  filter: "blur(60px)",
                  animation: "gyroPulse 3s ease-in-out infinite 0.5s",
                }}
              />
            </>
          )}

          <svg className="absolute w-full h-full" style={{ transform: "rotate(-90deg)" }}>
            <defs>
              <linearGradient id="mainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgb(6, 182, 212)" />
                <stop offset="50%" stopColor="rgb(0, 191, 255)" />
                <stop offset="100%" stopColor="rgb(139, 92, 246)" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <circle
              cx="160"
              cy="160"
              r="120"
              fill="none"
              stroke="rgba(6, 182, 212, 0.1)"
              strokeWidth="2"
            />
            <circle
              cx="160"
              cy="160"
              r="120"
              fill="none"
              stroke="url(#mainGradient)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 120}`}
              strokeDashoffset={`${2 * Math.PI * 120 * (1 - smoothProgress / 100)}`}
              filter="url(#glow)"
              style={{
                transition: "stroke-dashoffset 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            />
          </svg>

          {!prefersReducedMotion && (
            <>
              {[...Array(20)].map((_, i) => {
                const angle = (i / 20) * 360;
                const radius = 125;
                const delay = i * 0.05;
                return (
                  <div
                    key={`orbit-node-${i}`}
                    className="absolute"
                    style={{
                      left: "50%",
                      top: "50%",
                      width: "8px",
                      height: "8px",
                      transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${radius}px)`,
                      animation: `orbitPulse 2s ease-in-out infinite`,
                      animationDelay: `${delay}s`,
                    }}
                  >
                    <div
                      className="w-full h-full rounded-full"
                      style={{
                        background: "rgba(6, 182, 212, 0.8)",
                        boxShadow: "0 0 15px rgba(6, 182, 212, 1), 0 0 30px rgba(6, 182, 212, 0.5)",
                      }}
                    />
                  </div>
                );
              })}

              {[...Array(12)].map((_, i) => {
                const startAngle = (i / 12) * 360;
                const endAngle = startAngle + 30;
                return (
                  <div
                    key={`data-stream-${i}`}
                    className="absolute left-1/2 top-1/2 w-0.5 h-16 origin-bottom"
                    style={{
                      background: "linear-gradient(to top, rgba(6, 182, 212, 0), rgba(6, 182, 212, 0.6))",
                      transform: `translate(-50%, 0) rotate(${startAngle}deg)`,
                      animation: `dataFlow 2s ease-in-out infinite`,
                      animationDelay: `${i * 0.1}s`,
                    }}
                  />
                );
              })}
            </>
          )}

          <div className="relative z-10 flex items-center justify-center">
            <div
              className="relative w-24 h-24 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, rgba(6, 182, 212, 0.4), rgba(0, 191, 255, 0.6), rgba(139, 92, 246, 0.4))",
                boxShadow: "0 0 60px rgba(6, 182, 212, 0.6), inset 0 0 30px rgba(255, 255, 255, 0.1)",
                animation: prefersReducedMotion ? "none" : "corePulse 2s ease-in-out infinite",
              }}
            >
              <div
                className="absolute inset-2 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(0, 191, 255, 0.8), rgba(6, 182, 212, 0.4))",
                  animation: prefersReducedMotion ? "none" : "innerRotate 4s linear infinite",
                }}
              />
              <div className="relative text-3xl font-bold text-white tracking-wider z-10" style={{
                textShadow: "0 0 20px rgba(6, 182, 212, 1), 0 0 40px rgba(6, 182, 212, 0.5)",
                fontFamily: "monospace",
              }}>
                {progressPercentage}
                <span className="text-base">%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6 min-w-[400px] max-w-[500px]">
          <div className="flex gap-1 flex-wrap justify-center">
            {[...Array(hexCount)].map((_, i) => {
              const isFilled = i < filledHexes;
              const isActive = i === filledHexes;
              return (
                <div
                  key={`hex-${i}`}
                  className="relative"
                  style={{
                    width: "16px",
                    height: "18px",
                    margin: "2px",
                  }}
                >
                  <svg viewBox="0 0 100 115" className="w-full h-full">
                    <polygon
                      points="50,5 95,30 95,80 50,105 5,80 5,30"
                      fill={isFilled ? "rgba(6, 182, 212, 0.4)" : "rgba(6, 182, 212, 0.1)"}
                      stroke={isFilled ? "rgba(6, 182, 212, 1)" : "rgba(6, 182, 212, 0.3)"}
                      strokeWidth="3"
                      style={{
                        filter: isActive ? "drop-shadow(0 0 8px rgba(6, 182, 212, 1))" : "none",
                        transition: "all 0.3s ease",
                      }}
                    />
                  </svg>
                  {isActive && !prefersReducedMotion && (
                    <div
                      className="absolute inset-0"
                      style={{
                        animation: "hexPulse 1s ease-in-out infinite",
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          <div
            className="relative h-3 w-full bg-gray-900/80 rounded-full overflow-hidden backdrop-blur-sm border border-cyan-500/30"
            style={{
              boxShadow: "inset 0 2px 8px rgba(0, 0, 0, 0.5), 0 0 20px rgba(6, 182, 212, 0.2)",
            }}
          >
            <div
              className="h-full rounded-full relative overflow-hidden"
              style={{
                width: `${smoothProgress}%`,
                background: "linear-gradient(90deg, rgb(6, 182, 212), rgb(0, 191, 255), rgb(139, 92, 246))",
                boxShadow: "0 0 20px rgba(6, 182, 212, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
                transition: "width 0.3s ease-out",
              }}
            >
              {!prefersReducedMotion && (
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)",
                    animation: "shimmerSlide 2s ease-in-out infinite",
                  }}
                />
              )}
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <p
              className="text-base font-medium tracking-wide transition-all duration-500"
              style={{
                color: "rgb(6, 182, 212)",
                textShadow: "0 0 20px rgba(6, 182, 212, 0.8), 0 0 40px rgba(6, 182, 212, 0.4)",
                fontFamily: "monospace",
                letterSpacing: "0.1em",
              }}
            >
              {statusMessages[statusIndex]}
            </p>
            <div className="flex gap-4 text-xs font-mono text-cyan-400/60">
              <span>THROUGHPUT: {Math.floor(smoothProgress * 12.5)}MB/s</span>
              <span>|</span>
              <span>LATENCY: {Math.floor(100 - smoothProgress)}ms</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }

        @keyframes corePulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 60px rgba(6, 182, 212, 0.6), inset 0 0 30px rgba(255, 255, 255, 0.1);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 0 80px rgba(6, 182, 212, 0.9), inset 0 0 40px rgba(255, 255, 255, 0.2);
          }
        }

        @keyframes gyroPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.5;
          }
        }

        @keyframes innerRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes orbitPulse {
          0%, 100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
          }
        }

        @keyframes hexFloat {
          0%, 100% {
            transform: translateY(0) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-10px) scale(1.1);
            opacity: 0.6;
          }
        }

        @keyframes dataFlow {
          0% {
            opacity: 0;
            transform: translate(-50%, 0) scaleY(0);
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -60px) scaleY(1);
          }
        }

        @keyframes hexPulse {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.3);
          }
        }

        @keyframes shimmerSlide {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }

        @keyframes burstExpand {
          0% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: scale(3);
          }
        }

        @keyframes burstRay {
          0% {
            opacity: 0;
            transform: translate(-50%, -100%) scaleY(0);
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -100%) scaleY(2);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
};
