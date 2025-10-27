import { Button } from "@/components/ui/button";
import { Mail, MessageSquare, ArrowRight } from "lucide-react";

export const ContactSection = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="container mx-auto px-4 z-10 relative">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-12 md:p-16 rounded-3xl text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-6xl font-bold text-foreground">
                Ready to Transform
                <br />
                Your <span className="text-primary">Business?</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Let's discuss how OpenStrategyAI can accelerate your journey to AI-powered excellence
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button variant="default" size="lg" className="text-base group">
                <Mail className="w-5 h-5" />
                Contact Sales
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="text-base group">
                <MessageSquare className="w-5 h-5" />
                Schedule Demo
              </Button>
            </div>

            <div className="pt-8 border-t border-border/50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary mb-1">24/7</div>
                  <div className="text-sm text-muted-foreground">Support</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary mb-1">Global</div>
                  <div className="text-sm text-muted-foreground">Coverage</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary mb-1">Instant</div>
                  <div className="text-sm text-muted-foreground">Deployment</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final background gradient */}
      <div className="absolute bottom-0 left-0 w-full h-96 bg-gradient-to-t from-primary/5 to-transparent" />
    </section>
  );
};
