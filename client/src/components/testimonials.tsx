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

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-28 bg-muted/30 relative overflow-hidden"
      data-testid="testimonials-section"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div
          className={cn(
            "text-center mb-16 opacity-0",
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

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTestimonials.map((testimonial, index) => (
            <Card
              key={testimonial.id}
              className={cn(
                "p-6 hover-elevate opacity-0",
                isVisible && "animate-fade-in-up",
                index % 3 === 1 && "lg:translate-y-8"
              )}
              style={{ 
                animationDelay: `${(index + 1) * 100}ms`, 
                animationFillMode: "forwards" 
              }}
              data-testid={`card-testimonial-${testimonial.id}`}
            >
              {/* Quote icon */}
              <div className="mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Quote className="h-5 w-5 text-primary" />
                </div>
              </div>

              {/* Rating */}
              <div className="mb-4">
                <StarRating rating={testimonial.rating} />
              </div>

              {/* Review text */}
              <p className="text-foreground mb-6 leading-relaxed">
                "{testimonial.review}"
              </p>

              {/* Author info */}
              <div className="flex items-center gap-4 pt-4 border-t border-border">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={testimonial.imageUrl} alt={testimonial.name} />
                  <AvatarFallback className="bg-primary/10 text-primary font-medium">
                    {testimonial.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>{testimonial.location}</span>
                  </div>
                </div>
                {testimonial.destinationName && (
                  <div className="text-right">
                    <span className="text-xs text-muted-foreground">Traveled to</span>
                    <p className="text-sm font-medium text-primary">{testimonial.destinationName}</p>
                  </div>
                )}
              </div>
            </Card>
          ))}
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
