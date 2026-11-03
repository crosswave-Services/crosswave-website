import {
  ShoppingBag,
  Building2,
  Clapperboard,
  Flower2,
  Landmark,
  Palette,
  ShoppingBasket,
  Sparkles,
  Store,
} from "lucide-react";

import HeroSection from "@/components/ui/hero-01-utils/hero";
import type { NavigationSection } from "@/components/ui/hero-01-utils/header";
import Header from "@/components/ui/hero-01-utils/header";
import BrandSlider, {
  BrandList,
} from "@/components/ui/hero-01-utils/brand-slider";
import type { AvatarList } from "@/components/ui/hero-01-utils/hero";

const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=96&h=96&q=70`;

export default function AgencyHeroSection() {
  // Service imagery for the six divisions (not people or clients)
  const avatarList: AvatarList[] = [
    { image: unsplash("1532187863486-abf9dbad1b69"), alt: "NAFDAC & Regulatory Consultation" },
    { image: unsplash("1478737270239-2f02b77fc618"), alt: "PR, Media & Communication" },
    { image: unsplash("1509631179647-0177331693ae"), alt: "Fashion, Modeling & Talent Management" },
    { image: unsplash("1460925895917-afdab827c52f"), alt: "Digital Marketing & Brand Promotion" },
    { image: unsplash("1454165804606-c3d57bc86b40"), alt: "Project Management & Business Consultancy" },
    { image: unsplash("1519003722824-194d4455a60c"), alt: "Logistics & Haulage Services" },
  ];

  // Same menu as the main website
  const navigationData: NavigationSection[] = [
    {
      title: "Home",
      href: "/",
      isActive: true,
    },
    {
      title: "About Us",
      href: "/about.html",
    },
    {
      title: "Our Services",
      href: "/service.html",
      children: [
        {
          title: "NAFDAC & Regulatory Consultation",
          href: "/service.html#nafdac-regulatory",
          tag: "Core",
          description: "Product registration guidance, documentation support and laboratory analysis coordination.",
        },
        {
          title: "PR, Media & Communication",
          href: "/service.html#pr-media-communication",
          tag: "Core",
          description: "Press releases, TV and radio publicity, events coverage and media relations.",
        },
        {
          title: "Digital Marketing & Brand Promotion",
          href: "/service.html#digital-marketing",
          description: "Social media management, digital advertising and content creation.",
        },
        {
          title: "Project Management & Business Consultancy",
          href: "/service.html#project-management",
          description: "Project planning and execution, business development and consultancy.",
        },
        {
          title: "Fashion, Modeling & Talent Management",
          href: "/service.html#fashion-modeling-talent",
          tag: "Core",
          description: "Model recruitment, commercial shoots, brand campaigns and talent coordination.",
        },
        {
          title: "Logistics & Haulage Services",
          href: "/service.html#logistics-haulage",
          description: "Transportation, delivery coordination and haulage support.",
        },
      ],
    },
    {
      title: "Our Approach",
      href: "/index.html#approach",
    },
    {
      title: "Contact Us",
      href: "/contact.html",
    },
  ];

  // Sectors CROSSWAVE supports (shown instead of client logos)
  const brandList: BrandList[] = [
    { name: "Food & Beverage Businesses", icon: ShoppingBasket },
    { name: "Cosmetics & Personal Care Brands", icon: Sparkles },
    { name: "Herbal & Natural Product Businesses", icon: Flower2 },
    { name: "Fashion & Lifestyle Brands", icon: ShoppingBag },
    { name: "Media & Entertainment", icon: Clapperboard },
    { name: "Corporate Organisations", icon: Building2 },
    { name: "Entrepreneurs & SMEs", icon: Store },
    { name: "Creative Professionals", icon: Palette },
    { name: "Public and Private Sector Organisations", icon: Landmark },
  ];

  return (
    <div className="relative">
      <Header navigationData={navigationData} />
      <main>
        <HeroSection avatarList={avatarList} />
        <BrandSlider brandList={brandList} />
      </main>
    </div>
  );
}
