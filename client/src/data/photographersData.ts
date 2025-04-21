// This file provides the type definitions for photographer data
// The actual data is fetched from the server API
import { Photographer } from '@shared/schema';

// Type for a photographer with additional frontend-specific fields
export interface PhotographerWithPortfolio extends Photographer {
  portfolio: {
    images: string[];
    specialties: string[];
    experience: string;
  };
}

// Function to enhance photographer data with portfolio information
export const enhancePhotographerData = (photographer: Photographer): PhotographerWithPortfolio => {
  // Default portfolio data
  const portfolio = {
    images: [
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      "https://images.unsplash.com/photo-1511285367051-162a4b6feaa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      "https://images.unsplash.com/photo-1570475735025-6cd1cd5c779d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      "https://images.unsplash.com/photo-1494955870715-979ca4f13bf0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80"
    ],
    specialties: ['Traditional Ceremonies', 'Candid Moments', 'Couple Portraits'],
    experience: '8+ years'
  };

  // Customize portfolio based on photographer
  if (photographer.name === "Amit Sharma") {
    portfolio.specialties = ['Traditional Ceremonies', 'Candid Moments', 'Couple Portraits'];
    portfolio.experience = '10+ years';
  } else if (photographer.name === "Priya Patel") {
    portfolio.specialties = ['Bridal Details', 'Emotional Moments', 'Fine Art Portraits'];
    portfolio.experience = '7+ years';
  } else if (photographer.name === "Vivek Kapoor") {
    portfolio.specialties = ['Cinematic Storytelling', 'Drone Videography', 'Same-Day Edits'];
    portfolio.experience = '12+ years';
  }

  return {
    ...photographer,
    portfolio
  };
};
