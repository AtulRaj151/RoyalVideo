import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { BookingFormValues, bookingFormSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useLocation } from "wouter";
import { Loader2, CheckCircle } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

export default function BookingForm() {
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      date: "",
      city: "",
      services: [],
      additionalInfo: "",
    },
  });

  async function onSubmit(data: BookingFormValues) {
    setIsSubmitting(true);
    try {
      const response = await apiRequest("POST", "/api/bookings", data);
      const result = await response.json();
      
      if (result.success) {
        toast({
          title: "Booking submitted successfully!",
          description: "We'll contact you shortly to confirm the details.",
        });
        
        // Navigate to checkout with the booking ID
        navigate(`/checkout/${result.booking.id}`);
      } else {
        toast({
          title: "Error submitting booking",
          description: result.message || "Please try again later.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error submitting booking",
        description: "Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="py-16 px-4 bg-white" id="booking">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="order-2 lg:order-1">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6">Book Your Wedding Photography Now</h2>
            <p className="text-gray-600 mb-8">
              Fill in your details below and we'll help you capture the magic of your special day. 
              Our team will get back to you within 24 hours.
            </p>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your first name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your last name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your email" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Wedding Date *</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Wedding City *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter wedding city" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="services"
                  render={() => (
                    <FormItem>
                      <FormLabel>Services Interested In *</FormLabel>
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="services"
                          render={({ field }) => {
                            return (
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes('Photography')}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, 'Photography'])
                                        : field.onChange(field.value?.filter((value) => value !== 'Photography'))
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">Photography</FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                        <FormField
                          control={form.control}
                          name="services"
                          render={({ field }) => {
                            return (
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes('Videography')}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, 'Videography'])
                                        : field.onChange(field.value?.filter((value) => value !== 'Videography'))
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">Videography</FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                        <FormField
                          control={form.control}
                          name="services"
                          render={({ field }) => {
                            return (
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes('Drone Services')}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, 'Drone Services'])
                                        : field.onChange(field.value?.filter((value) => value !== 'Drone Services'))
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">Drone Services</FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                        <FormField
                          control={form.control}
                          name="services"
                          render={({ field }) => {
                            return (
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes('Wedding Reels')}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, 'Wedding Reels'])
                                        : field.onChange(field.value?.filter((value) => value !== 'Wedding Reels'))
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">Wedding Reels</FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="additionalInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Information</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us more about your wedding plans or any specific requirements"
                          className="h-32 resize-none"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full bg-maroon-600 hover:bg-maroon-700" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : 'Send Inquiry'}
                </Button>
                <p className="text-sm text-gray-500 mt-3">
                  By submitting this form, you agree to our privacy policy and terms of service.
                </p>
              </form>
            </Form>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="sticky top-24">
              <div className="relative h-80 md:h-96 lg:h-full rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1594758426703-07098784f4ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" 
                  alt="Wedding photographer at work" 
                  className="absolute inset-0 w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="font-playfair text-2xl font-bold mb-2">Why Choose Us?</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="text-gold-500 mt-1 mr-2 h-5 w-5" />
                      <span>Specialized in Indian wedding traditions</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-gold-500 mt-1 mr-2 h-5 w-5" />
                      <span>Award-winning photographers & videographers</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-gold-500 mt-1 mr-2 h-5 w-5" />
                      <span>Capturing memories across India since 2010</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-gold-500 mt-1 mr-2 h-5 w-5" />
                      <span>500+ successful wedding projects</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 bg-maroon-50 rounded-lg p-6 shadow-md">
                <h4 className="font-playfair text-xl font-bold mb-4">Have Questions?</h4>
                <p className="text-gray-600 mb-4">Our wedding consultants are ready to help you with any questions about our services.</p>
                <div className="flex items-center space-x-3">
                  <div className="bg-white p-3 rounded-full">
                    <span className="text-maroon-600 text-xl">📞</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Call us directly</p>
                    <p className="font-medium">+91 98765 43210</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
