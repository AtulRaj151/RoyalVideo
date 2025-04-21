// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  users;
  photographers;
  services;
  packages;
  testimonials;
  bookings;
  currentUserId;
  currentPhotographerId;
  currentServiceId;
  currentPackageId;
  currentTestimonialId;
  currentBookingId;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.photographers = /* @__PURE__ */ new Map();
    this.services = /* @__PURE__ */ new Map();
    this.packages = /* @__PURE__ */ new Map();
    this.testimonials = /* @__PURE__ */ new Map();
    this.bookings = /* @__PURE__ */ new Map();
    this.currentUserId = 1;
    this.currentPhotographerId = 1;
    this.currentServiceId = 1;
    this.currentPackageId = 1;
    this.currentTestimonialId = 1;
    this.currentBookingId = 1;
    this.initializeData();
  }
  initializeData() {
    const servicesData = [
      {
        name: "Photography",
        description: "Capture every precious moment with our expert photographers specializing in traditional and contemporary styles.",
        icon: "camera",
        image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80"
      },
      {
        name: "Videography",
        description: "Cinematic videos that tell your unique love story, from pre-wedding shoots to the grand reception.",
        icon: "video",
        image: "https://images.unsplash.com/photo-1606104219374-8f981ca4d1c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80"
      },
      {
        name: "Drone Services",
        description: "Breathtaking aerial shots that capture your venue, baraat procession, and grand celebrations from above.",
        icon: "plane",
        image: "https://images.unsplash.com/photo-1501619951397-5ba40d0f75da?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80"
      },
      {
        name: "Wedding Reels",
        description: "Short, shareable highlight videos perfect for social media that capture the essence of your celebration.",
        icon: "film",
        image: "https://images.unsplash.com/photo-1541250848620-0f3825fe3cf8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80"
      }
    ];
    const photographersData = [
      {
        name: "Amit Sharma",
        title: "Lead Photographer",
        bio: "With over 10 years of experience in wedding photography, Amit specializes in capturing candid emotions and traditional ceremonies.",
        image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
        instagram: "https://instagram.com",
        facebook: "https://facebook.com",
        website: "https://example.com"
      },
      {
        name: "Priya Patel",
        title: "Senior Photographer",
        bio: "Priya brings a unique feminine perspective to wedding photography, focusing on intricate details and emotional moments.",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
        instagram: "https://instagram.com",
        facebook: "https://facebook.com",
        website: "https://example.com"
      },
      {
        name: "Vivek Kapoor",
        title: "Videography Director",
        bio: "An expert in cinematic storytelling, Vivek creates wedding films that blend traditional elements with modern filmmaking techniques.",
        image: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
        instagram: "https://instagram.com",
        facebook: "https://facebook.com",
        website: "https://example.com"
      }
    ];
    const packagesData = [
      {
        name: "Silver Package",
        price: 75e3,
        description: "Perfect for intimate celebrations",
        isPopular: false,
        features: [
          "8 hours of photography coverage",
          "1 lead photographer + 1 assistant",
          "4 hours of videography coverage",
          "300+ edited digital photos",
          "5-minute highlight video"
        ]
      },
      {
        name: "Gold Package",
        price: 125e3,
        description: "Ideal for traditional ceremonies",
        isPopular: true,
        features: [
          "12 hours of photography coverage",
          "2 lead photographers + 1 assistant",
          "8 hours of videography coverage",
          "500+ edited digital photos",
          "10-minute highlight video",
          "2 hours of drone coverage"
        ]
      },
      {
        name: "Platinum Package",
        price: 25e4,
        description: "Comprehensive coverage for grand weddings",
        isPopular: false,
        features: [
          "Full day photography (up to 16 hours)",
          "3 lead photographers + 2 assistants",
          "Full day videography coverage",
          "1000+ edited digital photos",
          "15-minute cinematic film",
          "4 hours of drone coverage",
          "Same-day edit for social media"
        ]
      }
    ];
    const testimonialsData = [
      {
        name: "Anita & Rahul",
        event: "Delhi Wedding",
        date: "March 2023",
        content: "The team captured our wedding beautifully. Every cultural detail was perfectly documented, and our wedding film exceeded our expectations. Highly recommend for Indian weddings!",
        rating: 5,
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80"
      },
      {
        name: "Vikram & Meera",
        event: "Mumbai Wedding",
        date: "November 2022",
        content: "Working with VivahLens was the best decision we made for our wedding. They were professional, creative, and understood all the important rituals to capture. The drone footage was spectacular!",
        rating: 5,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80"
      },
      {
        name: "Priya & Sanjay",
        event: "Jaipur Wedding",
        date: "January 2023",
        content: "The photographers were incredible at managing our large family gatherings. They captured all the emotions and traditions perfectly. The same-day edit for social media was an amazing surprise for our guests!",
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80"
      },
      {
        name: "Arun & Neha",
        event: "Bangalore Wedding",
        date: "April 2023",
        content: "From sangeet to reception, the team was punctual, courteous, and extremely skilled. They made us feel comfortable and natural. The highlight reel brought tears to our eyes - pure magic!",
        rating: 5,
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80"
      }
    ];
    servicesData.forEach((service) => this.createService(service));
    photographersData.forEach((photographer) => this.createPhotographer(photographer));
    packagesData.forEach((pkg) => this.createPackage(pkg));
    testimonialsData.forEach((testimonial) => this.createTestimonial(testimonial));
  }
  // User operations
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = this.currentUserId++;
    const user = { ...insertUser, id, createdAt: /* @__PURE__ */ new Date() };
    this.users.set(id, user);
    return user;
  }
  // Photographer operations
  async getPhotographers() {
    return Array.from(this.photographers.values());
  }
  async getPhotographer(id) {
    return this.photographers.get(id);
  }
  async createPhotographer(insertPhotographer) {
    const id = this.currentPhotographerId++;
    const photographer = { ...insertPhotographer, id };
    this.photographers.set(id, photographer);
    return photographer;
  }
  // Service operations
  async getServices() {
    return Array.from(this.services.values());
  }
  async getService(id) {
    return this.services.get(id);
  }
  async createService(insertService) {
    const id = this.currentServiceId++;
    const service = { ...insertService, id };
    this.services.set(id, service);
    return service;
  }
  // Package operations
  async getPackages() {
    return Array.from(this.packages.values());
  }
  async getPackage(id) {
    return this.packages.get(id);
  }
  async createPackage(insertPackage) {
    const id = this.currentPackageId++;
    const pkg = { ...insertPackage, id };
    this.packages.set(id, pkg);
    return pkg;
  }
  // Testimonial operations
  async getTestimonials() {
    return Array.from(this.testimonials.values());
  }
  async getTestimonial(id) {
    return this.testimonials.get(id);
  }
  async createTestimonial(insertTestimonial) {
    const id = this.currentTestimonialId++;
    const testimonial = { ...insertTestimonial, id };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }
  // Booking operations
  async getBookings() {
    return Array.from(this.bookings.values());
  }
  async getBooking(id) {
    return this.bookings.get(id);
  }
  async getUserBookings(userId) {
    return Array.from(this.bookings.values()).filter(
      (booking) => booking.userId === userId
    );
  }
  async createBooking(insertBooking) {
    const id = this.currentBookingId++;
    const booking = {
      ...insertBooking,
      id,
      status: "pending",
      stripePaymentId: null,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.bookings.set(id, booking);
    return booking;
  }
  async updateBookingStatus(id, status) {
    const booking = this.bookings.get(id);
    if (!booking) return void 0;
    const updatedBooking = { ...booking, status };
    this.bookings.set(id, updatedBooking);
    return updatedBooking;
  }
  async updateBookingPayment(id, stripePaymentId) {
    const booking = this.bookings.get(id);
    if (!booking) return void 0;
    const updatedBooking = { ...booking, stripePaymentId, status: "paid" };
    this.bookings.set(id, updatedBooking);
    return updatedBooking;
  }
};
var storage = new MemStorage();

