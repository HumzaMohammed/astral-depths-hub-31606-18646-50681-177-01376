import { Target, Lightbulb, Users, Rocket, Shield, TrendingUp } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Strategic Thinking",
      description: "Technology must serve business outcomes, not just infrastructure"
    },
    {
      icon: Lightbulb,
      title: "Innovation-First",
      description: "We embrace the art of the possible — AI, automation, next-gen tech"
    },
    {
      icon: Shield,
      title: "Trust & Security",
      description: "Robust, compliant, resilient solutions built with integrity"
    },
    {
      icon: Users,
      title: "Partnership",
      description: "We work hand-in-hand with your team — transparent, collaborative, invested"
    },
    {
      icon: TrendingUp,
      title: "Continuous Improvement",
      description: "Technology evolves, and so do we — your solutions keep improving"
    },
    {
      icon: Rocket,
      title: "Results-Driven",
      description: "We measure success by tangible business outcomes and ROI"
    }
  ];

  return (
    <div style={{ paddingTop: 'clamp(16rem, 25vh, 22rem)' }}>
      {/* Mission & Vision */}
      <section className="relative py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="glass-card p-8 rounded-2xl space-y-4">
              <h2 className="text-3xl font-bold glow-cyan">Our Mission</h2>
              <p className="text-muted-foreground">
                To empower organisations with strategic, future-proof IT and AI solutions that drive growth, simplify operations and build resilience.
              </p>
            </div>
            <div className="glass-card p-8 rounded-2xl space-y-4">
              <h2 className="text-3xl font-bold glow-purple">Our Vision</h2>
              <p className="text-muted-foreground">
                A world where technology is more than a support function — it's a growth engine. Where IT strategy, data intelligence and AI transformation are at the heart of every business plan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="relative py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto glass-card p-12 rounded-3xl space-y-6">
            <h2 className="text-4xl font-bold glow-cyan">Who We Are</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              OpenStrategyAI is a team of seasoned IT strategists, cloud architects, data scientists and AI engineers. With deep industry experience across finance, retail, manufacturing and professional services, we combine technical depth with business insight.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We don't just build technology — we define <span className="text-primary font-semibold">why</span> and <span className="text-primary font-semibold">how</span> it aligns to your market, your customers and your growth path.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="relative py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-6xl font-bold">
                <span className="glow-purple">Our Core Values</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div key={index} className="glass-card p-8 rounded-2xl hover:scale-105 transition-all duration-300 group">
                    <Icon className="w-12 h-12 mb-4 text-primary group-hover:animate-pulse-glow" />
                    <h3 className="text-xl font-bold mb-3 glow-cyan">{value.title}</h3>
                    <p className="text-muted-foreground text-sm">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="relative py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto glass-card p-12 rounded-3xl space-y-6">
            <h2 className="text-4xl font-bold glow-purple">Our Approach</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              From initial discovery through roadmap development, deployment and optimisation — we deliver end-to-end. We act as your strategic partner, aligning technology with business ambition and turning ideas into impact.
            </p>
            <div className="grid md:grid-cols-4 gap-4 pt-6">
              {["Discovery", "Roadmap", "Deployment", "Optimisation"].map((phase, i) => (
                <div key={i} className="text-center p-4 glass-card rounded-xl">
                  <div className="text-2xl font-bold glow-cyan mb-2">{i + 1}</div>
                  <div className="text-sm text-muted-foreground">{phase}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
