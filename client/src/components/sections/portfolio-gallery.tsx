import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const portfolioImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1564505373851-c21dedbc80ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=900&q=80",
    alt: "Traditional Ceremony",
    location: "Mumbai, Maharashtra",
    colSpan: "col-span-1 md:col-span-2"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1512241861367-33f536b9b878?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    alt: "Bridal Portrait",
    location: "Delhi",
    colSpan: "col-span-1"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1631771968027-9b30071549da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    alt: "Mehendi Celebration",
    location: "Jaipur, Rajasthan",
    colSpan: "col-span-1"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=900&q=80",
    alt: "Venue Decoration",
    location: "Udaipur, Rajasthan",
    colSpan: "col-span-1 md:col-span-2"
  }
];

export default function PortfolioGallery() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">Our Recent Work</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A glimpse into the beautiful moments we've captured at Indian weddings
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto mb-8">
          {portfolioImages.slice(0, 2).map((image) => (
            <div 
              key={image.id} 
              className={`${image.colSpan} relative group overflow-hidden rounded-lg ${image.id === 2 ? 'h-60 md:h-auto' : ''}`}
            >
              <img 
                src={image.src} 
                alt={image.alt} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white text-center">
                  <h3 className="font-playfair text-2xl font-bold mb-2">{image.alt}</h3>
                  <p className="text-sm">{image.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {portfolioImages.slice(2, 4).map((image) => (
            <div 
              key={image.id} 
              className={`${image.colSpan} relative group overflow-hidden rounded-lg ${image.id === 3 ? 'h-60 md:h-auto' : ''}`}
            >
              <img 
                src={image.src} 
                alt={image.alt} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white text-center">
                  <h3 className="font-playfair text-2xl font-bold mb-2">{image.alt}</h3>
                  <p className="text-sm">{image.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Button 
            asChild 
            variant="outline" 
            className="border-2 border-maroon-600 text-maroon-600 hover:bg-maroon-50"
          >
            <Link href="/gallery">
              Explore Full Gallery <span className="ml-2">🖼️</span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
