import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-5xl mx-auto text-center space-y-8 float-animation">
          <div className="space-y-4">
            <div className="inline-block">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm">
                <Sparkles className="w-4 h-4 text-primary animate-pulse-glow" />
                <span className="glow-cyan">AI-Powered Solutions</span>
              </span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight">
              <span className="glow-cyan">OpenStrategy</span>
              <span className="text-secondary glow-purple">AI</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Transforming businesses through intelligent automation and cutting-edge AI technology
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="neon" size="lg" className="text-base group">
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="glow" size="lg" className="text-base">
              Explore Solutions
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto">
            {[
              { label: "AI Models", value: "50+" },
              { label: "Success Rate", value: "99%" },
              { label: "Clients", value: "100+" },
            ].map((stat, i) => (
              <div key={i} className="glass-card p-6 rounded-2xl">
                <div className="text-3xl font-bold glow-cyan mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Animated gradient orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
    </section>
  );
};
