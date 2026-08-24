import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import FeatureStrip from "@/components/sections/FeatureStrip";
import CategoryGrid from "@/components/sections/CategoryGrid";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import CustomCakeCTA from "@/components/sections/CustomCakeCTA";
import BrandStory from "@/components/sections/BrandStory";
import WhyCakeBake from "@/components/sections/WhyCakeBake";
import OccasionSection from "@/components/sections/OccasionSection";
import InstagramSection from "@/components/sections/InstagramSection";
import Testimonials from "@/components/sections/Testimonials";
import Newsletter from "@/components/sections/Newsletter";

export const metadata: Metadata = {
  title: "Cake & Bake — The Live Bakery | Fresh Cakes & Custom Creations",
  description:
    "Premium cakes, custom creations and delicious desserts made fresh for every celebration. Order from Cake & Bake — The Live Bakery across 5 locations in Gujarat.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeatureStrip />
      <CategoryGrid />
      <FeaturedProducts />
      <CustomCakeCTA />
      <BrandStory />
      <WhyCakeBake />
      <OccasionSection />
      <InstagramSection />
      <Testimonials />
      <Newsletter />
    </>
  );
}
