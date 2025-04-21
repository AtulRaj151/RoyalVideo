import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="py-20 px-4 bg-accent relative">
      <div className="absolute inset-0 opacity-10">
        <img 
          src="https://images.unsplash.com/photo-1604611374909-f8a7c809ecca?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600&q=80"
          alt="Background Pattern" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-white">
            Preserve Your Wedding Memories Forever
          </h2>
          <p className="text-lg md:text-xl text-white/80 mb-8">
            Book your consultation today and let us capture the magic of your Indian wedding
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 justify-center">
            <Link href="/booking">
              <Button variant="secondary" className="px-8 py-3 bg-white text-primary rounded-md text-lg font-medium hover:bg-gray-100 transition-colors shadow-lg">
                Book a Consultation
              </Button>
            </Link>
            <a href="#contact">
              <Button variant="outline" className="px-8 py-3 border-2 border-white text-white rounded-md text-lg font-medium hover:bg-white/10 transition-colors shadow-lg">
                Contact Us
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
