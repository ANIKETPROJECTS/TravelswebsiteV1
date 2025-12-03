import { useState } from "react";
import { useParams, Link } from "wouter";
import { 
  Star, Clock, Users, MapPin, Phone, Mail, MessageCircle, 
  Check, X, Calendar, ChevronRight, Share2, Heart, AlertCircle,
  Globe, Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { sampleTours, sampleDestinations, sampleItineraries, sampleGuides, sampleFaqs, companyInfo } from "@/lib/data";
import { InquiryModal } from "@/components/inquiry-modal";

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

export default function TourDetail() {
  const { id } = useParams<{ id: string }>();
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const tour = sampleTours.find(t => t.id === id);
  const destination = tour ? sampleDestinations.find(d => d.id === tour.destinationId) : null;
  const itinerary = sampleItineraries.filter(i => i.tourId === id);
  const guide = sampleGuides[0];
  const faqs = sampleFaqs.filter(f => f.tourId === id || f.category === "general").slice(0, 5);

  if (!tour) {
    return (
      <main className="pt-24 pb-16" data-testid="page-tour-not-found">
        <div className="container mx-auto px-4 text-center py-20">
          <h1 className="font-heading text-3xl font-bold mb-4">Tour Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The tour you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/tours">
            <Button>View All Tours</Button>
          </Link>
        </div>
      </main>
    );
  }

  const discount = tour.originalPrice
    ? Math.round(((tour.originalPrice - tour.price) / tour.originalPrice) * 100)
    : 0;

  const allImages = [tour.imageUrl, ...(tour.galleryImages || [])];

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: tour.title,
        text: tour.shortDescription,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <main className="pt-20" data-testid="page-tour-detail">
      {/* Breadcrumb */}
      <div className="bg-muted/30 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/">
              <a className="hover:text-foreground">Home</a>
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/tours">
              <a className="hover:text-foreground">Tours</a>
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{tour.title}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden">
                <img
                  src={allImages[selectedImage]}
                  alt={tour.title}
                  className="w-full h-full object-cover"
                />
                {discount > 0 && (
                  <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground font-bold text-base px-4 py-1">
                    {discount}% OFF
                  </Badge>
                )}
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-white/90 backdrop-blur-sm"
                    onClick={handleShare}
                    data-testid="button-share"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className={cn(
                      "bg-white/90 backdrop-blur-sm",
                      isFavorite && "text-red-500"
                    )}
                    onClick={() => setIsFavorite(!isFavorite)}
                    data-testid="button-favorite"
                  >
                    <Heart className={cn("h-4 w-4", isFavorite && "fill-current")} />
                  </Button>
                </div>
              </div>

              {allImages.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={cn(
                        "flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all",
                        selectedImage === idx
                          ? "border-primary"
                          : "border-transparent opacity-70 hover:opacity-100"
                      )}
                      data-testid={`gallery-thumb-${idx}`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Header */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge className={cn("capitalize", categoryColors[tour.category])}>
                  {tour.category}
                </Badge>
                {destination && (
                  <Badge variant="outline">
                    <MapPin className="h-3 w-3 mr-1" />
                    {destination.name}, {destination.country}
                  </Badge>
                )}
              </div>

              <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4" data-testid="tour-title">
                {tour.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{tour.rating}</span>
                  <span className="text-muted-foreground">({tour.reviewCount} reviews)</span>
                </div>
                <Separator orientation="vertical" className="h-4" />
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{tour.duration}</span>
                </div>
                <Separator orientation="vertical" className="h-4" />
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>Max {tour.maxGroupSize} people</span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
                {["Overview", "Itinerary", "Inclusions", "Reviews"].map((tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab.toLowerCase()}
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                    data-testid={`tab-${tab.toLowerCase()}`}
                  >
                    {tab}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="overview" className="pt-6 space-y-6">
                <div>
                  <h3 className="font-heading text-xl font-semibold mb-3">About This Tour</h3>
                  <p className="text-muted-foreground leading-relaxed">{tour.description}</p>
                </div>

                {tour.highlights && tour.highlights.length > 0 && (
                  <div>
                    <h3 className="font-heading text-xl font-semibold mb-3">Tour Highlights</h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {tour.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tour Guide */}
                {guide && (
                  <Card className="p-5">
                    <h3 className="font-heading text-lg font-semibold mb-4">Your Tour Guide</h3>
                    <div className="flex gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={guide.imageUrl} alt={guide.name} />
                        <AvatarFallback>{guide.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-semibold">{guide.name}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{guide.title}</p>
                        <p className="text-sm text-muted-foreground line-clamp-2">{guide.bio}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm">
                          <div className="flex items-center gap-1">
                            <Globe className="h-4 w-4" />
                            <span>{guide.languages.join(", ")}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Award className="h-4 w-4" />
                            <span>{guide.experience}+ years</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="itinerary" className="pt-6">
                <h3 className="font-heading text-xl font-semibold mb-6">Day-by-Day Itinerary</h3>
                <div className="space-y-6">
                  {itinerary.length > 0 ? (
                    itinerary.map((day, idx) => (
                      <div
                        key={day.id}
                        className="relative pl-8 pb-6 border-l-2 border-primary/20 last:border-0"
                      >
                        <div className="absolute left-0 -translate-x-1/2 w-4 h-4 rounded-full bg-primary" />
                        <Badge variant="outline" className="mb-2">Day {day.day}</Badge>
                        <h4 className="font-semibold text-lg mb-2">{day.title}</h4>
                        <p className="text-muted-foreground mb-3">{day.description}</p>
                        {day.activities && day.activities.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {day.activities.map((activity, i) => (
                              <Badge key={i} variant="secondary" className="font-normal">
                                {activity}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground">
                      Detailed itinerary will be provided upon booking confirmation.
                    </p>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="inclusions" className="pt-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-heading text-xl font-semibold mb-4 text-green-600 dark:text-green-400">
                      What's Included
                    </h3>
                    <div className="space-y-2">
                      {tour.inclusions?.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-semibold mb-4 text-red-600 dark:text-red-400">
                      What's Not Included
                    </h3>
                    <div className="space-y-2">
                      {tour.exclusions?.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <X className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="pt-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="text-4xl font-bold text-primary">{tour.rating}</div>
                    <div>
                      <div className="flex gap-0.5 mb-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={cn(
                              "h-5 w-5",
                              star <= Math.round(tour.rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "fill-muted text-muted"
                            )}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Based on {tour.reviewCount} reviews
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  Reviews will be displayed here. Check back soon for traveler experiences.
                </p>
              </TabsContent>
            </Tabs>

            {/* FAQ */}
            {faqs.length > 0 && (
              <div>
                <h3 className="font-heading text-xl font-semibold mb-4">Frequently Asked Questions</h3>
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, idx) => (
                    <AccordionItem key={faq.id} value={`faq-${idx}`}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}
          </div>

          {/* Sidebar - Sticky inquiry widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="p-6" data-testid="inquiry-widget">
                {/* Price */}
                <div className="mb-6">
                  {tour.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">
                      ${tour.originalPrice.toLocaleString()}
                    </span>
                  )}
                  <div className="flex items-end gap-1">
                    <span className="font-heading text-4xl font-bold text-primary">
                      ${tour.price.toLocaleString()}
                    </span>
                    <span className="text-muted-foreground mb-1">/person</span>
                  </div>
                </div>

                {/* Availability */}
                {tour.spotsLeft && tour.spotsLeft <= 5 && (
                  <div className="flex items-center gap-2 p-3 mb-4 rounded-lg bg-destructive/10 text-destructive">
                    <AlertCircle className="h-5 w-5" />
                    <span className="font-medium">Only {tour.spotsLeft} spots left!</span>
                  </div>
                )}

                {/* CTA buttons */}
                <div className="space-y-3 mb-6">
                  <Button
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold h-12"
                    onClick={() => setInquiryOpen(true)}
                    data-testid="button-inquire-now"
                  >
                    <Calendar className="mr-2 h-5 w-5" />
                    Inquire Now
                  </Button>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => window.open(`https://wa.me/${companyInfo.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hi! I'm interested in ${tour.title}`)}`, "_blank")}
                      data-testid="button-whatsapp"
                    >
                      <MessageCircle className="mr-2 h-4 w-4 text-green-500" />
                      WhatsApp
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => window.location.href = `tel:${companyInfo.phone}`}
                      data-testid="button-call"
                    >
                      <Phone className="mr-2 h-4 w-4 text-blue-500" />
                      Call
                    </Button>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Quick info */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-medium">{tour.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Group Size</span>
                    <span className="font-medium">Max {tour.maxGroupSize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tour Type</span>
                    <span className="font-medium capitalize">{tour.category}</span>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Contact info */}
                <div className="space-y-3 text-sm">
                  <h4 className="font-semibold">Need Help?</h4>
                  <a
                    href={`tel:${companyInfo.phone}`}
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                  >
                    <Phone className="h-4 w-4" />
                    {companyInfo.phone}
                  </a>
                  <a
                    href={`mailto:${companyInfo.email}`}
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                  >
                    <Mail className="h-4 w-4" />
                    {companyInfo.email}
                  </a>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <InquiryModal
        open={inquiryOpen}
        onOpenChange={setInquiryOpen}
        preselectedTourId={tour.id}
        preselectedTourTitle={tour.title}
      />
    </main>
  );
}
