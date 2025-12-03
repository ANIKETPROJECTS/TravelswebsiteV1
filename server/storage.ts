import { 
  type User, type InsertUser,
  type Destination, type InsertDestination,
  type Tour, type InsertTour,
  type TourItinerary, type InsertItinerary,
  type TourGuide, type InsertGuide,
  type Inquiry, type InsertInquiry,
  type Testimonial, type InsertTestimonial,
  type BlogPost, type InsertBlogPost,
  type NewsletterSubscriber, type InsertSubscriber,
  type TeamMember, type InsertTeamMember,
  type Faq, type InsertFaq,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllDestinations(): Promise<Destination[]>;
  getDestination(id: string): Promise<Destination | undefined>;
  getFeaturedDestinations(): Promise<Destination[]>;
  
  getAllTours(): Promise<Tour[]>;
  getTour(id: string): Promise<Tour | undefined>;
  getFeaturedTours(): Promise<Tour[]>;
  getToursByDestination(destinationId: string): Promise<Tour[]>;
  
  getTourItinerary(tourId: string): Promise<TourItinerary[]>;
  
  getAllGuides(): Promise<TourGuide[]>;
  getGuide(id: string): Promise<TourGuide | undefined>;
  
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  getAllInquiries(): Promise<Inquiry[]>;
  
  getAllTestimonials(): Promise<Testimonial[]>;
  getFeaturedTestimonials(): Promise<Testimonial[]>;
  
  getAllBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(slug: string): Promise<BlogPost | undefined>;
  getFeaturedBlogPosts(): Promise<BlogPost[]>;
  
  subscribeNewsletter(subscriber: InsertSubscriber): Promise<NewsletterSubscriber>;
  isEmailSubscribed(email: string): Promise<boolean>;
  
  getAllTeamMembers(): Promise<TeamMember[]>;
  
  getAllFaqs(): Promise<Faq[]>;
  getFaqsByTour(tourId: string): Promise<Faq[]>;
  
  createContactMessage(message: { fullName: string; email: string; phone?: string; subject: string; message: string }): Promise<{ id: string }>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private destinations: Map<string, Destination>;
  private tours: Map<string, Tour>;
  private itineraries: Map<string, TourItinerary>;
  private guides: Map<string, TourGuide>;
  private inquiries: Map<string, Inquiry>;
  private testimonials: Map<string, Testimonial>;
  private blogPosts: Map<string, BlogPost>;
  private subscribers: Map<string, NewsletterSubscriber>;
  private teamMembers: Map<string, TeamMember>;
  private faqs: Map<string, Faq>;
  private contactMessages: Map<string, any>;

  constructor() {
    this.users = new Map();
    this.destinations = new Map();
    this.tours = new Map();
    this.itineraries = new Map();
    this.guides = new Map();
    this.inquiries = new Map();
    this.testimonials = new Map();
    this.blogPosts = new Map();
    this.subscribers = new Map();
    this.teamMembers = new Map();
    this.faqs = new Map();
    this.contactMessages = new Map();
    
    this.seedData();
  }

  private seedData() {
    const destinationsData: Destination[] = [
      { id: "1", name: "Bali", country: "Indonesia", continent: "asia", description: "Experience the magical island of Bali with its stunning temples, rice terraces, and pristine beaches.", shortDescription: "Tropical paradise with temples and beaches", imageUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800", rating: 4.9, reviewCount: 2847, priceFrom: 899, featured: true, trending: true, popular: true, isNew: false },
      { id: "2", name: "Santorini", country: "Greece", continent: "europe", description: "Explore the iconic white-washed buildings and blue domes of Santorini.", shortDescription: "Iconic Greek island with stunning sunsets", imageUrl: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800", rating: 4.8, reviewCount: 3156, priceFrom: 1299, featured: true, trending: false, popular: true, isNew: false },
      { id: "3", name: "Maldives", country: "Maldives", continent: "asia", description: "Indulge in the ultimate luxury escape in the Maldives.", shortDescription: "Luxury overwater villas in crystal waters", imageUrl: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800", rating: 4.9, reviewCount: 1923, priceFrom: 2499, featured: true, trending: true, popular: true, isNew: false },
      { id: "4", name: "Swiss Alps", country: "Switzerland", continent: "europe", description: "Discover the majestic Swiss Alps with breathtaking mountain scenery.", shortDescription: "Majestic mountains and alpine villages", imageUrl: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800", rating: 4.7, reviewCount: 2134, priceFrom: 1799, featured: false, trending: false, popular: true, isNew: true },
      { id: "5", name: "Tokyo", country: "Japan", continent: "asia", description: "Immerse yourself in the fascinating blend of ultra-modern and traditional Japan.", shortDescription: "Ancient traditions meet futuristic innovation", imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800", rating: 4.8, reviewCount: 4521, priceFrom: 1599, featured: true, trending: true, popular: true, isNew: false },
      { id: "6", name: "Machu Picchu", country: "Peru", continent: "south-america", description: "Trek to the ancient Incan citadel of Machu Picchu.", shortDescription: "Ancient Incan citadel in the clouds", imageUrl: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800", rating: 4.9, reviewCount: 2876, priceFrom: 1899, featured: true, trending: false, popular: true, isNew: false },
      { id: "7", name: "Safari Kenya", country: "Kenya", continent: "africa", description: "Witness the incredible wildlife of Kenya on an unforgettable safari adventure.", shortDescription: "Wildlife safari and the great migration", imageUrl: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800", rating: 4.8, reviewCount: 1654, priceFrom: 2199, featured: false, trending: true, popular: false, isNew: true },
      { id: "8", name: "Dubai", country: "UAE", continent: "asia", description: "Experience the glamour and innovation of Dubai.", shortDescription: "Luxury, innovation, and desert adventures", imageUrl: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800", rating: 4.7, reviewCount: 3892, priceFrom: 1399, featured: false, trending: true, popular: true, isNew: false },
      { id: "9", name: "New Zealand", country: "New Zealand", continent: "oceania", description: "Explore the stunning landscapes of New Zealand.", shortDescription: "Epic landscapes and adventure sports", imageUrl: "https://images.unsplash.com/photo-1469521669194-babb45599def?w=800", rating: 4.9, reviewCount: 1876, priceFrom: 2299, featured: false, trending: false, popular: true, isNew: true },
    ];

    destinationsData.forEach(d => this.destinations.set(d.id, d));

    const toursData: Tour[] = [
      { id: "1", title: "Bali Bliss: Temples & Beaches", destinationId: "1", description: "Embark on an unforgettable journey through Bali's most iconic destinations.", shortDescription: "7-day cultural and beach experience in Bali", duration: "7 Days / 6 Nights", price: 1299, originalPrice: 1599, rating: 4.9, reviewCount: 847, maxGroupSize: 12, spotsLeft: 4, category: "adventure", imageUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800", galleryImages: ["https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800"], inclusions: ["Airport transfers", "6 nights accommodation", "Daily breakfast", "Professional guide"], exclusions: ["International flights", "Travel insurance", "Personal expenses"], highlights: ["Watch sunrise at Mount Batur", "Explore Ubud's art markets"], featured: true },
      { id: "2", title: "Santorini Romantic Escape", destinationId: "2", description: "Experience the romance of Santorini with this carefully curated getaway.", shortDescription: "5-day romantic getaway in the Greek Islands", duration: "5 Days / 4 Nights", price: 1899, originalPrice: 2299, rating: 4.8, reviewCount: 623, maxGroupSize: 8, spotsLeft: 2, category: "honeymoon", imageUrl: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800", galleryImages: ["https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800"], inclusions: ["Luxury cave hotel", "Private transfers", "Wine tasting", "Sunset cruise"], exclusions: ["Flights", "Travel insurance"], highlights: ["Private sunset dinner in Oia", "Catamaran cruise"], featured: true },
      { id: "3", title: "Maldives Luxury Retreat", destinationId: "3", description: "Indulge in the ultimate luxury at an exclusive Maldives resort.", shortDescription: "6-day all-inclusive luxury beach escape", duration: "6 Days / 5 Nights", price: 3999, originalPrice: 4799, rating: 4.9, reviewCount: 412, maxGroupSize: 6, spotsLeft: 3, category: "luxury", imageUrl: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800", galleryImages: ["https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800"], inclusions: ["Overwater villa", "All meals", "Snorkeling equipment", "Sunset cruise"], exclusions: ["Flights", "Spa treatments"], highlights: ["Stay in overwater bungalow", "Swim with manta rays"], featured: true },
      { id: "4", title: "Japan Cultural Discovery", destinationId: "5", description: "Journey through Japan's rich cultural heritage and modern marvels.", shortDescription: "10-day journey through ancient and modern Japan", duration: "10 Days / 9 Nights", price: 2799, originalPrice: 3299, rating: 4.8, reviewCount: 892, maxGroupSize: 14, spotsLeft: 6, category: "cultural", imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800", galleryImages: ["https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800"], inclusions: ["JR Pass", "Traditional ryokan stay", "Tea ceremony"], exclusions: ["Flights", "Lunch and dinner"], highlights: ["Visit Fushimi Inari shrine", "Bullet train adventure"], featured: true },
      { id: "5", title: "African Safari Adventure", destinationId: "7", description: "Witness the raw beauty of African wildlife on this unforgettable safari.", shortDescription: "8-day wildlife safari in Kenya", duration: "8 Days / 7 Nights", price: 3499, originalPrice: 3999, rating: 4.9, reviewCount: 567, maxGroupSize: 8, spotsLeft: 5, category: "wildlife", imageUrl: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800", galleryImages: ["https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800"], inclusions: ["Luxury tented camp", "All game drives", "Park entrance fees"], exclusions: ["Flights", "Visa fees"], highlights: ["Big Five game viewing", "Maasai cultural experience"], featured: true },
      { id: "6", title: "Machu Picchu Trek", destinationId: "6", description: "Embark on the classic Inca Trail to Machu Picchu.", shortDescription: "5-day Inca Trail adventure to the lost city", duration: "5 Days / 4 Nights", price: 1699, originalPrice: 1999, rating: 4.9, reviewCount: 734, maxGroupSize: 10, spotsLeft: 3, category: "adventure", imageUrl: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800", galleryImages: ["https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800"], inclusions: ["Inca Trail permit", "Professional guide", "Camping equipment"], exclusions: ["Flights to Cusco", "Sleeping bag"], highlights: ["Trek the famous Inca Trail", "Sunrise at Sun Gate"], featured: false },
    ];

    toursData.forEach(t => this.tours.set(t.id, t));

    const itinerariesData: TourItinerary[] = [
      { id: "1", tourId: "1", day: 1, title: "Arrival in Bali", description: "Welcome to Bali! Upon arrival, you'll be transferred to your hotel.", activities: ["Airport pickup", "Hotel check-in", "Welcome dinner"] },
      { id: "2", tourId: "1", day: 2, title: "Uluwatu Temple & Beaches", description: "Explore the stunning clifftop Uluwatu Temple.", activities: ["Visit Uluwatu Temple", "Kecak dance performance", "Beach time"] },
      { id: "3", tourId: "1", day: 3, title: "Ubud Art & Culture", description: "Journey to the cultural heart of Bali.", activities: ["Monkey Forest visit", "Art market exploration", "Rice terrace trek"] },
      { id: "4", tourId: "1", day: 4, title: "Mount Batur Sunrise", description: "Wake early for a magical sunrise trek to Mount Batur.", activities: ["Sunrise trek", "Volcanic breakfast", "Hot springs relaxation"] },
    ];

    itinerariesData.forEach(i => this.itineraries.set(i.id, i));

    const guidesData: TourGuide[] = [
      { id: "1", name: "Made Wijaya", title: "Senior Cultural Guide", bio: "With over 15 years of experience guiding visitors through Bali's sacred sites.", imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400", languages: ["English", "Indonesian", "Japanese"], experience: 15, rating: 4.9 },
      { id: "2", name: "Elena Papadopoulos", title: "Greece Specialist", bio: "Born and raised in Santorini, Elena shares her love for Greek history.", imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400", languages: ["English", "Greek", "Italian"], experience: 10, rating: 4.8 },
    ];

    guidesData.forEach(g => this.guides.set(g.id, g));

    const testimonialsData: Testimonial[] = [
      { id: "1", name: "Sarah Mitchell", location: "New York, USA", imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200", rating: 5, review: "Our Bali trip exceeded all expectations! The guides were incredibly knowledgeable.", tourId: "1", destinationName: "Bali", featured: true },
      { id: "2", name: "James & Emma Wilson", location: "London, UK", imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200", rating: 5, review: "The Santorini honeymoon package was pure romance.", tourId: "2", destinationName: "Santorini", featured: true },
      { id: "3", name: "Raj Patel", location: "Mumbai, India", imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200", rating: 5, review: "The African safari was a dream come true.", tourId: "5", destinationName: "Kenya", featured: true },
      { id: "4", name: "Yuki Tanaka", location: "Tokyo, Japan", imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200", rating: 5, review: "I traveled solo to Machu Picchu and felt completely safe.", tourId: "6", destinationName: "Peru", featured: true },
      { id: "5", name: "Michael & Lisa Brown", location: "Sydney, Australia", imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200", rating: 5, review: "The Maldives exceeded our wildest dreams.", tourId: "3", destinationName: "Maldives", featured: true },
    ];

    testimonialsData.forEach(t => this.testimonials.set(t.id, t));

    const blogPostsData: BlogPost[] = [
      { id: "1", title: "10 Hidden Gems in Bali You Need to Visit", slug: "hidden-gems-bali", excerpt: "Discover the secret spots that most tourists miss.", content: "Full article content here...", imageUrl: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800", category: "Destinations", author: "Emma Thompson", authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100", readTime: 8, publishedAt: new Date("2024-01-15"), featured: true },
      { id: "2", title: "Ultimate Packing Guide for Adventure Travel", slug: "adventure-packing-guide", excerpt: "Pack smart, travel light.", content: "Full article content here...", imageUrl: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800", category: "Travel Tips", author: "David Chen", authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100", readTime: 6, publishedAt: new Date("2024-01-10"), featured: false },
      { id: "3", title: "Best Time to Visit Each Continent", slug: "best-time-to-visit", excerpt: "Plan your trips perfectly with our seasonal guide.", content: "Full article content here...", imageUrl: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800", category: "Planning", author: "Sophie Anderson", authorImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100", readTime: 10, publishedAt: new Date("2024-01-05"), featured: false },
    ];

    blogPostsData.forEach(b => this.blogPosts.set(b.id, b));

    const teamMembersData: TeamMember[] = [
      { id: "1", name: "Alexandra Chen", role: "Founder & CEO", bio: "With 20+ years in the travel industry, Alex founded Wanderlust Tours.", imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400", linkedIn: "https://linkedin.com", twitter: "https://twitter.com" },
      { id: "2", name: "Marcus Johnson", role: "Head of Operations", bio: "Marcus ensures every trip runs smoothly.", imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400", linkedIn: "https://linkedin.com", twitter: null },
      { id: "3", name: "Priya Sharma", role: "Lead Travel Designer", bio: "Priya crafts bespoke itineraries.", imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400", linkedIn: "https://linkedin.com", twitter: "https://twitter.com" },
      { id: "4", name: "Tom Williams", role: "Customer Experience Manager", bio: "Tom leads our 24/7 support team.", imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400", linkedIn: "https://linkedin.com", twitter: null },
    ];

    teamMembersData.forEach(t => this.teamMembers.set(t.id, t));

    const faqsData: Faq[] = [
      { id: "1", question: "How far in advance should I book my tour?", answer: "We recommend booking at least 3-6 months in advance for popular destinations, especially during peak seasons.", category: "general", tourId: null },
      { id: "2", question: "What is your cancellation policy?", answer: "Full refund for cancellations made 60+ days before departure. 50% refund for 30-59 days. No refund for less than 30 days.", category: "general", tourId: null },
      { id: "3", question: "Do you offer travel insurance?", answer: "We strongly recommend travel insurance and can help you find the right coverage for your trip.", category: "general", tourId: null },
      { id: "4", question: "Are your tours suitable for families with children?", answer: "Many of our tours are family-friendly! We have specific family-oriented packages designed for all ages.", category: "general", tourId: null },
      { id: "5", question: "What payment methods do you accept?", answer: "We accept all major credit cards, PayPal, and bank transfers. We also offer flexible payment plans for bookings.", category: "general", tourId: null },
    ];

    faqsData.forEach(f => this.faqs.set(f.id, f));
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllDestinations(): Promise<Destination[]> {
    return Array.from(this.destinations.values());
  }

  async getDestination(id: string): Promise<Destination | undefined> {
    return this.destinations.get(id);
  }

  async getFeaturedDestinations(): Promise<Destination[]> {
    return Array.from(this.destinations.values()).filter(d => d.featured);
  }

  async getAllTours(): Promise<Tour[]> {
    return Array.from(this.tours.values());
  }

  async getTour(id: string): Promise<Tour | undefined> {
    return this.tours.get(id);
  }

  async getFeaturedTours(): Promise<Tour[]> {
    return Array.from(this.tours.values()).filter(t => t.featured);
  }

  async getToursByDestination(destinationId: string): Promise<Tour[]> {
    return Array.from(this.tours.values()).filter(t => t.destinationId === destinationId);
  }

  async getTourItinerary(tourId: string): Promise<TourItinerary[]> {
    return Array.from(this.itineraries.values()).filter(i => i.tourId === tourId).sort((a, b) => a.day - b.day);
  }

  async getAllGuides(): Promise<TourGuide[]> {
    return Array.from(this.guides.values());
  }

  async getGuide(id: string): Promise<TourGuide | undefined> {
    return this.guides.get(id);
  }

  async createInquiry(inquiry: InsertInquiry): Promise<Inquiry> {
    const id = randomUUID();
    const newInquiry: Inquiry = { ...inquiry, id, createdAt: new Date() };
    this.inquiries.set(id, newInquiry);
    console.log(`[EMAIL SIMULATION] New inquiry from ${inquiry.fullName} (${inquiry.email}) for tour ${inquiry.tourId || 'general'}`);
    return newInquiry;
  }

  async getAllInquiries(): Promise<Inquiry[]> {
    return Array.from(this.inquiries.values()).sort((a, b) => 
      (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
    );
  }

  async getAllTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async getFeaturedTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values()).filter(t => t.featured);
  }

  async getAllBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).sort((a, b) => 
      (b.publishedAt?.getTime() || 0) - (a.publishedAt?.getTime() || 0)
    );
  }

  async getBlogPost(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(p => p.slug === slug);
  }

  async getFeaturedBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).filter(p => p.featured);
  }

  async subscribeNewsletter(subscriber: InsertSubscriber): Promise<NewsletterSubscriber> {
    const existing = await this.isEmailSubscribed(subscriber.email);
    if (existing) {
      throw new Error("Email already subscribed");
    }
    const id = randomUUID();
    const newSubscriber: NewsletterSubscriber = { ...subscriber, id, subscribedAt: new Date() };
    this.subscribers.set(id, newSubscriber);
    console.log(`[EMAIL SIMULATION] New newsletter subscriber: ${subscriber.email}`);
    return newSubscriber;
  }

  async isEmailSubscribed(email: string): Promise<boolean> {
    return Array.from(this.subscribers.values()).some(s => s.email === email);
  }

  async getAllTeamMembers(): Promise<TeamMember[]> {
    return Array.from(this.teamMembers.values());
  }

  async getAllFaqs(): Promise<Faq[]> {
    return Array.from(this.faqs.values());
  }

  async getFaqsByTour(tourId: string): Promise<Faq[]> {
    return Array.from(this.faqs.values()).filter(f => f.tourId === tourId || f.category === "general");
  }

  async createContactMessage(message: { fullName: string; email: string; phone?: string; subject: string; message: string }): Promise<{ id: string }> {
    const id = randomUUID();
    this.contactMessages.set(id, { ...message, id, createdAt: new Date() });
    console.log(`[EMAIL SIMULATION] New contact message from ${message.fullName} (${message.email}): ${message.subject}`);
    return { id };
  }
}

export const storage = new MemStorage();
