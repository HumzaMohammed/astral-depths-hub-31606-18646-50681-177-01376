import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";
import { useState } from "react";
import { BlogModal } from "@/components/BlogModal";
import { blogPosts, BlogPost } from "@/data/blogPosts";

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedPost(null), 300);
  };

  return (
    <div style={{ paddingTop: 'clamp(16rem, 25vh, 22rem)' }}>
      {/* Blog Posts Grid */}
      <section className="relative py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.map((post, index) => (
                <Card 
                  key={index} 
                  className="glass-card border-border/30 hover:scale-105 transition-all duration-300 group cursor-pointer"
                  onClick={() => handlePostClick(post)}
                >
                  <CardHeader>
                    <div className="flex items-center gap-2 text-xs text-primary mb-2">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-muted-foreground">{post.readTime}</span>
                    </div>
                    <div className="text-xs font-semibold text-secondary mb-2">{post.category}</div>
                    <CardTitle className="text-xl glow-cyan group-hover:glow-purple transition-all">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" size="sm" className="group/btn p-0 h-auto">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <BlogModal 
              post={selectedPost}
              isOpen={isModalOpen}
              onClose={handleCloseModal}
            />
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="relative py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto glass-card p-12 rounded-3xl text-center space-y-6">
            <h2 className="text-4xl font-bold glow-purple">Stay Updated</h2>
            <p className="text-xl text-muted-foreground">
              Subscribe to receive our latest insights, case studies and technology trends
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex h-12 w-full rounded-xl border border-border/30 bg-background/50 px-4 py-2 text-sm backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button variant="default" size="lg">
                Subscribe
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="relative py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold glow-cyan text-center mb-8">Browse by Category</h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {["AI & Machine Learning", "Cloud Infrastructure", "Cybersecurity", "Data & Analytics", "Emerging Technologies", "IT Strategy"].map((category, i) => (
                <Button key={i} variant="outline" className="glass-card">
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
