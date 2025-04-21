import { QueryClient, QueryFunction } from "@tanstack/react-query";
import { packages } from "@/data/packages";
import { photographers } from "@/data/photographers";
import { services } from "@/data/services";
import { testimonials } from "@/data/testimonials";

// Mock users and bookings data for static site
const users = [
  {
    id: 1,
    username: "demo_user",
    name: "Demo User",
    email: "demo@example.com",
    phone: "+91 9876543210",
    createdAt: new Date()
  }
];

const bookings = [
  {
    id: 1,
    userId: 1,
    packageId: 2,
    eventDate: new Date("2025-05-15"),
    totalAmount: 145000,
    status: "pending",
    createdAt: new Date()
  }
];

// Static data mapping for API-like responses
const dataMap = {
  "/api/packages": packages,
  "/api/photographers": photographers,
  "/api/services": services,
  "/api/testimonials": testimonials,
  "/api/users": users,
  "/api/bookings": bookings
};

// Mock API request function for static site
export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  // Simulate API delays
  await new Promise(resolve => setTimeout(resolve, 200));
  
  console.log(`Static API request: ${method} ${url}`);
  
  // Handle Stripe payment intent
  if (url === "/api/create-payment-intent") {
    // Create a mock client secret (in a real app this would come from Stripe)
    const mockData = {
      clientSecret: "mock_client_secret_" + Math.random().toString(36).substring(2, 10)
    };
    
    // For static demonstration, just simulate a successful payment
    if (data && typeof data === 'object' && 'bookingId' in data) {
      const bookingId = (data as any).bookingId;
      const booking = bookings.find(b => b.id === bookingId);
      if (booking) {
        booking.status = "paid";
      }
    }
    
    return new Response(JSON.stringify(mockData), {
      headers: { "Content-Type": "application/json" },
      status: 200
    });
  }
  
  // Handle user login (very simplified for static site)
  if (url === "/api/users/login") {
    // For demo purposes, any login attempt is successful
    const userData = {
      id: 1,
      username: "demo_user",
      name: "Demo User",
      email: "demo@example.com"
    };
    
    return new Response(JSON.stringify(userData), {
      headers: { "Content-Type": "application/json" },
      status: 200
    });
  }
  
  // Handle user registration (very simplified for static site)
  if (url === "/api/users/register") {
    // For demo, just return success with the provided data
    const userData = {
      id: 1,
      ...(data as any),
      createdAt: new Date()
    };
    
    // Remove password for response
    delete (userData as any).password;
    
    return new Response(JSON.stringify(userData), {
      headers: { "Content-Type": "application/json" },
      status: 201
    });
  }
  
  // Handle booking creation
  if (url === "/api/bookings" && method === "POST") {
    const bookingData = {
      id: bookings.length + 1,
      ...(data as any),
      status: "pending",
      createdAt: new Date()
    };
    
    bookings.push(bookingData as any);
    
    return new Response(JSON.stringify(bookingData), {
      headers: { "Content-Type": "application/json" },
      status: 201
    });
  }
  
  return new Response(JSON.stringify({ error: "Not implemented" }), {
    headers: { "Content-Type": "application/json" },
    status: 501
  });
}

// Create a static query function for TanStack Query
export const getQueryFn: <T>(options: {
  on401: "returnNull" | "throw";
}) => QueryFunction<T> = () => async ({ queryKey }) => {
  // Simulate API delays
  await new Promise(resolve => setTimeout(resolve, 200));
  
  // Path could be like '/api/packages' or '/api/packages/1'
  const path = queryKey[0] as string;
  if (!path) return null;
  
  // Break down the path: /api/resource/id
  const parts = path.split('/').filter(Boolean);
  if (parts.length < 2) return null;
  
  const resourceType = `/${parts[0]}/${parts[1]}`;
  const resourceId = parts.length > 2 ? parseInt(parts[2]) : null;
  
  // Get the base data collection
  const collection = dataMap[resourceType];
  if (!collection) return null;
  
  // If we have an ID, return that specific item
  if (resourceId !== null) {
    return collection.find((item: any) => item.id === resourceId) || null;
  }
  
  // Special case for user bookings
  if (resourceType === "/api/users" && parts.length > 3 && parts[3] === "bookings") {
    const userId = parseInt(parts[2]);
    return bookings.filter((booking: any) => booking.userId === userId);
  }
  
  // Otherwise return the whole collection
  return collection;
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
