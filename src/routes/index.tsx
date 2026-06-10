import { createFileRoute } from "@tanstack/react-router";
import logoUrl from "@/assets/tregtia-logo-blue.png";
import { ArrowUpRight, Box, Compass, Eye, Play, MapPin, Mail, Phone } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TREGTIA — Architecture, Reimagined" },
      { name: "description", content: "Landmark buildings, explored in immersive 3D before they're built." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Marquee />
      <Featured />
      <Walkthrough />
      <Process />
      <Contact />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/60 border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2">
          <img
            src={logoUrl}
            alt="TREGTIA"
            className="h-9 w-auto drop-shadow-[0_0_18px_rgba(96,165,250,0.55)]"
          />
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#properties" className="hover:text-foreground transition">Properties</a>
          <a href="#walkthrough" className="hover:text-foreground transition">3D Tours</a>
          <a href="#process" className="hover:text-foreground transition">Process</a>
          <a href="#contact" className="hover:text-foreground transition">Contact</a>
        </nav>
        <a href="#contact" className="text-sm px-4 py-2 rounded-full bg-foreground text-background hover:opacity-90 transition flex items-center gap-1.5">
          Book a viewing <ArrowUpRight className="size-3.5" />
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative pt-32 pb-24 overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground mb-8">
          <span className="size-1.5 rounded-full bg-brand animate-pulse" />
          New developments · 2026 collection
        </div>
        <h1 className="text-balance font-display text-[clamp(2.75rem,8vw,7rem)] leading-[0.95] font-medium max-w-5xl">
          Buildings you can walk through{" "}
          <span className="italic text-muted-foreground">before</span> they exist.
        </h1>
        <p className="mt-8 max-w-xl text-lg text-muted-foreground">
          TREGTIA designs and delivers landmark residences and commercial spaces.
          Step inside every floor with immersive 3D walkthroughs — no hard hat required.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a href="#properties" className="px-6 py-3 rounded-full bg-foreground text-background font-medium hover:opacity-90 transition flex items-center gap-2">
            Explore properties <ArrowUpRight className="size-4" />
          </a>
          <a href="#walkthrough" className="px-6 py-3 rounded-full border border-border hover:bg-accent transition flex items-center gap-2">
            <Play className="size-4" /> Watch 3D demo
          </a>
        </div>

        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl">
          {[
            ["120+", "Projects delivered"],
            ["18", "Cities"],
            ["1.4M m²", "Built area"],
            ["100%", "3D-previewed"],
          ].map(([n, l]) => (
            <div key={l}>
              <div className="font-display text-3xl">{n}</div>
              <div className="text-sm text-muted-foreground mt-1">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = ["Residential Towers", "Mixed-Use", "Hospitality", "Commercial", "Master Planning", "Adaptive Reuse"];
  return (
    <div className="border-y border-border py-6 overflow-hidden">
      <div className="flex gap-12 animate-[scroll_30s_linear_infinite] whitespace-nowrap text-muted-foreground">
        {[...items, ...items, ...items].map((t, i) => (
          <span key={i} className="text-sm uppercase tracking-[0.3em] flex items-center gap-12">
            {t} <span className="size-1 rounded-full bg-border" />
          </span>
        ))}
      </div>
      <style>{`@keyframes scroll { to { transform: translateX(-33.33%); } }`}</style>
    </div>
  );
}

function Featured() {
  const properties = [
    { name: "The Meridian", loc: "Downtown · 42 floors", status: "Under construction", tag: "Residential" },
    { name: "Aurora Place", loc: "Harbor District · 28 floors", status: "Pre-sale", tag: "Mixed-Use" },
    { name: "Sole Tower", loc: "Hillside · 16 floors", status: "Completed", tag: "Commercial" },
  ];
  return (
    <section id="properties" className="py-32 max-w-7xl mx-auto px-6">
      <div className="flex items-end justify-between flex-wrap gap-6 mb-16">
        <div>
          <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">Featured properties</div>
          <h2 className="font-display text-5xl md:text-6xl max-w-2xl text-balance">Current and upcoming developments.</h2>
        </div>
        <a href="#" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1.5">
          View all <ArrowUpRight className="size-3.5" />
        </a>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {properties.map((p) => (
          <article key={p.name} className="group rounded-lg overflow-hidden bg-card border border-border hover:border-foreground/30 transition">
            <div className="aspect-[4/5] relative bg-secondary overflow-hidden">
              <div className="absolute inset-0 bg-grid opacity-40" />
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-xs uppercase tracking-widest">
                Render placeholder
              </div>
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs bg-background/70 backdrop-blur border border-border">
                {p.status}
              </div>
              <div className="absolute bottom-4 right-4 size-10 rounded-full bg-foreground text-background flex items-center justify-center group-hover:scale-110 transition">
                <ArrowUpRight className="size-4" />
              </div>
            </div>
            <div className="p-6">
              <div className="text-xs text-muted-foreground uppercase tracking-widest">{p.tag}</div>
              <h3 className="font-display text-2xl mt-2">{p.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{p.loc}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Walkthrough() {
  return (
    <section id="walkthrough" className="py-32 border-t border-border" style={{ background: "var(--gradient-hero)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">3D Walkthroughs</div>
            <h2 className="font-display text-5xl md:text-6xl text-balance">Step inside, even when the walls aren't up yet.</h2>
            <p className="mt-6 text-lg text-muted-foreground max-w-lg">
              Every TREGTIA property includes a fully navigable 3D model. Walk the halls, ride the lift,
              stand on the balcony — and choose your home with absolute clarity.
            </p>
            <div className="mt-10 space-y-5">
              {([
                [Eye, "Photoreal renders", "Interior and exterior in cinematic detail."],
                [Box, "Full 3D navigation", "WASD or touch — explore every floor freely."],
                [Compass, "Real orientation", "Sun studies and views from your actual unit."],
              ] as const).map(([Icon, t, d]) => (
                <div key={t} className="flex gap-4">
                  <div className="size-10 shrink-0 rounded-md bg-card border border-border flex items-center justify-center">
                    <Icon className="size-4" />
                  </div>
                  <div>
                    <div className="font-medium">{t}</div>
                    <div className="text-sm text-muted-foreground">{d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-square rounded-2xl border border-border bg-card overflow-hidden" style={{ boxShadow: "var(--shadow-elegant)" }}>
            <div className="absolute inset-0 bg-grid opacity-50" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <div className="size-20 rounded-full bg-foreground/10 backdrop-blur border border-border flex items-center justify-center">
                <Play className="size-8 ml-1" />
              </div>
              <div className="text-sm text-muted-foreground uppercase tracking-widest">3D model embed</div>
            </div>
            <div className="absolute top-4 left-4 flex gap-1.5">
              <span className="size-2 rounded-full bg-destructive/70" />
              <span className="size-2 rounded-full bg-muted-foreground/40" />
              <span className="size-2 rounded-full bg-muted-foreground/40" />
            </div>
            <div className="absolute bottom-4 inset-x-4 flex justify-between text-xs text-muted-foreground">
              <span>The Meridian · Floor 12</span>
              <span>Interactive</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    ["01", "Concept", "Site studies, massing and architectural intent."],
    ["02", "Design", "Detailed plans paired with cinematic renders."],
    ["03", "3D Preview", "Clients explore the building before ground breaks."],
    ["04", "Delivery", "On-time handover with full documentation."],
  ];
  return (
    <section id="process" className="py-32 max-w-7xl mx-auto px-6">
      <div className="max-w-2xl mb-16">
        <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">How we build</div>
        <h2 className="font-display text-5xl md:text-6xl text-balance">From sketch to skyline.</h2>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-lg overflow-hidden">
        {steps.map(([n, t, d]) => (
          <div key={n} className="bg-background p-8 hover:bg-card transition">
            <div className="font-display text-muted-foreground text-sm">{n}</div>
            <div className="font-display text-2xl mt-8">{t}</div>
            <p className="text-sm text-muted-foreground mt-3">{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-32 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">
        <div>
          <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">Get in touch</div>
          <h2 className="font-display text-5xl md:text-6xl text-balance">Let's design what's next.</h2>
          <p className="mt-6 text-muted-foreground max-w-md">
            Tell us about your project, schedule a private viewing, or request a 3D walkthrough of any property.
          </p>
          <div className="mt-10 space-y-4 text-sm">
            <div className="flex items-center gap-3"><Mail className="size-4 text-muted-foreground" /> hello@tregtia.com</div>
            <div className="flex items-center gap-3"><Phone className="size-4 text-muted-foreground" /> +1 (555) 010-0420</div>
            <div className="flex items-center gap-3"><MapPin className="size-4 text-muted-foreground" /> Studio HQ — to be added</div>
          </div>
        </div>
        <form className="bg-card border border-border rounded-lg p-8 space-y-5">
          {[
            ["Full name", "text", "Jane Doe"],
            ["Email", "email", "jane@company.com"],
            ["Project of interest", "text", "The Meridian"],
          ].map(([l, t, p]) => (
            <div key={l}>
              <label className="text-xs uppercase tracking-widest text-muted-foreground">{l}</label>
              <input type={t} placeholder={p} className="mt-2 w-full bg-transparent border-b border-border py-2 outline-none focus:border-foreground transition" />
            </div>
          ))}
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground">Message</label>
            <textarea rows={3} placeholder="Tell us more…" className="mt-2 w-full bg-transparent border-b border-border py-2 outline-none focus:border-foreground transition resize-none" />
          </div>
          <button type="button" className="w-full px-6 py-3 rounded-full bg-foreground text-background font-medium hover:opacity-90 transition flex items-center justify-center gap-2">
            Request information <ArrowUpRight className="size-4" />
          </button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-between gap-6">
        <div className="relative">
          <img
            src={logoUrl}
            alt="TREGTIA"
            className="h-7 w-auto drop-shadow-[0_0_14px_rgba(96,165,250,0.5)]"
          />
        </div>
        <div className="text-sm text-muted-foreground">© {new Date().getFullYear()} TREGTIA. All rights reserved.</div>
        <div className="flex gap-6 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground">Instagram</a>
          <a href="#" className="hover:text-foreground">LinkedIn</a>
          <a href="#" className="hover:text-foreground">Press</a>
        </div>
      </div>
    </footer>
  );
}
