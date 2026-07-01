// src/api/places.js
// Mock data for the Explore Florence guide.
// To add your own places later, just add new objects to MOCK_PLACES below
// following the same structure, or wire this up to a real backend/Google Places API.

export const PLACE_CATEGORIES = [
  { id: "all", label: "All", emoji: "✨" },
  { id: "food", label: "Food", emoji: "🍝" },
  { id: "aperitivo", label: "Aperitivo", emoji: "🍷" },
  { id: "nightlife", label: "Nightlife", emoji: "🎶" },
  { id: "study", label: "Study Cafés", emoji: "📚" },
  { id: "culture", label: "Culture", emoji: "🎨" },
  { id: "parks", label: "Parks", emoji: "🌳" },
  { id: "fitness", label: "Sport & Fitness", emoji: "🏋️" },
];

export const MOCK_PLACES = [
  {
    id: "pl_001",
    name: "Trattoria Mario",
    category: "food",
    description: "Legendary no-frills trattoria near the Mercato Centrale. Always packed, always worth the wait.",
    area: "San Lorenzo",
    priceLevel: "€€",
    rating: 4.6,
    tags: ["authentic", "lunch", "local favorite"]
  },
  {
    id: "pl_002",
    name: "All'Antico Vinaio",
    category: "food",
    description: "Florence's most famous schiacciata sandwiches. Expect a line, it's worth it.",
    area: "Centro Storico",
    priceLevel: "€",
    rating: 4.8,
    tags: ["sandwiches", "quick bite", "iconic"]
  },
  {
    id: "pl_003",
    name: "Le Volpi e l'Uva",
    category: "aperitivo",
    description: "Cozy wine bar near Ponte Vecchio with an excellent, affordable wine selection and cheese boards.",
    area: "Oltrarno",
    priceLevel: "€€",
    rating: 4.7,
    tags: ["wine bar", "cozy", "cheese"]
  },
  {
    id: "pl_004",
    name: "Rasputin Cocktail Bar",
    category: "aperitivo",
    description: "Creative cocktails in a speakeasy-style setting. Great for a pre-dinner drink with friends.",
    area: "Santa Croce",
    priceLevel: "€€€",
    rating: 4.5,
    tags: ["cocktails", "speakeasy", "trendy"]
  },
  {
    id: "pl_005",
    name: "Otel Club",
    category: "nightlife",
    description: "One of the most popular student clubs in Florence, with regular international student nights.",
    area: "Centro",
    priceLevel: "€€",
    rating: 4.3,
    tags: ["club", "student night", "dancing"]
  },
  {
    id: "pl_006",
    name: "Volume Firenze",
    category: "nightlife",
    description: "Bar with live music and a relaxed, bohemian crowd in Piazza Santo Spirito.",
    area: "Oltrarno",
    priceLevel: "€€",
    rating: 4.4,
    tags: ["live music", "bohemian", "outdoor seating"]
  },
  {
    id: "pl_007",
    name: "Ditta Artigianale",
    category: "study",
    description: "Specialty coffee, fast wifi, and a quiet upstairs area — a favorite among international students.",
    area: "Santa Croce",
    priceLevel: "€€",
    rating: 4.6,
    tags: ["wifi", "specialty coffee", "quiet"]
  },
  {
    id: "pl_008",
    name: "Biblioteca delle Oblate",
    category: "study",
    description: "Public library with a rooftop terrace overlooking the Duomo. Free and peaceful for long study sessions.",
    area: "Centro Storico",
    priceLevel: "Free",
    rating: 4.7,
    tags: ["library", "free", "view"]
  },
  {
    id: "pl_009",
    name: "Uffizi Gallery",
    category: "culture",
    description: "World-famous art museum — student discounts available, book ahead to skip the line.",
    area: "Centro Storico",
    priceLevel: "€€",
    rating: 4.8,
    tags: ["museum", "art", "student discount"]
  },
  {
    id: "pl_010",
    name: "Giardino di Boboli",
    category: "parks",
    description: "Sprawling Renaissance gardens behind Palazzo Pitti, perfect for a study break or picnic.",
    area: "Oltrarno",
    priceLevel: "€",
    rating: 4.6,
    tags: ["gardens", "picnic", "views"]
  },
  {
    id: "pl_011",
    name: "Parco delle Cascine",
    category: "parks",
    description: "Florence's largest park, great for running, cycling, and weekend markets.",
    area: "Cascine",
    priceLevel: "Free",
    rating: 4.4,
    tags: ["running", "cycling", "market"]
  },
  {
    id: "pl_012",
    name: "Piazzale Michelangelo Steps",
    category: "fitness",
    description: "Free outdoor workout spot with a stunning view of the city — popular at sunrise and sunset.",
    area: "Oltrarno",
    priceLevel: "Free",
    rating: 4.9,
    tags: ["running", "view", "outdoor"]
  },
  {
    id: "pl_013",
    name: "Virgin Active Firenze",
    category: "fitness",
    description: "Modern gym chain with day passes available, popular with exchange students.",
    area: "Centro",
    priceLevel: "€€",
    rating: 4.2,
    tags: ["gym", "day pass", "classes"]
  },
];

export async function getPlaces(category = "all") {
  await delay(250);
  if (category === "all") return MOCK_PLACES;
  return MOCK_PLACES.filter(p => p.category === category);
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
