import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, TrendingUp, Users, Award } from "lucide-react";
import { Link } from "react-router-dom";

const Clients = () => {
  const caseStudies = [
    {
      industry: "Global Manufacturing",
      title: "Predictive Maintenance AI Reduces Downtime by 35%",
      challenge: "Legacy systems causing frequent unplanned downtime and high maintenance costs",
      solution: "Migrated to cloud infrastructure and implemented AI-powered predictive maintenance models",
      results: [
        "35% reduction in unplanned downtime",
        "£1.2 million annual cost savings",
        "Real-time equipment health monitoring",
        "Improved production efficiency"
      ],
      icon: TrendingUp
    },
    {
      industry: "Retail Chain",
      title: "Unified Data Platform Drives 18% Increase in Average Order Value",
      challenge: "Fragmented customer data across channels limiting personalisation capabilities",
      solution: "Built unified data architecture with AI-powered customer segmentation and recommendation engine",
      results: [
        "18% increase in average order value",
        "Improved customer retention rates",
        "360° customer view across all channels",
        "Personalised recommendations at scale"
      ],
      icon: Users
    },
    {
      industry: "Professional Services",
      title: "Security Framework Enables Safe Global Expansion",
      challenge: "Outdated IT infrastructure preventing expansion into new regulated markets",
      solution: "Designed secure cloud infrastructure with comprehensive compliance framework",
      results: [
        "Successfully entered 3 new geographies",
        "Full regulatory compliance achieved",
        "Zero security incidents post-implementation",
        "50% faster client onboarding"
      ],
      icon: Award
    }
  ];

  return (
    <div style={{ paddingTop: 'clamp(16rem, 25vh, 22rem)' }}>
      {/* Case Studies */}
      <section className="relative py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-12">
            {caseStudies.map((study, index) => {
              const Icon = study.icon;
              return (
                <Card key={index} className="glass-card border-border/30 overflow-hidden">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-primary/10">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-primary font-semibold mb-2">{study.industry}</div>
                        <CardTitle className="text-3xl mb-3 glow-cyan">{study.title}</CardTitle>
                        <CardDescription className="text-base">{study.challenge}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-bold text-lg mb-3 glow-purple">Solution</h4>
                      <p className="text-muted-foreground">{study.solution}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-3 glow-cyan">Results</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {study.results.map((result, i) => (
                          <div key={i} className="flex items-start gap-3 glass-card p-4 rounded-xl">
                            <ArrowRight className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-muted-foreground">{result}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="relative py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto glass-card p-12 rounded-3xl">
            <blockquote className="space-y-6">
              <p className="text-2xl md:text-3xl font-medium italic text-center">
                "OpenStrategyAI understood our business from day one — not just the tech. The results speak for themselves."
              </p>
              <footer className="text-center">
                <div className="text-primary font-semibold">CIO</div>
                <div className="text-sm text-muted-foreground">Global Retail Chain</div>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Client Logos */}
      <section className="relative py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <h3 className="text-3xl font-bold glow-cyan">Trusted by Industry Leaders</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-50">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="glass-card p-6 rounded-xl flex items-center justify-center aspect-square">
                  <div className="text-xs text-muted-foreground">Client Logo {i}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto glass-card p-12 rounded-3xl text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="glow-cyan">Ready to Write</span>
              <br />
              <span className="glow-purple">Your Success Story?</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Request detailed case studies or discuss how we can achieve similar results for your organisation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="neon" size="lg" className="text-base group">
                Download Case Study Pack
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Link to="/contact">
                <Button variant="glow" size="lg" className="text-base">
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

export default Clients;
