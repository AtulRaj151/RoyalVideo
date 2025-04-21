import { Helmet } from "react-helmet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const galleryImages = [
  {
    id: 1,
    category: "wedding",
    src: "https://images.unsplash.com/photo-1564505373851-c21dedbc80ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=900&q=80",
    alt: "Traditional Ceremony",
    location: "Mumbai, Maharashtra"
  },
  {
    id: 2,
    category: "portraits",
    src: "https://images.unsplash.com/photo-1512241861367-33f536b9b878?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    alt: "Bridal Portrait",
    location: "Delhi"
  },
  {
    id: 3,
    category: "events",
    src: "https://images.unsplash.com/photo-1631771968027-9b30071549da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    alt: "Mehendi Celebration",
    location: "Jaipur, Rajasthan"
  },
  {
    id: 4,
    category: "venues",
    src: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=900&q=80",
    alt: "Venue Decoration",
    location: "Udaipur, Rajasthan"
  },
  {
    id: 5,
    category: "wedding",
    src: "https://images.unsplash.com/photo-1604604557577-4e27a33e57da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
    alt: "Wedding Ceremony",
    location: "Chennai, Tamil Nadu"
  },
  {
    id: 6,
    category: "events",
    src: "https://images.unsplash.com/photo-1606096394864-397f99346a92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    alt: "Sangeet Night",
    location: "Ahmedabad, Gujarat"
  },
  {
    id: 7,
    category: "portraits",
    src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    alt: "Couple Portrait",
    location: "Kolkata, West Bengal"
  },
  {
    id: 8,
    category: "venues",
    src: "https://images.unsplash.com/photo-1601224335132-78f9be8667d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
    alt: "Outdoor Venue",
    location: "Goa"
  }
];

export default function Gallery() {
  const [activeTab, setActiveTab] = useState("all");
  
  const filteredImages = activeTab === "all" 
    ? galleryImages 
    : galleryImages.filter(image => image.category === activeTab);

  return (
    <>
      <Helmet>
        <title>Photo Gallery - Wedding Memories</title>
        <meta name="description" content="Browse our portfolio of Indian wedding photography and videography" />
      </Helmet>

      <div className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-playfair text-3xl md:text-4xl font-bold mb-4">Our Photo Gallery</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A glimpse into the beautiful moments we've captured at Indian weddings
            </p>
          </div>

          <Tabs 
            defaultValue="all" 
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full max-w-3xl mx-auto mb-10"
          >
            <TabsList className="grid grid-cols-5 w-full">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="wedding">Weddings</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="portraits">Portraits</TabsTrigger>
              <TabsTrigger value="venues">Venues</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {filteredImages.map((image) => (
              <div 
                key={image.id}
                className="relative group overflow-hidden rounded-lg aspect-[4/3]"
              >
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-white text-center">
                    <h3 className="font-playfair text-xl font-bold mb-2">{image.alt}</h3>
                    <p className="text-sm">{image.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
