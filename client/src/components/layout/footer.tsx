import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="h-10 w-10 rounded-md bg-maroon-600 flex items-center justify-center text-white font-bold">
                WM
              </div>
              <span className="font-playfair font-semibold text-xl">Wedding Memories</span>
            </div>
            <p className="text-gray-400 mb-6">
              Capturing the essence of Indian weddings through artistic photography and videography since 2010.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22.258 1H2.742C1.781 1 1 1.781 1 2.742v19.516C1 23.219 1.781 24 2.742 24h10.556v-8.5H10.25v-3.604h3.048V9.024c0-3.025 1.847-4.671 4.542-4.671 1.29 0 2.398.097 2.723.14v3.156h-1.869c-1.466 0-1.75.698-1.75 1.722v2.258h3.5l-.455 3.604h-3.045V24h6.064c.961 0 1.742-.781 1.742-1.742V2.742C24 1.781 23.219 1 22.258 1z" />
                </svg>
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a 
                href="https://pinterest.com" 
                target="_blank" 
                rel="noreferrer" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Pinterest"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/photographers" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/photographers" className="text-gray-400 hover:text-white transition-colors">Photographers</Link></li>
              <li><Link href="/gallery" className="text-gray-400 hover:text-white transition-colors">Portfolio</Link></li>
              <li><Link href="/packages" className="text-gray-400 hover:text-white transition-colors">Packages</Link></li>
              <li><Link href="/booking" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-6">Services</h3>
            <ul className="space-y-3">
              <li><Link href="/services" className="text-gray-400 hover:text-white transition-colors">Wedding Photography</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-white transition-colors">Cinematic Videography</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-white transition-colors">Drone Coverage</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-white transition-colors">Wedding Reels</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-white transition-colors">Pre-Wedding Shoots</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-white transition-colors">Engagement Sessions</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-white transition-colors">Photo Albums</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-maroon-500 mt-1 mr-3">📍</span>
                <span className="text-gray-400">123 Wedding Lane, Mumbai, Maharashtra 400001, India</span>
              </li>
              <li className="flex items-center">
                <span className="text-maroon-500 mr-3">📞</span>
                <span className="text-gray-400">+91 98765 43210</span>
              </li>
              <li className="flex items-center">
                <span className="text-maroon-500 mr-3">📧</span>
                <span className="text-gray-400">info@weddingmemories.com</span>
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="font-semibold mb-3">Working Hours</h4>
              <p className="text-gray-400">Monday - Saturday: 10:00 AM - 7:00 PM</p>
              <p className="text-gray-400">Sunday: By Appointment Only</p>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Wedding Memories. All rights reserved.</p>
          <div className="flex justify-center space-x-6 mt-4">
            <Link href="/privacy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-300 transition-colors">Terms of Service</Link>
            <Link href="/sitemap" className="hover:text-gray-300 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
