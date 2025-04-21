import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Photographer } from "@shared/schema";

export default function Photographers() {
  const [photographers, setPhotographers] = useState<Photographer[]>([]);
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['/api/photographers'],
  });
  
  useEffect(() => {
    if (data) {
      setPhotographers(data);
    }
  }, [data]);
  
  return (
    <div className="py-24 pt-32 px-4 bg-neutral-light min-h-screen">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Meet Our Photography Team</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our team of talented photographers and videographers specializes in capturing the beauty, traditions, and emotions of Indian weddings
          </p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-12">
            Error loading photographers. Please try again later.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {photographers.map((photographer) => (
                <Card 
                  key={photographer.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md transition-all hover:shadow-xl"
                >
                  <div className="relative h-80 overflow-hidden">
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
                  <CardContent className="p-6">
                    <p className="text-gray-600 mb-6">{photographer.bio}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-3">
                        {photographer.instagram && (
                          <a href={photographer.instagram} className="text-neutral-dark hover:text-primary transition-colors">
                            <i className="fab fa-instagram text-lg"></i>
                          </a>
                        )}
                        {photographer.facebook && (
                          <a href={photographer.facebook} className="text-neutral-dark hover:text-primary transition-colors">
                            <i className="fab fa-facebook text-lg"></i>
                          </a>
                        )}
                        {photographer.website && (
                          <a href={photographer.website} className="text-neutral-dark hover:text-primary transition-colors">
                            <i className="fas fa-globe text-lg"></i>
                          </a>
                        )}
                      </div>
                      <Link href={`/photographers/${photographer.id}`}>
                        <Button variant="outline" className="text-primary border-primary hover:bg-primary hover:text-white transition-colors">
                          View Portfolio
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-16 text-center bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto">
              <h2 className="text-2xl font-display font-bold mb-4">Work With Our Team</h2>
              <p className="text-gray-600 mb-6">
                Ready to have our talented photographers capture your special day? Book a consultation to discuss your vision and requirements.
              </p>
              <Link href="/booking">
                <Button className="px-6 py-3">Book a Consultation</Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
