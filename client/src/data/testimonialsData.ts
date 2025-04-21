// This file provides the type definitions for testimonial data
// The actual data is fetched from the server API
import { Testimonial } from '@shared/schema';

// No additional frontend-specific fields are needed for testimonials currently
// This file is included for consistency with other data files and future extensibility

// Function to calculate rating display value from numerical rating
export const getRatingDisplay = (rating: number): { stars: number, halfStar: boolean, emptyStars: number } => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  return {
    stars: fullStars,
    halfStar: hasHalfStar,
    emptyStars
  };
};

// Function to format testimonial date
export const formatTestimonialDate = (dateStr: string): string => {
  // Assuming format is something like "March 2023" already
  return dateStr;
};
