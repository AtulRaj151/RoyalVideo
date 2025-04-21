import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { scrollToElement } from "@/lib/utils";

export default function HeroSection() {
  const scrollToServices = () => {
    scrollToElement("services");
  };
  
  return (
    <section className="relative h-screen mt-16 overflow-hidden">
      {/* Background overlay gradient - more sophisticated than plain opacity */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70 z-10"></div>
      
      {/* Hero video background - using an image as fallback */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1630945386735-372fbe731e3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&h=1080&q=80" 
          alt="Indian Wedding Celebration" 
          className="object-cover w-full h-full"
        />
      </div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0 z-10 opacity-20 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-primary/30 blur-3xl"></div>
        <div className="absolute -bottom-40 -right-20 w-96 h-96 rounded-full bg-secondary/30 blur-3xl"></div>
      </div>
      
      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center px-4 text-center z-20">
        <div className="max-w-5xl">
          {/* Gold accent line above heading */}
          <div className="w-24 h-1 bg-secondary mx-auto mb-8"></div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 drop-shadow-lg">
            Royal <span className="text-secondary">Videography</span> <br />
            <span className="text-3xl md:text-5xl">Dehri-on-Sone, Bihar</span>
          </h1>
          
          <p className="text-lg md:text-2xl text-white mb-10 drop-shadow-md max-w-2xl mx-auto">
            Premium photography and videography services by Ajay Sharma & Raja Sharma
          </p>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 justify-center">
            <Link href="/booking">
              <Button className="px-10 py-6 bg-primary text-white rounded-md text-lg font-medium hover:bg-[#B71C1C] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
                Book a Consultation
              </Button>
            </Link>
            <Link href="/photographers">
              <Button variant="outline" className="px-10 py-6 bg-white/10 backdrop-blur-sm text-white border-white/30 rounded-md text-lg font-medium hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
                View Portfolio
              </Button>
            </Link>
          </div>
          
          {/* Small highlighted feature points */}
          <div className="hidden md:flex justify-center mt-12 space-x-10">
            <div className="text-white/80 flex items-center">
              <i className="fas fa-camera-retro text-secondary mr-2"></i>
              <span>Professional Videography</span>
            </div>
            <div className="text-white/80 flex items-center">
              <i className="fas fa-user-tie text-secondary mr-2"></i>
              <span>Owner: Ajay Sharma</span>
            </div>
            <div className="text-white/80 flex items-center">
              <i className="fas fa-phone text-secondary mr-2"></i>
              <span>+91 8083437728, +91 8340608143</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll down indicator with enhanced animation */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center z-20">
        <button 
          onClick={scrollToServices} 
          className="text-white group flex flex-col items-center"
        >
          <span className="text-sm mb-2 opacity-70 group-hover:opacity-100 transition-opacity">Discover More</span>
          <div className="w-10 h-10 rounded-full border-2 border-white/40 flex items-center justify-center group-hover:border-white/70 transition-all">
            <i className="fas fa-chevron-down text-lg animate-pulse"></i>
          </div>
        </button>
      </div>
    </section>
  );
}
