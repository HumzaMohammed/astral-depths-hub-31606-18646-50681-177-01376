import { Brain, Zap, Shield, Cpu, Database, Network } from "lucide-react";

const services = [
  {
    icon: Brain,
    title: "Machine Learning",
    description: "Advanced ML models that learn and adapt to your business needs",
  },
  {
    icon: Zap,
    title: "Automation",
    description: "Streamline operations with intelligent process automation",
  },
  {
    icon: Shield,
    title: "Security AI",
    description: "Next-gen threat detection and prevention systems",
  },
  {
    icon: Cpu,
    title: "Neural Networks",
    description: "Deep learning solutions for complex problem-solving",
  },
  {
    icon: Database,
    title: "Data Analytics",
    description: "Transform raw data into actionable insights",
  },
  {
    icon: Network,
    title: "API Integration",
    description: "Seamlessly connect AI capabilities to your systems",
  },
];

export const ServicesSection = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="container mx-auto px-4 z-10 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="glow-cyan">Our</span> <span className="glow-purple">Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive AI solutions tailored to your business objectives
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <div
                key={i}
                className="glass-card p-8 rounded-2xl hover:scale-105 transition-all duration-300 group cursor-pointer"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="mb-6">
                  <div className="w-14 h-14 rounded-xl border border-border/30 flex items-center justify-center bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:glow-cyan transition-all">
                  {service.title}
                </h3>
                <p className="text-muted-foreground">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Background gradient effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl opacity-30">
        <div className="w-full h-full bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 blur-3xl" />
      </div>
    </section>
  );
};
