import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Service } from "@shared/schema";

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['/api/services'],
  });
  
  useEffect(() => {
    if (data) {
      setServices(data);
    }
  }, [data]);
  
  return (
    <div className="py-24 pt-32 px-4 bg-white min-h-screen">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Our Photography & Videography Services</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive media services tailored specifically for Indian weddings and celebrations
          </p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-12">
            Error loading services. Please try again later.
          </div>
        ) : (
          <div className="space-y-16">
            {services.map((service) => (
              <div 
                key={service.id}
                id={service.name.toLowerCase().replace(/\s+/g, '-')}
                className="flex flex-col md:flex-row gap-8 items-center"
              >
                <div className="md:w-1/2">
                  <img 
                    src={service.image}
                    alt={service.name} 
                    className="w-full h-auto rounded-lg shadow-md"
                  />
                </div>
                <div className="md:w-1/2">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4">
                      <i className={`fas fa-${service.icon} text-xl`}></i>
                    </div>
                    <h2 className="font-display text-3xl font-semibold">{service.name}</h2>
                  </div>
                  
                  <p className="text-gray-600 mb-6 text-lg">{service.description}</p>
                  
                  {service.name === "Photography" && (
                    <div className="mb-6">
                      <h3 className="font-semibold text-lg mb-2">What's Included:</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                          <span>Professional photographers specializing in Indian weddings</span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                          <span>High-resolution digital photos with professional editing</span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                          <span>Coverage of all ceremonies and events</span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                          <span>Candid and posed photography styles</span>
                        </li>
                      </ul>
                    </div>
                  )}
                  
                  {service.name === "Videography" && (
                    <div className="mb-6">
                      <h3 className="font-semibold text-lg mb-2">What's Included:</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                          <span>Professional cinematographers with Indian wedding experience</span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                          <span>Full-length wedding film</span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                          <span>Cinematic highlight reel (5-15 minutes)</span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                          <span>Professional editing with music and audio enhancement</span>
                        </li>
                      </ul>
                    </div>
                  )}
                  
                  {service.name === "Drone Services" && (
                    <div className="mb-6">
                      <h3 className="font-semibold text-lg mb-2">What's Included:</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                          <span>Licensed and insured drone operators</span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                          <span>Breathtaking aerial shots of venue and celebrations</span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                          <span>Perfect for baraat processions and outdoor ceremonies</span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                          <span>Integrated into final photo and video deliverables</span>
                        </li>
                      </ul>
                    </div>
                  )}
                  
                  {service.name === "Wedding Reels" && (
                    <div className="mb-6">
                      <h3 className="font-semibold text-lg mb-2">What's Included:</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                          <span>Short, shareable social media-ready videos</span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                          <span>Quick turnaround options for same-day sharing</span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                          <span>Trending music and effects</span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                          <span>Multiple format options for different platforms</span>
                        </li>
                      </ul>
                    </div>
                  )}
                  
                  <Link href={`/booking?service=${service.id}`}>
                    <Button className="px-6 py-3">Book This Service</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-display font-bold mb-4">Ready to Book Your Wedding Photography?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Contact us today to check availability for your wedding date and discuss your specific requirements.
          </p>
          <Link href="/booking">
            <Button size="lg" className="px-8 py-3 text-lg">
              Book a Consultation
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
