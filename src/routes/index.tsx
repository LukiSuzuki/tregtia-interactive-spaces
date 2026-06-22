import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import logoUrl from "@/assets/tregtia-logo-blue.png";
import walkthroughPreview from "@/assets/walkthrough-preview.png.asset.json";
import heroRender from "@/assets/hero-render.jpg.asset.json";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ArrowUpRight, Play, MapPin, Mail, Phone, Cuboid, Eye, Compass } from "lucide-react";
import { properties } from "@/lib/properties";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/scroll-reveal";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TREGTIA — Architecture & Immersive 3D Walkthroughs" },
      { name: "description", content: "TREGTIA builds landmark properties you can walk through in 3D before they exist." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Masthead />
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
    <header className="fixed top-0 inset-x-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-[1400px] mx-auto px-8 h-20 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3">
          <img src={logoUrl} alt="TREGTIA" className="h-10 w-auto" />
        </a>
        <nav className="hidden md:flex items-center gap-10 text-[13px] tracking-wide text-foreground/70">
          <a href="#properties" className="hover:text-primary transition">Properties</a>
          <a href="#walkthrough" className="hover:text-primary transition">3D Tours</a>
          <a href="#process" className="hover:text-primary transition">Process</a>
          
          <a href="#contact" className="hover:text-primary transition">Contact</a>
        </nav>
        <a href="#contact" className="text-[13px] px-5 py-2.5 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition flex items-center gap-1.5">
          Book a viewing <ArrowUpRight className="size-3.5" />
        </a>
      </div>
    </header>
  );
}

