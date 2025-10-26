import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Target, Cloud, Brain, Shield, Zap, Cpu, CheckCircle } from "lucide-react";

const Services = () => {
  const services = [
    {
      id: "strategy",
      icon: Target,
      title: "IT Strategy & Roadmap",
      headline: "Define your technology vision and map the path to value",
      description: "Every transformation starts with clarity. We work with your leadership team to assess your current state, define a future state aligned with your strategic goals, and develop a pragmatic roadmap to get there. Whether you're modernising legacy systems, planning cloud migration, adopting emerging tech or aligning data/AI to business outcomes — we prioritise what drives impact and deliver a plan you can act on confidently.",
      deliverables: [
        "Business-aligned IT strategy",
        "Current state audit & gap analysis",
        "Future state architecture & value proposition",
        "Prioritised roadmap with business cases",
        "Governance & implementation framework"
      ],
      benefits: [
        "Clearer alignment of IT with business growth",
        "Reduced risk of wasted investments",
        "Faster value realisation",
        "Better stakeholder engagement and buy-in"
      ]
    },
    {
      id: "cloud",
      icon: Cloud,
      title: "Cloud & Infrastructure",
      headline: "Secure, scalable and agile infrastructure for the modern enterprise",
      description: "Your infrastructure should be an enabler, not a barrier. We design and deploy robust cloud, hybrid and on-premises environments built for performance, cost-efficiency and reliability. With expertise across major cloud platforms (AWS, Azure, GCP) and hybrid scenarios, we ensure your technology foundation supports your ambition — securely and scalably.",
      deliverables: [
        "Cloud strategy & platform selection",
        "Infrastructure architecture & migration",
        "Hybrid & multi-cloud design",
        "Performance optimisation & cost control",
        "Disaster recovery & business continuity"
      ],
      benefits: [
        "Enhanced agility and time-to-market",
        "Lower infrastructure operating costs",
        "Improved system reliability and uptime",
        "Greater flexibility to support changing business models"
      ]
    },
    {
      id: "ai",
      icon: Brain,
      title: "Data & AI Transformation",
      headline: "Turn your data into insight — and insight into action",
      description: "Data is your strategic asset; AI is the amplifier. We help you capture, integrate and analyse your data — then apply machine learning and AI models to surface insights, automate decisions and enable new business value. Whether the use-case is predictive maintenance, customer segmentation, operational optimisation or risk modelling — we design solutions that scale and deliver.",
      deliverables: [
        "Data strategy & governance",
        "Data architecture & integration",
        "Advanced analytics & AI/ML model development",
        "Use-case design and value realisation",
        "AI deployment, monitoring & lifecycle management"
      ],
      benefits: [
        "Deeper customer understanding",
        "Smarter, faster decision-making",
        "New revenue streams from data",
        "Competitive edge via AI-powered operations"
      ]
    },
    {
      id: "security",
      icon: Shield,
      title: "Cybersecurity & Compliance",
      headline: "Protect what matters — your data, systems and reputation",
      description: "In a world of escalating cyber-threats and regulatory demands, cybersecurity can no longer be an afterthought. We embed defence and compliance into your architecture, processes and culture. From threat assessment to incident response, governance and ongoing monitoring — we help you secure your business and trust.",
      deliverables: [
        "Security assessment & threat modelling",
        "Architecture and controls design",
        "Regulatory compliance (GDPR, UK-DPA, ISO 27001)",
        "Incident response planning & execution",
        "Managed security operations & continuous monitoring"
      ],
      benefits: [
        "Reduced risk of data breach and downtime",
        "Stronger compliance posture and audit readiness",
        "Protection of reputation and stakeholder trust",
        "Proactive, rather than reactive, security"
      ]
    },
    {
      id: "managed",
      icon: Zap,
      title: "Managed IT Services",
      headline: "Let us run your technology — so you can run your business",
      description: "Managing and optimising your IT environment takes time, resources and expertise. We offer outsourced managed IT services: monitoring, support, vendor management, optimisation and strategic oversight — freeing you to focus on your core business while knowing your technology is in expert hands.",
      deliverables: [
        "24/7 monitoring and support",
        "Vendor and license management",
        "Performance optimisation and cost control",
        "Strategic IT governance and reporting",
        "Continuous improvement & service innovation"
      ],
      benefits: [
        "Reduced operational burden",
        "Predictable IT costs",
        "Access to specialist skills and tools",
        "Alignment of IT with business growth"
      ]
    },
    {
      id: "innovation",
      icon: Cpu,
      title: "Innovation & Emerging Technologies",
      headline: "Explore what's next — IoT, edge, generative AI and more",
      description: "The future doesn't wait. We partner with you to explore, pilot and scale emerging technologies that may shape your industry tomorrow. Whether it's IoT deployments, edge computing architectures, blockchain, or generative AI applications — we turn curiosity into capability.",
      deliverables: [
        "Technology scouting & feasibility studies",
        "Proof-of-concept design & deployment",
        "Pilot management and scaling",
        "Change management and adoption support"
      ],
      benefits: [
        "Early mover advantage",
        "Innovation culture embedded in your business",
        "Diversified growth pathways",
        "Readiness for tomorrow's technology landscape"
      ]
    }
  ];

  return (
    <div style={{ paddingTop: 'clamp(16rem, 25vh, 22rem)' }}>
      {/* Services Tabs */}
      <section className="relative py-24">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="strategy" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-12">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <TabsTrigger key={service.id} value={service.id} className="flex flex-col gap-2 p-4">
                    <Icon className="w-5 h-5" />
                    <span className="text-xs">{service.title.split("&")[0].trim()}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {services.map((service) => {
              const Icon = service.icon;
              return (
                <TabsContent key={service.id} value={service.id} className="space-y-8">
                  <div className="glass-card p-12 rounded-3xl space-y-8">
                    <div className="flex items-center gap-4">
                      <Icon className="w-16 h-16 text-primary animate-pulse-glow" />
                      <div>
                        <h2 className="text-3xl md:text-5xl font-bold glow-cyan">{service.title}</h2>
                        <p className="text-xl text-muted-foreground mt-2">{service.headline}</p>
                      </div>
                    </div>

                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 pt-8">
                      <div className="space-y-4">
                        <h3 className="text-2xl font-bold glow-purple">What We Deliver</h3>
                        <ul className="space-y-3">
                          {service.deliverables.map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-2xl font-bold glow-cyan">Benefits</h3>
                        <ul className="space-y-3">
                          {service.benefits.map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default Services;
