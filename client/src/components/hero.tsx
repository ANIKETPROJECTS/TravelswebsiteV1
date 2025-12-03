import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Search, Calendar, Users, DollarSign, ChevronDown, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Slider } from "@/components/ui/slider";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { sampleDestinations } from "@/lib/data";

const heroImages = [
  "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1920",
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920",
  "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=1920",
];

const headlineWords = ["Travel", "Explore", "Discover"];

export function Hero() {
  const [, setLocation] = useLocation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [animatedWordIndex, setAnimatedWordIndex] = useState(0);
  
  // Search form state
  const [destination, setDestination] = useState("");
  const [destinationOpen, setDestinationOpen] = useState(false);
  const [date, setDate] = useState<Date>();
  const [travelers, setTravelers] = useState(2);
  const [budget, setBudget] = useState([1000, 5000]);
  const [dateOpen, setDateOpen] = useState(false);
  const [travelersOpen, setTravelersOpen] = useState(false);
  const [budgetOpen, setBudgetOpen] = useState(false);

  // Rotate hero images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Animate headline words
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedWordIndex((prev) => (prev + 1) % headlineWords.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (destination) params.set("destination", destination);
    if (date) params.set("date", format(date, "yyyy-MM-dd"));
    params.set("travelers", travelers.toString());
    params.set("minBudget", budget[0].toString());
    params.set("maxBudget", budget[1].toString());
    setLocation(`/tours?${params.toString()}`);
  };

  const filteredDestinations = sampleDestinations.filter((dest) =>
    dest.name.toLowerCase().includes(destination.toLowerCase()) ||
    dest.country.toLowerCase().includes(destination.toLowerCase())
  );

  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden" data-testid="hero-section">
      {/* Background images with fade transition */}
      {heroImages.map((image, index) => (
        <div
          key={image}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          )}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${image})` }}
          />
        </div>
      ))}

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Main heading */}
        <div className="mb-6">
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-white text-shadow-lg">
            Travel World Holidays
          </h1>
        </div>

        <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto text-shadow">
          Quality Is Our Responsibility
        </p>

        {/* Smart Search Bar */}
        <div className="max-w-5xl mx-auto">
          <div className="glass rounded-xl p-3 md:p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
              {/* Destination */}
              <Popover open={destinationOpen} onOpenChange={setDestinationOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="w-full justify-start bg-white/90 dark:bg-gray-900/90 border-0 h-12 text-left font-normal"
                    data-testid="input-destination"
                  >
                    <MapPin className="mr-2 h-4 w-4 shrink-0 text-primary" />
                    {destination || "Where to?"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0" align="start">
                  <Command>
                    <CommandInput 
                      placeholder="Search destinations..." 
                      value={destination}
                      onValueChange={setDestination}
                    />
                    <CommandList>
                      <CommandEmpty>No destination found.</CommandEmpty>
                      <CommandGroup heading="Popular Destinations">
                        {filteredDestinations.slice(0, 6).map((dest) => (
                          <CommandItem
                            key={dest.id}
                            value={dest.name}
                            onSelect={(value) => {
                              setDestination(value);
                              setDestinationOpen(false);
                            }}
                            data-testid={`option-dest-${dest.id}`}
                          >
                            <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                            {dest.name}, {dest.country}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              {/* Date Picker */}
              <Popover open={dateOpen} onOpenChange={setDateOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-white/90 dark:bg-gray-900/90 border-0 h-12 text-left font-normal"
                    data-testid="input-date"
                  >
                    <Calendar className="mr-2 h-4 w-4 text-primary" />
                    {date ? format(date, "MMM d, yyyy") : "When?"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    onSelect={(d) => {
                      setDate(d);
                      setDateOpen(false);
                    }}
                    disabled={(d) => d < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              {/* Travelers */}
              <Popover open={travelersOpen} onOpenChange={setTravelersOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-white/90 dark:bg-gray-900/90 border-0 h-12 text-left font-normal"
                    data-testid="input-travelers"
                  >
                    <Users className="mr-2 h-4 w-4 text-primary" />
                    {travelers} {travelers === 1 ? "Traveler" : "Travelers"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px]" align="start">
                  <div className="space-y-4">
                    <h4 className="font-medium text-sm">Number of Travelers</h4>
                    <div className="flex items-center justify-between">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setTravelers(Math.max(1, travelers - 1))}
                        disabled={travelers <= 1}
                        data-testid="button-travelers-minus"
                      >
                        -
                      </Button>
                      <span className="text-xl font-semibold">{travelers}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setTravelers(Math.min(20, travelers + 1))}
                        disabled={travelers >= 20}
                        data-testid="button-travelers-plus"
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              {/* Budget */}
              <Popover open={budgetOpen} onOpenChange={setBudgetOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-white/90 dark:bg-gray-900/90 border-0 h-12 text-left font-normal"
                    data-testid="input-budget"
                  >
                    <DollarSign className="mr-2 h-4 w-4 text-primary" />
                    ${budget[0]} - ${budget[1]}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[280px]" align="start">
                  <div className="space-y-4">
                    <h4 className="font-medium text-sm">Budget Range (per person)</h4>
                    <Slider
                      min={500}
                      max={10000}
                      step={100}
                      value={budget}
                      onValueChange={setBudget}
                      className="mt-6"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>${budget[0]}</span>
                      <span>${budget[1]}</span>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              {/* Search Button */}
              <Button
                size="lg"
                className="w-full h-12 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
                onClick={handleSearch}
                data-testid="button-search"
              >
                <Search className="mr-2 h-5 w-5" />
                Search
              </Button>
            </div>
          </div>

          {/* Quick filters */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {["Adventure", "Luxury", "Family", "Honeymoon", "Solo"].map((category) => (
              <Button
                key={category}
                variant="outline"
                className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 hover:text-white"
                onClick={() => setLocation(`/tours?category=${category.toLowerCase()}`)}
                data-testid={`filter-${category.toLowerCase()}`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80">
        <div className="flex flex-col items-center scroll-indicator">
          <span className="text-sm mb-2">Scroll to explore</span>
          <ChevronDown className="h-6 w-6" />
        </div>
      </div>

      {/* Image indicators */}
      <div className="absolute bottom-8 right-8 flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              index === currentImageIndex
                ? "bg-white w-6"
                : "bg-white/50 hover:bg-white/80"
            )}
            onClick={() => setCurrentImageIndex(index)}
            data-testid={`hero-indicator-${index}`}
          />
        ))}
      </div>
    </section>
  );
}
