import { useState } from "react";
import { Link } from "wouter";
import { Search, Clock, ArrowRight, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { sampleBlogPosts } from "@/lib/data";

const categories = ["All", "Destinations", "Travel Tips", "Planning", "Adventure", "Culture"];

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = sampleBlogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = sampleBlogPosts.find((post) => post.featured);

  return (
    <main className="pt-24 pb-16" data-testid="page-blog">
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Travel Blog
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Travel guides, tips, and destination spotlights to inspire your next adventure
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Search and filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
              data-testid="input-search-blog"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                data-testid={`filter-${category.toLowerCase().replace(' ', '-')}`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Featured post */}
        {featuredPost && selectedCategory === "All" && !searchQuery && (
          <Card className="mb-12 overflow-hidden group" data-testid="featured-post">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden">
                <img
                  src={featuredPost.imageUrl}
                  alt={featuredPost.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
                  Featured
                </Badge>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <Badge variant="outline" className="w-fit mb-4">
                  {featuredPost.category}
                </Badge>
                <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                  <Link href={`/blog/${featuredPost.slug}`} data-testid="link-featured-post">
                    {featuredPost.title}
                  </Link>
                </h2>
                <p className="text-muted-foreground mb-6">{featuredPost.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={featuredPost.authorImage || undefined} alt={featuredPost.author} />
                      <AvatarFallback>{featuredPost.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{featuredPost.author}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(featuredPost.publishedAt!).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{featuredPost.readTime} min read</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Posts grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="font-heading text-xl font-semibold mb-2">No articles found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or filter
            </p>
            <Button onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}>
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Card
                key={post.id}
                className="group overflow-visible hover-elevate"
                data-testid={`card-blog-${post.id}`}
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-t-lg">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <Badge
                    variant="secondary"
                    className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm"
                  >
                    {post.category}
                  </Badge>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={post.authorImage || undefined} alt={post.author} />
                        <AvatarFallback className="text-xs">{post.author.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{post.readTime} min</span>
                    </div>
                  </div>
                  <h3 className="font-heading font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    <Link href={`/blog/${post.slug}`} data-testid={`link-blog-${post.id}`}>
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {post.excerpt}
                  </p>
                  <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all">
                    Read More
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Newsletter CTA */}
        <Card className="mt-16 p-8 bg-gradient-to-r from-primary/5 to-accent/5 text-center">
          <h3 className="font-heading text-2xl font-bold mb-2">
            Get Travel Inspiration Delivered
          </h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Subscribe to our newsletter for the latest travel tips, destination guides, and exclusive deals.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1"
              data-testid="input-newsletter"
            />
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground" data-testid="button-subscribe">
              Subscribe
            </Button>
          </form>
        </Card>
      </div>
    </main>
  );
}
