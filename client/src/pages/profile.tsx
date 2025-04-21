import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { getCurrentUser, formatPrice, formatDate } from "@/lib/utils";
import { Booking, Package } from "@shared/schema";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function Profile() {
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [packages, setPackages] = useState<Record<number, Package>>({});
  
  // Get current user
  const user = getCurrentUser();
  
  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to view your profile",
        variant: "destructive",
      });
      setLocation("/login");
    }
  }, [user, toast, setLocation]);
  
  // Fetch user bookings
  const { data: bookingsData, isLoading: bookingsLoading } = useQuery({
    queryKey: user ? [`/api/users/${user.id}/bookings`] : null,
    enabled: !!user,
  });
  
  useEffect(() => {
    if (bookingsData) {
      setBookings(bookingsData);
      
      // Fetch package details for each booking
      bookingsData.forEach((booking: Booking) => {
        fetchPackageDetails(booking.packageId);
      });
    }
  }, [bookingsData]);
  
  // Fetch package details
  const fetchPackageDetails = async (packageId: number) => {
    try {
      const response = await fetch(`/api/packages/${packageId}`);
      const data = await response.json();
      
      setPackages(prev => ({
        ...prev,
        [packageId]: data
      }));
    } catch (error) {
      console.error("Error fetching package details:", error);
    }
  };
  
  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    setLocation("/");
  };
  
  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user) return "";
    
    if (user.name) {
      return user.name
        .split(" ")
        .map(name => name[0])
        .join("")
        .toUpperCase();
    }
    
    return user.username.substring(0, 2).toUpperCase();
  };
  
  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };
  
  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="py-24 pt-32 px-4 min-h-screen bg-neutral-light">
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src="" alt={user.name || user.username} />
                    <AvatarFallback className="text-xl bg-primary text-white">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-semibold">{user.name || user.username}</h2>
                  <p className="text-gray-500 text-sm">{user.email}</p>
                </div>
                
                <Separator className="my-4" />
                
                <nav className="space-y-2">
                  <a 
                    href="#bookings" 
                    className="flex items-center p-2 rounded-md hover:bg-neutral-100 transition-colors"
                  >
                    <i className="fas fa-calendar-alt mr-2 text-primary"></i>
                    <span>My Bookings</span>
                  </a>
                  <a 
                    href="#settings" 
                    className="flex items-center p-2 rounded-md hover:bg-neutral-100 transition-colors"
                  >
                    <i className="fas fa-cog mr-2 text-primary"></i>
                    <span>Account Settings</span>
                  </a>
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center p-2 rounded-md hover:bg-neutral-100 transition-colors text-left"
                  >
                    <i className="fas fa-sign-out-alt mr-2 text-primary"></i>
                    <span>Logout</span>
                  </button>
                </nav>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-3">
            <Tabs defaultValue="bookings" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="bookings">My Bookings</TabsTrigger>
                <TabsTrigger value="settings">Account Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="bookings" id="bookings">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl font-display">Your Bookings</CardTitle>
                    <CardDescription>
                      View and manage your photography bookings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {bookingsLoading ? (
                      <div className="flex justify-center py-12">
                        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
                      </div>
                    ) : bookings.length === 0 ? (
                      <div className="text-center py-8">
                        <div className="text-gray-400 mb-4">
                          <i className="fas fa-calendar-times text-5xl"></i>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">No Bookings Yet</h3>
                        <p className="text-gray-500 mb-4">You haven't made any bookings yet.</p>
                        <Button onClick={() => setLocation("/booking")}>
                          Book Now
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {bookings.map((booking) => (
                          <Card key={booking.id} className="overflow-hidden">
                            <div className="flex flex-col md:flex-row">
                              <div className="p-4 md:p-6 flex-grow">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h3 className="font-semibold text-lg">
                                      {packages[booking.packageId]?.name || "Package"}
                                    </h3>
                                    <p className="text-gray-500 text-sm">
                                      {formatDate(booking.eventDate)}
                                    </p>
                                  </div>
                                  <Badge className={getStatusColor(booking.status)}>
                                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                  </Badge>
                                </div>
                                
                                <div className="mt-4 text-sm">
                                  <div className="grid grid-cols-2 gap-2">
                                    <div>
                                      <span className="text-gray-500">Booking Date:</span>
                                      <p>{formatDate(booking.createdAt)}</p>
                                    </div>
                                    <div>
                                      <span className="text-gray-500">Amount:</span>
                                      <p className="font-medium">{formatPrice(booking.totalAmount)}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="bg-gray-50 p-4 md:p-6 md:w-48 flex flex-row md:flex-col justify-between items-center md:items-stretch">
                                {booking.status === "pending" && (
                                  <Button 
                                    variant="default" 
                                    className="w-full mb-2"
                                    onClick={() => setLocation(`/checkout/${booking.id}`)}
                                  >
                                    Complete Payment
                                  </Button>
                                )}
                                
                                <Button variant="outline" className="w-full">
                                  View Details
                                </Button>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="settings" id="settings">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl font-display">Account Settings</CardTitle>
                    <CardDescription>
                      Manage your profile and account preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-6">
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Full Name</label>
                            <Input 
                              type="text" 
                              defaultValue={user.name || ""} 
                              placeholder="Your full name"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Email</label>
                            <Input 
                              type="email" 
                              defaultValue={user.email || ""} 
                              placeholder="Your email address"
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Phone Number</label>
                            <Input 
                              type="tel" 
                              defaultValue={user.phone || ""} 
                              placeholder="Your phone number"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Username</label>
                            <Input 
                              type="text" 
                              defaultValue={user.username} 
                              disabled
                              className="bg-gray-50"
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button>
                      Save Changes
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

// Input component for the form (simplified version for this example)
function Input({ className, ...props }) {
  return (
    <input
      className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${className}`}
      {...props}
    />
  );
}
