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
};

export const properties: Property[] = [
  {
    slug: "kodrina",
    name: "Kodrina",
    loc: "Downtown · 42 floors",
    status: "Under construction",
    tag: "Residential",
    year: "2026",
    floors: "42",
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

export const getProperty = (slug: string) =>
  properties.find((p) => p.slug === slug);
