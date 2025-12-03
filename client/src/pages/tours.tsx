import { useState } from "react";
import { Link, useSearch } from "wouter";
import { Search, Clock, Users, Star, Filter, X, MapPin, AlertCircle } from "lucide-react";
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
import { sampleTours, sampleDestinations } from "@/lib/data";
import type { TourCategory } from "@shared/schema";

const categories: { label: string; value: TourCategory }[] = [
  { label: "Adventure", value: "adventure" },
  { label: "Luxury", value: "luxury" },
  { label: "Family", value: "family" },
  { label: "Honeymoon", value: "honeymoon" },
  { label: "Solo", value: "solo" },
  { label: "Cultural", value: "cultural" },
  { label: "Wildlife", value: "wildlife" },
  { label: "Beach", value: "beach" },
];

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

export default function Tours() {
  const searchString = useSearch();
  const params = new URLSearchParams(searchString);
  const categoryParam = params.get("category");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryParam ? [categoryParam] : []
  );
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sortBy, setSortBy] = useState("popular");

  const filteredTours = sampleTours
    .filter((tour) => {
      const matchesSearch =
        tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tour.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(tour.category);
      const matchesPrice =
        tour.price >= priceRange[0] && tour.price <= priceRange[1];
      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "duration":
          return parseInt(a.duration) - parseInt(b.duration);
        case "popular":
        default:
          return b.reviewCount - a.reviewCount;
      }
    });

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setPriceRange([0, 5000]);
  };

  const FilterSidebar = () => (
    <div className="space-y-6">
      <div>
        <h4 className="font-semibold mb-3">Search</h4>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tours..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
            data-testid="input-search-tours"
          />
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-3">Category</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.value} className="flex items-center space-x-2">
              <Checkbox
                id={category.value}
                checked={selectedCategories.includes(category.value)}
                onCheckedChange={() => toggleCategory(category.value)}
                data-testid={`checkbox-${category.value}`}
              />
              <Label htmlFor={category.value} className="text-sm cursor-pointer">
                {category.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

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

      {(selectedCategories.length > 0 || searchQuery || priceRange[0] > 0 || priceRange[1] < 5000) && (
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
    <main className="pt-24 pb-16" data-testid="page-tours">
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Tour Packages
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Find your perfect adventure from our handpicked collection of tours
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="flex gap-8">
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <FilterSidebar />
            </div>
          </aside>

          <div className="flex-1">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-2">
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
                  {filteredTours.length} tours found
                </span>
              </div>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-44" data-testid="select-sort">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rating">Top Rated</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="duration">Duration</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {filteredTours.length === 0 ? (
              <div className="text-center py-16">
                <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-heading text-xl font-semibold mb-2">No tours found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search query
                </p>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredTours.map((tour) => {
                  const destination = sampleDestinations.find(d => d.id === tour.destinationId);
                  const discount = tour.originalPrice
                    ? Math.round(((tour.originalPrice - tour.price) / tour.originalPrice) * 100)
                    : 0;

                  return (
                    <Card
                      key={tour.id}
                      className="group overflow-visible hover-elevate"
                      data-testid={`card-tour-${tour.id}`}
                    >
                      <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
                        <img
                          src={tour.imageUrl}
                          alt={tour.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        {discount > 0 && (
                          <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground font-bold">
                            {discount}% OFF
                          </Badge>
                        )}
                        {tour.spotsLeft && tour.spotsLeft <= 5 && (
                          <Badge variant="destructive" className="absolute top-3 right-3">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            Only {tour.spotsLeft} left!
                          </Badge>
                        )}
                        <Badge
                          className={cn(
                            "absolute bottom-3 left-3 capitalize",
                            categoryColors[tour.category]
                          )}
                        >
                          {tour.category}
                        </Badge>
                      </div>

                      <div className="p-5">
                        {destination && (
                          <span className="text-sm text-muted-foreground mb-1 block">
                            {destination.name}, {destination.country}
                          </span>
                        )}
                        <h3 className="font-heading font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          <Link href={`/tours/${tour.id}`} data-testid={`link-tour-${tour.id}`}>
                            {tour.title}
                          </Link>
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {tour.shortDescription}
                        </p>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{tour.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>Max {tour.maxGroupSize}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span>{tour.rating}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t">
                          <div>
                            {tour.originalPrice && (
                              <span className="text-sm text-muted-foreground line-through mr-2">
                                ${tour.originalPrice.toLocaleString()}
                              </span>
                            )}
                            <span className="font-heading font-bold text-xl text-primary">
                              ${tour.price.toLocaleString()}
                            </span>
                            <span className="text-sm text-muted-foreground">/person</span>
                          </div>
                          <Link href={`/tours/${tour.id}`}>
                            <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
