import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Service } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export default function ServiceCategories() {
  const { data: services, isLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto text-center mb-12">
        <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">Our Premium Services</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Choose from our range of specialized services tailored for Indian weddings and celebrations
        </p>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <Loader2 className="h-8 w-8 animate-spin text-maroon-600" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {services?.map((service) => (
            <div 
              key={service.id} 
              className="group bg-cream rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={`${service.name} Service`} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="font-playfair text-white text-xl font-semibold">{service.name}</h3>
                </div>
              </div>
              <div className="p-5">
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-maroon-600 font-semibold">Starting at {formatCurrency(service.price)}</span>
                  <Button asChild size="sm" className="bg-maroon-600 hover:bg-maroon-700 text-white">
                    <Link href={`/services`}>
                      Explore
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
