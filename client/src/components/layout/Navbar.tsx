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
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
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
  
  const handleMouseEnter = (dropdown: string) => {
    setActiveDropdown(dropdown);
  };
  
  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };
  
  // Navbar styles based on scroll position
  const navbarClasses = `fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
    isScrolled 
      ? "bg-white/95 backdrop-blur-sm shadow-lg py-3" 
      : "bg-transparent py-5"
  }`;
  
  // Navigation link styles
  const linkClasses = `relative font-medium transition-all px-3 py-2 rounded-md hover:scale-105 ${
    isScrolled 
      ? "text-primary hover:bg-primary/5" 
      : "text-white hover:bg-white/10"
  }`;
  
  // Active link indicator
  const activeLinkClasses = `after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:rounded-full after:bg-secondary`;
  
  // Logo styles
  const logoClasses = `font-display text-2xl font-bold ${
    isScrolled ? "text-primary" : "text-white"
  }`;
  
  const logoSpanClasses = "text-secondary";
  
  // Logo icon styles
  const iconBorderClasses = `h-10 w-10 flex items-center justify-center rounded-full ${
    isScrolled 
      ? "bg-primary/10 text-primary" 
      : "bg-white/10 text-white backdrop-blur-sm"
  }`;
  
  // Mobile menu button styles
  const menuButtonClasses = `md:hidden p-2 rounded-full transition-colors ${
    isScrolled 
      ? "bg-primary/5 text-primary hover:bg-primary/10" 
      : "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
  }`;
  
  return (
    <nav className={navbarClasses}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className={`${iconBorderClasses} transform transition-transform group-hover:rotate-12`}>
            <i className="fas fa-camera-retro text-xl"></i>
          </div>
          <div>
            <span className={logoClasses}>
              Royal <span className={logoSpanClasses}>Videography</span>
            </span>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          <Link href="/services" className={`${linkClasses} ${location === '/services' ? activeLinkClasses : ''}`}>
            <div className="flex items-center">
              <i className="fas fa-camera-retro mr-2 text-secondary opacity-80"></i>
              <span>Services</span>
            </div>
          </Link>
          
          <Link href="/photographers" className={`${linkClasses} ${location === '/photographers' ? activeLinkClasses : ''}`}>
            <div className="flex items-center">
              <i className="fas fa-user-tie mr-2 text-secondary opacity-80"></i>
              <span>Photographers</span>
            </div>
          </Link>
          
          <Link href="/packages" className={`${linkClasses} ${location === '/packages' ? activeLinkClasses : ''}`}>
            <div className="flex items-center">
              <i className="fas fa-box-open mr-2 text-secondary opacity-80"></i>
              <span>Packages</span>
            </div>
          </Link>
          
          <div className="relative" onMouseEnter={() => handleMouseEnter('gallery')} onMouseLeave={handleMouseLeave}>
            <Link href="/gallery" className={`${linkClasses} ${location === '/gallery' ? activeLinkClasses : ''}`}>
              <div className="flex items-center">
                <i className="fas fa-images mr-2 text-secondary opacity-80"></i>
                <span>Gallery</span>
                <i className="fas fa-chevron-down ml-1 text-xs"></i>
              </div>
            </Link>
            
            {/* Gallery Dropdown */}
            {activeDropdown === 'gallery' && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-xl animate-fade-in-down origin-top-right p-2">
                <div className="py-1 space-y-1">
                  <Link href="/gallery?category=weddings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary rounded-md">Wedding Photos</Link>
                  <Link href="/gallery?category=pre-wedding" className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary rounded-md">Pre-Wedding</Link>
                  <Link href="/gallery?category=events" className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary rounded-md">Special Events</Link>
                </div>
              </div>
            )}
          </div>
          
          <a href="/#testimonials" className={linkClasses}>
            <div className="flex items-center">
              <i className="fas fa-star mr-2 text-secondary opacity-80"></i>
              <span>Testimonials</span>
            </div>
          </a>
          
          <a href="/#contact" className={linkClasses}>
            <div className="flex items-center">
              <i className="fas fa-phone-alt mr-2 text-secondary opacity-80"></i>
              <span>Contact</span>
            </div>
          </a>
        </div>
        
        {/* Right Side Navigation */}
        <div className="flex items-center space-x-3">
          {/* Auth Buttons */}
          {isAuthenticated_ ? (
            <div className="relative hidden md:block" onMouseEnter={() => handleMouseEnter('profile')} onMouseLeave={handleMouseLeave}>
              <Button
                variant="ghost"
                className={`px-4 py-2 ${isScrolled ? "text-primary" : "text-white"} flex items-center space-x-2`}
              >
                <i className="fas fa-user-circle text-xl"></i>
                <span>My Account</span>
                <i className="fas fa-chevron-down text-xs"></i>
              </Button>
              
              {/* Profile Dropdown */}
              {activeDropdown === 'profile' && (
                <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-lg shadow-xl animate-fade-in-down origin-top-right p-2">
                  <div className="py-1 space-y-1">
                    <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary rounded-md">
                      <i className="fas fa-user mr-2"></i> My Profile
                    </Link>
                    <Link href="/profile/bookings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary rounded-md">
                      <i className="fas fa-calendar-check mr-2"></i> My Bookings
                    </Link>
                    <div className="border-t border-gray-200 my-1"></div>
                    <button className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary rounded-md">
                      <i className="fas fa-sign-out-alt mr-2"></i> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" className="hidden md:block">
              <Button 
                variant="ghost" 
                className={`${isScrolled ? "text-primary hover:bg-primary/5" : "text-white hover:bg-white/10"}`}
              >
                <i className="fas fa-sign-in-alt mr-2"></i>
                Sign In
              </Button>
            </Link>
          )}
          
          {/* Book Now Button */}
          <Link href="/booking">
            <Button 
              className="hidden md:block transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              variant={isScrolled ? "default" : "secondary"}
            >
              <i className="fas fa-calendar-plus mr-2"></i>
              Book Now
            </Button>
          </Link>
          
          {/* Mobile Menu Button */}
          <button 
            className={menuButtonClasses}
            onClick={toggleMenu}
            aria-label="Toggle mobile menu"
          >
            <i className={isMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation Slide-in Menu */}
      <div 
        className={`md:hidden fixed inset-y-0 right-0 transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out bg-white w-5/6 max-w-sm h-screen z-50 shadow-2xl overflow-y-auto`}
      >
        <div className="p-6">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
            <Link href="/" className="flex items-center space-x-2" onClick={() => setIsMenuOpen(false)}>
              <div className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                <i className="fas fa-camera-retro text-xl"></i>
              </div>
              <span className="font-display text-2xl font-bold text-primary">
                Royal <span className="text-secondary">Videography</span>
              </span>
            </Link>
            <button 
              className="p-2 rounded-full bg-gray-100 text-gray-600"
              onClick={toggleMenu}
              aria-label="Close menu"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          
          {/* Mobile Menu Links */}
          <div className="space-y-4">
            <Link href="/services" className="block py-3 px-4 text-lg font-medium border-b border-gray-100 hover:bg-primary/5 rounded-lg" onClick={() => setIsMenuOpen(false)}>
              <i className="fas fa-camera-retro mr-3 text-secondary w-6"></i> Services
            </Link>
            <Link href="/photographers" className="block py-3 px-4 text-lg font-medium border-b border-gray-100 hover:bg-primary/5 rounded-lg" onClick={() => setIsMenuOpen(false)}>
              <i className="fas fa-user-tie mr-3 text-secondary w-6"></i> Photographers
            </Link>
            <Link href="/packages" className="block py-3 px-4 text-lg font-medium border-b border-gray-100 hover:bg-primary/5 rounded-lg" onClick={() => setIsMenuOpen(false)}>
              <i className="fas fa-box-open mr-3 text-secondary w-6"></i> Packages
            </Link>
            <Link href="/gallery" className="block py-3 px-4 text-lg font-medium border-b border-gray-100 hover:bg-primary/5 rounded-lg" onClick={() => setIsMenuOpen(false)}>
              <i className="fas fa-images mr-3 text-secondary w-6"></i> Gallery
            </Link>
            <a href="/#testimonials" className="block py-3 px-4 text-lg font-medium border-b border-gray-100 hover:bg-primary/5 rounded-lg" onClick={() => setIsMenuOpen(false)}>
              <i className="fas fa-star mr-3 text-secondary w-6"></i> Testimonials
            </a>
            <a href="/#contact" className="block py-3 px-4 text-lg font-medium border-b border-gray-100 hover:bg-primary/5 rounded-lg" onClick={() => setIsMenuOpen(false)}>
              <i className="fas fa-phone-alt mr-3 text-secondary w-6"></i> Contact Us
            </a>
          </div>
          
          {/* Mobile CTA Buttons */}
          <div className="mt-8 space-y-4">
            {isAuthenticated_ ? (
              <Link href="/profile" className="block" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-full border-primary text-primary justify-center py-6">
                  <i className="fas fa-user-circle mr-2"></i> My Account
                </Button>
              </Link>
            ) : (
              <Link href="/login" className="block" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-full border-primary text-primary justify-center py-6">
                  <i className="fas fa-sign-in-alt mr-2"></i> Sign In
                </Button>
              </Link>
            )}
            <Link href="/booking" className="block" onClick={() => setIsMenuOpen(false)}>
              <Button className="w-full justify-center bg-gradient-to-r from-primary to-accent py-6">
                <i className="fas fa-calendar-plus mr-2"></i> Book Now
              </Button>
            </Link>
          </div>
          
          {/* Mobile Contact Info */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <i className="fas fa-phone mr-3 text-secondary"></i> +91 8083437728, +91 8340608143
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <i className="fas fa-envelope mr-3 text-secondary"></i> royalvideography@gmail.com
            </div>
            <div className="flex items-center text-sm text-gray-500 mt-2">
              <i className="fas fa-user mr-3 text-secondary"></i> Owner: Ajay Sharma
            </div>
            
            {/* Social Media Icons */}
            <div className="flex space-x-4 mt-4">
              <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Overlay when mobile menu is open */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={toggleMenu}
        ></div>
      )}
    </nav>
  );
}
