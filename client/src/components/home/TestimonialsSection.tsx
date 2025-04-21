import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Testimonial } from "@shared/schema";

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const testimonialsContainerRef = useRef<HTMLDivElement>(null);
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['/api/testimonials'],
  });
  
  useEffect(() => {
    if (data) {
      setTestimonials(data);
    }
  }, [data]);
  
  // Add scroll animation
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
  }, [testimonials]);
  
  // Testimonial carousel navigation
  const scrollTestimonials = (direction: 'prev' | 'next') => {
    if (!testimonialsContainerRef.current) return;
    
    const container = testimonialsContainerRef.current;
    const scrollAmount = direction === 'next' ? 350 : -350;
    
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };
  
  // Render star rating
  const renderStarRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    const stars = [];
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="fas fa-star"></i>);
    }
    
    // Add half star if needed
    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
    }
    
    // Add empty stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star"></i>);
    }
    
    return stars;
  };
  
  return (
    <section id="testimonials" className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-3 fancy-border inline-block">
            What Couples Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Read what our happy couples have to say about their wedding photography experience
          </p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500">
            Error loading testimonials. Please try again later.
          </div>
        ) : (
          <div className="relative">
            <div
              ref={testimonialsContainerRef}
              className="overflow-x-auto scrollbar-hide py-4"
              id="testimonials-container"
            >
              <div className="flex space-x-6 min-w-max px-4">
                {testimonials.map((testimonial) => (
                  <Card 
                    key={testimonial.id}
                    className="w-80 bg-neutral-light p-6 rounded-lg shadow-md flex flex-col"
                  >
                    <CardContent className="p-0">
                      <div className="flex items-center mb-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                          <img 
                            src={testimonial.image}
                            alt={`${testimonial.name} Avatar`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-display font-semibold">{testimonial.name}</h4>
                          <p className="text-sm text-gray-600">{testimonial.event}, {testimonial.date}</p>
                        </div>
                      </div>
                      <div className="mb-4 text-yellow-400">
                        {renderStarRating(testimonial.rating)}
                      </div>
                      <p className="text-gray-600 flex-grow">{testimonial.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            <button 
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-neutral-dark hover:bg-gray-100 transition-colors z-10 focus:outline-none md:block hidden"
              onClick={() => scrollTestimonials('prev')}
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            
            <button 
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-neutral-dark hover:bg-gray-100 transition-colors z-10 focus:outline-none md:block hidden"
              onClick={() => scrollTestimonials('next')}
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        )}
        
        <div className="text-center mt-10">
          <Link href="/testimonials" className="text-primary font-medium hover:underline">
            Read All Reviews <i className="fas fa-arrow-right ml-1"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}
