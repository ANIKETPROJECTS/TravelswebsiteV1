import { Hero } from "@/components/hero";
import { FeaturedDestinations } from "@/components/featured-destinations";
import { PopularTours } from "@/components/popular-tours";
import { WhyChooseUs } from "@/components/why-choose-us";
import { Testimonials } from "@/components/testimonials";
import { BlogPreview } from "@/components/blog-preview";

export default function Home() {
  return (
    <main data-testid="page-home">
      <Hero />
      <FeaturedDestinations />
      <PopularTours />
      <WhyChooseUs />
      <Testimonials />
      <BlogPreview />
    </main>
  );
}
