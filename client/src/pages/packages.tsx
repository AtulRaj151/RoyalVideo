import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Package } from "@shared/schema";
import { formatPrice } from "@/lib/utils";

export default function Packages() {
  const [packages, setPackages] = useState<Package[]>([]);
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['/api/packages'],
  });
  
  useEffect(() => {
    if (data) {
      setPackages(data);
    }
  }, [data]);
  
  return (
    <div className="py-24 pt-32 px-4 bg-neutral-light min-h-screen">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Wedding Photography Packages</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our carefully designed packages to capture every moment of your special day
          </p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-12">
            Error loading packages. Please try again later.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg) => (
              <div 
                key={pkg.id}
                className={`bg-white rounded-lg overflow-hidden shadow-xl transition-all hover:shadow-2xl 
                  ${pkg.isPopular ? 'transform scale-105 z-10 relative' : ''}`}
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
        
        <div className="text-center mt-16 bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto">
          <h2 className="text-2xl font-display font-bold mb-4">Need a Custom Package?</h2>
          <p className="text-gray-600 mb-6">
            We understand that every wedding is unique. Contact us to create a custom package that perfectly suits your requirements and budget.
          </p>
          <Link href="/booking?custom=true">
            <Button className="px-6 py-3">Request Custom Quote</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
