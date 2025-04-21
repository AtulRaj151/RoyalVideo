import { useState, useEffect } from "react";
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
import { Separator } from "@/components/ui/separator";

// Form validation schema
const loginFormSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

export default function Login() {
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  // Check for redirect parameter
  const params = new URLSearchParams(location.split("?")[1]);
  const redirectPath = params.get("redirect") || "/";
  
  // Initialize form with default values
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Handle form submission
  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    try {
      const response = await apiRequest("POST", "/api/users/login", data);
      const user = await response.json();
      
      // Store user in localStorage
      localStorage.setItem("user", JSON.stringify(user));
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${user.name || user.username}!`,
      });
      
      // Check if there's booking data in session storage
      const storedBookingData = sessionStorage.getItem("bookingFormData");
      if (storedBookingData && redirectPath === "booking") {
        sessionStorage.removeItem("bookingFormData");
      }
      
      // Redirect to the requested page or home
      setLocation(redirectPath === "booking" ? "/booking" : redirectPath);
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "Invalid username or password",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-24 pt-32 px-4 min-h-screen bg-neutral-light">
      <div className="container mx-auto max-w-md">
        <Card className="border-none shadow-lg">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-2">
              <div className="text-primary h-16 w-16 flex items-center justify-center rounded-full border-2 border-primary">
                <i className="fas fa-camera-retro text-2xl"></i>
              </div>
            </div>
            <CardTitle className="text-2xl font-display text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center">
              Sign in to your VivahLens account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="Enter your password" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
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
                      Signing in...
                    </>
                  ) : "Sign In"}
                </Button>
              </form>
            </Form>
            
            <div className="text-center text-sm">
              <a href="#" className="text-primary hover:underline">
                Forgot your password?
              </a>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-background px-2 text-sm text-muted-foreground">
                  OR CONTINUE WITH
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
              Don't have an account?{" "}
              <Link href="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