// server/routes.ts
import Stripe from "stripe";
if (!process.env.STRIPE_SECRET_KEY) {
  console.warn("Missing STRIPE_SECRET_KEY environment variable. Payment functionality will not work.");
}
var stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2023-10-16" }) : void 0;
async function registerRoutes(app2) {
  app2.get("/api/services", async (req, res) => {
    try {
      const services = await storage.getServices();
      res.json(services);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  app2.get("/api/services/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const service = await storage.getService(id);
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      res.json(service);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  app2.get("/api/photographers", async (req, res) => {
    try {
      const photographers = await storage.getPhotographers();
      res.json(photographers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  app2.get("/api/photographers/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const photographer = await storage.getPhotographer(id);
      if (!photographer) {
        return res.status(404).json({ message: "Photographer not found" });
      }
      res.json(photographer);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  app2.get("/api/packages", async (req, res) => {
    try {
      const packages = await storage.getPackages();
      res.json(packages);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  app2.get("/api/packages/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const pkg = await storage.getPackage(id);
      if (!pkg) {
        return res.status(404).json({ message: "Package not found" });
      }
      res.json(pkg);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  app2.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  app2.post("/api/users/register", async (req, res) => {
    try {
      const { username, password, name, email, phone } = req.body;
      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }
      const user = await storage.createUser({
        username,
        password,
        // In a real app, this would be hashed
        name,
        email,
        phone
      });
      const { password: _, ...userWithoutPassword } = user;
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  app2.post("/api/users/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      if (user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      const { password: _, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  app2.post("/api/bookings", async (req, res) => {
    try {
      const { userId, packageId, eventDate, totalAmount } = req.body;
      const booking = await storage.createBooking({
        userId,
        packageId,
        eventDate: new Date(eventDate),
        totalAmount
      });
      res.status(201).json(booking);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  app2.get("/api/users/:userId/bookings", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const bookings = await storage.getUserBookings(userId);
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  app2.post("/api/create-payment-intent", async (req, res) => {
    if (!stripe) {
      return res.status(500).json({ message: "Stripe is not configured" });
    }
    try {
      const { amount, bookingId } = req.body;
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100),
        // Convert to cents
        currency: "inr",
        metadata: {
          bookingId
        }
      });
      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      res.status(500).json({ message: "Error creating payment intent: " + error.message });
    }
  });
  app2.post("/api/payment-webhook", async (req, res) => {
    try {
      const event = req.body;
      if (event.type === "payment_intent.succeeded") {
        const paymentIntent = event.data.object;
        const bookingId = parseInt(paymentIntent.metadata.bookingId);
        if (bookingId) {
          await storage.updateBookingPayment(bookingId, paymentIntent.id);
        }
      }
      res.json({ received: true });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
