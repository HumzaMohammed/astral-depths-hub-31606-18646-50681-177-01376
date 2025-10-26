import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo.png";

export const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/about" },
    { label: "Services", path: "/services" },
    { label: "Why Us", path: "/why-us" },
    { label: "Clients & Success", path: "/clients" },
    { label: "Blog", path: "/blog" },
    { label: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/30">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link to="/" className="flex items-center flex-shrink-0">
            <img 
              src={logo} 
              alt="OpenStrategyAI Logo" 
              className="w-auto"
              style={{ height: 'clamp(7.5rem, 12vw + 1.5rem, 10.5rem)' }}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-xs lg:text-sm font-medium transition-colors hover:text-primary whitespace-nowrap ${
                  isActive(item.path) ? "text-primary glow-cyan" : "text-muted-foreground"
                }`}
                style={{ fontSize: 'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)' }}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block text-base font-medium transition-colors hover:text-primary ${
                  isActive(item.path) ? "text-primary glow-cyan" : "text-muted-foreground"
                }`}
                style={{ fontSize: 'clamp(0.875rem, 0.8rem + 0.5vw, 1rem)' }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};
