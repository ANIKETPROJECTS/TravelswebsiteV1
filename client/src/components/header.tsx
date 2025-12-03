import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, MapPin, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { companyInfo } from "@/lib/data";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/destinations", label: "Destinations" },
  { href: "/tours", label: "Tours" },
  { href: "/about", label: "About Us" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const destinations = [
  { name: "Bali, Indonesia", href: "/destinations?region=asia" },
  { name: "Santorini, Greece", href: "/destinations?region=europe" },
  { name: "Maldives", href: "/destinations?region=asia" },
  { name: "Swiss Alps", href: "/destinations?region=europe" },
  { name: "Tokyo, Japan", href: "/destinations?region=asia" },
  { name: "Machu Picchu, Peru", href: "/destinations?region=south-america" },
];

export function Header() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = location === "/";
  const headerBg = isScrolled || !isHome
    ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
    : "bg-transparent";

  return (
    <>
      {/* Top bar */}
      <div className={cn(
        "hidden lg:block transition-all duration-300",
        isScrolled || !isHome ? "h-0 overflow-hidden opacity-0" : "h-10 opacity-100"
      )}>
        <div className="bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 h-10 flex items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              <a 
                href={`tel:${companyInfo.phone}`} 
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                data-testid="link-phone-top"
              >
                <Phone className="h-3.5 w-3.5" />
                <span>{companyInfo.phone}</span>
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5" />
                <span>{companyInfo.officeHours}</span>
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span>Best Price Guarantee</span>
              <span className="text-white/60">|</span>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        className={cn(
          "fixed left-0 right-0 z-50 transition-all duration-300",
          isScrolled || !isHome ? "top-0" : "top-0 lg:top-10",
          headerBg
        )}
        data-testid="header"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group" data-testid="link-logo">
              <div className="w-10 h-10 rounded-md bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-heading font-bold text-xl">
                W
              </div>
              <div className="flex flex-col">
                <span className={cn(
                  "font-heading font-bold text-lg leading-tight transition-colors",
                  isScrolled || !isHome ? "text-foreground" : "text-white"
                )}>
                  Wanderlust
                </span>
                <span className={cn(
                  "text-xs uppercase tracking-wider transition-colors",
                  isScrolled || !isHome ? "text-muted-foreground" : "text-white/80"
                )}>
                  Tours & Travel
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:block">
              <NavigationMenu>
                <NavigationMenuList className="gap-1">
                  {navLinks.map((link) => (
                    <NavigationMenuItem key={link.href}>
                      {link.label === "Destinations" ? (
                        <>
                          <NavigationMenuTrigger
                            className={cn(
                              "bg-transparent px-4 py-2 font-medium transition-colors",
                              isScrolled || !isHome
                                ? "text-foreground hover:text-primary"
                                : "text-white/90 hover:text-white hover:bg-white/10"
                            )}
                            data-testid="nav-destinations-trigger"
                          >
                            {link.label}
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <div className="w-[400px] p-4">
                              <div className="grid grid-cols-2 gap-2">
                                {destinations.map((dest) => (
                                  <Link
                                    key={dest.name}
                                    href={dest.href}
                                    className="block p-3 rounded-md hover-elevate cursor-pointer"
                                    data-testid={`nav-dest-${dest.name.toLowerCase().replace(/[^a-z]/g, '-')}`}
                                  >
                                    <span className="font-medium">{dest.name}</span>
                                  </Link>
                                ))}
                              </div>
                              <div className="mt-4 pt-4 border-t">
                                <Link
                                  href="/destinations"
                                  className="block p-3 rounded-md bg-primary/5 hover:bg-primary/10 text-center font-medium text-primary cursor-pointer"
                                  data-testid="nav-view-all-destinations"
                                >
                                  View All Destinations
                                </Link>
                              </div>
                            </div>
                          </NavigationMenuContent>
                        </>
                      ) : (
                        <Link
                          href={link.href}
                          className={cn(
                            "px-4 py-2 font-medium transition-colors inline-block",
                            location === link.href
                              ? "text-accent"
                              : isScrolled || !isHome
                              ? "text-foreground hover:text-primary"
                              : "text-white/90 hover:text-white"
                          )}
                          data-testid={`nav-${link.label.toLowerCase().replace(' ', '-')}`}
                        >
                          {link.label}
                        </Link>
                      )}
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </nav>

            {/* Right side buttons */}
            <div className="flex items-center gap-2">
              <ThemeToggle />
              
              <Link href="/contact" className="hidden lg:block">
                <Button 
                  className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
                  data-testid="button-get-quote"
                >
                  Get a Quote
                </Button>
              </Link>

              {/* Mobile menu */}
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild className="lg:hidden">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      isScrolled || !isHome ? "text-foreground" : "text-white"
                    )}
                    data-testid="button-mobile-menu"
                  >
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[350px]">
                  <nav className="flex flex-col gap-4 mt-8">
                    {navLinks.map((link) => (
                      <SheetClose asChild key={link.href}>
                        <Link
                          href={link.href}
                          className={cn(
                            "text-lg font-medium py-2 transition-colors",
                            location === link.href
                              ? "text-accent"
                              : "text-foreground hover:text-primary"
                          )}
                          data-testid={`mobile-nav-${link.label.toLowerCase().replace(' ', '-')}`}
                        >
                          {link.label}
                        </Link>
                      </SheetClose>
                    ))}
                    <div className="pt-4 border-t mt-4">
                      <SheetClose asChild>
                        <Link href="/contact">
                          <Button 
                            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
                            data-testid="mobile-button-get-quote"
                          >
                            Get a Quote
                          </Button>
                        </Link>
                      </SheetClose>
                    </div>
                    <div className="pt-4">
                      <a 
                        href={`tel:${companyInfo.phone}`}
                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                        data-testid="mobile-link-phone"
                      >
                        <Phone className="h-4 w-4" />
                        <span>{companyInfo.phone}</span>
                      </a>
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
