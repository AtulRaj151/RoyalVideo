import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { isDateAvailable } from "@/lib/utils";

export default function BookingProcessSection() {
  const [bookingInfo, setBookingInfo] = useState({
    name: "",
    email: "",
    date: ""
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookingInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!bookingInfo.name || !bookingInfo.email || !bookingInfo.date) {
      return;
    }
    
    // Check if date is available
    const selectedDate = new Date(bookingInfo.date);
    if (!isDateAvailable(selectedDate)) {
      alert("Selected date is not available. Please choose another date.");
      return;
    }
    
    // Redirect to booking page with prefilled information
    window.location.href = `/booking?name=${encodeURIComponent(bookingInfo.name)}&email=${encodeURIComponent(bookingInfo.email)}&date=${encodeURIComponent(bookingInfo.date)}`;
  };
  
  // Add scroll animation
  useEffect(() => {
    const scrollAnimations = document.querySelectorAll('.scroll-animation');
    
    const checkScroll = () => {
      scrollAnimations.forEach(animation => {
        const offsetTop = animation.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (offsetTop < windowHeight * 0.9) {
          animation.classList.add('animate');
        }
      });
    };
    
    // Initial check
    checkScroll();
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);
  
  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];
  
  return (
    <section className="py-16 px-4 bg-neutral-light">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-3 fancy-border inline-block">
            How Booking Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A simple, streamlined process to secure your wedding photography and videography services
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Step 1 */}
          <div className="text-center scroll-animation">
            <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">1</div>
            <h3 className="font-display text-xl font-semibold mb-2">Consultation</h3>
            <p className="text-gray-600">Schedule a free consultation to discuss your vision, requirements, and wedding details</p>
          </div>
          
          {/* Step 2 */}
          <div className="text-center scroll-animation">
            <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">2</div>
            <h3 className="font-display text-xl font-semibold mb-2">Package Selection</h3>
            <p className="text-gray-600">Choose from our standard packages or customize one to fit your specific needs</p>
          </div>
          
          {/* Step 3 */}
          <div className="text-center scroll-animation">
            <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">3</div>
            <h3 className="font-display text-xl font-semibold mb-2">Booking & Deposit</h3>
            <p className="text-gray-600">Secure your date with a signed contract and deposit payment through our secure platform</p>
          </div>
          
          {/* Step 4 */}
          <div className="text-center scroll-animation">
            <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">4</div>
            <h3 className="font-display text-xl font-semibold mb-2">Pre-Wedding Planning</h3>
            <p className="text-gray-600">Meet with your photography team to finalize details and create a shot list for your big day</p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="mt-12 max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md scroll-animation">
          <h3 className="font-display text-2xl font-semibold mb-4 text-center">Ready to Book Your Wedding Photography?</h3>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <Input
              type="text"
              name="name"
              value={bookingInfo.name}
              onChange={handleInputChange}
              placeholder="Your Name"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
            <Input
              type="email"
              name="email"
              value={bookingInfo.email}
              onChange={handleInputChange}
              placeholder="Your Email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
            <Input
              type="date"
              name="date"
              value={bookingInfo.date}
              onChange={handleInputChange}
              min={today}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
            <Button type="submit" className="px-6 py-3 bg-primary text-white rounded-md font-medium hover:bg-[#B71C1C] transition-colors">
              Start Booking
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
