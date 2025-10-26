import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Smooth loading progress with consistent increments
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return Math.min(prev + 2, 100);
      });
    }, 50);

    // Complete loading after delay
    const timer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setFadeOut(true);
        setTimeout(onComplete, 800);
      }, 500);
    }, 2500);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-700 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
      style={{ perspective: "1000px" }}
    >
      {/* Clean gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      </div>

      {/* Smooth radial glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-96 h-96 rounded-full bg-primary/10 blur-3xl animate-pulse" style={{ animationDuration: '3s' }} />
      </div>

      {/* Clean orbiting particles */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={`orbit-${i}`}
            className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full"
            style={{
              background: i % 2 === 0 ? "hsl(var(--neon-cyan))" : "hsl(var(--neon-purple))",
              boxShadow: i % 2 === 0 ? "0 0 20px hsl(var(--neon-cyan))" : "0 0 20px hsl(var(--neon-purple))",
              animation: `orbit-smooth ${4}s cubic-bezier(0.4, 0, 0.2, 1) infinite`,
              animationDelay: `${i * 0.666}s`,
            }}
          />
        ))}
      </div>

      {/* Smooth rotating rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[...Array(3)].map((_, i) => (
          <div
            key={`ring-${i}`}
            className="absolute rounded-full border-2 border-primary/30"
            style={{
              width: `${200 + i * 80}px`,
              height: `${200 + i * 80}px`,
              animation: `spin-smooth ${8 + i * 2}s cubic-bezier(0.4, 0, 0.2, 1) infinite`,
              boxShadow: `0 0 30px hsl(var(--primary) / 0.2)`,
            }}
          />
        ))}
      </div>

      {/* Central loading content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Clean spinner */}
        <div className="relative w-32 h-32">
          {/* Main spinner ring */}
          <div 
            className="absolute inset-0 border-4 border-primary/30 rounded-full"
            style={{
              borderTopColor: "hsl(var(--primary))",
              animation: "spin-smooth 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite",
              boxShadow: "0 0 40px hsl(var(--primary) / 0.3)",
            }}
          />
          
          {/* Inner ring */}
          <div 
            className="absolute inset-4 border-4 border-secondary/30 rounded-full"
            style={{
              borderBottomColor: "hsl(var(--secondary))",
              animation: "spin-smooth-reverse 2s cubic-bezier(0.4, 0, 0.2, 1) infinite",
              boxShadow: "0 0 30px hsl(var(--secondary) / 0.3)",
            }}
          />
          
          {/* Center glow */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div 
              className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary"
              style={{
                boxShadow: "0 0 40px hsl(var(--primary) / 0.5)",
                animation: "pulse-smooth 2s cubic-bezier(0.4, 0, 0.2, 1) infinite",
              }}
            />
          </div>
        </div>

        {/* Loading text */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold glow-cyan tracking-wider">
            INITIALIZING
          </h2>
          
          {/* Progress bar */}
          <div className="w-64 h-3 bg-card rounded-full overflow-hidden border border-primary/20">
            <div
              className="h-full bg-gradient-to-r from-primary to-secondary"
              style={{
                width: `${Math.min(progress, 100)}%`,
                transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: "0 0 20px hsl(var(--primary) / 0.5)",
              }}
            />
          </div>
          
          {/* Progress percentage */}
          <div className="text-xl font-mono glow-purple">
            {Math.floor(Math.min(progress, 100))}%
          </div>
        </div>

      </div>

      <style>{`
        @keyframes orbit-smooth {
          0% { 
            transform: translate(-50%, -50%) rotate(0deg) translateX(150px);
          }
          100% { 
            transform: translate(-50%, -50%) rotate(360deg) translateX(150px);
          }
        }
        @keyframes spin-smooth {
          0% { 
            transform: rotate(0deg);
          }
          100% { 
            transform: rotate(360deg);
          }
        }
        @keyframes spin-smooth-reverse {
          0% { 
            transform: rotate(360deg);
          }
          100% { 
            transform: rotate(0deg);
          }
        }
        @keyframes pulse-smooth {
          0%, 100% { 
            transform: scale(1);
            opacity: 1;
          }
          50% { 
            transform: scale(1.1);
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
};
