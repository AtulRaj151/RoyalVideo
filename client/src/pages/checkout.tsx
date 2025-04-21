import { useEffect, useState } from "react";
import { useLocation, useParams, Link } from "wouter";
import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { formatPrice, getCurrentUser } from "@/lib/utils";
// Import directly from the data file with type assertion
import { packages } from "@/data/packages"; 

// Define interfaces to match the packages data structure
interface PackageData {
  id: number;
  name: string;
  description: string;
  price: number;
  features: string[];
  isPopular: boolean;
}

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
let stripePromise: Promise<any> | null = null;
try {
  if (import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
    stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
  } else {
    console.warn('Stripe key missing: VITE_STRIPE_PUBLIC_KEY is not set. Payment features will be limited.');
  }
} catch (error) {
  console.error('Failed to initialize Stripe:', error);
}

// Define simple types for our data (instead of importing from schema)
interface Package {
  id: number;
  name: string;
  description: string;
  price: number;
  features: string[];
  isPopular: boolean;
}

interface Booking {
  id: number;
  userId: number;
  packageId: number;
  eventDate: Date | string;
  totalAmount: number;
  status: string;
  createdAt?: Date;
  stripePaymentId?: string;
}

const CheckoutForm = ({ booking, packageDetails }: { booking: Booking, packageDetails: Package }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [processing, setProcessing] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }
    
    setProcessing(true);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.origin + "/profile",
        },
      });
  
      if (error) {
        toast({
          title: "Payment Failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Payment Successful",
          description: "Thank you for your booking!",
        });
        
        // Invalidate queries to refresh data
        queryClient.invalidateQueries({ queryKey: ['/api/bookings'] });
        queryClient.invalidateQueries({ queryKey: [`/api/users/${getCurrentUser()?.id}/bookings`] });
        
        // After successful payment, redirect to profile
        setLocation("/profile");
      }
    } catch (err: any) {
      toast({
        title: "Payment Failed",
        description: err.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <PaymentElement />
        
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between text-lg font-semibold">
            <span>Total Amount:</span>
            <span className="text-primary">{formatPrice(booking.totalAmount)}</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            50% deposit is required to secure your booking date
          </p>
        </div>
        
        <div className="flex justify-between">
          <Link href="/booking">
            <Button variant="outline" disabled={processing}>
              Back
            </Button>
          </Link>
          <Button type="submit" disabled={!stripe || processing}>
            {processing ? (
              <>
                <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                Processing...
              </>
            ) : (
              <>Pay {formatPrice(booking.totalAmount)}</>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default function Checkout() {
  const params = useParams();
  const bookingId = parseInt(params.bookingId || "1"); // Default to first booking for demo
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [clientSecret, setClientSecret] = useState("");
  const [booking, setBooking] = useState<Booking | null>(null);
  const [packageDetails, setPackageDetails] = useState<Package | null>(null);

  // Fetch booking details using the query from our static data
  const { data: bookingData, isLoading: bookingLoading, error: bookingError } = useQuery({
    queryKey: [`/api/bookings/${bookingId}`],
  });

  useEffect(() => {
    if (bookingData) {
      setBooking(bookingData as Booking);
    } else {
      // For demo purposes, create a temporary booking if none found
      const demoBooking: Booking = {
        id: 1,
        userId: 1,
        packageId: 2, // Premium package
        eventDate: new Date("2025-05-15"),
        totalAmount: 145000, // Price from the Premium package
        status: "pending"
      };
      setBooking(demoBooking);
    }
  }, [bookingData]);

  // Get package details directly or via query
  useEffect(() => {
    if (booking) {
      // Find the package in our local data
      const pkg = packages.find((p: any) => p.id === booking.packageId) as Package;
      if (pkg) {
        setPackageDetails(pkg);
      } else {
        // Fallback to API query
        queryClient.fetchQuery({
          queryKey: [`/api/packages/${booking.packageId}`],
        }).then((data: any) => {
          setPackageDetails(data as Package);
        }).catch(err => {
          console.error("Failed to load package details:", err);
        });
      }
    }
  }, [booking]);

  // Create payment intent when booking details are loaded
  useEffect(() => {
    if (booking) {
      apiRequest("POST", "/api/create-payment-intent", { 
        amount: booking.totalAmount,
        bookingId: booking.id
      })
        .then((res) => res.json())
        .then((data) => {
          setClientSecret(data.clientSecret);
        })
        .catch((error) => {
          toast({
            title: "Error",
            description: "Failed to initialize payment. Please try again.",
            variant: "destructive",
          });
          console.error("Payment intent error:", error);
        });
    }
  }, [booking, toast]);

  if (bookingError) {
    return (
      <div className="py-24 pt-32 px-4 min-h-screen bg-neutral-light">
        <div className="container mx-auto max-w-4xl">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-3xl font-display text-red-500">Error</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Failed to load booking details. Please return to booking page and try again.</p>
            </CardContent>
            <CardFooter className="justify-center">
              <Link href="/booking">
                <Button>Return to Booking</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  if (bookingLoading || !booking || !packageDetails || !clientSecret) {
    return (
      <div className="h-screen flex items-center justify-center bg-neutral-light">
        <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" aria-label="Loading"/>
      </div>
    );
  }

  return (
    <div className="py-24 pt-32 px-4 min-h-screen bg-neutral-light">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Complete Your Booking</h1>
          <p className="text-lg text-gray-600">
            Secure your wedding date with payment
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-display">Payment Details</CardTitle>
                <CardDescription>
                  Complete your payment securely through Stripe
                </CardDescription>
              </CardHeader>
              <CardContent>
                {stripePromise ? (
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm booking={booking} packageDetails={packageDetails} />
                  </Elements>
                ) : (
                  <div className="p-4 text-center">
                    <p className="text-yellow-600 mb-3">
                      <i className="fas fa-exclamation-triangle mr-2"></i>
                      Payment system is currently unavailable
                    </p>
                    <p className="text-sm text-gray-600 mb-4">
                      Please contact us directly to complete your booking:
                    </p>
                    <div className="space-y-2 text-sm">
                      <p>
                        <i className="fas fa-phone mr-2"></i>
                        <a href="tel:+918083437728" className="text-primary hover:underline">
                          +91 8083437728
                        </a>
                      </p>
                      <p>
                        <i className="fas fa-phone mr-2"></i>
                        <a href="tel:+918340608143" className="text-primary hover:underline">
                          +91 8340608143
                        </a>
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-display">Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold">{packageDetails.name}</h3>
                  <p className="text-gray-600 text-sm">{packageDetails.description}</p>
                </div>
                
                <div className="pt-2">
                  <div className="flex justify-between text-sm">
                    <span>Event Date:</span>
                    <span>{new Date(booking.eventDate).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span>Booking Status:</span>
                    <span className="capitalize">{booking.status}</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-3">
                  <h4 className="font-medium text-sm mb-2">Package Includes:</h4>
                  <ul className="space-y-1">
                    {packageDetails.features.slice(0, 4).map((feature, index) => (
                      <li key={index} className="flex items-start text-xs">
                        <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                        <span>{feature}</span>
                      </li>
                    ))}
                    {packageDetails.features.length > 4 && (
                      <li className="text-xs text-primary">+{packageDetails.features.length - 4} more features</li>
                    )}
                  </ul>
                </div>
                
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between font-semibold">
                    <span>Total:</span>
                    <span className="text-primary">{formatPrice(booking.totalAmount)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
