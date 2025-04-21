import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60 z-10"></div>
      <div className="relative h-full w-full">
        <img 
          src="https://images.unsplash.com/photo-1604604557577-4e27a33e57da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80" 
          alt="Indian Wedding Celebration" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
        <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight mb-4 max-w-4xl">
          Capturing the Essence of Indian Wedding Celebrations
        </h1>
        <p className="text-white text-lg md:text-xl mb-8 max-w-2xl">
          Professional photography & videography services for your most cherished moments
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <Button asChild size="lg" className="bg-maroon-600 hover:bg-maroon-700 text-white px-8">
            <Link href="/booking">
              Book Your Date
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8">
            <Link href="/gallery">
              View Our Work
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
