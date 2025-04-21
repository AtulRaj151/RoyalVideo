import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { scrollToElement } from "@/lib/utils";

export default function HeroSection() {
  const scrollToServices = () => {
    scrollToElement("services");
  };
  
  return (
    <section className="relative h-screen mt-16 overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <img 
        src="https://images.unsplash.com/photo-1630945386735-372fbe731e3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&h=1080&q=80" 
        alt="Indian Wedding Celebration" 
        className="object-cover w-full h-full"
      />
      
      <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 drop-shadow-lg">
            Capture the Magic of Your <span className="text-secondary">Indian Wedding</span>
          </h1>
          <p className="text-lg md:text-2xl text-white mb-8 drop-shadow-md max-w-2xl mx-auto">
            Premium photography and videography services for your most precious celebrations
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 justify-center">
            <Link href="/booking">
              <Button className="px-8 py-3 bg-primary text-white rounded-md text-lg font-medium hover:bg-[#B71C1C] transition-colors shadow-lg">
                Book a Consultation
              </Button>
            </Link>
            <Link href="/photographers">
              <Button variant="secondary" className="px-8 py-3 bg-white text-primary rounded-md text-lg font-medium hover:bg-gray-100 transition-colors shadow-lg">
                View Portfolio
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
        <button onClick={scrollToServices} className="text-white">
          <i className="fas fa-chevron-down text-2xl"></i>
        </button>
      </div>
    </section>
  );
}
