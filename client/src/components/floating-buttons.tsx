import { useState, useEffect } from "react";
import { Phone, X, ChevronUp } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { companyInfo } from "@/lib/data";

export function FloatingButtons() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isWhatsappHovered, setIsWhatsappHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent("Hi! I'm interested in learning more about your tour packages.");
    window.open(`https://wa.me/${companyInfo.whatsapp.replace(/[^0-9]/g, "")}?text=${message}`, "_blank");
  };

  const makeCall = () => {
    window.location.href = `tel:${companyInfo.phone}`;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3" data-testid="floating-buttons">
      {/* Scroll to top */}
      <Button
        variant="outline"
        size="icon"
        className={cn(
          "rounded-full shadow-lg bg-background/95 backdrop-blur-sm transition-all duration-300",
          showScrollTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        )}
        onClick={scrollToTop}
        data-testid="button-scroll-top"
      >
        <ChevronUp className="h-5 w-5" />
      </Button>

      {/* Call button (mobile only) */}
      {isMobile && (
        <Button
          size="icon"
          className="rounded-full shadow-lg bg-blue-500 hover:bg-blue-600 text-white h-14 w-14"
          onClick={makeCall}
          data-testid="button-call-floating"
        >
          <Phone className="h-6 w-6" />
        </Button>
      )}

      {/* WhatsApp button */}
      <div
        className="relative"
        onMouseEnter={() => setIsWhatsappHovered(true)}
        onMouseLeave={() => setIsWhatsappHovered(false)}
      >
        {/* Tooltip */}
        <div
          className={cn(
            "absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap px-4 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg transition-all duration-300",
            isWhatsappHovered
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-2 pointer-events-none"
          )}
        >
          Chat with us on WhatsApp
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 bg-gray-900 rotate-45" />
        </div>

        <Button
          size="icon"
          className="rounded-full shadow-lg bg-green-500 hover:bg-green-600 text-white h-14 w-14 pulse-ring"
          onClick={openWhatsApp}
          data-testid="button-whatsapp-floating"
        >
          <SiWhatsapp className="h-8 w-8" />
        </Button>
      </div>
    </div>
  );
}
