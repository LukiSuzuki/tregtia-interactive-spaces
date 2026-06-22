export type Apartment = {
  id: string;
  name: string;
  type: string;
  area: string;
  bedrooms: string;
  floor: string;
};

export type Property = {
  slug: string;
  name: string;
  loc: string;
  status: string;
  tag: string;
  year: string;
  floors: string;
  projectName: string;
  lokacion: string;
  investor: string;
  objectDestination: string;
  description: string;
  image?: string;
  apartments: Apartment[];
};

const buildingAssets = import.meta.glob<{ default: { url: string } }>(
  "../assets/buildings/*.jpg.asset.json",
  { eager: true },
);
const buildingImageBySlug: Record<string, string> = {};
for (const [path, mod] of Object.entries(buildingAssets)) {
  const slug = path.split("/").pop()!.replace(".jpg.asset.json", "");
  buildingImageBySlug[slug] = mod.default.url;
}


const defaultApartments: Apartment[] = [
  { id: "01", name: "Residence 01", type: "Studio", area: "48 m²", bedrooms: "0", floor: "—" },
  { id: "02", name: "Residence 02", type: "One-bedroom", area: "62 m²", bedrooms: "1", floor: "—" },
  { id: "03", name: "Residence 03", type: "Two-bedroom", area: "84 m²", bedrooms: "2", floor: "—" },
  { id: "04", name: "Residence 04", type: "Two-bedroom corner", area: "92 m²", bedrooms: "2", floor: "—" },
  { id: "05", name: "Residence 05", type: "Three-bedroom", area: "118 m²", bedrooms: "3", floor: "—" },
  { id: "06", name: "Penthouse", type: "Penthouse", area: "210 m²", bedrooms: "4", floor: "—" },
];


const propertyBase: Omit<Property, "apartments">[] = [
  {
    slug: "kodrina",
    name: "Kodrina",
    loc: "Downtown",
    status: "Under construction",
    tag: "Residential",
    year: "2026",
    
    projectName: "Kodrina",
    lokacion: "—",
    investor: "—",
    objectDestination: "—",
    description:
      "A landmark downtown tower combining residential elegance with panoramic city views. Designed for those who value craft, light, and a quiet sense of permanence.",
  },
  {
    slug: "apollonia-a22",
    name: "Apollonia A22",
    loc: "Harbor District · 28 floors",
    status: "Pre-sale",
    tag: "Mixed-Use",
    year: "2027",
    floors: "28",
    projectName: "Apollonia A22",
    lokacion: "—",
    investor: "—",
    objectDestination: "—",
    description:
      "A waterfront mixed-use development blending retail, residences, and shared civic space along the harbor's edge.",
  },
  {
    slug: "lakrishte-blloku-a6",
    name: "Lakrishte Blloku A6",
    loc: "Hillside · 16 floors",
    status: "Completed",
    tag: "Commercial",
    year: "2025",
    floors: "16",
    projectName: "Lakrishte Blloku A6",
    lokacion: "—",
    investor: "—",
    objectDestination: "—",
    description:
      "A hillside commercial complex with refined façades, generous public terraces, and uninterrupted views over the city skyline.",
  },
  {
    slug: "arberia-c3-f2",
    name: "Arberia C3-F2",
    loc: "North Bank · 9 floors",
    status: "Concept",
    tag: "Residential",
    year: "2028",
    floors: "9",
    projectName: "Arberia C3-F2",
    lokacion: "—",
    investor: "—",
    objectDestination: "—",
    description:
      "An intimate residential project on the north bank — boutique in scale, generous in light, designed around a planted central courtyard.",
  },
];

const additionalNames: string[] = [
  "Mati 1 Blloku A.11-F2",
  "Mati 1 Blloku A.11-F1",
  "Arbëria C3-F1",
  "Arbëria C2.11 – VIP Zonë",
  "Arbëria C2.6",
  "Arbëria C2.9",
  "Fabrika e Betonit",
  "Apollonia A19",
  "Apollonia A20",
  "Apollonia A21",
  "Apollonia A24",
  "Apollonia A26",
  "Apollonia A27",
  "Apollonia A28",
  "Apollonia Blloku A",
  "Apollonia B19",
  "Apollonia E6",
  "Apollonia E3",
  "Dodona (Shtëpia e Pleqëve)",
  "Objekti te parku",
  "Aktash - DAVIDOFI",
  "Aktash 1 TETORI",
  "Aktash Daxa",
];

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const additionalBase: Omit<Property, "apartments">[] = additionalNames.map((name) => ({
  slug: slugify(name),
  name,
  loc: "—",
  status: "Building",
  tag: "Residential",
  year: "—",
  floors: "—",
  projectName: name,
  lokacion: "—",
  investor: "—",
  objectDestination: "—",
  description: `${name} — part of the TREGTIA portfolio.`,
}));

export const properties: Property[] = [...propertyBase, ...additionalBase].map((p) => ({
  ...p,
  image: buildingImageBySlug[p.slug],
  apartments: defaultApartments,
}));


export const getProperty = (slug: string) =>
  properties.find((p) => p.slug === slug);

export const getApartment = (propertySlug: string, apartmentId: string) => {
  const property = getProperty(propertySlug);
  const apartment = property?.apartments.find((a) => a.id === apartmentId);
  if (!property || !apartment) return null;
  return { property, apartment };
};

