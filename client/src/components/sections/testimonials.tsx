import { useQuery } from "@tanstack/react-query";
import { Testimonial } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { Link } from "wouter";
import { Loader2 } from "lucide-react";

export default function Testimonials() {
  const { data: testimonials, isLoading } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  // Function to render star rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="fill-gold-500 text-gold-500" />);
    }
    
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="text-gold-500" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star className="fill-gold-500 text-gold-500" />
          </div>
        </div>
      );
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="text-gold-500" />);
    }
    
    return <div className="flex">{stars}</div>;
  };

  return (
    <section id="testimonials" className="py-16 px-4 bg-gradient-to-r from-maroon-600 to-maroon-800 text-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">Words from Happy Couples</h2>
          <p className="max-w-2xl mx-auto opacity-80">See what our clients have to say about their experience with our photography services</p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-white" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials?.map((testimonial) => (
              <div 
                key={testimonial.id} 
                className="bg-white/10 backdrop-blur-sm p-6 rounded-lg hover:bg-white/20 transition-colors duration-300"
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=a50e0e&color=fff`} 
                    alt={testimonial.name} 
                    className="w-14 h-14 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm opacity-80">{testimonial.location}, {testimonial.event}: {testimonial.date}</p>
                  </div>
                </div>
                <div className="mb-4">
                  {renderStars(testimonial.rating)}
                </div>
                <p className="italic opacity-90">"{testimonial.comment}"</p>
              </div>
            ))}
          </div>
        )}
        
        <div className="text-center mt-10">
          <Button 
            asChild
            variant="outline" 
            className="px-6 py-3 border-2 border-white text-white hover:bg-white/10"
          >
            <Link href="/testimonials">
              Read More Testimonials →
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
