// Static sample data for the home page and /programs preview only. Replaced by database queries in Phase 2.
// The last four entries are invented placeholders (Example University) used to demo filtering.
export type SampleProgram = {
  university: string;
  title: string;
  field: string;
  city: string;
  duration: string;
  tuitionPerYear: string;
  documents: string[];
  match: number;
  slug: string;
};

export const samplePrograms: SampleProgram[] = [
  {
    university: "Linnaeus University",
    title: "Aquatic Ecology, Master Programme",
    field: "Biology",
    city: "Kalmar",
    duration: "2 years",
    tuitionPerYear: "SEK 87,500",
    documents: ["SOP", "CV", "Transcripts", "LOR", "TOEFL/IELTS"],
    match: 94,
    slug: "aquatic-ecology-linnaeus",
  },
  {
    university: "Linnaeus University",
    title: "Business Process Control and Supply Chain Management",
    field: "Business Administration",
    city: "Växjö",
    duration: "2 years",
    tuitionPerYear: "SEK 77,000",
    documents: ["Transcripts", "TOEFL/IELTS", "Degree"],
    match: 88,
    slug: "supply-chain-linnaeus",
  },
  {
    university: "Linnaeus University",
    title: "Chemistry, Master Programme",
    field: "Analytical Chemistry",
    city: "Kalmar",
    duration: "1 year",
    tuitionPerYear: "SEK 87,500",
    documents: ["SOP", "GMAT", "TOEFL/IELTS", "LOR"],
    match: 81,
    slug: "chemistry-1y-linnaeus",
  },
  {
    university: "Linnaeus University",
    title: "Chemistry, Master Programme (120 credits)",
    field: "Biochemistry",
    city: "Kalmar",
    duration: "2 years",
    tuitionPerYear: "SEK 87,500",
    documents: ["SOP", "GMAT", "TOEFL/IELTS", "LOR", "Transcripts"],
    match: 79,
    slug: "chemistry-2y-linnaeus",
  },
  {
    university: "Example University",
    title: "Data Science, Master Programme",
    field: "Computer Science",
    city: "Stockholm",
    duration: "2 years",
    tuitionPerYear: "SEK 120,000",
    documents: ["CV", "Transcripts", "TOEFL/IELTS"],
    match: 76,
    slug: "data-science-example",
  },
  {
    university: "Example University",
    title: "Sustainable Urban Design, Master Programme",
    field: "Architecture",
    city: "Gothenburg",
    duration: "2 years",
    tuitionPerYear: "SEK 105,000",
    documents: ["Portfolio", "SOP", "Transcripts"],
    match: 72,
    slug: "urban-design-example",
  },
  {
    university: "Example University",
    title: "Public Health, Master Programme",
    field: "Health Sciences",
    city: "Lund",
    duration: "1 year",
    tuitionPerYear: "SEK 98,000",
    documents: ["SOP", "LOR", "TOEFL/IELTS"],
    match: 68,
    slug: "public-health-example",
  },
  {
    university: "Example University",
    title: "International Relations, Master Programme",
    field: "Social Sciences",
    city: "Växjö",
    duration: "2 years",
    tuitionPerYear: "SEK 90,000",
    documents: ["SOP", "CV", "Transcripts"],
    match: 65,
    slug: "intl-relations-example",
  },
];
