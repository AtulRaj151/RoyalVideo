import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn('Missing STRIPE_SECRET_KEY environment variable. Payment functionality will not work.');
}

const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2023-10-16" })
  : undefined;

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for services
  app.get("/api/services", async (req, res) => {
    try {
      const services = await storage.getServices();
      res.json(services);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  
  app.get("/api/services/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const service = await storage.getService(id);
      
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      
      res.json(service);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // API routes for photographers
  app.get("/api/photographers", async (req, res) => {
    try {
      const photographers = await storage.getPhotographers();
      res.json(photographers);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  
  app.get("/api/photographers/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const photographer = await storage.getPhotographer(id);
      
      if (!photographer) {
        return res.status(404).json({ message: "Photographer not found" });
      }
      
      res.json(photographer);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // API routes for packages
  app.get("/api/packages", async (req, res) => {
    try {
      const packages = await storage.getPackages();
      res.json(packages);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  
  app.get("/api/packages/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const pkg = await storage.getPackage(id);
      
      if (!pkg) {
        return res.status(404).json({ message: "Package not found" });
      }
      
      res.json(pkg);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // API routes for testimonials
  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // User registration and authentication
  app.post("/api/users/register", async (req, res) => {
    try {
      const { username, password, name, email, phone } = req.body;
      
      // Check if username already exists
      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }
      
      // Create new user
      const user = await storage.createUser({
        username,
        password, // In a real app, this would be hashed
        name,
        email,
        phone
      });
      
      // Don't send password back in response
      const { password: _, ...userWithoutPassword } = user;
      res.status(201).json(userWithoutPassword);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  
  app.post("/api/users/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      // Find user
      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      // Check password (in a real app, would compare hashes)
      if (user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      // Don't send password back in response
      const { password: _, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Booking routes
  app.post("/api/bookings", async (req, res) => {
    try {
      const { userId, packageId, eventDate, totalAmount } = req.body;
      
      // Create booking
      const booking = await storage.createBooking({
        userId,
        packageId,
        eventDate: new Date(eventDate),
        totalAmount
      });
      
      res.status(201).json(booking);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  
  app.get("/api/users/:userId/bookings", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const bookings = await storage.getUserBookings(userId);
      res.json(bookings);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Stripe payment route
  app.post("/api/create-payment-intent", async (req, res) => {
    if (!stripe) {
      return res.status(500).json({ message: "Stripe is not configured" });
    }
    
    try {
      const { amount, bookingId } = req.body;
      
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency: "inr",
        metadata: {
          bookingId
        }
      });
      
      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
      res.status(500).json({ message: "Error creating payment intent: " + error.message });
    }
  });
  
  // Payment confirmation webhook (in a real app, this would be secured with Stripe's webhook signature verification)
  app.post("/api/payment-webhook", async (req, res) => {
    try {
      const event = req.body;
      
      if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object;
        const bookingId = parseInt(paymentIntent.metadata.bookingId);
        
        if (bookingId) {
          await storage.updateBookingPayment(bookingId, paymentIntent.id);
        }
      }
      
      res.json({ received: true });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
