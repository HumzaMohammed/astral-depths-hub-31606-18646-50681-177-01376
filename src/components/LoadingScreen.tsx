import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const statusMessages = [
  "Loading assets…",
  "Optimising experience…",
  "Ready"
];

export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [smoothProgress, setSmoothProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [statusIndex, setStatusIndex] = useState(0);
  const [prefersReducedMotion] = useState(
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return Math.min(prev + Math.random() * 3 + 1, 100);
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, []);

  useEffect(() => {
    const smoothInterval = setInterval(() => {
      setSmoothProgress((prev) => {
        const diff = progress - prev;
        if (Math.abs(diff) < 0.1) return progress;
        return prev + diff * 0.15;
      });
    }, 16);

    return () => clearInterval(smoothInterval);
  }, [progress]);

  useEffect(() => {
    if (smoothProgress >= 50 && statusIndex === 0) {
      setStatusIndex(1);
    } else if (smoothProgress >= 90 && statusIndex === 1) {
      setStatusIndex(2);
    }
  }, [smoothProgress, statusIndex]);

  useEffect(() => {
    if (progress >= 100) {
      const completeTimer = setTimeout(() => {
        setFadeOut(true);
        setTimeout(onComplete, 600);
      }, 400);
      return () => clearTimeout(completeTimer);
    }
  }, [progress, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
      style={{
        background: "linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #0f0f1e 100%)",
      }}
    >
      {!prefersReducedMotion && (
        <div className="absolute inset-0 overflow-hidden opacity-30">
          {[...Array(20)].map((_, i) => (
            <div
              key={`particle-${i}`}
              className="absolute w-1 h-1 rounded-full bg-cyan-400/40"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `shimmer ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="relative flex flex-col items-center gap-8">
        <div className="relative w-64 h-64 flex items-center justify-center">
          <div
            className="absolute inset-0 rounded-full opacity-20"
            style={{
              background: "radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, transparent 70%)",
              filter: "blur(40px)",
              animation: prefersReducedMotion ? "none" : "corePulse 3s ease-in-out infinite",
            }}
          />

          <div
            className="absolute inset-0 rounded-full opacity-15"
            style={{
              background: "radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)",
              filter: "blur(50px)",
              animation: prefersReducedMotion ? "none" : "corePulse 3s ease-in-out infinite 0.5s",
            }}
          />

          <svg className="absolute w-full h-full" style={{ transform: "rotate(-90deg)" }}>
            <circle
              cx="128"
              cy="128"
              r="110"
              fill="none"
              stroke="rgba(6, 182, 212, 0.1)"
              strokeWidth="2"
            />
            <circle
              cx="128"
              cy="128"
              r="110"
              fill="none"
              stroke="url(#coreGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 110}`}
              strokeDashoffset={`${2 * Math.PI * 110 * (1 - smoothProgress / 100)}`}
              style={{
                transition: "stroke-dashoffset 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                filter: "drop-shadow(0 0 8px rgba(6, 182, 212, 0.6))",
              }}
            />
            <defs>
              <linearGradient id="coreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgb(6, 182, 212)" />
                <stop offset="100%" stopColor="rgb(139, 92, 246)" />
              </linearGradient>
            </defs>
          </svg>

          {!prefersReducedMotion && (
            <>
              {[...Array(12)].map((_, i) => {
                const angle = (i / 12) * 360;
                const radius = 115;
                return (
                  <div
                    key={`node-${i}`}
                    className="absolute w-2 h-2 rounded-full bg-cyan-400"
                    style={{
                      left: "50%",
                      top: "50%",
                      transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${radius}px)`,
                      animation: `nodeOrbit 8s linear infinite`,
                      animationDelay: `${-i * (8 / 12)}s`,
                      boxShadow: "0 0 8px rgba(6, 182, 212, 0.8)",
                      opacity: 0.6,
                    }}
                  />
                );
              })}
            </>
          )}

          <div className="relative z-10 flex items-center justify-center">
            <div
              className="w-16 h-16 rounded-full"
              style={{
                background: "linear-gradient(135deg, rgba(6, 182, 212, 0.6), rgba(139, 92, 246, 0.6))",
                boxShadow: "0 0 40px rgba(6, 182, 212, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.1)",
                animation: prefersReducedMotion ? "none" : "innerPulse 2s ease-in-out infinite",
              }}
            />
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 min-w-[300px]">
          <div
            className="h-2 w-full bg-gray-800/50 rounded-full overflow-hidden backdrop-blur-sm"
            style={{
              boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.3)",
            }}
          >
            <div
              className="h-full rounded-full transition-all duration-300 ease-out"
              style={{
                width: `${smoothProgress}%`,
                background: "linear-gradient(90deg, rgb(6, 182, 212), rgb(139, 92, 246))",
                boxShadow: "0 0 12px rgba(6, 182, 212, 0.6)",
              }}
            />
          </div>

          <p
            className="text-sm font-medium tracking-wide transition-opacity duration-300"
            style={{
              color: "rgb(156, 163, 175)",
              textShadow: "0 0 8px rgba(6, 182, 212, 0.3)",
            }}
          >
            {statusMessages[statusIndex]}
          </p>
        </div>
      </div>

      <style>{`
        @keyframes corePulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.2;
          }
          50% {
            transform: scale(1.15);
            opacity: 0.3;
          }
        }

        @keyframes innerPulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.08);
          }
        }

        @keyframes nodeOrbit {
          0% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            opacity: 0.3;
          }
        }

        @keyframes shimmer {
          0%, 100% {
            opacity: 0;
            transform: translateY(0);
          }
          50% {
            opacity: 1;
            transform: translateY(-20px);
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
