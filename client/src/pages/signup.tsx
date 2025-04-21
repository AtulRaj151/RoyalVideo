import { useState } from "react";
import { Link, useLocation } from "wouter";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Separator } from "@/components/ui/separator";

// Form validation schema
const signupFormSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

type SignupFormValues = z.infer<typeof signupFormSchema>;

export default function Signup() {
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  // Initialize form with default values
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      username: "",
      password: "",
      name: "",
      email: "",
      phone: "",
      acceptTerms: false,
    },
  });

  // Handle form submission
  const onSubmit = async (data: SignupFormValues) => {
    setLoading(true);
    try {
      const response = await apiRequest("POST", "/api/users/register", data);
      const user = await response.json();
      
      // Store user in localStorage (login the user automatically)
      localStorage.setItem("user", JSON.stringify(user));
      
      toast({
        title: "Account created successfully",
        description: `Welcome to VivahLens, ${user.name || user.username}!`,
      });
      
      // Check if there's booking data in session storage
      const storedBookingData = sessionStorage.getItem("bookingFormData");
      
      // Redirect to booking page if there's stored data, otherwise to home
      setLocation(storedBookingData ? "/booking" : "/");
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message || "Please try again with different credentials",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-24 pt-32 px-4 min-h-screen bg-neutral-light">
      <div className="container mx-auto max-w-lg">
        <Card className="border-none shadow-lg">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-2">
              <div className="text-primary h-16 w-16 flex items-center justify-center rounded-full border-2 border-primary">
                <i className="fas fa-camera-retro text-2xl"></i>
              </div>
            </div>
            <CardTitle className="text-2xl font-display text-center">Create an Account</CardTitle>
            <CardDescription className="text-center">
              Join VivahLens to book photography services for your special day
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your full name" {...field} />
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
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="Your email address" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Your phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="Choose a username" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="Create a password" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="acceptTerms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          I accept the{" "}
                          <a href="#" className="text-primary hover:underline">
                            terms and conditions
                          </a>
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full mt-2"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                      Creating account...
                    </>
                  ) : "Create Account"}
                </Button>
              </form>
            </Form>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-background px-2 text-sm text-muted-foreground">
                  OR SIGN UP WITH
                </span>
              </div>
            </div>
            
            <div className="flex flex-col space-y-2">
              <Button variant="outline" className="flex items-center justify-center">
                <i className="fab fa-google mr-2"></i> Google
              </Button>
              <Button variant="outline" className="flex items-center justify-center">
                <i className="fab fa-facebook mr-2"></i> Facebook
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
