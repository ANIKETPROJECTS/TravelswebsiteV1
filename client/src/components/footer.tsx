import { useState } from "react";
import { Link } from "wouter";
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, Send, Shield, Award, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { companyInfo } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";

const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Our Tours", href: "/tours" },
  { label: "Destinations", href: "/destinations" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "FAQs", href: "/contact#faq" },
];

const destinations = [
  { id: "bali", label: "Bali, Indonesia", href: "/destinations?region=asia&highlight=bali" },
  { id: "santorini", label: "Santorini, Greece", href: "/destinations?region=europe&highlight=santorini" },
  { id: "maldives", label: "Maldives", href: "/destinations?region=asia&highlight=maldives" },
  { id: "tokyo", label: "Tokyo, Japan", href: "/destinations?region=asia&highlight=tokyo" },
  { id: "machu-picchu", label: "Machu Picchu, Peru", href: "/destinations?region=south-america" },
  { id: "kenya", label: "Safari Kenya", href: "/destinations?region=africa" },
];

const socialLinks = [
  { icon: Facebook, href: companyInfo.socialMedia.facebook, label: "Facebook" },
  { icon: Instagram, href: companyInfo.socialMedia.instagram, label: "Instagram" },
  { icon: Twitter, href: companyInfo.socialMedia.twitter, label: "Twitter" },
  { icon: Youtube, href: companyInfo.socialMedia.youtube, label: "YouTube" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        toast({
          title: "Subscribed!",
          description: "You'll receive our best travel deals and tips.",
        });
        setEmail("");
      } else {
        throw new Error("Subscription failed");
      }
    } catch (error) {
      toast({
        title: "Already subscribed!",
        description: "This email is already in our mailing list.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300" data-testid="footer">
      {/* Newsletter section */}
      <div className="bg-primary">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-3">
              Get Exclusive Travel Deals
            </h3>
            <p className="text-primary-foreground/80 mb-6">
              Subscribe to our newsletter and be the first to know about special offers and new destinations.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20"
                required
                data-testid="input-newsletter-email"
              />
              <Button
                type="submit"
                size="lg"
                className="h-12 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold whitespace-nowrap"
                disabled={isLoading}
                data-testid="button-subscribe"
              >
                <Send className="mr-2 h-4 w-4" />
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company info */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-md bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-heading font-bold text-xl">
                W
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-lg text-white leading-tight">
                  Wanderlust
                </span>
                <span className="text-xs uppercase tracking-wider text-gray-400">
                  Tours & Travel
                </span>
              </div>
            </div>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              Creating unforgettable travel experiences since 2009. We're passionate about helping you explore the world's most beautiful destinations.
            </p>
            <div className="space-y-3 text-sm">
              <a
                href={`tel:${companyInfo.phone}`}
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
                data-testid="footer-phone"
              >
                <Phone className="h-4 w-4 text-accent" />
                {companyInfo.phone}
              </a>
              <a
                href={`mailto:${companyInfo.email}`}
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
                data-testid="footer-email"
              >
                <Mail className="h-4 w-4 text-accent" />
                {companyInfo.email}
              </a>
              <div className="flex items-start gap-3 text-gray-400">
                <MapPin className="h-4 w-4 text-accent mt-0.5" />
                <span>{companyInfo.address}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                    data-testid={`footer-link-${link.label.toLowerCase().replace(' ', '-')}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-6">Top Destinations</h4>
            <ul className="space-y-3">
              {destinations.map((dest) => (
                <li key={dest.id}>
                  <Link
                    href={dest.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                    data-testid={`footer-dest-${dest.id}`}
                  >
                    {dest.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Trust */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-6">Connect With Us</h4>
            <div className="flex gap-3 mb-8">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all"
                  data-testid={`footer-social-${social.label.toLowerCase()}`}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>

            <h4 className="font-heading font-semibold text-white mb-4">We Accept</h4>
            <div className="flex flex-wrap gap-2 mb-6">
              {["Visa", "Mastercard", "PayPal", "Amex"].map((method) => (
                <div
                  key={method}
                  className="px-3 py-1.5 bg-gray-800 rounded text-xs text-gray-400"
                >
                  {method}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Shield className="h-4 w-4 text-green-500" />
                <span>Secure Booking</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Award className="h-4 w-4 text-yellow-500" />
                <span>Best Price</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <p>
              © {new Date().getFullYear()} Wanderlust Tours & Travel. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="hover:text-white transition-colors" data-testid="footer-privacy">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors" data-testid="footer-terms">
                Terms & Conditions
              </Link>
              <Link href="/sitemap" className="hover:text-white transition-colors" data-testid="footer-sitemap">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
