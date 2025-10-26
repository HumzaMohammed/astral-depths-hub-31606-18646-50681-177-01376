import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { InteractiveBackground } from "@/components/InteractiveBackground";

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Interactive Background Layer - This IS the website */}
      <div className="fixed inset-0 z-0">
        <InteractiveBackground />
        
        {/* Vignette effect */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-background/30 to-background/50 pointer-events-none" />
      </div>

      {/* Content Layer - Immersed within background */}
      <div className="relative z-10">
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <ContactSection />
        
        {/* Footer */}
        <footer className="relative py-8 border-t border-border/30">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                © 2025 OpenStrategyAI. All rights reserved.
              </p>
              <p className="text-xs text-muted-foreground">
                Powered by Advanced AI Technology
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
