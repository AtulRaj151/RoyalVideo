// This file provides the type definitions for package data
// The actual data is fetched from the server API
import { Package } from '@shared/schema';

// Type for a package with additional frontend-specific fields
export interface PackageWithDetails extends Package {
  details: {
    additionalServices: string[];
    idealFor: string[];
    duration: string;
  };
}

// Function to enhance package data with additional frontend details
export const enhancePackageData = (pkg: Package): PackageWithDetails => {
  const details = {
    additionalServices: [],
    idealFor: [],
    duration: ""
  };

  // Add details based on package type
  if (pkg.name === "Silver Package") {
    details.additionalServices = [
      "Online gallery sharing",
      "Basic photo album (20 pages)",
      "Digital delivery within 3 weeks"
    ];
    details.idealFor = [
      "Intimate gatherings",
      "Single-day ceremonies",
      "Budget-conscious couples"
    ];
    details.duration = "Covers up to 8 hours";
  } else if (pkg.name === "Gold Package") {
    details.additionalServices = [
      "Premium online gallery with sharing",
      "Deluxe hardcover photo album (30 pages)",
      "Digital delivery within 2 weeks",
      "Pre-wedding shoot (2 hours)"
    ];
    details.idealFor = [
      "Traditional multi-day ceremonies",
      "Medium-sized weddings",
      "Full event coverage"
    ];
    details.duration = "Covers up to 12 hours";
  } else if (pkg.name === "Platinum Package") {
    details.additionalServices = [
      "VIP online gallery with unlimited downloads",
      "Luxury photo album (40 pages) + 2 parent albums",
      "Digital delivery within 1 week",
      "Pre-wedding shoot (4 hours)",
      "Wedding teaser (next day delivery)"
    ];
    details.idealFor = [
      "Grand celebrations",
      "Multiple-day wedding events",
      "Premium coverage with no limitations"
    ];
    details.duration = "Unlimited coverage (up to 16 hours per day)";
  }

  return {
    ...pkg,
    details
  };
};
