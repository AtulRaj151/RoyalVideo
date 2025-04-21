import { useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

// Featured work data
const featuredWorks = [
  {
    id: 1,
    title: "Meera & Raj",
    subtitle: "Traditional Ceremony in Mumbai",
    image: "https://images.unsplash.com/photo-1511285367051-162a4b6feaa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80"
  },
  {
    id: 2,
    title: "Priya & Vikram",
    subtitle: "Grand Reception in Delhi",
    image: "https://images.unsplash.com/photo-1570475735025-6cd1cd5c779d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80"
  },
  {
    id: 3,
    title: "Anita & Sanjay",
    subtitle: "Destination Wedding in Udaipur",
    image: "https://images.unsplash.com/photo-1494955870715-979ca4f13bf0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80"
  },
  {
    id: 4,
    title: "Kavita & Arjun",
    subtitle: "Elegant Ceremony in Bangalore",
    image: "https://images.unsplash.com/photo-1617767868528-7948b5c68332?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80"
  },
  {
    id: 5,
    title: "Neha & Rohan",
    subtitle: "Traditional Ceremonies in Chennai",
    image: "https://images.unsplash.com/photo-1517722014278-c256a91a6fba?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80"
  },
  {
    id: 6,
    title: "Aisha & Omar",
    subtitle: "Fusion Wedding in Hyderabad",
    image: "https://images.unsplash.com/photo-1551979429-7e67e53091fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80"
  }
];

export default function FeaturedWorkSection() {
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
  }, []);
  
  return (
    <section className="py-16 px-4 bg-neutral-light">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-3 fancy-border inline-block">
            Our Featured Work
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse through our latest Indian wedding shoots and get inspired for your special day
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredWorks.map((work) => (
            <div 
              key={work.id}
              className="group relative overflow-hidden rounded-lg shadow-md h-64 scroll-animation"
            >
              <img 
                src={work.image}
                alt={work.title} 
                className="w-full h-full object-cover transition-transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <div className="text-white">
                  <h3 className="font-display text-xl font-semibold mb-1">{work.title}</h3>
                  <p className="text-sm opacity-90">{work.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link href="/photographers">
            <Button className="px-6 py-3 bg-primary text-white rounded-md font-medium hover:bg-[#B71C1C] transition-colors">
              View Full Gallery
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
