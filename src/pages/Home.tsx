import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Target, Lightbulb, Users, Rocket, Brain, Zap, Shield, Cloud, LineChart, Cpu } from "lucide-react";
import { Link } from "react-router-dom";
import aiHeadBg from "@/assets/ai-head-background.png";

const Home = () => {
  const services = [
    { icon: Target, title: "IT Strategy & Roadmap", description: "Define your technology vision and map the path to value" },
    { icon: Cloud, title: "Cloud & Infrastructure", description: "Secure, scalable and agile infrastructure for modern enterprise" },
    { icon: Brain, title: "Data & AI Transformation", description: "Turn your data into insight — and insight into action" },
    { icon: Shield, title: "Cybersecurity & Compliance", description: "Protect what matters — your data, systems and reputation" },
    { icon: Zap, title: "Managed IT Services", description: "Let us run your technology — so you can run your business" },
    { icon: Cpu, title: "Innovation & Emerging Tech", description: "Explore what's next — IoT, edge, generative AI and more" },
  ];

  return (
    <div className="pt-16 sm:pt-20">
      {/* Hero Section */}
      <section 
        className="relative flex items-start overflow-hidden" 
        style={{ 
          minHeight: '85vh',
          paddingTop: 'clamp(2rem, 5vh, 4rem)',
          backgroundImage: `url(${aiHeadBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'right center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="container mx-auto z-10 flex items-start">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full items-start">
            {/* Left Column - Content */}
            <div className="flex flex-col gap-6 max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 w-fit px-5 py-2.5">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm text-foreground">Strategic IT & AI-Driven Solutions</span>
              </div>
              
              <div>
                <h1 className="tracking-tight mb-6 leading-tight" style={{ fontSize: 'clamp(1.75rem, 2.5vw + 0.6rem, 2.8rem)' }}>
                  <span className="text-foreground">Accelerate.</span>
                  <br />
                  <span className="text-foreground">Automate. Amplify</span>
                  <br />
                  <span className="text-primary font-semibold">with AI-Driven IT Strategy</span>
                </h1>
                
                <p className="text-foreground" style={{ fontSize: 'clamp(0.9rem, 0.8rem + 0.4vw, 1rem)' }}>
                  We help people and technology think together — intelligently.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row" style={{ gap: 'clamp(0.5rem, 1.5vw, 0.75rem)' }}>
                <Link to="/contact">
                  <Button variant="neon" size="lg" className="group w-full sm:w-auto" style={{ fontSize: 'clamp(0.8rem, 0.7rem + 0.4vw, 0.95rem)', padding: 'clamp(0.75rem, 1.5vh, 1rem) clamp(1rem, 2.5vw, 1.5rem)' }}>
                    Unlock Your AI Advantage
                    <ArrowRight style={{ width: 'clamp(0.9rem, 1.2vw, 1.1rem)', height: 'clamp(0.9rem, 1.2vw, 1.1rem)' }} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/services">
                  <Button variant="glow" size="lg" className="w-full sm:w-auto" style={{ fontSize: 'clamp(0.8rem, 0.7rem + 0.4vw, 0.95rem)', padding: 'clamp(0.75rem, 1.5vh, 1rem) clamp(1rem, 2.5vw, 1.5rem)' }}>
                    Explore Solutions
                  </Button>
                </Link>
              </div>

              <div style={{ paddingTop: 'clamp(1rem, 2vh, 1.5rem)' }}>
                <p className="text-foreground/70" style={{ fontSize: 'clamp(0.8rem, 0.7rem + 0.3vw, 0.95rem)', marginBottom: 'clamp(0.75rem, 1.5vh, 1rem)' }}>
                  Trusted by leading innovators in AI, finance, and healthcare.
                </p>
                <div className="grid grid-cols-4 opacity-40" style={{ gap: 'clamp(0.5rem, 1vw, 0.75rem)' }}>
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="border border-border/30 bg-card/20 rounded-lg flex items-center justify-center aspect-video" style={{ padding: 'clamp(0.35rem, 0.8vw, 0.5rem)' }}>
                      <div className="text-muted-foreground" style={{ fontSize: 'clamp(0.6rem, 0.6vw, 0.7rem)' }}>Logo</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Empty space for background visibility */}
            <div className="hidden lg:block" />
          </div>
        </div>
      </section>

      {/* Services Snapshot */}
      <section className="relative overflow-hidden" style={{ padding: 'clamp(3rem, 8vw, 8rem) 0' }}>
        <div className="container mx-auto z-10 relative">
          <div className="max-w-6xl mx-auto" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(2rem, 5vw, 4rem)' }}>
            <div className="text-center" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.75rem, 2vw, 1.5rem)' }}>
              <h2 className="font-bold text-foreground" style={{ fontSize: 'clamp(2rem, 4vw + 1rem, 4rem)' }}>
                What We Do
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto" style={{ fontSize: 'clamp(1rem, 1vw + 0.5rem, 1.25rem)' }}>
                Explore the core ways we partner with organisations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: 'clamp(1rem, 2vw, 1.5rem)' }}>
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <Link key={index} to="/services">
                    <div className="glass-card rounded-2xl hover:scale-105 transition-all duration-300 group cursor-pointer h-full" style={{ padding: 'clamp(1.5rem, 3vw, 2rem)' }}>
                      <Icon style={{ width: 'clamp(2rem, 5vw, 3rem)', height: 'clamp(2rem, 5vw, 3rem)', marginBottom: 'clamp(0.75rem, 1.5vw, 1rem)' }} className="text-primary transition-transform group-hover:scale-110" />
                      <h3 className="font-bold text-foreground" style={{ fontSize: 'clamp(1rem, 1vw + 0.5rem, 1.25rem)', marginBottom: 'clamp(0.5rem, 1vw, 0.75rem)' }}>{service.title}</h3>
                      <p className="text-muted-foreground" style={{ fontSize: 'clamp(0.875rem, 0.8rem + 0.375vw, 1rem)' }}>{service.description}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Teaser */}
      <section className="relative overflow-hidden" style={{ padding: 'clamp(3rem, 8vw, 8rem) 0' }}>
        <div className="container mx-auto z-10 relative">
          <div className="max-w-4xl mx-auto text-center" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1.5rem, 3vw, 2rem)' }}>
            <h2 className="font-bold text-foreground" style={{ fontSize: 'clamp(2rem, 4vw + 1rem, 4rem)' }}>
              Why Choose Us
            </h2>
            <p className="text-muted-foreground" style={{ fontSize: 'clamp(1rem, 1vw + 0.5rem, 1.25rem)' }}>
              Strategy-first, AI-embedded, outcome-driven. We don't just build technology — we define why and how it aligns to your market, your customers and your growth path.
            </p>
            <Link to="/why-us">
              <Button variant="glow" size="lg" className="group" style={{ fontSize: 'clamp(0.875rem, 0.8rem + 0.375vw, 1rem)', padding: 'clamp(0.75rem, 1.5vw, 1rem) clamp(1.5rem, 3vw, 2rem)' }}>
                Learn Why We're Different
                <ArrowRight style={{ width: 'clamp(1rem, 1.5vw, 1.25rem)', height: 'clamp(1rem, 1.5vw, 1.25rem)' }} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="relative overflow-hidden" style={{ padding: 'clamp(3rem, 8vw, 8rem) 0' }}>
        <div className="container mx-auto z-10 relative">
          <div className="max-w-4xl mx-auto text-center" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(2rem, 4vw, 3rem)' }}>
            <h3 className="font-bold text-foreground" style={{ fontSize: 'clamp(1.25rem, 1.5vw + 0.5rem, 1.75rem)' }}>Trusted by Industry Leaders</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 opacity-50" style={{ gap: 'clamp(1rem, 2vw, 2rem)' }}>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="glass-card rounded-xl flex items-center justify-center" style={{ padding: 'clamp(1rem, 2vw, 1.5rem)' }}>
                  <div className="text-muted-foreground" style={{ fontSize: 'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)' }}>Client Logo {i}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden" style={{ padding: 'clamp(3rem, 8vw, 8rem) 0' }}>
        <div className="container mx-auto z-10 relative">
          <div className="max-w-4xl mx-auto">
            <div className="glass-card rounded-3xl text-center" style={{ padding: 'clamp(2rem, 5vw, 4rem)', display: 'flex', flexDirection: 'column', gap: 'clamp(1.5rem, 3vw, 2rem)' }}>
              <h2 className="font-bold text-foreground" style={{ fontSize: 'clamp(2rem, 4vw + 1rem, 4rem)' }}>
                Ready to Start
                <br />
                Your Transformation?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto" style={{ fontSize: 'clamp(1rem, 1vw + 0.5rem, 1.25rem)' }}>
                Let's discuss how OpenStrategyAI can accelerate your journey to AI-powered excellence
              </p>
              <Link to="/contact">
                <Button variant="neon" size="lg" className="group" style={{ fontSize: 'clamp(0.875rem, 0.8rem + 0.375vw, 1rem)', padding: 'clamp(0.75rem, 1.5vw, 1rem) clamp(1.5rem, 3vw, 2rem)' }}>
                  Contact Us Today
                  <ArrowRight style={{ width: 'clamp(1rem, 1.5vw, 1.25rem)', height: 'clamp(1rem, 1.5vw, 1.25rem)' }} className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
