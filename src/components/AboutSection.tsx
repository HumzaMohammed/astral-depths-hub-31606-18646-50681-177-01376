import { Target, Lightbulb, Users, Rocket } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Precision",
    description: "Delivering accurate solutions with meticulous attention to detail",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Pushing boundaries with cutting-edge AI technology",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Working closely with clients to achieve shared goals",
  },
  {
    icon: Rocket,
    title: "Growth",
    description: "Driving sustainable business transformation and success",
  },
];

export const AboutSection = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="container mx-auto px-4 z-10 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-6xl font-bold">
                <span className="glow-purple">Pioneering</span>
                <br />
                <span className="glow-cyan">AI Excellence</span>
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                OpenStrategyAI is at the forefront of artificial intelligence innovation, 
                delivering transformative solutions that empower businesses to thrive in the digital age.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our team of expert engineers and data scientists combines deep technical expertise 
                with strategic insight to create AI systems that don't just work—they excel.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {values.map((value, i) => {
                const Icon = value.icon;
                return (
                  <div
                    key={i}
                    className="glass-card p-6 rounded-2xl hover:scale-105 transition-all duration-300"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <div className="mb-4">
                      <div className="w-12 h-12 rounded-lg neon-border-purple flex items-center justify-center bg-secondary/10">
                        <Icon className="w-6 h-6 text-secondary" />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse-glow" />
    </section>
  );
};
