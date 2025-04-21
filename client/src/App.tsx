import { useState, useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/home";
import Services from "./pages/services";
import Photographers from "./pages/photographers";
import Packages from "./pages/packages";
import Booking from "./pages/booking";
import Checkout from "./pages/checkout";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Profile from "./pages/profile";
import NotFound from "@/pages/not-found";

function Router() {
  const [location] = useLocation();
  
  // Scroll to top when navigating to a new page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services" component={Services} />
      <Route path="/photographers" component={Photographers} />
      <Route path="/packages" component={Packages} />
      <Route path="/booking" component={Booking} />
      <Route path="/checkout/:bookingId" component={Checkout} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/profile" component={Profile} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Detect if menu should be shown
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (isMenuOpen) setIsMenuOpen(false);
    };
    
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMenuOpen]);
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <div className="flex flex-col min-h-screen">
          <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
          <main className="flex-grow">
            <Router />
          </main>
          <Footer />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
