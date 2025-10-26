import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

export const Footer = () => {
  return (
    <footer className="relative border-t border-border/30" style={{ padding: 'clamp(2rem, 5vw, 4rem) 0' }}>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img 
                src={logo} 
                alt="OpenStrategyAI Logo" 
                className="w-auto"
                style={{ height: 'clamp(2rem, 3vw, 2.5rem)' }}
              />
            </div>
            <p className="text-muted-foreground" style={{ fontSize: 'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)' }}>
              Empowering Your Business with Intelligent IT Strategy & AI-Driven Solutions
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3" style={{ fontSize: 'clamp(0.875rem, 0.8rem + 0.375vw, 1rem)' }}>Quick Links</h4>
            <div className="space-y-2">
              <Link to="/" className="block text-muted-foreground hover:text-primary transition-colors" style={{ fontSize: 'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)' }}>Home</Link>
              <Link to="/about" className="block text-muted-foreground hover:text-primary transition-colors" style={{ fontSize: 'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)' }}>About Us</Link>
              <Link to="/services" className="block text-muted-foreground hover:text-primary transition-colors" style={{ fontSize: 'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)' }}>Services</Link>
              <Link to="/blog" className="block text-muted-foreground hover:text-primary transition-colors" style={{ fontSize: 'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)' }}>Blog</Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3" style={{ fontSize: 'clamp(0.875rem, 0.8rem + 0.375vw, 1rem)' }}>Services</h4>
            <div className="space-y-2">
              <Link to="/services#strategy" className="block text-muted-foreground hover:text-primary transition-colors" style={{ fontSize: 'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)' }}>IT Strategy</Link>
              <Link to="/services#cloud" className="block text-muted-foreground hover:text-primary transition-colors" style={{ fontSize: 'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)' }}>Cloud & Infrastructure</Link>
              <Link to="/services#ai" className="block text-muted-foreground hover:text-primary transition-colors" style={{ fontSize: 'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)' }}>Data & AI</Link>
              <Link to="/services#security" className="block text-muted-foreground hover:text-primary transition-colors" style={{ fontSize: 'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)' }}>Cybersecurity</Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3" style={{ fontSize: 'clamp(0.875rem, 0.8rem + 0.375vw, 1rem)' }}>Contact</h4>
            <div className="space-y-2 text-muted-foreground" style={{ fontSize: 'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)' }}>
              <p>contact@OpenStrategyAI.com</p>
              <p>+44 (0)20 XXXX XXXX</p>
              <p>London, United Kingdom</p>
            </div>
          </div>
        </div>

        <div className="pt-6 md:pt-8 border-t border-border/30">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-center md:text-left" style={{ fontSize: 'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)' }}>
              © 2025 OpenStrategyAI. All rights reserved.
            </p>
            <div className="flex gap-4 md:gap-6">
              <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors" style={{ fontSize: 'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)' }}>Privacy Policy</Link>
              <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors" style={{ fontSize: 'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)' }}>Terms & Conditions</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
