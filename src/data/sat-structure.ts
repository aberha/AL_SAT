// SAT Structure - Single source of truth for all domain/section organization
// Aligned with OpenSAT API domain names

export const SAT_STRUCTURE = {
  math: {
    id: "math",
    title: "Math",
    domains: [
      {
        id: "algebra",
        apiDomain: "Algebra",
        title: "Algebra",
        description: "Linear equations, inequalities, and systems",
        lessons: [
          { id: "alg-1", title: "Linear Equations in One Variable", readingTimeMin: 15 },
          { id: "alg-2", title: "Linear Equations in Two Variables", readingTimeMin: 18 },
          { id: "alg-3", title: "Linear Functions", readingTimeMin: 20 },
          { id: "alg-4", title: "Systems of Linear Equations", readingTimeMin: 22 },
          { id: "alg-5", title: "Linear Inequalities", readingTimeMin: 16 },
        ],
      },
      {
        id: "advanced-math",
        apiDomain: "Advanced Math",
        title: "Advanced Math",
        description: "Quadratics, polynomials, and nonlinear functions",
        lessons: [
          { id: "adv-1", title: "Quadratic Equations", readingTimeMin: 20 },
          { id: "adv-2", title: "Polynomial Operations", readingTimeMin: 18 },
          { id: "adv-3", title: "Exponential Functions", readingTimeMin: 15 },
          { id: "adv-4", title: "Rational Expressions", readingTimeMin: 22 },
          { id: "adv-5", title: "Radicals & Rational Exponents", readingTimeMin: 17 },
        ],
      },
      {
        id: "problem-solving",
        apiDomain: "Problem-Solving and Data Analysis",
        title: "Problem Solving & Data Analysis",
        description: "Ratios, rates, statistics, and probability",
        lessons: [
          { id: "ps-1", title: "Ratios & Proportions", readingTimeMin: 14 },
          { id: "ps-2", title: "Percentages", readingTimeMin: 12 },
          { id: "ps-3", title: "Data Interpretation", readingTimeMin: 18 },
          { id: "ps-4", title: "Mean, Median, Mode", readingTimeMin: 15 },
          { id: "ps-5", title: "Basic Probability", readingTimeMin: 16 },
        ],
      },
      {
        id: "geometry-trig",
        apiDomain: "Geometry and Trigonometry",
        title: "Geometry & Trigonometry",
        description: "Lines, angles, triangles, circles, and trig",
        lessons: [
          { id: "geo-1", title: "Lines & Angles", readingTimeMin: 14 },
          { id: "geo-2", title: "Triangles & Pythagorean Theorem", readingTimeMin: 20 },
          { id: "geo-3", title: "Circles & Arc Length", readingTimeMin: 18 },
          { id: "geo-4", title: "Volume & Surface Area", readingTimeMin: 16 },
          { id: "geo-5", title: "Trigonometric Ratios", readingTimeMin: 22 },
        ],
      },
    ],
  },
  english: {
    id: "reading_writing",
    title: "Reading & Writing",
    domains: [
      {
        id: "information-ideas",
        apiDomain: "Information and Ideas",
        title: "Information & Ideas",
        description: "Central ideas, evidence, and inferences",
        lessons: [
          { id: "ii-1", title: "Central Ideas & Main Purpose", readingTimeMin: 16 },
          { id: "ii-2", title: "Supporting Evidence", readingTimeMin: 14 },
          { id: "ii-3", title: "Inferences & Conclusions", readingTimeMin: 18 },
          { id: "ii-4", title: "Command of Quantitative Data", readingTimeMin: 15 },
          { id: "ii-5", title: "Text Comparisons", readingTimeMin: 17 },
        ],
      },
      {
        id: "craft-structure",
        apiDomain: "Craft and Structure",
        title: "Craft & Structure",
        description: "Word choice, text structure, and purpose",
        lessons: [
          { id: "cs-1", title: "Words in Context", readingTimeMin: 14 },
          { id: "cs-2", title: "Text Structure & Purpose", readingTimeMin: 16 },
          { id: "cs-3", title: "Cross-Text Connections", readingTimeMin: 18 },
          { id: "cs-4", title: "Rhetorical Analysis", readingTimeMin: 20 },
          { id: "cs-5", title: "Author's Tone & Style", readingTimeMin: 15 },
        ],
      },
      {
        id: "expression-ideas",
        apiDomain: "Expression of Ideas",
        title: "Expression of Ideas",
        description: "Transitions, organization, and effective language",
        lessons: [
          { id: "ei-1", title: "Transitions", readingTimeMin: 12 },
          { id: "ei-2", title: "Logical Sequence", readingTimeMin: 14 },
          { id: "ei-3", title: "Precision in Word Choice", readingTimeMin: 13 },
          { id: "ei-4", title: "Conciseness", readingTimeMin: 11 },
          { id: "ei-5", title: "Synthesis", readingTimeMin: 15 },
        ],
      },
      {
        id: "standard-english",
        apiDomain: "Standard English Conventions",
        title: "Standard English Conventions",
        description: "Grammar, punctuation, and sentence structure",
        lessons: [
          { id: "sec-1", title: "Subject-Verb Agreement", readingTimeMin: 14 },
          { id: "sec-2", title: "Pronoun-Antecedent Agreement", readingTimeMin: 13 },
          { id: "sec-3", title: "Punctuation Rules", readingTimeMin: 16 },
          { id: "sec-4", title: "Sentence Boundaries", readingTimeMin: 15 },
          { id: "sec-5", title: "Modifiers & Parallel Structure", readingTimeMin: 17 },
        ],
      },
    ],
  },
} as const;

// Helper to get all domains flat
export function getAllDomains() {
  return [
    ...SAT_STRUCTURE.math.domains.map((d) => ({ ...d, section: "math" as const })),
    ...SAT_STRUCTURE.english.domains.map((d) => ({ ...d, section: "reading_writing" as const })),
  ];
}

// Helper to get domain by ID
export function getDomainById(domainId: string) {
  return getAllDomains().find((d) => d.id === domainId);
}

// Helper to get API domain name from our domain ID
export function getApiDomainName(domainId: string): string | null {
  const domain = getDomainById(domainId);
  return domain?.apiDomain ?? null;
}

// Map from API domain names to our IDs
export const API_DOMAIN_TO_ID: Record<string, string> = {
  // Math
  "Algebra": "algebra",
  "Advanced Math": "advanced-math",
  "Problem-Solving and Data Analysis": "problem-solving",
  "Geometry and Trigonometry": "geometry-trig",
  // English
  "Information and Ideas": "information-ideas",
  "Craft and Structure": "craft-structure",
  "Expression of Ideas": "expression-ideas",
  "Standard English Conventions": "standard-english",
};

