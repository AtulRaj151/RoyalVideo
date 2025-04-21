import { useState } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Photographers", href: "/photographers" },
  { label: "Services", href: "/services" },
  { label: "Packages", href: "/packages" },
  { label: "Gallery", href: "/gallery" },
  { label: "Testimonials", href: "/#testimonials" },
];

export default function Navbar() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  
  return (
    <nav className="bg-white px-4 py-3 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-10 w-10 rounded-md bg-maroon-600 flex items-center justify-center text-white font-bold">
            WM
          </div>
          <span className="font-playfair font-semibold text-xl text-maroon-600">Wedding Memories</span>
        </Link>
        
        <div className="hidden md:flex space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link 
              key={link.label} 
              href={link.href}
              className={cn(
                "hover:text-maroon-600 transition-colors",
                location === link.href && "text-maroon-600 font-semibold"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
        
        <div className="flex items-center space-x-4">
          <Button asChild variant="outline" className="hidden md:inline-flex items-center border-maroon-600 text-maroon-600 hover:bg-maroon-50">
            <Link href="/signin">
              <span className="mr-2">👤</span> Sign In
            </Link>
          </Button>
          <Button asChild className="bg-maroon-600 hover:bg-maroon-700 text-white">
            <Link href="/booking">
              Book Now
            </Link>
          </Button>
          
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col space-y-4 mt-8">
                {navLinks.map((link) => (
                  <Button
                    key={link.label}
                    variant="ghost"
                    className={cn(
                      "justify-start",
                      location === link.href && "font-semibold text-maroon-600"
                    )}
                    onClick={() => {
                      setOpen(false);
                    }}
                    asChild
                  >
                    <Link href={link.href}>{link.label}</Link>
                  </Button>
                ))}
                <Button asChild variant="outline" className="justify-start border-maroon-600 text-maroon-600 hover:bg-maroon-50">
                  <Link href="/signin">
                    <span className="mr-2">👤</span> Sign In
                  </Link>
                </Button>
                <Button asChild className="bg-maroon-600 hover:bg-maroon-700 text-white">
                  <Link href="/booking">
                    Book Now
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
