import { useState, useEffect, useRef } from "react";
import { Shield, Headphones, Users, Wallet, MapPin, Award, Clock, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { companyStats } from "@/lib/data";

const features = [
  {
    icon: Wallet,
    title: "Best Price Guarantee",
    description: "Find a lower price? We'll match it and give you an extra 10% off.",
  },
  {
    icon: Headphones,
    title: "24/7 Customer Support",
    description: "Our team is available around the clock to assist you wherever you are.",
  },
  {
    icon: Users,
    title: "Expert Local Guides",
    description: "Passionate locals who bring destinations to life with insider knowledge.",
  },
  {
    icon: Shield,
    title: "Flexible Cancellation",
    description: "Plans change. Cancel up to 60 days before for a full refund.",
  },
];

const stats = [
  { value: companyStats.destinations, label: "Destinations", suffix: "+" },
  { value: companyStats.happyTravelers, label: "Happy Travelers", suffix: "+" },
  { value: companyStats.tourGuides, label: "Expert Guides", suffix: "+" },
  { value: companyStats.yearsExperience, label: "Years Experience", suffix: "" },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const stepValue = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += stepValue;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, target]);

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(num >= 10000 ? 0 : 1) + "K";
    }
    return num.toString();
  };

  return (
    <span ref={ref} className="font-heading text-4xl md:text-5xl font-bold text-primary">
      {formatNumber(count)}{suffix}
    </span>
  );
}

export function WhyChooseUs() {
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

  return (
    <section
      ref={sectionRef}
      className="py-12 lg:py-16 bg-background relative overflow-hidden"
      data-testid="why-choose-us-section"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div
          className={cn(
            "text-center mb-16 opacity-0",
            isVisible && "animate-fade-in-up"
          )}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Why Wanderlust
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Why Choose Us
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We're dedicated to making your travel dreams a reality with unmatched service and expertise
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={cn(
                "text-center opacity-0",
                isVisible && "animate-fade-in-up"
              )}
              style={{ animationDelay: `${(index + 1) * 100}ms`, animationFillMode: "forwards" }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 mb-5 group-hover:scale-110 transition-transform">
                <feature.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div
          className={cn(
            "bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 md:p-12 opacity-0",
            isVisible && "animate-fade-in-up"
          )}
          style={{ animationDelay: "400ms", animationFillMode: "forwards" }}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-white">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                <p className="text-white/80 mt-2 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust badges */}
        <div
          className={cn(
            "flex flex-wrap items-center justify-center gap-8 mt-16 opacity-0",
            isVisible && "animate-fade-in-up"
          )}
          style={{ animationDelay: "500ms", animationFillMode: "forwards" }}
        >
          <span className="text-muted-foreground font-medium">As Featured In:</span>
          {["TripAdvisor", "Lonely Planet", "Travel + Leisure", "Condé Nast"].map((brand) => (
            <div
              key={brand}
              className="px-6 py-3 bg-muted rounded-lg font-medium text-muted-foreground"
            >
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
