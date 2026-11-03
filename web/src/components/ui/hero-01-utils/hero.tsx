import * as React from "react";
import { ArrowRight, CircleCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type AvatarList = {
  image: string;
  /** Describes the image; also shown as a tooltip */
  alt?: string;
};

export type HeroSectionProps = {
  avatarList: AvatarList[];
  /** Where the quick-start form sends visitors (the consultation page) */
  enquiryHref?: string;
};

const values = ["Strategic Business Support", "Integrated Professional Services", "Client-Focused Solutions"];

const coreDivisions = [
  { title: "NAFDAC & Regulatory Consultation", href: "/service.html#nafdac-regulatory" },
  { title: "PR, Media & Communication", href: "/service.html#pr-media-communication" },
  { title: "Fashion, Modeling & Talent Management", href: "/service.html#fashion-modeling-talent" },
];

const heroImage =
  "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1100&h=1300&q=75";

export default function HeroSection({ avatarList, enquiryHref = "/booking.html" }: HeroSectionProps) {
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState("");

  // The hero form does not send anything itself: it hands the email over to
  // the full consultation form, where the visitor completes and submits it.
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem("hero-email") as HTMLInputElement;
    if (!input.checkValidity()) {
      setError("Please enter a valid email address.");
      input.focus();
      return;
    }
    setError("");
    window.location.href = `${enquiryHref}?email=${encodeURIComponent(email.trim())}`;
  };

  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden bg-background">
      {/* subtle wave lines in brand colours */}
      <svg
        className="pointer-events-none absolute -right-40 top-10 hidden w-[900px] opacity-40 lg:block"
        viewBox="0 0 800 400"
        fill="none"
        aria-hidden="true"
      >
        <path d="M0 260 C 160 180, 320 340, 480 250 S 720 160, 800 210" stroke="#00A3E0" strokeWidth="2" />
        <path d="M0 290 C 160 210, 320 370, 480 280 S 720 190, 800 240" stroke="#00A3E0" strokeWidth="1.5" opacity=".6" />
        <path d="M0 320 C 160 240, 320 400, 480 310 S 720 220, 800 270" stroke="#0750A5" strokeWidth="1" opacity=".4" />
      </svg>

      <div className="container relative grid items-center gap-12 py-14 lg:grid-cols-12 lg:gap-10 lg:py-24">
        {/* Copy */}
        <div className="min-w-0 lg:col-span-7">
          <p className="mb-5 inline-flex items-center gap-3 font-heading text-xs font-extrabold uppercase tracking-[0.2em] text-primary">
            <span className="h-0.5 w-7 rounded bg-brand-wave" aria-hidden="true" />
            Integrated Services. Strategic Solutions.
          </p>

          <h1 id="hero-heading" className="text-balance font-heading text-4xl font-extrabold leading-[1.08] text-foreground sm:text-5xl lg:text-6xl">
            Connecting Businesses. <span className="text-brand-wave">Building Brands.</span> Creating Opportunities.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            CROSSWAVE INTEGRATED SERVICES LIMITED delivers integrated business solutions across regulatory
            consultation, public relations, media, digital marketing, talent management, project consultancy and
            logistics. We combine strategic thinking, professional coordination and practical expertise to help
            businesses, organisations and individuals move forward with confidence.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="rounded-full font-heading text-xs font-bold uppercase tracking-wider">
              <a href="/service.html">
                Explore Our Services <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-primary font-heading text-xs font-bold uppercase tracking-wider text-primary">
              <a href="/contact.html">Talk to Our Team</a>
            </Button>
          </div>

          {/* Quick start: hands over to the consultation form */}
          <form onSubmit={onSubmit} noValidate className="mt-10 max-w-xl rounded-xl border bg-card p-4 shadow-sm">
            <Label htmlFor="hero-email" className="font-heading font-bold text-foreground">
              Start a consultation request
            </Label>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              <Input
                id="hero-email"
                name="hero-email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={error ? true : undefined}
                aria-describedby="hero-email-help"
                className="h-11"
              />
              <Button type="submit" size="lg" className="h-11 shrink-0 font-heading text-xs font-bold uppercase tracking-wider">
                Continue
              </Button>
            </div>
            <p id="hero-email-help" className={error ? "mt-2 text-xs text-destructive" : "mt-2 text-xs text-muted-foreground"} role={error ? "alert" : undefined}>
              {error || "You'll complete the rest of your details on the next page. Nothing is sent until you submit that form."}
            </p>
          </form>

          {/* Divisions (service imagery, not people or clients) */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="flex -space-x-3">
              {avatarList.map((avatar, i) => (
                <img
                  key={avatar.image}
                  src={avatar.image}
                  alt={avatar.alt ?? ""}
                  title={avatar.alt}
                  width={44}
                  height={44}
                  loading="lazy"
                  className="h-11 w-11 rounded-full border-2 border-background bg-gradient-to-br from-brand-blue to-brand-wave object-cover shadow-sm"
                  style={{ zIndex: avatarList.length - i }}
                  onError={(e) => {
                    // fall back to the local CROSSWAVE wave emblem
                    if (!e.currentTarget.src.endsWith("/favicon.png")) e.currentTarget.src = "/favicon.png";
                  }}
                />
              ))}
            </div>
            <p className="max-w-xs text-sm leading-snug text-muted-foreground">
              <span className="font-semibold text-foreground">Six integrated service divisions</span>, one strategic partner.
            </p>
          </div>

          <ul className="mt-8 flex flex-col gap-3 border-t pt-6 sm:flex-row sm:flex-wrap sm:gap-x-8">
            {values.map((v) => (
              <li key={v} className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <CircleCheck className="h-5 w-5 text-brand-wave" aria-hidden="true" />
                {v}
              </li>
            ))}
          </ul>
        </div>

        {/* Visual */}
        <div className="relative min-w-0 lg:col-span-5">
          <div className="relative aspect-[4/4.6] w-full overflow-hidden rounded-3xl bg-gradient-to-br from-brand-blue to-brand-navy shadow-2xl">
            <img
              src={heroImage}
              alt="Business professionals collaborating during a strategy session"
              className="h-full w-full object-cover"
              loading="eager"
              onError={(e) => {
                e.currentTarget.style.visibility = "hidden";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/70 via-transparent to-transparent" aria-hidden="true" />
          </div>

          <div className="relative -mt-24 ml-auto mr-2 w-[88%] rounded-2xl border bg-card p-5 shadow-xl sm:mr-6 lg:-ml-10 lg:mr-0 lg:w-[90%]">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-brand-wave">Our principal divisions</p>
            <ul className="mt-3 divide-y">
              {coreDivisions.map((d) => (
                <li key={d.title}>
                  <a href={d.href} className="group flex items-center justify-between gap-3 py-2.5 text-sm font-semibold text-foreground hover:text-primary">
                    {d.title}
                    <ArrowRight className="h-4 w-4 shrink-0 opacity-40 transition group-hover:translate-x-0.5 group-hover:opacity-100" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
