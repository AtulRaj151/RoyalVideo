import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary"></div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-secondary/20 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white/10 blur-3xl"></div>
        
        {/* Decorative patterns */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <defs>
              <pattern id="paisley" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M30,10 C40,20 20,35 25,20 C30,5 40,15 35,25 C30,35 15,30 20,15" stroke="white" fill="none" strokeWidth="0.5"></path>
                <path d="M15,5 C25,15 5,30 10,15 C15,0 25,10 20,20 C15,30 0,25 5,10" stroke="white" fill="none" strokeWidth="0.5"></path>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#paisley)" />
          </svg>
        </div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Two-column layout on larger screens */}
          <div className="flex flex-col md:flex-row items-center md:space-x-10">
            {/* Left column - text content */}
            <div className="md:w-2/3 text-center md:text-left mb-10 md:mb-0">
              {/* Decorative line */}
              <div className="w-24 h-1 bg-secondary mb-8 mx-auto md:mx-0"></div>
              
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-white leading-tight">
                Royal Videography <span className="text-secondary">Dehri-on-Sone</span>
              </h2>
              
              <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
                Book your consultation today with Ajay Sharma & Raja Sharma. We capture the magic, colors, and emotions of your wedding celebrations in stunning detail.
              </p>
              
              {/* Testimonial highlight */}
              <div className="hidden md:block">
                <div className="flex items-center mt-8">
                  <div className="flex -space-x-2">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary font-bold">A</div>
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary font-bold">R</div>
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary font-bold">S</div>
                  </div>
                  <div className="ml-4">
                    <p className="text-white/90 text-sm italic">"Professional photography by Ajay & Raja Sharma!"</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right column - CTA buttons */}
            <div className="md:w-1/3">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 shadow-2xl border border-white/20">
                <h3 className="text-white text-xl font-semibold mb-4">Ready to get started?</h3>
                <div className="flex flex-col space-y-4">
                  <Link href="/booking">
                    <Button className="w-full px-8 py-6 bg-secondary text-primary rounded-md text-lg font-medium hover:bg-secondary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
                      Book a Consultation
                    </Button>
                  </Link>
                  <a href="#contact">
                    <Button variant="outline" className="w-full px-8 py-6 bg-transparent border-2 border-white text-white rounded-md text-lg font-medium hover:bg-white/10 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
                      Contact Us
                    </Button>
                  </a>
                </div>
                
                {/* Trust badges */}
                <div className="mt-6 pt-6 border-t border-white/20 text-center">
                  <p className="text-white/70 text-sm mb-3">Based in Dehri-on-Sone, Bihar</p>
                  <div className="flex justify-center space-x-4">
                    <div className="text-secondary"><i className="fas fa-camera-retro"></i></div>
                    <div className="text-secondary"><i className="fas fa-video"></i></div>
                    <div className="text-secondary"><i className="fas fa-user-tie"></i></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
