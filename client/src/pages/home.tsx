import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import FeaturedWorkSection from "@/components/home/FeaturedWorkSection";
import PhotographersSection from "@/components/home/PhotographersSection";
import PackagesSection from "@/components/home/PackagesSection";
import BookingProcessSection from "@/components/home/BookingProcessSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";
import { useEffect } from "react";

export default function Home() {
  // Initialize scroll animations
  useEffect(() => {
    const scrollAnimations = document.querySelectorAll('.scroll-animation');
    
    const checkScroll = () => {
      scrollAnimations.forEach(animation => {
        const offsetTop = animation.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (offsetTop < windowHeight * 0.9) {
          animation.classList.add('animate');
        }
      });
    };
    
    // Initial check
    checkScroll();
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);
  
  return (
    <div>
      <HeroSection />
      <ServicesSection />
      <FeaturedWorkSection />
      <PhotographersSection />
      <PackagesSection />
      <BookingProcessSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}
