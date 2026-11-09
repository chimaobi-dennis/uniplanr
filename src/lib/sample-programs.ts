// Static sample data for the home-page preview only. Replaced by database queries in Phase 2.
export type SampleProgram = {
  university: string;
  title: string;
  field: string;
  city: string;
  duration: string;
  tuitionPerYear: string;
  documents: string[];
  match: number;
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
  },
];
