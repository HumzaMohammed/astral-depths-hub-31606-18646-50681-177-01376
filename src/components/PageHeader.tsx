import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const pageConfig: Record<string, { title: string; subtitle: string }> = {
  "/about": {
    title: "About OpenStrategyAI",
    subtitle: "Empowering organisations with strategic, future-proof IT and AI solutions that drive growth, simplify operations and build resilience"
  },
  "/services": {
    title: "Our Services",
    subtitle: "Strategic IT & AI-Driven Solutions"
  },
  "/why-us": {
    title: "Why Choose Us",
    subtitle: "Strategy-first, AI-embedded, outcome-driven"
  },
  "/clients": {
    title: "Clients & Success",
    subtitle: "Trusted by Industry Leaders"
  },
  "/blog": {
    title: "Blog & Insights",
    subtitle: "Latest thoughts on IT strategy and AI innovation"
  },
  "/contact": {
    title: "Contact Us",
    subtitle: "Let's discuss how we can accelerate your journey"
  }
};

export const PageHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Don't show on home page
  if (location.pathname === "/" || location.pathname === "/home") {
    return null;
  }

  const config = pageConfig[location.pathname] || {
    title: "OpenStrategyAI",
    subtitle: "Strategic IT & AI-Driven Solutions"
  };

  return (
    <div 
      className="fixed top-0 left-0 right-0 z-20 transition-all duration-300 ease-out"
      style={{
        transform: scrolled ? 'translateY(-100%)' : 'translateY(0)',
        opacity: scrolled ? 0 : 1,
        pointerEvents: scrolled ? 'none' : 'auto',
      }}
    >
      <div 
        className="relative mx-auto max-w-6xl border border-border/30"
        style={{
          marginTop: 'clamp(4rem, 8vh, 6rem)',
          clipPath: 'polygon(5% 0%, 95% 0%, 90% 100%, 10% 100%)',
          background: 'linear-gradient(135deg, hsl(var(--glass-bg) / 0.95), hsl(var(--glass-bg) / 0.85))',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 8px 32px hsl(0 0% 0% / 0.5)',
          padding: 'clamp(2rem, 4vw, 3rem) clamp(1rem, 2vw, 2rem)',
          maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 15%, rgba(0,0,0,1) 30%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 15%, rgba(0,0,0,1) 30%)',
        }}
      >
        <div className="text-center">
          <h1 
            className="font-bold tracking-tight mb-2" 
            style={{ 
              fontSize: 'clamp(2rem, 5vw + 1rem, 4.5rem)', 
              lineHeight: '1.1' 
            }}
          >
            <span className="glow-cyan">{config.title}</span>
          </h1>
          <p 
            className="text-muted-foreground max-w-3xl mx-auto" 
            style={{ 
              fontSize: 'clamp(1rem, 1vw + 0.25rem, 1.25rem)' 
            }}
          >
            {config.subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};
