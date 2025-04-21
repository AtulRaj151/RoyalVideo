import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-neutral-dark to-black text-white pt-16 pb-8 px-4 relative overflow-hidden" id="contact">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/5 blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-secondary/5 blur-3xl"></div>
      
      <div className="container mx-auto relative z-10">
        {/* Top Section with Newsletter Form */}
        <div className="w-full bg-gradient-to-r from-primary/20 to-accent/20 backdrop-blur-sm rounded-2xl p-8 mb-16 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
              <defs>
                <pattern id="paisley-footer" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M30,10 C40,20 20,35 25,20 C30,5 40,15 35,25 C30,35 15,30 20,15" stroke="white" fill="none" strokeWidth="0.5"></path>
                  <path d="M15,5 C25,15 5,30 10,15 C15,0 25,10 20,20 C15,30 0,25 5,10" stroke="white" fill="none" strokeWidth="0.5"></path>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#paisley-footer)" />
            </svg>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">Get Updates on Our Latest <span className="text-secondary">Collections & Offers</span></h3>
              <p className="text-white/80 mb-0">Join our newsletter to receive updates about new photography packages, seasonal offers and wedding inspiration.</p>
            </div>
            <div>
              <form className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-grow px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-white placeholder:text-white/60"
                  required
                />
                <Button className="bg-secondary hover:bg-secondary/90 text-primary font-medium py-3 px-6">
                  Subscribe
                </Button>
              </form>
              <p className="text-white/60 text-sm mt-2">
                <i className="fas fa-shield-alt mr-2"></i> We respect your privacy. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="text-white h-12 w-12 flex items-center justify-center rounded-full bg-primary/20 backdrop-blur-sm">
                <i className="fas fa-camera-retro text-xl"></i>
              </div>
              <div>
                <span className="font-display text-2xl font-bold text-white">
                  Vivah<span className="text-secondary">Lens</span>
                </span>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Premium photography and videography services for Indian weddings, capturing traditions, emotions, and creating timeless memories of your special celebrations.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="h-10 w-10 rounded-full bg-white/10 hover:bg-secondary hover:text-primary flex items-center justify-center transition-all duration-300">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-white/10 hover:bg-secondary hover:text-primary flex items-center justify-center transition-all duration-300">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-white/10 hover:bg-secondary hover:text-primary flex items-center justify-center transition-all duration-300">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-white/10 hover:bg-secondary hover:text-primary flex items-center justify-center transition-all duration-300">
                <i className="fab fa-pinterest"></i>
              </a>
            </div>
            
            {/* Awards */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-white/80 text-sm mb-3 font-medium">Recognized by:</p>
              <div className="flex flex-wrap gap-3">
                <div className="px-3 py-1 bg-white/5 rounded-full text-xs text-white/70">
                  <i className="fas fa-award text-secondary mr-2"></i>Best Wedding Photography 2023
                </div>
                <div className="px-3 py-1 bg-white/5 rounded-full text-xs text-white/70">
                  <i className="fas fa-certificate text-secondary mr-2"></i>Top 10 Studios in India
                </div>
              </div>
            </div>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="font-display text-xl font-semibold mb-6 relative inline-block">
              Our Services
              <span className="absolute left-0 bottom-0 w-1/2 h-0.5 bg-secondary"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/services" className="text-gray-300 hover:text-secondary flex items-center transition-all duration-300 hover:translate-x-1">
                  <i className="fas fa-angle-right text-secondary mr-2 text-sm"></i>
                  Wedding Photography
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-secondary flex items-center transition-all duration-300 hover:translate-x-1">
                  <i className="fas fa-angle-right text-secondary mr-2 text-sm"></i>
                  Wedding Videography
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-secondary flex items-center transition-all duration-300 hover:translate-x-1">
                  <i className="fas fa-angle-right text-secondary mr-2 text-sm"></i>
                  Drone Aerial Coverage
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-secondary flex items-center transition-all duration-300 hover:translate-x-1">
                  <i className="fas fa-angle-right text-secondary mr-2 text-sm"></i>
                  Wedding Reels & Highlights
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-secondary flex items-center transition-all duration-300 hover:translate-x-1">
                  <i className="fas fa-angle-right text-secondary mr-2 text-sm"></i>
                  Pre-Wedding Shoots
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-secondary flex items-center transition-all duration-300 hover:translate-x-1">
                  <i className="fas fa-angle-right text-secondary mr-2 text-sm"></i>
                  Photo Albums & Prints
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-display text-xl font-semibold mb-6 relative inline-block">
              Quick Links
              <span className="absolute left-0 bottom-0 w-1/2 h-0.5 bg-secondary"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-300 hover:text-secondary flex items-center transition-all duration-300 hover:translate-x-1">
                  <i className="fas fa-angle-right text-secondary mr-2 text-sm"></i>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/photographers" className="text-gray-300 hover:text-secondary flex items-center transition-all duration-300 hover:translate-x-1">
                  <i className="fas fa-angle-right text-secondary mr-2 text-sm"></i>
                  Our Photographers
                </Link>
              </li>
              <li>
                <Link href="/packages" className="text-gray-300 hover:text-secondary flex items-center transition-all duration-300 hover:translate-x-1">
                  <i className="fas fa-angle-right text-secondary mr-2 text-sm"></i>
                  Pricing Packages
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-300 hover:text-secondary flex items-center transition-all duration-300 hover:translate-x-1">
                  <i className="fas fa-angle-right text-secondary mr-2 text-sm"></i>
                  Gallery
                </Link>
              </li>
              <li>
                <a href="/#testimonials" className="text-gray-300 hover:text-secondary flex items-center transition-all duration-300 hover:translate-x-1">
                  <i className="fas fa-angle-right text-secondary mr-2 text-sm"></i>
                  Client Reviews
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-secondary flex items-center transition-all duration-300 hover:translate-x-1">
                  <i className="fas fa-angle-right text-secondary mr-2 text-sm"></i>
                  FAQs
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="font-display text-xl font-semibold mb-6 relative inline-block">
              Get In Touch
              <span className="absolute left-0 bottom-0 w-1/2 h-0.5 bg-secondary"></span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="mt-1 mr-3 h-8 w-8 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-map-marker-alt text-secondary"></i>
                </div>
                <span className="text-gray-300">123 Wedding Street, Mumbai, Maharashtra, India - 400001</span>
              </li>
              <li className="flex items-start">
                <div className="mt-1 mr-3 h-8 w-8 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-phone-alt text-secondary"></i>
                </div>
                <div>
                  <p className="text-gray-300">+91 98765 43210</p>
                  <p className="text-gray-300">+91 98765 43211</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mt-1 mr-3 h-8 w-8 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-envelope text-secondary"></i>
                </div>
                <div>
                  <p className="text-gray-300">info@vivahlens.com</p>
                  <p className="text-gray-300">bookings@vivahlens.com</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mt-1 mr-3 h-8 w-8 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-clock text-secondary"></i>
                </div>
                <div>
                  <p className="text-gray-300">Mon - Sat: 10:00 AM - 7:00 PM</p>
                  <p className="text-gray-300">Sunday: By Appointment Only</p>
                </div>
              </li>
            </ul>
            
            <div className="mt-6">
              <Link href="/booking">
                <Button className="w-full bg-gradient-to-r from-primary to-accent text-white rounded-md font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <i className="fas fa-calendar-check mr-2"></i> Book a Consultation
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Copyright and Policy Links */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-gray-400 text-sm">© {new Date().getFullYear()} VivahLens. All rights reserved.</p>
            <p className="text-gray-500 text-xs mt-1">Capturing Wedding Memories Across India</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <a href="#" className="text-gray-400 hover:text-secondary text-sm transition-colors">
              <i className="fas fa-shield-alt mr-2"></i>Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-secondary text-sm transition-colors">
              <i className="fas fa-file-contract mr-2"></i>Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-secondary text-sm transition-colors">
              <i className="fas fa-money-bill-wave mr-2"></i>Refund Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-secondary text-sm transition-colors">
              <i className="fas fa-cookie mr-2"></i>Cookie Policy
            </a>
          </div>
        </div>
        
        {/* Payment Methods */}
        <div className="mt-6 text-center">
          <p className="text-gray-500 text-xs mb-2">Accepted Payment Methods</p>
          <div className="flex justify-center space-x-3">
            <i className="fab fa-cc-visa text-gray-400 text-2xl"></i>
            <i className="fab fa-cc-mastercard text-gray-400 text-2xl"></i>
            <i className="fab fa-cc-paypal text-gray-400 text-2xl"></i>
            <i className="fab fa-cc-amex text-gray-400 text-2xl"></i>
            <i className="fas fa-money-bill-wave text-gray-400 text-2xl"></i>
          </div>
        </div>
      </div>
    </footer>
  );
}
