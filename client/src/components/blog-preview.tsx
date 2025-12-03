import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Clock, ArrowRight, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { sampleBlogPosts } from "@/lib/data";

export function BlogPreview() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const featuredPosts = sampleBlogPosts.slice(0, 3);

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-28 bg-background"
      data-testid="blog-preview-section"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div
            className={cn(
              "opacity-0",
              isVisible && "animate-fade-in-up"
            )}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Travel Insights
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Latest from Our Blog
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Travel guides, tips, and destination spotlights to inspire your next adventure
            </p>
          </div>

          <div
            className={cn(
              "opacity-0",
              isVisible && "animate-fade-in-up"
            )}
            style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
          >
            <Link href="/blog">
              <Button variant="outline" className="gap-2" data-testid="button-view-all-blog">
                View All Articles
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Blog grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPosts.map((post, index) => (
            <Card
              key={post.id}
              className={cn(
                "group overflow-visible hover-elevate opacity-0",
                isVisible && "animate-fade-in-up"
              )}
              style={{ animationDelay: `${(index + 2) * 100}ms`, animationFillMode: "forwards" }}
              data-testid={`card-blog-${post.id}`}
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden rounded-t-lg">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm font-medium">
                    {post.category}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Meta */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={post.authorImage || undefined} alt={post.author} />
                      <AvatarFallback className="text-xs bg-primary/10 text-primary">
                        {post.author.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{post.readTime} min read</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-heading font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  <Link href={`/blog/${post.slug}`} data-testid={`link-blog-${post.id}`}>
                    {post.title}
                  </Link>
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {post.excerpt}
                </p>

                {/* Read more */}
                <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all">
                  Read More
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
