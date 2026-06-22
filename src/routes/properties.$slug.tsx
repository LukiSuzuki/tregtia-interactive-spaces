import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowUpRight, ArrowLeft, MapPin } from "lucide-react";
import logoUrl from "@/assets/tregtia-logo-blue.png";
import { getProperty, properties, type Property, type Apartment } from "@/lib/properties";


export const Route = createFileRoute("/properties/$slug")({
  head: ({ params }) => {
    const p = getProperty(params.slug);
    const title = p ? `${p.name} — TREGTIA` : "Property — TREGTIA";
    const description = p?.description ?? "TREGTIA property details.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  loader: ({ params }) => {
    const property = getProperty(params.slug);
    if (!property) throw notFound();
    return { property };
  },
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="text-center">
        <h1 className="font-display text-4xl text-ink mb-4">Property not found</h1>
        <Link to="/" className="text-primary underline">Back to home</Link>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-8">
      <div className="text-center">
        <h1 className="font-display text-3xl text-ink mb-3">Something went wrong</h1>
        <p className="text-foreground/70">{error.message}</p>
      </div>
    </div>
  ),
  component: PropertyPage,
});

function PropertyPage() {
  const { property } = Route.useLoaderData() as { property: Property };


  
  

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

      {/* Hero */}
      <section className="pt-32 pb-16 border-b border-border" style={{ background: "var(--gradient-hero)" }}>
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="text-[11px] uppercase tracking-[0.3em] text-primary mb-6">
            {property.tag} · {property.year} · {property.status}
          </div>
          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <h1 className="font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] text-ink">
                {property.name}
              </h1>
              <div className="mt-6 flex items-center gap-2 text-foreground/70">
                <MapPin className="size-4 text-primary" /> {property.loc}
              </div>
            </div>
            <div className="lg:col-span-4">
              <p className="text-lg text-foreground/75 leading-relaxed border-l-2 border-primary pl-5">
                {property.description}
              </p>
            </div>
          </div>

          {/* Cover + thumbnails */}
          <div className="mt-16">
            <div className="aspect-[21/9] relative overflow-hidden border border-border bg-accent">
              <div className="absolute inset-0 flex items-center justify-center text-foreground/40 text-xs uppercase tracking-[0.3em]">
                Cover render — add image
              </div>
            </div>
            <div className="mt-4 grid grid-cols-5 gap-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className="aspect-[4/3] relative overflow-hidden border border-border bg-accent hover:border-primary transition"
                >
                  <div className="absolute inset-0 flex items-center justify-center text-foreground/40 text-[10px] uppercase tracking-[0.3em]">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* Details */}
      <section className="py-24 max-w-[1400px] mx-auto px-8">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <div className="text-[11px] uppercase tracking-[0.3em] text-primary mb-5">Project Details</div>
            <h2 className="font-display text-4xl md:text-5xl text-ink">
              Building <em className="text-primary">specifications</em>.
            </h2>
          </div>
          <dl className="lg:col-span-8 border-t border-border">
            {[
              ["Project Name", property.projectName],
              ["Lokacion", property.lokacion],
              ["Investor", property.investor],
              ["Object Destination", property.objectDestination],
              ["Floors", property.floors],
              ["Status", property.status],
              ["Year", property.year],
            ].map(([label, value]) => (
              <div key={label} className="grid grid-cols-3 gap-6 py-5 border-b border-border">
                <dt className="text-[11px] uppercase tracking-[0.25em] text-foreground/60">{label}</dt>
                <dd className="col-span-2 text-ink font-display text-xl">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>




      {/* Interior gallery */}
      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="flex items-end justify-between mb-10 border-b border-border pb-6">
            <div>
              <div className="text-[11px] uppercase tracking-[0.3em] text-primary mb-3">Catalogue · Apartments</div>
              <h2 className="font-display text-4xl md:text-5xl text-ink">Inside the apartments.</h2>
            </div>
            <span className="text-xs uppercase tracking-[0.25em] text-foreground/50">{property.apartments.length} residences</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {property.apartments.map((apt: Apartment) => (
              <Link
                key={apt.id}
                to="/properties/$slug/apartments/$apartmentId"
                params={{ slug: property.slug, apartmentId: apt.id }}
                className="group relative aspect-[4/5] bg-card border border-border overflow-hidden block hover:border-primary transition"
              >
                <div className="absolute inset-0 flex items-center justify-center text-foreground/40 text-[10px] uppercase tracking-[0.3em]">
                  Interior · {apt.id}
                </div>
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-background/95 to-transparent">
                  <div className="text-[10px] uppercase tracking-[0.25em] text-primary">{apt.type}</div>
                  <div className="font-display text-lg text-ink mt-1 flex items-center justify-between">
                    {apt.name}
                    <ArrowUpRight className="size-4 text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                  <div className="text-[11px] text-foreground/60 mt-0.5">{apt.area}</div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* Other properties */}
      <section className="py-24 border-t border-border bg-accent/20">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="text-[11px] uppercase tracking-[0.3em] text-primary mb-5">Continue exploring</div>
          <h2 className="font-display text-4xl md:text-5xl text-ink mb-10">Other developments.</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.filter((p) => p.slug !== property.slug).map((p) => (
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
                  </div>
                  <ArrowUpRight className="size-5 text-primary shrink-0 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
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
