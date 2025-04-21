// This file provides the type definitions for service data
// The actual data is fetched from the server API
import { Service } from '@shared/schema';

// Type for a service with additional frontend-specific fields
export interface ServiceWithDetails extends Service {
  details: {
    includes: string[];
  };
}

// Function to enhance service data with additional frontend details
export const enhanceServiceData = (service: Service): ServiceWithDetails => {
  const details = {
    includes: []
  };

  // Add details based on service type
  if (service.name === "Photography") {
    details.includes = [
      "Professional photographers specializing in Indian weddings",
      "High-resolution digital photos with professional editing",
      "Coverage of all ceremonies and events",
      "Candid and posed photography styles"
    ];
  } else if (service.name === "Videography") {
    details.includes = [
      "Professional cinematographers with Indian wedding experience",
      "Full-length wedding film",
      "Cinematic highlight reel (5-15 minutes)",
      "Professional editing with music and audio enhancement"
    ];
  } else if (service.name === "Drone Services") {
    details.includes = [
      "Licensed and insured drone operators",
      "Breathtaking aerial shots of venue and celebrations",
      "Perfect for baraat processions and outdoor ceremonies",
      "Integrated into final photo and video deliverables"
    ];
  } else if (service.name === "Wedding Reels") {
    details.includes = [
      "Short, shareable social media-ready videos",
      "Quick turnaround options for same-day sharing",
      "Trending music and effects",
      "Multiple format options for different platforms"
    ];
  }

  return {
    ...service,
    details
  };
};
