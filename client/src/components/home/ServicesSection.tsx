import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { apiRequest } from "@/lib/queryClient";
import { useQuery } from "@tanstack/react-query";
import { Service } from "@shared/schema";

export default function ServicesSection() {
  const [services, setServices] = useState<Service[]>([]);
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['/api/services'],
  });
  
  useEffect(() => {
    if (data) {
      setServices(data);
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
  }, [services]);
  
  return (
    <section id="services" className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-3 fancy-border inline-block">
            Our Premium Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We offer comprehensive photography and videography services tailored specifically for Indian weddings
          </p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500">
            Error loading services. Please try again later.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <Card key={service.id} className="bg-neutral-light overflow-hidden shadow-md transition-all hover:shadow-xl scroll-animation">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={service.image}
                    alt={service.name} 
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">
                      <i className={`fas fa-${service.icon}`}></i>
                    </div>
                    <h3 className="font-display text-xl font-semibold">{service.name}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <Link href={`/services#${service.name.toLowerCase().replace(/\s+/g, '-')}`} className="text-primary font-medium flex items-center hover:underline">
                    Learn more <i className="fas fa-arrow-right ml-2 text-sm"></i>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
