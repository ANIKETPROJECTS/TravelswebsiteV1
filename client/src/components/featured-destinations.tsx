import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Star, MapPin, ArrowRight, TrendingUp, Flame, Sparkles, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { sampleDestinations } from "@/lib/data";
import type { Destination } from "@shared/schema";

type Filter = "all" | "trending" | "popular" | "new";

const filters: { label: string; value: Filter; icon: any }[] = [
  { label: "All", value: "all", icon: Globe },
  { label: "Trending", value: "trending", icon: TrendingUp },
  { label: "Popular", value: "popular", icon: Flame },
  { label: "New", value: "new", icon: Sparkles },
];

function DestinationCard({ destination, index }: { destination: Destination; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={cn(
        "opacity-0",
        isVisible && "animate-fade-in-up"
      )}
      style={{ animationDelay: `${index * 100}ms`, animationFillMode: "forwards" }}
    >
      <Link href={`/destinations/${destination.id}`}>
        <Card
          className="group overflow-visible cursor-pointer hover-elevate border-0 bg-transparent"
          data-testid={`card-destination-${destination.id}`}
        >
          <div className="relative aspect-[4/5] rounded-xl overflow-hidden">
            {/* Image */}
            <img
              src={destination.imageUrl}
              alt={destination.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              {destination.trending && (
                <Badge className="bg-accent text-accent-foreground font-medium">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Trending
                </Badge>
              )}
              {destination.isNew && (
                <Badge className="bg-green-500 text-white font-medium">
                  <Sparkles className="w-3 h-3 mr-1" />
                  New
                </Badge>
              )}
              {destination.popular && !destination.trending && !destination.isNew && (
                <Badge className="bg-primary text-primary-foreground font-medium">
                  <Flame className="w-3 h-3 mr-1" />
                  Popular
                </Badge>
              )}
            </div>

            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <div className="flex items-center gap-1 text-white/80 mb-2">
                <MapPin className="h-3.5 w-3.5" />
                <span className="text-sm">{destination.country}</span>
              </div>

              <h3 className="font-heading font-bold text-xl text-white mb-2">
                {destination.name}
              </h3>

              <p className="text-sm text-white/70 mb-3 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {destination.shortDescription}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-white font-medium">{destination.rating}</span>
                  <span className="text-white/60 text-sm">
                    ({destination.reviewCount.toLocaleString()})
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-white/60 text-sm">From</span>
                  <div className="font-heading font-bold text-xl text-white">
                    ${destination.priceFrom.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Hover arrow */}
            <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
              <ArrowRight className="h-5 w-5 text-white" />
            </div>
          </div>
        </Card>
      </Link>
    </div>
  );
}

export function FeaturedDestinations() {
  const [activeFilter, setActiveFilter] = useState<Filter>("all");
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

  const filteredDestinations = sampleDestinations.filter((dest) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "trending") return dest.trending;
    if (activeFilter === "popular") return dest.popular;
    if (activeFilter === "new") return dest.isNew;
    return true;
  });

  return (
    <section
      ref={sectionRef}
      className="py-12 lg:py-16 bg-background"
      data-testid="featured-destinations-section"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div
          className={cn(
            "text-center mb-12 opacity-0",
            isVisible && "animate-fade-in-up"
          )}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Explore the World
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Featured Destinations
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover breathtaking locations handpicked by our travel experts
          </p>
        </div>

        {/* Filters */}
        <div
          className={cn(
            "flex flex-wrap justify-center gap-2 mb-12 opacity-0",
            isVisible && "animate-fade-in-up"
          )}
          style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
        >
          {filters.map((filter) => (
            <Button
              key={filter.value}
              variant={activeFilter === filter.value ? "default" : "outline"}
              onClick={() => setActiveFilter(filter.value)}
              className={cn(
                "gap-2 text-lg",
                activeFilter === filter.value && "bg-primary text-primary-foreground"
              )}
              data-testid={`filter-${filter.value}`}
            >
              <filter.icon className="w-4 h-4" />
              {filter.label}
            </Button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDestinations.slice(0, 8).map((destination, index) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              index={index}
            />
          ))}
        </div>

        {/* View all button */}
        <div
          className={cn(
            "text-center mt-12 opacity-0",
            isVisible && "animate-fade-in-up"
          )}
          style={{ animationDelay: "400ms", animationFillMode: "forwards" }}
        >
          <Link href="/destinations">
            <Button
              size="lg"
              variant="outline"
              className="font-semibold gap-2"
              data-testid="button-view-all-destinations"
            >
              View All Destinations
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
