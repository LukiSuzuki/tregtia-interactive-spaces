import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import logoUrl from "@/assets/tregtia-logo-blue.png";
import { properties } from "@/lib/properties";

export const Route = createFileRoute("/properties")({
  head: () => ({
    meta: [
      { title: "Properties — TREGTIA" },
      { name: "description", content: "Browse all TREGTIA developments — residential, commercial, and mixed-use properties." },
      { property: "og:title", content: "Properties — TREGTIA" },
      { property: "og:description", content: "Browse all TREGTIA developments — residential, commercial, and mixed-use properties." },
    ],
  }),
  component: PropertiesCatalogue,
});

function PropertiesCatalogue() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="fixed top-0 inset-x-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-[1400px] mx-auto px-8 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={logoUrl} alt="TREGTIA" className="h-10 w-auto" />
          </Link>
          <Link to="/" className="text-[13px] tracking-wide text-foreground/70 hover:text-primary inline-flex items-center gap-2">
            <ArrowLeft className="size-3.5" /> Back to home
          </Link>
        </div>
      </header>

      {/* Header */}
      <section className="pt-32 pb-16 border-b border-border" style={{ background: "var(--gradient-hero)" }}>
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="text-[11px] uppercase tracking-[0.3em] text-primary mb-6">
            Catalogue · All Developments
          </div>
          <h1 className="font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] text-ink">
            Current &amp; <em className="text-primary">upcoming</em> properties.
          </h1>
        </div>
      </section>

      {/* Grid */}
      <section className="py-24 max-w-[1400px] mx-auto px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((p) => (
            <Link
              key={p.slug}
              to="/properties/$slug"
              params={{ slug: p.slug }}
              className="group block border border-border bg-card hover:border-primary transition"
            >
              <div className="aspect-[4/3] bg-accent relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-foreground/30 text-[10px] uppercase tracking-[0.3em]">
                  Render
                </div>
              </div>
              <div className="p-6 flex items-start justify-between gap-4">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-primary">{p.tag} · {p.year}</div>
                  <h3 className="font-display text-2xl mt-2 text-ink group-hover:text-primary transition">{p.name}</h3>
                  <p className="text-sm text-foreground/70 mt-1">{p.loc}</p>
                  <div className="text-[10px] uppercase tracking-[0.25em] text-foreground/50 mt-3">{p.status}</div>
                </div>
                <ArrowUpRight className="size-5 text-primary shrink-0 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <footer className="border-t border-border py-10 bg-accent/30">
        <div className="max-w-[1400px] mx-auto px-8 text-xs uppercase tracking-[0.25em] text-foreground/60 flex justify-between">
          <div>© {new Date().getFullYear()} TREGTIA</div>
          <Link to="/" className="hover:text-primary">Back to home</Link>
        </div>
      </footer>
    </div>
  );
}
