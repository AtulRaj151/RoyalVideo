import { 
  users, User, InsertUser, 
  photographers, Photographer, InsertPhotographer,
  services, Service, InsertService,
  packages, Package, InsertPackage,
  testimonials, Testimonial, InsertTestimonial,
  bookings, Booking, InsertBooking
} from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Photographer operations
  getPhotographers(): Promise<Photographer[]>;
  getPhotographer(id: number): Promise<Photographer | undefined>;
  createPhotographer(photographer: InsertPhotographer): Promise<Photographer>;
  
  // Service operations
  getServices(): Promise<Service[]>;
  getService(id: number): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  
  // Package operations
  getPackages(): Promise<Package[]>;
  getPackage(id: number): Promise<Package | undefined>;
  createPackage(pkg: InsertPackage): Promise<Package>;
  
  // Testimonial operations
  getTestimonials(): Promise<Testimonial[]>;
  getTestimonial(id: number): Promise<Testimonial | undefined>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  
  // Booking operations
  getBookings(): Promise<Booking[]>;
  getBooking(id: number): Promise<Booking | undefined>;
  getUserBookings(userId: number): Promise<Booking[]>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBookingStatus(id: number, status: string): Promise<Booking | undefined>;
  updateBookingPayment(id: number, stripePaymentId: string): Promise<Booking | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private photographers: Map<number, Photographer>;
  private services: Map<number, Service>;
  private packages: Map<number, Package>;
  private testimonials: Map<number, Testimonial>;
  private bookings: Map<number, Booking>;
  
  private currentUserId: number;
  private currentPhotographerId: number;
  private currentServiceId: number;
  private currentPackageId: number;
  private currentTestimonialId: number;
  private currentBookingId: number;

  constructor() {
    this.users = new Map();
    this.photographers = new Map();
    this.services = new Map();
    this.packages = new Map();
    this.testimonials = new Map();
    this.bookings = new Map();
    
    this.currentUserId = 1;
    this.currentPhotographerId = 1;
    this.currentServiceId = 1;
    this.currentPackageId = 1;
    this.currentTestimonialId = 1;
    this.currentBookingId = 1;
    
    // Initialize with sample data
    this.initializeData();
  }

  private initializeData() {
    // Initialize with services
    const servicesData: InsertService[] = [
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

    // Initialize with photographers
    const photographersData: InsertPhotographer[] = [
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

    // Initialize with packages
    const packagesData: InsertPackage[] = [
      {
        name: "Silver Package",
        price: 75000,
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
        price: 125000,
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
        price: 250000,
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

    // Initialize with testimonials
    const testimonialsData: InsertTestimonial[] = [
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

    // Add sample data
    servicesData.forEach(service => this.createService(service));
    photographersData.forEach(photographer => this.createPhotographer(photographer));
    packagesData.forEach(pkg => this.createPackage(pkg));
    testimonialsData.forEach(testimonial => this.createTestimonial(testimonial));
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id, createdAt: new Date() };
    this.users.set(id, user);
    return user;
  }
  
  // Photographer operations
  async getPhotographers(): Promise<Photographer[]> {
    return Array.from(this.photographers.values());
  }
  
  async getPhotographer(id: number): Promise<Photographer | undefined> {
    return this.photographers.get(id);
  }
  
  async createPhotographer(insertPhotographer: InsertPhotographer): Promise<Photographer> {
    const id = this.currentPhotographerId++;
    const photographer: Photographer = { ...insertPhotographer, id };
    this.photographers.set(id, photographer);
    return photographer;
  }
  
  // Service operations
  async getServices(): Promise<Service[]> {
    return Array.from(this.services.values());
  }
  
  async getService(id: number): Promise<Service | undefined> {
    return this.services.get(id);
  }
  
  async createService(insertService: InsertService): Promise<Service> {
    const id = this.currentServiceId++;
    const service: Service = { ...insertService, id };
    this.services.set(id, service);
    return service;
  }
  
  // Package operations
  async getPackages(): Promise<Package[]> {
    return Array.from(this.packages.values());
  }
  
  async getPackage(id: number): Promise<Package | undefined> {
    return this.packages.get(id);
  }
  
  async createPackage(insertPackage: InsertPackage): Promise<Package> {
    const id = this.currentPackageId++;
    const pkg: Package = { ...insertPackage, id };
    this.packages.set(id, pkg);
    return pkg;
  }
  
  // Testimonial operations
  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }
  
  async getTestimonial(id: number): Promise<Testimonial | undefined> {
    return this.testimonials.get(id);
  }
  
  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.currentTestimonialId++;
    const testimonial: Testimonial = { ...insertTestimonial, id };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }
  
  // Booking operations
  async getBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values());
  }
  
  async getBooking(id: number): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }
  
  async getUserBookings(userId: number): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(
      (booking) => booking.userId === userId
    );
  }
  
  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = this.currentBookingId++;
    const booking: Booking = { 
      ...insertBooking, 
      id, 
      status: "pending", 
      stripePaymentId: null,
      createdAt: new Date()
    };
    this.bookings.set(id, booking);
    return booking;
  }
  
  async updateBookingStatus(id: number, status: string): Promise<Booking | undefined> {
    const booking = this.bookings.get(id);
    if (!booking) return undefined;
    
    const updatedBooking: Booking = { ...booking, status };
    this.bookings.set(id, updatedBooking);
    return updatedBooking;
  }
  
  async updateBookingPayment(id: number, stripePaymentId: string): Promise<Booking | undefined> {
    const booking = this.bookings.get(id);
    if (!booking) return undefined;
    
    const updatedBooking: Booking = { ...booking, stripePaymentId, status: "paid" };
    this.bookings.set(id, updatedBooking);
    return updatedBooking;
  }
}

export const storage = new MemStorage();