function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section id="top" ref={heroRef} className="relative pt-32 pb-16 border-b border-border" style={{ background: "var(--gradient-hero)" }}>
      <div className="max-w-[1400px] mx-auto px-8">
        <ScrollReveal>
          <div className="flex items-center gap-4 text-[11px] uppercase tracking-[0.3em] text-primary mb-10">
            <span className="h-px w-10 bg-primary" />
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <ScrollReveal delay={0.1}>
              <h1 className="font-display text-[clamp(3rem,9vw,8rem)] leading-[0.92] text-ink">
                Architecture<br />
                <em className="text-primary font-normal">re&shy;imagined</em>{" "}
                before the first stone.
              </h1>
            </ScrollReveal>
          </div>
          <div className="lg:col-span-4">
            <ScrollReveal delay={0.2}>
              <p className="text-lg text-foreground/75 leading-relaxed border-l-2 border-primary pl-5">
                TREGTIA designs landmark residences and commercial buildings —
                and lets you walk through every floor in immersive 3D long before
                construction is complete.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#properties" className="px-6 py-3 bg-primary text-primary-foreground hover:bg-ink transition flex items-center gap-2 text-sm">
                  Explore properties <ArrowUpRight className="size-4" />
                </a>
                <a href="#walkthrough" className="px-6 py-3 border border-border hover:border-primary hover:text-primary transition flex items-center gap-2 text-sm">
                  <Play className="size-3.5" /> Watch 3D demo
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>

        <ScrollReveal delay={0.3}>
          <div className="mt-20 aspect-[21/9] relative overflow-hidden border border-border bg-accent">
            <motion.img
              src={heroRender.url}
              alt="Kodrina residential complex aerial render"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ y: heroY }}
            />
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end text-xs uppercase tracking-[0.25em] text-background drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
              <span className="bg-black/50 px-3 py-1.5 backdrop-blur-sm">Kodrina · Downtown</span>
              <span className="bg-black/50 px-3 py-1.5 backdrop-blur-sm">2026</span>
            </div>
          </div>
        </ScrollReveal>

        <StaggerContainer className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-10 border-t border-border pt-10">
          {[
            ["120+", "Projects delivered"],
            ["18", "Cities"],
            ["1.4M m²", "Built area"],
            ["100%", "3D-previewed"],
          ].map(([n, l]) => (
            <StaggerItem key={l}>
              <div className="font-display text-4xl text-ink">{n}</div>
              <div className="text-xs uppercase tracking-[0.2em] text-foreground/60 mt-2">{l}</div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

function Masthead() {
  const items = ["Residential", "Mixed-Use", "Hospitality", "Commercial", "Master Planning", "Adaptive Reuse"];
  return (
    <div className="border-b border-border py-5 overflow-hidden bg-background">
      <div className="flex gap-12 animate-[scroll_40s_linear_infinite] whitespace-nowrap text-foreground/50">
        {[...items, ...items, ...items].map((t, i) => (
          <span key={i} className="text-[11px] uppercase tracking-[0.4em] flex items-center gap-12 font-display italic">
            {t} <span className="h-px w-8 bg-border" />
          </span>
        ))}
      </div>
      <style>{`@keyframes scroll { to { transform: translateX(-33.33%); } }`}</style>
    </div>
  );
}

function Featured() {
  const lead = properties[0];
  const others = properties.slice(1, 3);

  return (
    <section id="properties" className="py-28 max-w-[1400px] mx-auto px-8">
      <div className="grid lg:grid-cols-12 gap-8 items-end mb-14 border-b border-border pb-10">
        <ScrollReveal className="lg:col-span-8">
          <div className="text-[11px] uppercase tracking-[0.3em] text-primary mb-5">Featured · Nº 01</div>
          <h2 className="font-display text-5xl md:text-7xl text-balance text-ink">
            Current &amp; <em className="text-primary">upcoming</em> developments.
          </h2>
        </ScrollReveal>
        <ScrollReveal className="lg:col-span-4 lg:text-right" delay={0.15}>
          <Link to="/properties" className="text-sm text-foreground/70 hover:text-primary inline-flex items-center gap-1.5 border-b border-border pb-1">
            View the full catalogue <ArrowUpRight className="size-3.5" />
          </Link>
        </ScrollReveal>
      </div>

      {/* Magazine grid: 1 lead + 3 side */}
      <div className="grid lg:grid-cols-12 gap-8">
        <ScrollReveal className="lg:col-span-7">
          <Link
            to="/properties/$slug"
            params={{ slug: lead.slug }}
            className="group cursor-pointer block"
          >
            <div className="aspect-[5/4] relative overflow-hidden bg-accent border border-border">
              {lead.image ? (
                <img src={lead.image} alt={lead.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-foreground/40 text-xs uppercase tracking-[0.3em]">
                  Lead render
                </div>
              )}
              <div className="absolute top-5 left-5 px-3 py-1 text-[10px] uppercase tracking-[0.25em] bg-background/90 backdrop-blur border border-border">
                {lead.status}
              </div>
            </div>
            <div className="mt-6 flex items-start justify-between gap-6">
              <div>
                <div className="text-[11px] uppercase tracking-[0.3em] text-primary">{lead.tag} · {lead.year}</div>
                <h3 className="font-display text-4xl md:text-5xl mt-3 text-ink group-hover:text-primary transition">{lead.name}</h3>
                <p className="text-foreground/70 mt-2">{lead.loc}</p>
              </div>
              <ArrowUpRight className="size-6 mt-3 text-primary shrink-0 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>
          </Link>
        </ScrollReveal>

        <StaggerContainer className="lg:col-span-5 space-y-8" staggerDelay={0.15}>
          {others.map((p) => (
            <StaggerItem key={p.slug}>
              <Link
                to="/properties/$slug"
                params={{ slug: p.slug }}
                className="group grid grid-cols-5 gap-5 cursor-pointer border-b border-border pb-8 last:border-0"
              >
                <div className="col-span-2 aspect-[4/5] bg-accent border border-border relative overflow-hidden">
                  {p.image ? (
                    <img src={p.image} alt={p.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-foreground/30 text-[10px] uppercase tracking-widest">
                      Render
                    </div>
                  )}
                </div>
                <div className="col-span-3 flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.3em] text-primary">{p.tag} · {p.year}</div>
                    <h4 className="font-display text-2xl mt-2 text-ink group-hover:text-primary transition">{p.name}</h4>
                    <p className="text-sm text-foreground/70 mt-1">{p.loc}</p>
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.25em] text-foreground/50 mt-3">{p.status}</div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}


function Walkthrough() {
  const [open, setOpen] = useState(false);
  const walkRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: walkRef,
    offset: ["start end", "end start"],
  });
  const walkImgY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section id="walkthrough" ref={walkRef} className="py-28 border-y border-border bg-accent/40">
      <div className="max-w-[1400px] mx-auto px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <ScrollReveal>
              <div className="text-[11px] uppercase tracking-[0.3em] text-primary mb-5">Feature · 3D Walkthroughs</div>
              <h2 className="font-display text-5xl md:text-6xl text-balance text-ink">
                Step inside, <em className="text-primary">even when</em> the walls aren't up yet.
              </h2>
              <p className="mt-6 text-foreground/75 max-w-md leading-relaxed">
                Every TREGTIA property includes a fully navigable 3D model. Walk the halls,
                ride the lift, stand on the balcony — and choose with absolute clarity.
              </p>
            </ScrollReveal>
            <StaggerContainer className="mt-10 space-y-6" staggerDelay={0.12}>
              {([
                [Eye, "Photoreal renders", "Interior and exterior in cinematic detail."],
                [Cuboid, "Full 3D navigation", "Move freely through every floor."],
                [Compass, "Real orientation", "Sun studies and views from your actual unit."],
              ] as const).map(([Icon, t, d]) => (
                <StaggerItem key={t}>
                  <div className="flex gap-4 border-t border-border pt-5">
                    <Icon className="size-5 text-primary shrink-0 mt-1" />
                    <div>
                      <div className="font-display text-xl text-ink">{t}</div>
                      <div className="text-sm text-foreground/70 mt-1">{d}</div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
          <ScrollReveal className="lg:col-span-7" delay={0.2} direction="right">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="group relative aspect-[4/3] w-full bg-card border border-border overflow-hidden text-left"
              style={{ boxShadow: "var(--shadow-elegant)" }}
            >
              <motion.img
                src={walkthroughPreview.url}
                alt="360° panorama preview"
                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition"
                style={{ y: walkImgY }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div className="size-20 rounded-full bg-background/90 border border-primary text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition">
                  <Play className="size-7 ml-1" />
                </div>
                <div className="text-xs text-background uppercase tracking-[0.3em] drop-shadow">Launch 360° walkthrough</div>
              </div>
              <div className="absolute top-5 left-5 right-5 flex justify-between text-[10px] uppercase tracking-[0.3em] text-background/90">
                <span>Kodrina · Floor 12</span>
                <span>Interactive 360°</span>
              </div>
            </button>
          </ScrollReveal>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[95vw] w-[95vw] h-[92vh] p-0 overflow-hidden sm:rounded-lg">
          <DialogTitle className="sr-only">360° Walkthrough</DialogTitle>
          {open && (
            <iframe
              src="/panorama/index.html"
              title="360° Walkthrough"
              className="w-full h-full border-0"
              allow="fullscreen; accelerometer; gyroscope"
            />
          )}
        </DialogContent>
      </Dialog>
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
    <section id="process" className="py-28 max-w-[1400px] mx-auto px-8">
      <div className="max-w-3xl mb-16">
        <div className="text-[11px] uppercase tracking-[0.3em] text-primary mb-5">The Method</div>
        <h2 className="font-display text-5xl md:text-7xl text-balance text-ink">
          From sketch <em className="text-primary">to skyline.</em>
        </h2>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 border-t border-border">
        {steps.map(([n, t, d], i) => (
          <div key={n} className={`p-8 border-b border-border ${i < 3 ? "lg:border-r" : ""} hover:bg-accent/50 transition`}>
            <div className="font-display italic text-primary text-2xl">{n}</div>
            <div className="font-display text-3xl mt-10 text-ink">{t}</div>
            <p className="text-sm text-foreground/70 mt-3 leading-relaxed">{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}


function Contact() {
  return (
    <section id="contact" className="py-28">
      <div className="max-w-[1400px] mx-auto px-8 grid lg:grid-cols-12 gap-16">
        <div className="lg:col-span-5">
          <div className="text-[11px] uppercase tracking-[0.3em] text-primary mb-5">Correspondence</div>
          <h2 className="font-display text-5xl md:text-6xl text-balance text-ink">
            Let's design <em className="text-primary">what's next.</em>
          </h2>
          <p className="mt-6 text-foreground/75 max-w-md leading-relaxed">
            Tell us about your vision, schedule a private viewing, or inquire
            about any property in our catalogue.
          </p>
          <div className="mt-10 space-y-4 text-sm border-t border-border pt-8">
            <div className="flex items-center gap-3"><Mail className="size-4 text-primary" /> hello@tregtia.com</div>
            <div className="flex items-center gap-3"><Phone className="size-4 text-primary" /> +1 (555) 010-0420</div>
            <div className="flex items-center gap-3"><MapPin className="size-4 text-primary" /> Studio HQ — to be added</div>
          </div>
        </div>
        <form className="lg:col-span-7 bg-card border border-border p-10 space-y-6">
          {[
            ["Full name", "text", "Jane Doe"],
            ["Email", "email", "jane@company.com"],
            ["Project of interest", "text", "Kodrina"],
          ].map(([l, t, p]) => (
            <div key={l}>
              <label className="text-[10px] uppercase tracking-[0.3em] text-foreground/60">{l}</label>
              <input type={t} placeholder={p} className="mt-2 w-full bg-transparent border-b border-border py-3 outline-none focus:border-primary transition" />
            </div>
          ))}
          <div>
            <label className="text-[10px] uppercase tracking-[0.3em] text-foreground/60">Message</label>
            <textarea rows={3} placeholder="Tell us more…" className="mt-2 w-full bg-transparent border-b border-border py-3 outline-none focus:border-primary transition resize-none" />
          </div>
          <button type="button" className="w-full px-6 py-4 bg-primary text-primary-foreground hover:bg-ink transition flex items-center justify-center gap-2 text-sm uppercase tracking-[0.2em]">
            Request information <ArrowUpRight className="size-4" />
          </button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-14 bg-accent/30">
      <div className="max-w-[1400px] mx-auto px-8">
        <div className="grid md:grid-cols-3 gap-10 items-start pb-10 border-b border-border">
          <img src={logoUrl} alt="TREGTIA" className="h-10 w-auto" />
          <p className="font-display italic text-xl text-ink max-w-sm">
            "We design buildings you can step inside long before the first stone."
          </p>
          <div className="flex md:justify-end gap-8 text-sm text-foreground/70">
            <a href="#" className="hover:text-primary">Instagram</a>
            <a href="#" className="hover:text-primary">LinkedIn</a>
            <a href="#" className="hover:text-primary">Press</a>
          </div>
        </div>
        <div className="pt-6 flex flex-wrap items-center justify-between gap-4 text-xs uppercase tracking-[0.25em] text-foreground/60">
          <div>© {new Date().getFullYear()} TREGTIA · All rights reserved</div>
          <div>Issue Nº 01 · 2026</div>
        </div>
      </div>
    </footer>
  );
}
