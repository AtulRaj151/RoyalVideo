import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { isAuthenticated } from "@/lib/utils";

type NavbarProps = {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
};

export default function Navbar({ isMenuOpen, setIsMenuOpen }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();
  const [isAuthenticated_, setIsAuthenticated] = useState(false);
  
  // Check if user is authenticated
  useEffect(() => {
    setIsAuthenticated(isAuthenticated());
  }, [location]);
  
  // Change navbar style on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };
  
  const navbarClasses = `fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
    isScrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"
  }`;
  
  const linkClasses = `font-medium transition-colors ${
    isScrolled ? "hover:text-primary text-neutral-dark" : "hover:text-white/80 text-white"
  }`;
  
  const logoClasses = `font-display text-2xl font-bold ${
    isScrolled ? "text-primary" : "text-white"
  }`;
  
  const logoSpanClasses = isScrolled ? "text-secondary" : "text-secondary";
  
  const iconBorderClasses = `h-10 w-10 flex items-center justify-center rounded-full border-2 ${
    isScrolled ? "border-primary text-primary" : "border-white text-white"
  }`;
  
  return (
    <nav className={navbarClasses}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <div className={iconBorderClasses}>
            <i className="fas fa-camera-retro text-xl"></i>
          </div>
          <div>
            <span className={logoClasses}>
              Vivah<span className={logoSpanClasses}>Lens</span>
            </span>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/services" className={linkClasses}>Services</Link>
          <Link href="/photographers" className={linkClasses}>Photographers</Link>
          <Link href="/packages" className={linkClasses}>Packages</Link>
          <a href="/#testimonials" className={linkClasses}>Testimonials</a>
          <a href="/#contact" className={linkClasses}>Contact</a>
        </div>
        
        <div className="flex items-center space-x-4">
          {isAuthenticated_ ? (
            <Link href="/profile">
              <Button 
                variant="outline" 
                className={`hidden md:block ${isScrolled ? "border-primary text-primary hover:bg-primary hover:text-white" : "border-white text-white hover:bg-white/10"}`}
              >
                My Profile
              </Button>
            </Link>
          ) : (
            <Link href="/login">
              <Button 
                variant="outline" 
                className={`hidden md:block ${isScrolled ? "border-primary text-primary hover:bg-primary hover:text-white" : "border-white text-white hover:bg-white/10"}`}
              >
                Sign In
              </Button>
            </Link>
          )}
          
          <Link href="/booking">
            <Button 
              className="hidden md:block"
              variant={isScrolled ? "default" : "secondary"}
            >
              Book Now
            </Button>
          </Link>
          
          <button 
            className={`md:hidden text-2xl ${isScrolled ? "text-neutral-dark" : "text-white"}`}
            onClick={toggleMenu}
          >
            <i className={isMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white w-full shadow-md">
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
            <Link href="/services" className="font-medium py-2 border-b border-gray-100">Services</Link>
            <Link href="/photographers" className="font-medium py-2 border-b border-gray-100">Photographers</Link>
            <Link href="/packages" className="font-medium py-2 border-b border-gray-100">Packages</Link>
            <a href="/#testimonials" className="font-medium py-2 border-b border-gray-100">Testimonials</a>
            <a href="/#contact" className="font-medium py-2 border-b border-gray-100">Contact</a>
            <div className="flex space-x-3 py-2">
              {isAuthenticated_ ? (
                <Link href="/profile" className="flex-1">
                  <Button variant="outline" className="w-full border-primary text-primary">My Profile</Button>
                </Link>
              ) : (
                <Link href="/login" className="flex-1">
                  <Button variant="outline" className="w-full border-primary text-primary">Sign In</Button>
                </Link>
              )}
              <Link href="/booking" className="flex-1">
                <Button className="w-full">Book Now</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
