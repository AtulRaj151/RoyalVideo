// This file is not needed as we're fetching data from the API
// The data has already been initialized in server/storage.ts

export const packages = [
  {
    id: 1,
    name: "Essential",
    description: "For Intimate Celebrations",
    price: 85000,
    features: [
      "1 Lead Photographer + 1 Assistant",
      "Photography coverage for 1 main event",
      "200+ Edited Digital Images",
      "Online Gallery (valid for 6 months)"
    ],
    isPopular: false
  },
  {
    id: 2,
    name: "Premium",
    description: "For Traditional Weddings",
    price: 145000,
    features: [
      "2 Lead Photographers + 2 Assistants",
      "Full day coverage (up to 3 events)",
      "500+ Edited Digital Images",
      "Cinematic Highlight Film (15-20 min)",
      "Online Gallery (valid for 1 year)",
      "2 Premium Photo Albums"
    ],
    isPopular: true
  },
  {
    id: 3,
    name: "Luxury",
    description: "For Extravagant Celebrations",
    price: 225000,
    features: [
      "3 Lead Photographers + 3 Assistants",
      "Multi-day coverage (all events)",
      "1000+ Edited Digital Images",
      "Feature Film (30-45 min) + Teaser",
      "Drone Coverage",
      "3 Luxury Albums + Parents Albums"
    ],
    isPopular: false
  }
];
