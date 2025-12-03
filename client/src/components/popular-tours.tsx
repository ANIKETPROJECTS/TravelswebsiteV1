import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Star, Clock, Users, ArrowRight, ArrowLeft, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { sampleTours, sampleDestinations } from "@/lib/data";
import type { Tour } from "@shared/schema";

const categoryColors: Record<string, string> = {
  adventure: "bg-green-500/10 text-green-600 dark:text-green-400",
  luxury: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  family: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  honeymoon: "bg-pink-500/10 text-pink-600 dark:text-pink-400",
  solo: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  cultural: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  wildlife: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  beach: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
};

function TourCard({ tour, index }: { tour: Tour; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const destination = sampleDestinations.find(d => d.id === tour.destinationId);
  const discount = tour.originalPrice
    ? Math.round(((tour.originalPrice - tour.price) / tour.originalPrice) * 100)
    : 0;

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
      <Card
        className="group overflow-visible hover-elevate h-full flex flex-col"
        data-testid={`card-tour-${tour.id}`}
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
          <img
            src={tour.imageUrl}
            alt={tour.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Discount badge */}
          {discount > 0 && (
            <div className="absolute top-4 left-4">
              <Badge className="bg-accent text-accent-foreground font-bold">
                {discount}% OFF
              </Badge>
            </div>
          )}

          {/* Spots left indicator */}
          {tour.spotsLeft && tour.spotsLeft <= 5 && (
            <div className="absolute top-4 right-4">
              <Badge variant="destructive" className="font-medium">
                <AlertCircle className="w-3 h-3 mr-1" />
                Only {tour.spotsLeft} left!
              </Badge>
            </div>
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Category */}
          <div className="absolute bottom-4 left-4">
            <Badge className={cn("capitalize font-medium", categoryColors[tour.category] || "bg-gray-500/10 text-gray-600")}>
              {tour.category}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          {/* Location */}
          {destination && (
            <span className="text-sm text-muted-foreground mb-1">
              {destination.name}, {destination.country}
            </span>
          )}

          {/* Title */}
          <h3 className="font-heading font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            <Link href={`/tours/${tour.id}`} data-testid={`link-tour-${tour.id}`}>
              {tour.title}
            </Link>
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
            {tour.shortDescription}
          </p>

          {/* Meta info */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{tour.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>Max {tour.maxGroupSize}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{tour.rating}</span>
              <span className="text-muted-foreground/60">({tour.reviewCount})</span>
            </div>
          </div>

          {/* Price and CTA */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div>
              {tour.originalPrice && (
                <span className="text-sm text-muted-foreground line-through mr-2">
                  ${tour.originalPrice.toLocaleString()}
                </span>
              )}
              <span className="font-heading font-bold text-xl text-primary">
                ${tour.price.toLocaleString()}
              </span>
              <span className="text-sm text-muted-foreground">/person</span>
            </div>

            <Link href={`/tours/${tour.id}`}>
              <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground" data-testid={`button-inquire-${tour.id}`}>
                Inquire Now
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}

export function PopularTours() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

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

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const featuredTours = sampleTours.filter(t => t.featured);

  return (
    <section
      ref={sectionRef}
      className="py-12 lg:py-16 bg-muted/30"
      data-testid="popular-tours-section"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div
          className={cn(
            "text-center mb-12 opacity-0",
            isVisible && "animate-fade-in-up"
          )}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            Best Sellers
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Popular Tour Packages
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Handpicked tours loved by thousands of travelers worldwide
          </p>
        </div>

        {/* Scroll controls */}
        <div
          className={cn(
            "flex items-center justify-center gap-3 mb-8 opacity-0",
            isVisible && "animate-fade-in-up"
          )}
          style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
        >
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("left")}
            className="rounded-full"
            data-testid="button-scroll-left"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("right")}
            className="rounded-full"
            data-testid="button-scroll-right"
          >
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Scrollable container */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {featuredTours.map((tour, index) => (
            <div
              key={tour.id}
              className="flex-shrink-0 w-[350px] h-[520px] snap-start"
            >
              <TourCard tour={tour} index={index} />
            </div>
          ))}
        </div>

        {/* View all button */}
        <div
          className={cn(
            "text-center mt-12 opacity-0",
            isVisible && "animate-fade-in-up"
          )}
          style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
        >
          <Link href="/tours">
            <Button
              size="lg"
              variant="outline"
              className="font-semibold gap-2"
              data-testid="button-view-all-tours"
            >
              View All Tours
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
