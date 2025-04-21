import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="relative py-16 px-4">
      <div 
        className="absolute inset-0 z-0 bg-black"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1601224335132-78f9be8667d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>
      <div className="container mx-auto max-w-4xl relative z-10 text-center text-white">
        <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Preserve Your Wedding Memories Forever</h2>
        <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
          Let our expert photographers and videographers capture the magic of your special day with artistry and cultural understanding.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Button
            asChild
            size="lg"
            className="px-8 py-6 bg-maroon-600 text-white hover:bg-maroon-700"
          >
            <Link href="/booking">
              Book Your Date Now
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="px-8 py-6 bg-white text-maroon-600 hover:bg-gray-100"
          >
            <Link href="/gallery">
              View Our Portfolio
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
