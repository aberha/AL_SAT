// SAT Structure - Single source of truth for all domain/section organization
// Aligned with OpenSAT API domain names

export const SAT_STRUCTURE = {
  math: {
    id: "math",
    title: "Math",
    domains: [
      { id: "algebra", apiDomain: "Algebra", title: "Algebra", description: "Linear equations and systems" },
      { id: "advanced-math", apiDomain: "Advanced Math", title: "Advanced Math", description: "Quadratics and polynomials" },
      { id: "problem-solving", apiDomain: "Problem-Solving and Data Analysis", title: "Problem Solving & Data Analysis", description: "Statistics and probability" },
      { id: "geometry-trig", apiDomain: "Geometry and Trigonometry", title: "Geometry & Trigonometry", description: "Shapes and trig functions" },
    ],
  },
  english: {
    id: "reading_writing",
    title: "Reading & Writing",
    domains: [
      { id: "information-ideas", apiDomain: "Information and Ideas", title: "Information & Ideas", description: "Main ideas and evidence" },
      { id: "craft-structure", apiDomain: "Craft and Structure", title: "Craft & Structure", description: "Word choice and structure" },
      { id: "expression-ideas", apiDomain: "Expression of Ideas", title: "Expression of Ideas", description: "Transitions and organization" },
      { id: "standard-english", apiDomain: "Standard English Conventions", title: "Standard English Conventions", description: "Grammar and punctuation" },
    ],
  },
} as const;

// Map from API domain names to our IDs
export const API_DOMAIN_TO_ID: Record<string, string> = {
  "Algebra": "algebra",
  "Advanced Math": "advanced-math",
  "Problem-Solving and Data Analysis": "problem-solving",
  "Geometry and Trigonometry": "geometry-trig",
  "Information and Ideas": "information-ideas",
  "Craft and Structure": "craft-structure",
  "Expression of Ideas": "expression-ideas",
  "Standard English Conventions": "standard-english",
};

