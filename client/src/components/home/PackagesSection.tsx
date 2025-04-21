import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Package } from "@shared/schema";
import { formatPrice } from "@/lib/utils";

export default function PackagesSection() {
  const [packages, setPackages] = useState<Package[]>([]);
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['/api/packages'],
  });
  
  useEffect(() => {
    if (data) {
      setPackages(data);
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
  }, [packages]);
  
  return (
    <section id="packages" className="py-16 px-4 bg-accent">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-3 text-white fancy-border inline-block">
            Our Wedding Packages
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Choose from our curated packages or customize a solution that fits your specific needs
          </p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center">
            <div className="animate-spin w-8 h-8 border-4 border-white border-t-transparent rounded-full"></div>
          </div>
        ) : error ? (
          <div className="text-center text-white">
            Error loading packages. Please try again later.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div 
                key={pkg.id}
                className={`bg-white rounded-lg overflow-hidden shadow-xl transition-all hover:shadow-2xl 
                  ${pkg.isPopular ? 'transform scale-105 z-10 relative' : 'transform hover:-translate-y-1'} 
                  scroll-animation`}
              >
                {pkg.isPopular && (
                  <div className="absolute top-0 left-0 right-0 text-center">
                    <span className="inline-block bg-secondary text-white px-4 py-1 text-sm font-medium rounded-b-md">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className={`${pkg.isPopular ? 'bg-primary/10 pt-10' : 'bg-neutral-light'} p-6 text-center border-b border-gray-200`}>
                  <h3 className="font-display text-2xl font-semibold text-neutral-dark">{pkg.name}</h3>
                  <div className="mt-4 mb-2">
                    <span className="text-4xl font-bold text-primary">{formatPrice(pkg.price)}</span>
                  </div>
                  <p className="text-gray-600">{pkg.description}</p>
                </div>
                
                <div className="p-6">
                  <ul className="space-y-3">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-8">
                    <Link href={`/booking?package=${pkg.id}`}>
                      <Button 
                        variant={pkg.isPopular ? "default" : "outline"}
                        className="w-full py-3"
                      >
                        Select Package
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="text-center mt-12">
          <p className="text-white mb-4">Need a custom package for your specific requirements?</p>
          <Link href="/booking">
            <Button variant="secondary" className="px-6 py-3 bg-white text-primary rounded-md font-medium hover:bg-gray-100 transition-colors">
              Contact For Custom Quote
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
