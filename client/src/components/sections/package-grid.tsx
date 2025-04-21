import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Package } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

export default function PackageGrid() {
  const { data: packages, isLoading } = useQuery<Package[]>({
    queryKey: ["/api/packages"],
  });

  return (
    <section className="py-16 px-4 bg-maroon-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">Wedding Packages</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Select the perfect package for your special day, each carefully designed to capture the magic of Indian weddings
          </p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="h-8 w-8 animate-spin text-maroon-600" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages?.map((pkg) => (
              <div 
                key={pkg.id} 
                className={`bg-white rounded-lg overflow-hidden shadow-lg border ${
                  pkg.isPopular ? 'border-gold-500 transform scale-105 z-10' : 'border-gray-100'
                }`}
              >
                {pkg.isPopular && (
                  <div className="bg-gold-600 text-white text-center py-2 text-sm font-medium">MOST POPULAR</div>
                )}
                <div className="p-1">
                  <div className="bg-maroon-50 p-5 text-center">
                    <h3 className="font-playfair text-2xl font-bold text-maroon-600">{pkg.name}</h3>
                    <p className="text-gray-600 mt-1">{pkg.description}</p>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">{formatCurrency(pkg.price)}</span>
                      <span className="text-gray-500">/package</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-3">
                      {pkg.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="text-green-500 mt-1 mr-2 h-5 w-5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                      {/* If we have features marked as not included */}
                      {pkg.name === "Essential" && (
                        <>
                          <li className="flex items-start text-gray-400">
                            <XCircle className="mt-1 mr-2 h-5 w-5" />
                            <span>No Videography included</span>
                          </li>
                          <li className="flex items-start text-gray-400">
                            <XCircle className="mt-1 mr-2 h-5 w-5" />
                            <span>No Drone coverage</span>
                          </li>
                        </>
                      )}
                    </ul>
                    <Button
                      asChild
                      className={`w-full mt-6 py-6 ${
                        pkg.isPopular 
                          ? 'bg-gold-600 hover:bg-gold-700 text-white' 
                          : 'bg-maroon-600 hover:bg-maroon-700 text-white'
                      }`}
                    >
                      <Link href="/booking">
                        Select Package
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Need a custom package? We can tailor our services to your specific needs.</p>
          <Button 
            asChild 
            variant="outline" 
            className="border-maroon-600 text-maroon-600 hover:bg-maroon-50"
          >
            <Link href="/booking">
              Request Custom Quote
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
