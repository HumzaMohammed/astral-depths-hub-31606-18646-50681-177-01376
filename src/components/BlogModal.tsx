import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Calendar, Clock, Tag, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  content: {
    introduction: string;
    sections: {
      heading: string;
      paragraphs: string[];
    }[];
    conclusion: string;
  };
  author: string;
  tags: string[];
}

interface BlogModalProps {
  post: BlogPost | null;
  isOpen: boolean;
  onClose: () => void;
}

export const BlogModal = ({ post, isOpen, onClose }: BlogModalProps) => {
  if (!post) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl h-[90vh] p-0 gap-0 bg-background/95 backdrop-blur-xl border-border/50">
        <div className="relative">
          {/* Header with gradient background */}
          <div className="relative bg-gradient-to-br from-primary/20 via-secondary/10 to-transparent p-8 border-b border-border/30">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 rounded-full hover:bg-background/50"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </Button>

            <DialogHeader className="space-y-4">
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <div className="flex items-center gap-2 text-primary">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
                <Separator orientation="vertical" className="h-4" />
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
                <Separator orientation="vertical" className="h-4" />
                <div className="px-3 py-1 rounded-full bg-secondary/20 text-secondary text-xs font-semibold">
                  {post.category}
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold leading-tight glow-cyan">
                {post.title}
              </h1>

              <p className="text-lg text-muted-foreground">
                {post.excerpt}
              </p>

              <div className="flex items-center gap-2 pt-2">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                  OS
                </div>
                <div>
                  <p className="text-sm font-semibold">{post.author}</p>
                  <p className="text-xs text-muted-foreground">OpenStrategyAI</p>
                </div>
              </div>
            </DialogHeader>
          </div>

          {/* Content */}
          <ScrollArea className="h-[calc(90vh-300px)] px-8 py-6">
            <article className="prose prose-invert max-w-none">
              {/* Introduction */}
              <div className="mb-8">
                <p className="text-lg leading-relaxed text-foreground/90">
                  {post.content.introduction}
                </p>
              </div>

              {/* Sections */}
              {post.content.sections.map((section, index) => (
                <div key={index} className="mb-8">
                  <h2 className="text-2xl font-bold mb-4 glow-purple">
                    {section.heading}
                  </h2>
                  {section.paragraphs.map((paragraph, pIndex) => (
                    <p key={pIndex} className="mb-4 text-base leading-relaxed text-foreground/80">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ))}

              {/* Conclusion */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 glow-cyan">Conclusion</h2>
                <p className="text-base leading-relaxed text-foreground/80">
                  {post.content.conclusion}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-6 border-t border-border/30">
                <Tag className="w-4 h-4 text-muted-foreground" />
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-12 p-6 rounded-2xl glass-card border border-primary/20 text-center space-y-4">
                <h3 className="text-xl font-bold glow-purple">Need Expert Guidance?</h3>
                <p className="text-muted-foreground">
                  OpenStrategyAI can help you implement these strategies in your organization.
                </p>
                <Button variant="default" size="lg" onClick={onClose}>
                  Get in Touch
                </Button>
              </div>
            </article>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};
