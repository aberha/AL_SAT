import { Question } from "@/types";

// OpenSAT Questions from https://api.jsonsilo.com/public/942c3c3b-3a0c-4be3-81c2-12029def19f5
// Math questions mapped to our domain structure

export const openSATQuestions: Question[] = [
  // Advanced Math
  {
    id: "281a4f3b",
    domainId: "advanced-math",
    stem: "A certain college had 3,000 students enrolled in 2015. The college predicts that after 2015, the number of students enrolled each year will be 2% less than the number of students enrolled the year before. Which of the following functions models the relationship between the number of students enrolled, f(x), and the number of years after 2015, x?",
    choices: [
      { id: "a", label: "f(x) = 3,000(0.02)^x" },
      { id: "b", label: "f(x) = 0.98(3,000)^x" },
      { id: "c", label: "f(x) = 3,000(0.002)^x" },
      { id: "d", label: "f(x) = 3,000(0.98)^x" },
    ],
    correctChoiceId: "d",
    explanation: "Because the change in the number of students decreases by the same percentage each year, the relationship can be modeled with a decreasing exponential function f(x) = a(1 - r)^x. With a = 3,000 and r = 0.02, we get f(x) = 3,000(0.98)^x.",
  },
  {
    id: "b81173a5",
    domainId: "advanced-math",
    stem: "The graph of the function f(x) = x² + 2x + 3 intersects the x-axis at two points. What is the sum of the x-coordinates of these two points?",
    choices: [
      { id: "a", label: "-2" },
      { id: "b", label: "0" },
      { id: "c", label: "2" },
      { id: "d", label: "4" },
    ],
    correctChoiceId: "a",
    explanation: "The sum of the roots of a quadratic equation ax² + bx + c = 0 equals -b/a. Here a = 1 and b = 2, so the sum is -2/1 = -2.",
  },
  {
    id: "random_id_a8",
    domainId: "advanced-math",
    stem: "The function f(x) is defined by f(x) = (x² - 1)/(x - 1). For what value(s) of x is f(x) undefined?",
    choices: [
      { id: "a", label: "1 only" },
      { id: "b", label: "-1 only" },
      { id: "c", label: "0 only" },
      { id: "d", label: "1 and -1" },
    ],
    correctChoiceId: "a",
    explanation: "A function is undefined when the denominator equals zero. The denominator is x-1, which equals zero when x=1. Therefore, f(x) is undefined when x=1.",
  },
  {
    id: "random_id_c4_math",
    domainId: "advanced-math",
    stem: "The function f(x) is defined by f(x) = 1/(x² + 1). What is the value of f(√3)?",
    choices: [
      { id: "a", label: "1/4" },
      { id: "b", label: "1/2" },
      { id: "c", label: "1" },
      { id: "d", label: "4" },
    ],
    correctChoiceId: "a",
    explanation: "Substituting √3 for x: f(√3) = 1/((√3)² + 1) = 1/(3 + 1) = 1/4.",
  },
  {
    id: "random_id_c9",
    domainId: "advanced-math",
    stem: "A circle has a radius of 5 units. The point (-3,1) lies on the circle. What is the equation of the circle?",
    choices: [
      { id: "a", label: "(x + 3)² + (y - 1)² = 25" },
      { id: "b", label: "(x + 3)² + (y - 1)² = 5" },
      { id: "c", label: "(x - 3)² + (y + 1)² = 25" },
      { id: "d", label: "(x - 3)² + (y + 1)² = 5" },
    ],
    correctChoiceId: "a",
    explanation: "The standard form is (x - h)² + (y - k)² = r². With center (-3, 1) and radius 5, the equation is (x + 3)² + (y - 1)² = 25.",
  },

  // Problem-Solving and Data Analysis
  {
    id: "9f6f8f8f",
    domainId: "problem-solving",
    stem: "A survey of 100 people found that 60 people like apples, 50 people like bananas, and 20 people like both apples and bananas. How many people like only apples?",
    choices: [
      { id: "a", label: "10" },
      { id: "b", label: "20" },
      { id: "c", label: "40" },
      { id: "d", label: "60" },
    ],
    correctChoiceId: "c",
    explanation: "Using a Venn diagram: People who like only apples = Total who like apples - People who like both = 60 - 20 = 40.",
  },
  {
    id: "ps_percent_1",
    domainId: "problem-solving",
    stem: "A store's revenue increased from $80,000 to $100,000. What was the percent increase?",
    choices: [
      { id: "a", label: "20%" },
      { id: "b", label: "25%" },
      { id: "c", label: "80%" },
      { id: "d", label: "125%" },
    ],
    correctChoiceId: "b",
    explanation: "Percent increase = (New - Old)/Old × 100 = (100,000 - 80,000)/80,000 × 100 = 20,000/80,000 × 100 = 25%.",
  },
  {
    id: "ps_mean_1",
    domainId: "problem-solving",
    stem: "The average of five numbers is 20. If one of the numbers is removed, the average of the remaining four numbers is 15. What number was removed?",
    choices: [
      { id: "a", label: "30" },
      { id: "b", label: "35" },
      { id: "c", label: "40" },
      { id: "d", label: "45" },
    ],
    correctChoiceId: "c",
    explanation: "Original sum = 5 × 20 = 100. New sum = 4 × 15 = 60. Removed number = 100 - 60 = 40.",
  },

  // Geometry and Trigonometry
  {
    id: "random_id_c4",
    domainId: "geometry-trig",
    stem: "A rectangle has a length of 12 cm and a width of 5 cm. What is the area of the rectangle, in square cm?",
    choices: [
      { id: "a", label: "17" },
      { id: "b", label: "34" },
      { id: "c", label: "60" },
      { id: "d", label: "144" },
    ],
    correctChoiceId: "c",
    explanation: "Area of a rectangle = length × width = 12 cm × 5 cm = 60 square cm.",
  },
  {
    id: "geo_triangle_1",
    domainId: "geometry-trig",
    stem: "In a right triangle, one leg has length 5 and the hypotenuse has length 13. What is the length of the other leg?",
    choices: [
      { id: "a", label: "8" },
      { id: "b", label: "12" },
      { id: "c", label: "18" },
      { id: "d", label: "169" },
    ],
    correctChoiceId: "b",
    explanation: "Using the Pythagorean theorem: a² + b² = c². So 5² + b² = 13². 25 + b² = 169. b² = 144. b = 12.",
  },
  {
    id: "geo_circle_1",
    domainId: "geometry-trig",
    stem: "A circle has an area of 36π square units. What is the circumference of the circle?",
    choices: [
      { id: "a", label: "6π" },
      { id: "b", label: "12π" },
      { id: "c", label: "18π" },
      { id: "d", label: "36π" },
    ],
    correctChoiceId: "b",
    explanation: "Area = πr² = 36π, so r² = 36 and r = 6. Circumference = 2πr = 2π(6) = 12π.",
  },

  // Algebra & Linear Equations
  {
    id: "alg_linear_1",
    domainId: "algebra-linear",
    stem: "If 2x + 5 = 17, what is the value of x?",
    choices: [
      { id: "a", label: "4" },
      { id: "b", label: "6" },
      { id: "c", label: "8" },
      { id: "d", label: "11" },
    ],
    correctChoiceId: "b",
    explanation: "2x + 5 = 17. Subtract 5: 2x = 12. Divide by 2: x = 6.",
  },
  {
    id: "alg_linear_2",
    domainId: "algebra-linear",
    stem: "What is the slope of the line passing through points (2, 3) and (6, 11)?",
    choices: [
      { id: "a", label: "1" },
      { id: "b", label: "2" },
      { id: "c", label: "3" },
      { id: "d", label: "4" },
    ],
    correctChoiceId: "b",
    explanation: "Slope = (y₂ - y₁)/(x₂ - x₁) = (11 - 3)/(6 - 2) = 8/4 = 2.",
  },
  {
    id: "alg_system_1",
    domainId: "algebra-linear",
    stem: "If x + y = 10 and x - y = 4, what is the value of x?",
    choices: [
      { id: "a", label: "3" },
      { id: "b", label: "5" },
      { id: "c", label: "7" },
      { id: "d", label: "14" },
    ],
    correctChoiceId: "c",
    explanation: "Adding the equations: 2x = 14, so x = 7.",
  },

  // Standard English Conventions (Reading/Writing)
  {
    id: "sec_comma_1",
    domainId: "standard-english",
    stem: "Typically, underlines, scribbles, and notes left in the margins by a former owner lower a book's ______ when the former owner is a famous poet like Walt Whitman, such markings, known as marginalia, can be a gold mine to literary scholars.",
    choices: [
      { id: "a", label: "value, but" },
      { id: "b", label: "value" },
      { id: "c", label: "value," },
      { id: "d", label: "value but" },
    ],
    correctChoiceId: "a",
    explanation: "Choice A uses a comma and the coordinating conjunction 'but' to join two independent clauses, creating a compound sentence.",
  },
  {
    id: "sec_verb_1",
    domainId: "standard-english",
    stem: "The orchestra, along with the choir, ______ performing at the annual festival next month.",
    choices: [
      { id: "a", label: "are" },
      { id: "b", label: "is" },
      { id: "c", label: "were" },
      { id: "d", label: "have been" },
    ],
    correctChoiceId: "b",
    explanation: "The subject is 'orchestra' (singular). The phrase 'along with the choir' is parenthetical and doesn't change the subject. Therefore, 'is' is correct.",
  },

  // Craft & Structure
  {
    id: "cs_purpose_1",
    domainId: "craft-structure",
    stem: "The author's use of the phrase 'crystalline waters' in the passage primarily serves to:",
    choices: [
      { id: "a", label: "Emphasize the clarity and purity of the lake" },
      { id: "b", label: "Suggest the water is frozen" },
      { id: "c", label: "Contrast with the polluted rivers nearby" },
      { id: "d", label: "Indicate the lake's depth" },
    ],
    correctChoiceId: "a",
    explanation: "'Crystalline' typically describes something clear, transparent, and pure, like crystal. This emphasizes the lake's clarity.",
  },

  // Information & Ideas
  {
    id: "ii_evidence_1",
    domainId: "information-ideas",
    stem: "According to the passage, the primary reason researchers conducted the study was to:",
    choices: [
      { id: "a", label: "Confirm existing theories about climate change" },
      { id: "b", label: "Develop new methods for data collection" },
      { id: "c", label: "Investigate previously unexplained phenomena" },
      { id: "d", label: "Challenge accepted scientific consensus" },
    ],
    correctChoiceId: "c",
    explanation: "The passage states that researchers sought to understand phenomena that had not been adequately explained by previous studies.",
  },

  // Expression of Ideas
  {
    id: "ei_transition_1",
    domainId: "expression-ideas",
    stem: "The writer wants to add a transition at the beginning of the paragraph. Which choice best accomplishes this goal?",
    choices: [
      { id: "a", label: "However," },
      { id: "b", label: "Similarly," },
      { id: "c", label: "In conclusion," },
      { id: "d", label: "For instance," },
    ],
    correctChoiceId: "a",
    explanation: "The paragraph presents contrasting information to what came before, so 'However' is the appropriate transition.",
  },
];

export function getOpenSATQuestionsByDomain(domainId: string): Question[] {
  return openSATQuestions.filter((q) => q.domainId === domainId);
}

export function getAllOpenSATQuestions(): Question[] {
  return openSATQuestions;
}

