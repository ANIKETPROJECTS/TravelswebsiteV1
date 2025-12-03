import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { 
  Globe, Heart, Shield, Award, Users, Target, Eye, 
  CheckCircle, Linkedin, Twitter, ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { sampleTeamMembers, companyStats } from "@/lib/data";

const timeline = [
  {
    year: "2009",
    title: "Founded with a Vision",
    description: "Started with a small team of passionate travelers and a dream to share the world's wonders.",
  },
  {
    year: "2012",
    title: "Expanded to 50 Destinations",
    description: "Grew our offerings to include destinations across 5 continents.",
  },
  {
    year: "2015",
    title: "10,000 Happy Travelers",
    description: "Celebrated helping 10,000 travelers create unforgettable memories.",
  },
  {
    year: "2018",
    title: "Award-Winning Service",
    description: "Recognized as a top travel company by TripAdvisor and Travel + Leisure.",
  },
  {
    year: "2021",
    title: "Digital Transformation",
    description: "Launched enhanced digital booking and virtual tour experiences.",
  },
  {
    year: "2024",
    title: "500+ Destinations",
    description: "Now offering tours to over 500 destinations with 50,000+ happy travelers.",
  },
];

const values = [
  {
    icon: Heart,
    title: "Passion for Travel",
    description: "We live and breathe travel. Our team has visited over 100 countries combined.",
  },
  {
    icon: Shield,
    title: "Safety First",
    description: "Your safety is our priority. We partner only with vetted, licensed operators.",
  },
  {
    icon: Globe,
    title: "Sustainable Tourism",
    description: "We're committed to responsible travel that benefits local communities.",
  },
  {
    icon: Award,
    title: "Excellence Always",
    description: "We strive for perfection in every detail of your travel experience.",
  },
];

export default function About() {
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
    <main className="pt-24 pb-16" data-testid="page-about">
      {/* Hero */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920"
            alt="Travel"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50" />
        </div>
        
        <div className="relative container mx-auto px-4 text-center text-white">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent text-sm font-medium mb-6">
            Our Story
          </span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Turning Dreams Into
            <br />
            <span className="text-accent">Unforgettable Adventures</span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Since 2009, we've been helping travelers explore the world's most beautiful
            destinations with expertly crafted tours and unparalleled service.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section ref={sectionRef} className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div
              className={cn(
                "opacity-0",
                isVisible && "animate-fade-in-up"
              )}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
                <Target className="h-4 w-4" />
                <span className="font-medium">Our Mission</span>
              </div>
              <h2 className="font-heading text-3xl font-bold mb-4">
                To Make World-Class Travel Accessible
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We believe everyone deserves to experience the wonder of travel. Our mission
                is to create exceptional travel experiences that are accessible, sustainable,
                and life-changing. We work tirelessly to connect travelers with authentic
                local cultures, breathtaking landscapes, and unforgettable moments.
              </p>
              <div className="space-y-3">
                {["Authentic local experiences", "Sustainable tourism practices", "Expert local guides", "24/7 traveler support"].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div
              className={cn(
                "opacity-0",
                isVisible && "animate-fade-in-up"
              )}
              style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
            >
              <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent mb-6">
                  <Eye className="h-4 w-4" />
                  <span className="font-medium">Our Vision</span>
                </div>
                <h3 className="font-heading text-2xl font-bold mb-4">
                  To Be the World's Most Trusted Travel Partner
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  We envision a world where travel brings people together, fosters understanding
                  between cultures, and creates lasting positive impact on communities worldwide.
                  By 2030, we aim to help 1 million travelers explore the world responsibly.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              What Drives Us
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold">Our Core Values</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card
                key={value.title}
                className={cn(
                  "p-6 text-center hover-elevate opacity-0",
                  isVisible && "animate-fade-in-up"
                )}
                style={{ animationDelay: `${(index + 1) * 100}ms`, animationFillMode: "forwards" }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 mb-4">
                  <value.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
              Our Journey
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold">How We Got Here</h2>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Center line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-border" />

            {timeline.map((item, index) => (
              <div
                key={item.year}
                className={cn(
                  "relative flex items-center mb-12",
                  index % 2 === 0 ? "justify-start" : "justify-end"
                )}
              >
                <div
                  className={cn(
                    "w-5/12 p-6 rounded-xl bg-card border",
                    index % 2 === 0 ? "text-right mr-auto" : "text-left ml-auto"
                  )}
                >
                  <span className="inline-block px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-semibold mb-2">
                    {item.year}
                  </span>
                  <h3 className="font-heading font-semibold text-lg mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              The Dream Team
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Meet Our Leadership</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our passionate team brings together decades of travel expertise and a shared
              love for creating extraordinary experiences.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sampleTeamMembers.map((member) => (
              <Card key={member.id} className="overflow-visible group hover-elevate" data-testid={`team-member-${member.id}`}>
                <div className="relative aspect-square overflow-hidden rounded-t-lg">
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 text-center">
                  <h3 className="font-heading font-semibold text-lg">{member.name}</h3>
                  <p className="text-sm text-primary mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{member.bio}</p>
                  <div className="flex justify-center gap-2">
                    {member.linkedIn && (
                      <a
                        href={member.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full hover:bg-muted transition-colors"
                      >
                        <Linkedin className="h-4 w-4 text-muted-foreground" />
                      </a>
                    )}
                    {member.twitter && (
                      <a
                        href={member.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full hover:bg-muted transition-colors"
                      >
                        <Twitter className="h-4 w-4 text-muted-foreground" />
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Adventure?
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Join the 50,000+ travelers who have explored the world with us. Your next
            unforgettable journey awaits.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/tours">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold" data-testid="button-explore-tours">
                Explore Tours
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20" data-testid="button-contact-us">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
