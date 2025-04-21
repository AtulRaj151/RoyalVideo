import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { formatPrice, isDateAvailable, getCurrentUser, isAuthenticated } from "@/lib/utils";
import { Package, Service } from "@shared/schema";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

// Form validation schema
const bookingFormSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  packageId: z.string().min(1, "Please select a package"),
  eventDate: z.date({
    required_error: "Please select a date for your event",
  }),
  eventLocation: z.string().min(3, "Please provide the event location"),
  requirements: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

export default function Booking() {
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  const [packageId, setPackageId] = useState<string | null>(null);
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Get URL parameters
  const params = new URLSearchParams(location.split("?")[1]);
  const preselectedPackage = params.get("package");
  const isCustomQuote = params.get("custom") === "true";
  
  // Check if user is authenticated
  const userAuthenticated = isAuthenticated();
  const currentUser = getCurrentUser();

  // Fetch packages
  const { data: packagesData, isLoading: packagesLoading } = useQuery({
    queryKey: ['/api/packages'],
  });

  useEffect(() => {
    if (packagesData) {
      setPackages(packagesData);
      
      // Set preselected package if provided in URL
      if (preselectedPackage) {
        setPackageId(preselectedPackage);
      }
    }
  }, [packagesData, preselectedPackage]);

  // Initialize form with default values
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: currentUser?.name || "",
      email: currentUser?.email || "",
      phone: currentUser?.phone || "",
      packageId: preselectedPackage || "",
      eventDate: undefined,
      eventLocation: "",
      requirements: isCustomQuote ? "I'm interested in a custom quote for my wedding" : "",
    },
  });

  // Set package when packageId changes
  useEffect(() => {
    if (packageId) {
      form.setValue("packageId", packageId);
    }
  }, [packageId, form]);

  // Handle form submission
  const onSubmit = async (data: BookingFormValues) => {
    if (!userAuthenticated) {
      // Store form data in session storage for retrieval after login/signup
      sessionStorage.setItem("bookingFormData", JSON.stringify(data));
      toast({
        title: "Please sign in first",
        description: "You need to be signed in to complete your booking",
      });
      setLocation("/login?redirect=booking");
      return;
    }

    setLoading(true);
    try {
      const selectedPackage = packages.find(pkg => pkg.id.toString() === data.packageId);
      
      if (!selectedPackage) {
        throw new Error("Selected package not found");
      }

      const bookingData = {
        userId: currentUser.id,
        packageId: parseInt(data.packageId),
        eventDate: data.eventDate.toISOString(),
        totalAmount: selectedPackage.price
      };

      const response = await apiRequest("POST", "/api/bookings", bookingData);
      const newBooking = await response.json();
      
      // Invalidate booking queries
      queryClient.invalidateQueries({ queryKey: [`/api/users/${currentUser.id}/bookings`] });
      
      toast({
        title: "Booking created successfully!",
        description: "Proceeding to payment...",
      });
      
      // Redirect to checkout page
      setLocation(`/checkout/${newBooking.id}`);
    } catch (error: any) {
      toast({
        title: "Error creating booking",
        description: error.message || "Please try again later",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-24 pt-32 px-4 bg-neutral-light min-h-screen">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Book Your Wedding Photography</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {isCustomQuote 
              ? "Tell us about your requirements and we'll create a custom quote for you" 
              : "Fill out the form below to check availability and book our services"}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-display">Booking Information</CardTitle>
                <CardDescription>
                  Please provide the details of your event
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Full Name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input placeholder="Email" type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="Phone Number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="packageId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Select Package</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a package" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {packagesLoading ? (
                                  <div className="p-2 text-center">Loading packages...</div>
                                ) : (
                                  packages.map((pkg) => (
                                    <SelectItem key={pkg.id} value={pkg.id.toString()}>
                                      {pkg.name} - {formatPrice(pkg.price)}
                                    </SelectItem>
                                  ))
                                )}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="eventDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Event Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={`w-full pl-3 text-left font-normal ${
                                      !field.value && "text-muted-foreground"
                                    }`}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) => !isDateAvailable(date)}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormDescription>
                              Select the main wedding date
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="eventLocation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Event Location</FormLabel>
                            <FormControl>
                              <Input placeholder="Venue name and city" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="requirements"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Special Requirements</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us about any special requirements or events you want us to capture"
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex justify-end">
                      <Button type="submit" className="px-6" disabled={loading}>
                        {loading ? (
                          <>
                            <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                            Processing...
                          </>
                        ) : isCustomQuote ? "Request Quote" : "Proceed to Payment"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-display">Booking Summary</CardTitle>
              </CardHeader>
              <CardContent>
                {packagesLoading ? (
                  <div className="flex justify-center py-4">
                    <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
                  </div>
                ) : packageId ? (
                  <>
                    {packages.filter(pkg => pkg.id.toString() === packageId).map((selectedPkg) => (
                      <div key={selectedPkg.id} className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold text-lg">{selectedPkg.name}</h3>
                          <span className="text-xl text-primary font-bold">{formatPrice(selectedPkg.price)}</span>
                        </div>
                        <p className="text-gray-600 text-sm">{selectedPkg.description}</p>
                        <div className="border-t border-gray-200 pt-4">
                          <h4 className="font-medium mb-2">Package Includes:</h4>
                          <ul className="space-y-2">
                            {selectedPkg.features.map((feature, index) => (
                              <li key={index} className="flex items-start text-sm">
                                <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    <p>Select a package to see details</p>
                  </div>
                )}

                <div className="mt-6 border-t border-gray-200 pt-4">
                  <h4 className="font-medium mb-2">Need Help?</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Have questions about our packages or services? Contact our team for assistance.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <i className="fas fa-phone text-primary mr-2"></i>
                      <span>+91 98765 43210</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <i className="fas fa-envelope text-primary mr-2"></i>
                      <span>info@vivahlens.com</span>
                    </div>
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
