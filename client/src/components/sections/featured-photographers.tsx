import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Photographer } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, normalizeRating } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export default function FeaturedPhotographers() {
  const { data: photographers, isLoading } = useQuery<Photographer[]>({
    queryKey: ["/api/photographers"],
  });

  return (
    <section className="py-16 px-4 bg-gradient-to-r from-maroon-50 to-cream">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">Meet Our Featured Photographers</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Talented professionals specialized in capturing the beauty and traditions of Indian weddings
          </p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="h-8 w-8 animate-spin text-maroon-600" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {photographers?.slice(0, 3).map((photographer) => (
              <div 
                key={photographer.id} 
                className="bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                <div className="relative">
                  <img 
                    src={photographer.profileImage} 
                    alt={`Photographer ${photographer.name}`} 
                    className="w-full h-64 object-cover"
                  />
                  {photographer.experience > 10 ? (
                    <div className="absolute top-4 right-4 bg-maroon-600 text-white text-xs px-2 py-1 rounded-full">
                      Top Rated
                    </div>
                  ) : photographer.experience > 8 ? (
                    <div className="absolute top-4 right-4 bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                      Featured
                    </div>
                  ) : null}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-playfair text-xl font-bold">{photographer.name}</h3>
                    <div className="flex items-center">
                      <span className="text-gold-600">★</span>
                      <span className="ml-1 text-gray-700 font-medium">
                        {normalizeRating(photographer.rating)}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    {photographer.specialization}. {photographer.experience}+ years experience.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {photographer.specialization.split(" ").map((spec, index) => (
                      <Badge key={index} variant="outline" className="bg-maroon-50 text-maroon-600 hover:bg-maroon-100">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-maroon-600 font-semibold">
                      {formatCurrency(photographer.pricePerDay)}/day
                    </span>
                    <Button variant="outline" className="border-maroon-600 text-maroon-600 hover:bg-maroon-50">
                      View Portfolio
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="text-center mt-10">
          <Button asChild className="bg-maroon-600 hover:bg-maroon-700 text-white">
            <Link href="/photographers">
              View All Photographers →
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
