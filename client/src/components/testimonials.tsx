import { useState, useEffect, useRef } from "react";
import { Star, Quote, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { sampleTestimonials } from "@/lib/data";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            "h-4 w-4 transition-all duration-300",
            star <= rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-muted text-muted"
          )}
        />
      ))}
    </div>
  );
}

export function Testimonials() {
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

  const featuredTestimonials = sampleTestimonials.filter(t => t.featured).slice(0, 6);
  // Duplicate testimonials for seamless marquee loop (3x for smooth continuous animation)
  const marqueeTestimonials = [...featuredTestimonials, ...featuredTestimonials, ...featuredTestimonials];

  return (
    <section
      ref={sectionRef}
      className="py-12 lg:py-16 bg-muted/30 relative overflow-hidden"
      data-testid="testimonials-section"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div
          className={cn(
            "text-center mb-12 opacity-0 container mx-auto px-4",
            isVisible && "animate-fade-in-up"
          )}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            Traveler Stories
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            What Our Travelers Say
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real experiences from real adventurers who explored the world with us
          </p>
        </div>

        {/* Marquee container */}
        <div className="overflow-hidden mb-12">
          <div className="marquee flex gap-6 pb-6">
            {marqueeTestimonials.map((testimonial, index) => (
              <Card
                key={`${testimonial.id}-${index}`}
                className="flex-shrink-0 w-80 p-6 hover-elevate"
                data-testid={`card-testimonial-${testimonial.id}-${index}`}
              >
                {/* Quote icon */}
                <div className="mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Quote className="h-5 w-5 text-primary" />
                  </div>
                </div>

                {/* Rating */}
                <div className="mb-3">
                  <StarRating rating={testimonial.rating} />
                </div>

                {/* Review text */}
                <p className="text-foreground mb-4 leading-relaxed text-sm line-clamp-3">
                  "{testimonial.review}"
                </p>

                {/* Author info */}
                <div className="flex items-center gap-3 pt-3 border-t border-border">
                  <Avatar className="h-10 w-10 flex-shrink-0">
                    <AvatarImage src={testimonial.imageUrl} alt={testimonial.name} />
                    <AvatarFallback className="bg-primary/10 text-primary font-medium text-xs">
                      {testimonial.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm truncate">{testimonial.name}</h4>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground truncate">
                      <MapPin className="h-3 w-3 flex-shrink-0" />
                      <span>{testimonial.location}</span>
                    </div>
                  </div>
                  {testimonial.destinationName && (
                    <div className="text-right flex-shrink-0">
                      <span className="text-xs text-muted-foreground">Traveled to</span>
                      <p className="text-xs font-medium text-primary">{testimonial.destinationName}</p>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Trust badges */}
        <div
          className={cn(
            "flex flex-wrap items-center justify-center gap-8 mt-16 opacity-0",
            isVisible && "animate-fade-in-up"
          )}
          style={{ animationDelay: "600ms", animationFillMode: "forwards" }}
        >
          <div className="flex items-center gap-3 px-6 py-3 bg-background rounded-lg shadow-sm">
            <div className="text-green-500 font-bold text-xl">4.9</div>
            <div>
              <div className="flex gap-0.5 mb-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-3 w-3 fill-green-500 text-green-500" />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">TripAdvisor</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3 px-6 py-3 bg-background rounded-lg shadow-sm">
            <div className="text-blue-500 font-bold text-xl">4.8</div>
            <div>
              <div className="flex gap-0.5 mb-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-3 w-3 fill-blue-500 text-blue-500" />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">Google Reviews</span>
            </div>
          </div>

          <div className="flex items-center gap-3 px-6 py-3 bg-background rounded-lg shadow-sm">
            <div className="text-purple-500 font-bold text-xl">4.9</div>
            <div>
              <div className="flex gap-0.5 mb-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-3 w-3 fill-purple-500 text-purple-500" />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">Trustpilot</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
