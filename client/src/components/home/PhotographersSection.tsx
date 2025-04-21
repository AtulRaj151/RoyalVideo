import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Photographer } from "@shared/schema";

export default function PhotographersSection() {
  const [photographers, setPhotographers] = useState<Photographer[]>([]);
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['/api/photographers'],
  });
  
  useEffect(() => {
    if (data) {
      setPhotographers(data);
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
  }, [photographers]);
  
  return (
    <section id="photographers" className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-3 fancy-border inline-block">
            Meet Our Photographers
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our team of talented photographers specializes in capturing the beauty and tradition of Indian weddings
          </p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500">
            Error loading photographers. Please try again later.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {photographers.map((photographer) => (
              <div 
                key={photographer.id}
                className="bg-neutral-light rounded-lg overflow-hidden shadow-md transition-all hover:shadow-xl scroll-animation"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={photographer.image}
                    alt={`Photographer ${photographer.name}`}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white p-4">
                    <h3 className="font-display text-xl font-semibold">{photographer.name}</h3>
                    <p className="text-sm">{photographer.title}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{photographer.bio}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      {photographer.instagram && (
                        <a href={photographer.instagram} className="text-neutral-dark hover:text-primary transition-colors">
                          <i className="fab fa-instagram"></i>
                        </a>
                      )}
                      {photographer.facebook && (
                        <a href={photographer.facebook} className="text-neutral-dark hover:text-primary transition-colors">
                          <i className="fab fa-facebook"></i>
                        </a>
                      )}
                      {photographer.website && (
                        <a href={photographer.website} className="text-neutral-dark hover:text-primary transition-colors">
                          <i className="fas fa-globe"></i>
                        </a>
                      )}
                    </div>
                    <Link href={`/photographers/${photographer.id}`} className="text-primary font-medium hover:underline">
                      View Portfolio
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="text-center mt-10">
          <Link href="/photographers">
            <Button variant="outline" className="px-6 py-3 border-2 border-primary text-primary rounded-md font-medium hover:bg-primary hover:text-white transition-colors">
              Meet The Entire Team
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
