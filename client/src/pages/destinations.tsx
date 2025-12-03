import { useState, useEffect } from "react";
import { Link, useSearch } from "wouter";
import { Search, MapPin, Star, Filter, Grid, List, ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { sampleDestinations } from "@/lib/data";
import type { Destination, Continent } from "@shared/schema";

const continents: { label: string; value: Continent }[] = [
  { label: "Asia", value: "asia" },
  { label: "Europe", value: "europe" },
  { label: "Africa", value: "africa" },
  { label: "North America", value: "north-america" },
  { label: "South America", value: "south-america" },
  { label: "Oceania", value: "oceania" },
];

export default function Destinations() {
  const searchString = useSearch();
  const params = new URLSearchParams(searchString);
  const regionParam = params.get("region");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContinents, setSelectedContinents] = useState<string[]>(
    regionParam ? [regionParam] : []
  );
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("popular");

  const filteredDestinations = sampleDestinations
    .filter((dest) => {
      const matchesSearch =
        dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.country.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesContinent =
        selectedContinents.length === 0 ||
        selectedContinents.includes(dest.continent);
      const matchesPrice =
        dest.priceFrom >= priceRange[0] && dest.priceFrom <= priceRange[1];
      return matchesSearch && matchesContinent && matchesPrice;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.priceFrom - b.priceFrom;
        case "price-high":
          return b.priceFrom - a.priceFrom;
        case "rating":
          return b.rating - a.rating;
        case "popular":
        default:
          return b.reviewCount - a.reviewCount;
      }
    });

  const toggleContinent = (continent: string) => {
    setSelectedContinents((prev) =>
      prev.includes(continent)
        ? prev.filter((c) => c !== continent)
        : [...prev, continent]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedContinents([]);
    setPriceRange([0, 5000]);
  };

  const FilterSidebar = () => (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <h4 className="font-semibold mb-3">Search</h4>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search destinations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
            data-testid="input-search-destinations"
          />
        </div>
      </div>

      {/* Continents */}
      <div>
        <h4 className="font-semibold mb-3">Region</h4>
        <div className="space-y-2">
          {continents.map((continent) => (
            <div key={continent.value} className="flex items-center space-x-2">
              <Checkbox
                id={continent.value}
                checked={selectedContinents.includes(continent.value)}
                onCheckedChange={() => toggleContinent(continent.value)}
                data-testid={`checkbox-${continent.value}`}
              />
              <Label htmlFor={continent.value} className="text-sm cursor-pointer">
                {continent.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="font-semibold mb-3">Price Range</h4>
        <Slider
          min={0}
          max={5000}
          step={100}
          value={priceRange}
          onValueChange={setPriceRange}
          className="mt-2"
        />
        <div className="flex justify-between mt-2 text-sm text-muted-foreground">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      {/* Clear filters */}
      {(selectedContinents.length > 0 || searchQuery || priceRange[0] > 0 || priceRange[1] < 5000) && (
        <Button
          variant="ghost"
          className="w-full text-destructive"
          onClick={clearFilters}
          data-testid="button-clear-filters"
        >
          <X className="mr-2 h-4 w-4" />
          Clear Filters
        </Button>
      )}
    </div>
  );

  return (
    <main className="pt-24 pb-16" data-testid="page-destinations">
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Explore Our Destinations
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Discover breathtaking locations across the globe, handpicked by our travel experts
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <FilterSidebar />
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-2">
                {/* Mobile filter button */}
                <Sheet>
                  <SheetTrigger asChild className="lg:hidden">
                    <Button variant="outline" size="sm" data-testid="button-mobile-filters">
                      <Filter className="mr-2 h-4 w-4" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterSidebar />
                    </div>
                  </SheetContent>
                </Sheet>

                <span className="text-sm text-muted-foreground">
                  {filteredDestinations.length} destinations found
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40" data-testid="select-sort">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="rating">Top Rated</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex border rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn("rounded-r-none", viewMode === "grid" && "bg-muted")}
                    onClick={() => setViewMode("grid")}
                    data-testid="button-view-grid"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn("rounded-l-none", viewMode === "list" && "bg-muted")}
                    onClick={() => setViewMode("list")}
                    data-testid="button-view-list"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Destinations grid/list */}
            {filteredDestinations.length === 0 ? (
              <div className="text-center py-16">
                <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-heading text-xl font-semibold mb-2">No destinations found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search query
                </p>
                <Button onClick={clearFilters} data-testid="button-clear-filters-empty">
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div
                className={cn(
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                    : "space-y-4"
                )}
              >
                {filteredDestinations.map((destination) => (
                  <Link key={destination.id} href={`/destinations/${destination.id}`}>
                    <Card
                      className={cn(
                        "group overflow-visible hover-elevate cursor-pointer",
                        viewMode === "list" && "flex"
                      )}
                      data-testid={`card-destination-${destination.id}`}
                    >
                      <div
                        className={cn(
                          "relative overflow-hidden",
                          viewMode === "grid"
                            ? "aspect-[4/3] rounded-t-lg"
                            : "w-48 flex-shrink-0 rounded-l-lg"
                        )}
                      >
                        <img
                          src={destination.imageUrl}
                          alt={destination.name}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        {destination.trending && (
                          <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
                            Trending
                          </Badge>
                        )}
                      </div>

                      <div className={cn("p-4", viewMode === "list" && "flex-1")}>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                          <MapPin className="h-3.5 w-3.5" />
                          <span>{destination.country}</span>
                        </div>
                        <h3 className="font-heading font-bold text-lg mb-1 group-hover:text-primary transition-colors">
                          {destination.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {destination.shortDescription}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{destination.rating}</span>
                            <span className="text-sm text-muted-foreground">
                              ({destination.reviewCount})
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-sm text-muted-foreground">From</span>
                            <span className="font-heading font-bold text-lg text-primary ml-1">
                              ${destination.priceFrom}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
