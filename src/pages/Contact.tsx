import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({ name: "", company: "", email: "", phone: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div style={{ paddingTop: 'clamp(16rem, 25vh, 22rem)' }}>
      {/* Contact Form & Info */}
      <section className="relative py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <Card className="glass-card border-border/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <span className="text-lg">Email</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <a href="mailto:contact@OpenStrategyAI.com" className="text-muted-foreground hover:text-primary transition-colors">
                    contact@OpenStrategyAI.com
                  </a>
                </CardContent>
              </Card>

              <Card className="glass-card border-border/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary" />
                    <span className="text-lg">Phone</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <a href="tel:+442XXXXXXXX" className="text-muted-foreground hover:text-primary transition-colors">
                    +44 (0)20 XXXX XXXX
                  </a>
                </CardContent>
              </Card>

              <Card className="glass-card border-border/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span className="text-lg">Address</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    London Office<br />
                    United Kingdom
                  </p>
                </CardContent>
              </Card>

              <div className="glass-card p-6 rounded-2xl">
                <h3 className="font-bold mb-4 glow-cyan">Office Hours</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>Monday - Friday: 9:00 - 18:00</p>
                  <p>Saturday - Sunday: Closed</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="glass-card border-border/30">
                <CardHeader>
                  <CardTitle className="text-3xl glow-purple">Schedule Your Free Strategy Call</CardTitle>
                  <p className="text-muted-foreground">
                    Whether you're at the strategy stage or ready to act — talk to our team
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Name *
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="flex h-12 w-full rounded-xl border border-border/30 bg-background/50 px-4 py-2 text-sm backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="John Smith"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="company" className="text-sm font-medium">
                          Company *
                        </label>
                        <input
                          id="company"
                          name="company"
                          type="text"
                          required
                          value={formData.company}
                          onChange={handleChange}
                          className="flex h-12 w-full rounded-xl border border-border/30 bg-background/50 px-4 py-2 text-sm backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Your Company Ltd"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email *
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="flex h-12 w-full rounded-xl border border-border/30 bg-background/50 px-4 py-2 text-sm backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="john@company.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-medium">
                          Phone
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          className="flex h-12 w-full rounded-xl border border-border/30 bg-background/50 px-4 py-2 text-sm backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="+44 20 XXXX XXXX"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Brief Description of Your Challenge *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        className="flex w-full rounded-xl border border-border/30 bg-background/50 px-4 py-2 text-sm backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                        placeholder="Tell us about your business goals and challenges..."
                      />
                    </div>

                    <Button type="submit" variant="neon" size="lg" className="w-full text-base">
                      <Send className="w-5 h-5" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="relative py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-card p-8 rounded-2xl text-center">
                <div className="text-3xl font-bold glow-cyan mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">Support Available</div>
              </div>
              <div className="glass-card p-8 rounded-2xl text-center">
                <div className="text-3xl font-bold glow-purple mb-2">Global</div>
                <div className="text-sm text-muted-foreground">Coverage</div>
              </div>
              <div className="glass-card p-8 rounded-2xl text-center">
                <div className="text-3xl font-bold glow-cyan mb-2">Instant</div>
                <div className="text-sm text-muted-foreground">Response Time</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
