import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-neutral-dark text-white py-12 px-4" id="contact">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="text-white h-10 w-10 flex items-center justify-center rounded-full border-2 border-white">
                <i className="fas fa-camera-retro text-xl"></i>
              </div>
              <div>
                <span className="font-display text-2xl font-bold text-white">
                  Vivah<span className="text-secondary">Lens</span>
                </span>
              </div>
            </div>
            <p className="text-gray-300 mb-6">
              Premium photography and videography services for Indian weddings, capturing traditions, emotions, and celebrations.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-secondary transition-colors">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-white hover:text-secondary transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-white hover:text-secondary transition-colors">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="#" className="text-white hover:text-secondary transition-colors">
                <i className="fab fa-pinterest"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-display text-xl font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/services" className="text-gray-300 hover:text-white transition-colors">
                  Wedding Photography
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-white transition-colors">
                  Wedding Videography
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-white transition-colors">
                  Drone Services
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-white transition-colors">
                  Wedding Reels
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-white transition-colors">
                  Pre-Wedding Shoots
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-display text-xl font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/photographers" className="text-gray-300 hover:text-white transition-colors">
                  Our Photographers
                </Link>
              </li>
              <li>
                <Link href="/packages" className="text-gray-300 hover:text-white transition-colors">
                  Pricing Packages
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <a href="/#testimonials" className="text-gray-300 hover:text-white transition-colors">
                  Reviews
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-display text-xl font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-3 text-secondary"></i>
                <span>123 Wedding Street, Mumbai, Maharashtra, India - 400001</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-phone-alt mt-1 mr-3 text-secondary"></i>
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-envelope mt-1 mr-3 text-secondary"></i>
                <span>info@vivahlens.com</span>
              </li>
            </ul>
            
            <div className="mt-6">
              <Link href="/booking">
                <button className="px-4 py-2 bg-primary text-white rounded-md font-medium hover:bg-[#B71C1C] transition-colors">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2023 VivahLens. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
