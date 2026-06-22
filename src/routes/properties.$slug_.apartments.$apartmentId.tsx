import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Play, MapPin } from "lucide-react";
import logoUrl from "@/assets/tregtia-logo-blue.png";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { getApartment, type Property, type Apartment } from "@/lib/properties";

export const Route = createFileRoute("/properties/$slug_/apartments/$apartmentId")({
  head: ({ params }) => {
    const result = getApartment(params.slug, params.apartmentId);
    const title = result
      ? `${result.apartment.name} — ${result.property.name} · TREGTIA`
      : "Apartment — TREGTIA";
    const description = result
      ? `${result.apartment.type} · ${result.apartment.area} in ${result.property.name}.`
      : "TREGTIA apartment details.";
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
    const result = getApartment(params.slug, params.apartmentId);
    if (!result) throw notFound();
    return result;
  },
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="text-center">
        <h1 className="font-display text-4xl text-ink mb-4">Apartment not found</h1>
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
  component: ApartmentPage,
});

function ApartmentPage() {
  const { property, apartment } = Route.useLoaderData() as { property: Property; apartment: Apartment };
  const [tourOpen, setTourOpen] = useState(false);

  const gallery = Array.from({ length: 6 });
  const siblings = property.apartments.filter((a: Apartment) => a.id !== apartment.id);


  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed top-0 inset-x-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-[1400px] mx-auto px-8 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={logoUrl} alt="TREGTIA" className="h-10 w-auto" />
          </Link>
          <Link
            to="/properties/$slug"
            params={{ slug: property.slug }}
            className="text-[13px] tracking-wide text-foreground/70 hover:text-primary inline-flex items-center gap-2"
          >
            <ArrowLeft className="size-3.5" /> Back to {property.name}
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-16 border-b border-border" style={{ background: "var(--gradient-hero)" }}>
        <div className="max-w-[1400px] mx-auto px-8">
          <Link
            to="/properties/$slug"
            params={{ slug: property.slug }}
            className="text-[11px] uppercase tracking-[0.3em] text-primary hover:underline inline-flex items-center gap-2 mb-6"
          >
            <MapPin className="size-3" /> {property.name} · {property.loc}
          </Link>
          <div className="text-[11px] uppercase tracking-[0.3em] text-foreground/60 mb-3">
            {apartment.type}
          </div>
          <h1 className="font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] text-ink">
            {apartment.name}
          </h1>

          <div className="mt-16 grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-9 aspect-[21/9] relative overflow-hidden border border-border bg-accent">
              <div className="absolute inset-0 flex items-center justify-center text-foreground/40 text-xs uppercase tracking-[0.3em]">
                Apartment cover — add image
              </div>
            </div>
            <div className="lg:col-span-3 flex flex-col justify-center h-full gap-10 border-l-2 border-primary pl-8">
              {[
                ["Area", apartment.area],
                ["Beds", apartment.bedrooms],
                ["Floor", apartment.floor],
              ].map(([l, v]) => (
                <div key={l}>
                  <div className="text-[10px] uppercase tracking-[0.25em] text-foreground/60 mb-2">{l}</div>
                  <div className="font-display text-3xl text-ink">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3D Floor plan + walk-in tour */}
      <section className="py-24 border-b border-border bg-accent/30">
        <div className="max-w-[1400px] mx-auto px-8 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <div className="text-[11px] uppercase tracking-[0.3em] text-primary mb-5">3D Floor Plan</div>
            <h2 className="font-display text-4xl md:text-5xl text-ink text-balance">
              Layout, in <em className="text-primary">three dimensions</em>.
            </h2>
            <p className="mt-6 text-foreground/75 leading-relaxed max-w-md">
              Study the layout from above, then step inside the unit with our
              immersive 3D walk-in tour — every room, every view, before you commit.
            </p>
            <button
              type="button"
              onClick={() => setTourOpen(true)}
              className="mt-10 inline-flex items-center gap-3 px-7 py-4 bg-primary text-primary-foreground hover:bg-ink transition text-sm uppercase tracking-[0.2em]"
            >
              <Play className="size-4" /> Start 3D walk-in tour
            </button>
          </div>
          <div className="lg:col-span-7">
            <div className="aspect-[4/3] relative overflow-hidden border border-border bg-card" style={{ boxShadow: "var(--shadow-elegant)" }}>
              <div className="absolute inset-0 flex items-center justify-center text-foreground/40 text-xs uppercase tracking-[0.3em]">
                3D Floor plan — add image
              </div>
              <div className="absolute top-5 left-5 right-5 flex justify-between text-[10px] uppercase tracking-[0.3em] text-foreground/60">
                <span>{property.name}</span>
                <span>{apartment.name}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="py-24 max-w-[1400px] mx-auto px-8">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <div className="text-[11px] uppercase tracking-[0.3em] text-primary mb-5">Apartment Details</div>
            <h2 className="font-display text-4xl md:text-5xl text-ink">
              Unit <em className="text-primary">specifications</em>.
            </h2>
          </div>
          <dl className="lg:col-span-8 border-t border-border">
            {[
              ["Unit", apartment.name],
              ["Type", apartment.type],
              ["Area", apartment.area],
              ["Bedrooms", apartment.bedrooms],
              ["Floor", apartment.floor],
              ["Building", property.name],
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
      <section className="py-24 border-t border-border">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="flex items-end justify-between mb-10 border-b border-border pb-6">
            <div>
              <div className="text-[11px] uppercase tracking-[0.3em] text-primary mb-3">Gallery</div>
              <h2 className="font-display text-4xl md:text-5xl text-ink">Inside the unit.</h2>
            </div>
            <span className="text-xs uppercase tracking-[0.25em] text-foreground/50">{gallery.length} views</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {gallery.map((_, i) => (
              <div key={i} className="relative aspect-[4/5] bg-card border border-border overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-foreground/40 text-[10px] uppercase tracking-[0.3em]">
                  View · {String(i + 1).padStart(2, "0")}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other apartments */}
      {siblings.length > 0 && (
        <section className="py-24 border-t border-border bg-accent/20">
          <div className="max-w-[1400px] mx-auto px-8">
            <div className="text-[11px] uppercase tracking-[0.3em] text-primary mb-5">More in {property.name}</div>
            <h2 className="font-display text-4xl md:text-5xl text-ink mb-10">Other residences.</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {siblings.map((a: Apartment) => (
                <Link
                  key={a.id}
                  to="/properties/$slug/apartments/$apartmentId"
                  params={{ slug: property.slug, apartmentId: a.id }}
                  className="group block border border-border bg-card hover:border-primary transition"
                >
                  <div className="aspect-[4/3] bg-accent relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-foreground/30 text-[10px] uppercase tracking-[0.3em]">
                      Interior · {a.id}
                    </div>
                  </div>
                  <div className="p-6 flex items-start justify-between gap-4">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.3em] text-primary">{a.type}</div>
                      <h3 className="font-display text-2xl mt-2 text-ink group-hover:text-primary transition">{a.name}</h3>
                      <p className="text-sm text-foreground/70 mt-1">{a.area}</p>
                    </div>
                    <ArrowUpRight className="size-5 text-primary shrink-0 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <footer className="border-t border-border py-10 bg-accent/30">
        <div className="max-w-[1400px] mx-auto px-8 text-xs uppercase tracking-[0.25em] text-foreground/60 flex justify-between">
          <div>© {new Date().getFullYear()} TREGTIA</div>
          <Link to="/" className="hover:text-primary">Back to home</Link>
        </div>
      </footer>

      <Dialog open={tourOpen} onOpenChange={setTourOpen}>
        <DialogContent className="max-w-[95vw] w-[95vw] h-[92vh] p-0 overflow-hidden sm:rounded-lg">
          <DialogTitle className="sr-only">3D Walk-in Tour — {apartment.name}</DialogTitle>
          {tourOpen && (
            <iframe
              src="/panorama/index.html"
              title="3D Walk-in Tour"
              className="w-full h-full border-0"
              allow="fullscreen; accelerometer; gyroscope"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
