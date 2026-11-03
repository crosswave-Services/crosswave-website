import * as React from "react";
import { ArrowRight, Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export type NavigationLink = {
  title: string;
  href: string;
  description?: string;
  /** Short badge, e.g. "Core" for the principal divisions */
  tag?: string;
};

export type NavigationSection = {
  title: string;
  href: string;
  isActive?: boolean;
  /** Optional dropdown items (rendered as a mega-menu on desktop) */
  children?: NavigationLink[];
};

export type HeaderProps = {
  navigationData: NavigationSection[];
  logo?: { src: string; alt: string; href: string };
  cta?: { label: string; href: string };
};

const defaultLogo = { src: "/crosswave-logo.png", alt: "CROSSWAVE logo", href: "/" };
const defaultCta = { label: "Request a Consultation", href: "/booking.html" };

export default function Header({ navigationData, logo = defaultLogo, cta = defaultCta }: HeaderProps) {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b border-transparent bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 transition-shadow",
        scrolled && "border-border shadow-sm",
      )}
    >
      <div className="container flex h-[72px] items-center justify-between gap-6 lg:h-20">
        <a href={logo.href} className="shrink-0" aria-label="CROSSWAVE Integrated Services Limited — Home">
          <img src={logo.src} alt={logo.alt} width={640} height={108} className="h-7 w-auto lg:h-8" />
        </a>

        {/* Desktop navigation */}
        <NavigationMenu className="hidden lg:flex" aria-label="Main navigation">
          <NavigationMenuList>
            {navigationData.map((item) =>
              item.children?.length ? (
                <NavigationMenuItem key={item.title}>
                  <NavigationMenuTrigger className="font-heading font-bold text-foreground">
                    {item.title}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[560px] grid-cols-2 gap-1 p-3">
                      {item.children.map((child) => (
                        <li key={child.title}>
                          <NavigationMenuLink asChild>
                            <a
                              href={child.href}
                              className="block select-none rounded-md p-3 leading-snug no-underline outline-none transition-colors hover:bg-accent focus:bg-accent"
                            >
                              <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
                                {child.title}
                                {child.tag && (
                                  <span className="rounded-full bg-brand-wave/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-wave">
                                    {child.tag}
                                  </span>
                                )}
                              </span>
                              {child.description && (
                                <span className="mt-1 line-clamp-2 block text-xs leading-relaxed text-muted-foreground">
                                  {child.description}
                                </span>
                              )}
                            </a>
                          </NavigationMenuLink>
                        </li>
                      ))}
                      <li className="col-span-2 border-t pt-2">
                        <NavigationMenuLink asChild>
                          <a href={item.href} className="flex items-center gap-2 rounded-md p-3 text-sm font-semibold text-primary hover:bg-accent">
                            View all services <ArrowRight className="h-4 w-4" aria-hidden="true" />
                          </a>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem key={item.title}>
                  <NavigationMenuLink
                    href={item.href}
                    active={item.isActive}
                    aria-current={item.isActive ? "page" : undefined}
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "font-heading font-bold text-foreground",
                      item.isActive && "text-primary",
                    )}
                  >
                    {item.title}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ),
            )}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2">
          <Button asChild className="hidden rounded-full px-6 font-heading font-bold uppercase tracking-wider text-xs lg:inline-flex">
            <a href={cta.href}>{cta.label}</a>
          </Button>

          {/* Mobile navigation */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex w-[88%] flex-col gap-0 overflow-y-auto p-0 sm:max-w-sm">
              <SheetHeader className="border-b p-5 text-left">
                <SheetTitle>
                  <img src={logo.src} alt={logo.alt} width={640} height={108} className="h-6 w-auto" />
                </SheetTitle>
                <SheetDescription>Connecting Businesses. Building Brands. Creating Opportunities.</SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col p-3" aria-label="Mobile navigation">
                {navigationData.map((item) => (
                  <div key={item.title} className="border-b last:border-b-0">
                    <SheetClose asChild>
                      <a
                        href={item.href}
                        aria-current={item.isActive ? "page" : undefined}
                        className={cn(
                          "block px-2 py-3 font-heading font-bold text-foreground",
                          item.isActive && "text-primary",
                        )}
                      >
                        {item.title}
                      </a>
                    </SheetClose>
                    {item.children?.length ? (
                      <ul className="mb-3 rounded-lg bg-muted p-1">
                        {item.children.map((child) => (
                          <li key={child.title}>
                            <SheetClose asChild>
                              <a href={child.href} className="flex items-center justify-between gap-2 rounded-md px-3 py-2 text-sm text-foreground hover:bg-accent">
                                {child.title}
                                {child.tag && (
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-wave">{child.tag}</span>
                                )}
                              </a>
                            </SheetClose>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ))}
              </nav>
              <div className="mt-auto border-t p-5">
                <Button asChild className="w-full rounded-full font-heading font-bold uppercase tracking-wider text-xs">
                  <a href={cta.href}>{cta.label}</a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
