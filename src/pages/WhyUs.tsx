import { Button } from "@/components/ui/button";
import { Target, Users, Brain, TrendingUp, Award, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const WhyUs = () => {
  const differentiators = [
    {
      icon: Target,
      title: "Business-Centric Technology",
      description: "We don't sell technology. We design solutions starting with: 'What will this change do for you?' Then we build the tech around the answer."
    },
    {
      icon: Users,
      title: "End-to-End Expertise",
      description: "From board-level strategy to hands-on implementation, we cover the full lifecycle. You don't need to assemble multiple vendors — we handle it."
    },
    {
      icon: Brain,
      title: "AI-First Mindset",
      description: "Many IT consultancies treat AI as an add-on. We embed it from day one — in infrastructure, data platforms, applications. Your transformation is powered by intelligence."
    },
    {
      icon: Award,
      title: "Proven Track Record",
      description: "With years of experience across sectors and geographies we know how to deliver value in complex environments."
    },
    {
      icon: CheckCircle,
      title: "Collaborative Partnership",
      description: "We become an extension of your team. Transparent governance, regular updates, shared goals. We measure our success by your success."
    },
    {
      icon: TrendingUp,
      title: "Results-Driven",
      description: "Projects are not just delivered — they deliver outcomes. We define KPIs, measure ROI and show you the business case in real figures."
    }
  ];

  return (
    <div style={{ paddingTop: 'clamp(16rem, 25vh, 22rem)' }}>
      {/* Key Differentiators */}
      <section className="relative py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-6xl font-bold">
                <span className="glow-purple">What Sets Us Apart</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Our unique approach to technology transformation
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {differentiators.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="glass-card p-8 rounded-2xl hover:scale-105 transition-all duration-300 group">
                    <Icon className="w-12 h-12 mb-4 text-primary group-hover:animate-pulse-glow" />
                    <h3 className="text-xl font-bold mb-3 glow-cyan">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="relative py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto glass-card p-12 rounded-3xl space-y-8">
            <h2 className="text-4xl font-bold glow-cyan text-center">Our Proven Process</h2>
            
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: "1", title: "Discovery", desc: "Understand your business, goals & challenges" },
                { step: "2", title: "Strategy", desc: "Define roadmap aligned with outcomes" },
                { step: "3", title: "Delivery", desc: "Implement with excellence & transparency" },
                { step: "4", title: "Optimise", desc: "Measure, refine & scale for impact" }
              ].map((phase, i) => (
                <div key={i} className="text-center space-y-3">
                  <div className="w-16 h-16 mx-auto rounded-full glass-card flex items-center justify-center">
                    <span className="text-2xl font-bold glow-purple">{phase.step}</span>
                  </div>
                  <h3 className="font-bold text-lg">{phase.title}</h3>
                  <p className="text-sm text-muted-foreground">{phase.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: "50+", label: "AI Models Deployed" },
                { value: "99%", label: "Client Satisfaction" },
                { value: "100+", label: "Projects Delivered" },
                { value: "24/7", label: "Support Available" }
              ].map((stat, i) => (
                <div key={i} className="glass-card p-6 rounded-2xl text-center">
                  <div className="text-3xl md:text-4xl font-bold glow-cyan mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto glass-card p-12 rounded-3xl text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="glow-cyan">Ready to Experience</span>
              <br />
              <span className="glow-purple">The Difference?</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See how we can support your transformation journey
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/services">
                <Button variant="outline" size="lg" className="text-base group">
                  Explore Our Services
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="default" size="lg" className="text-base">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyUs;
