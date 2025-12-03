# Tours & Travel Website Design Guidelines

## Design Approach
**Reference-Based**: Drawing inspiration from modern travel platforms (Airbnb, Booking.com) with immersive imagery, interactive booking flows, and trust-building elements. This is an experience-focused, visual-rich application where aesthetic appeal drives engagement and conversions.

## Core Design Elements

### Typography
- **Headings**: Montserrat or Poppins (bold weights 600-800 for impact, thin weights 200-300 for elegance)
- **Body**: Inter or Open Sans (regular 400, medium 500)
- **Hierarchy**: Hero h1 (4xl-6xl), Section h2 (3xl-4xl), Card h3 (xl-2xl), Body (base-lg)

### Layout System
**Tailwind Spacing**: Use units of 2, 4, 6, 8, 12, 16, 20, 24, 32 for consistent rhythm
- Section padding: py-16 to py-32 (desktop), py-12 to py-20 (mobile)
- Card spacing: p-6 to p-8
- Grid gaps: gap-4 to gap-8
- Container max-widths: max-w-7xl for full sections, max-w-6xl for content areas

### Visual Design Style
- **Glassmorphism**: Cards and overlays with backdrop-blur, semi-transparent backgrounds (bg-white/10, bg-black/20)
- **Full-bleed imagery**: Hero and destination cards use edge-to-edge photos
- **Smooth parallax**: Subtle background movement on scroll
- **Micro-animations**: Hover scale (scale-105), fade-in on scroll, counter animations
- **Shadow depth**: Use layered shadows for depth (shadow-lg, shadow-xl)

## Component Library

### Hero Section
- Full-viewport height (h-screen) with video background or rotating destination imagery
- Animated headline: "Explore. Dream. Discover." with fade-in effect
- Smart search bar with glassmorphism backdrop containing:
  - Destination autocomplete dropdown
  - Date picker (departure/return dates)
  - Traveler count selector (+/- buttons)
  - Budget range slider with visual feedback
  - Prominent search/submit button
- Floating scroll indicator animation at bottom

### Interactive Cards (Destinations/Tours)
- 3-column grid (lg:grid-cols-3, md:grid-cols-2, grid-cols-1)
- Hover effects: scale-105 transform, reveal overlay with price/duration/rating
- Badge overlays: "Trending," "Popular," "New" positioned top-right
- Quick view modal trigger on click
- Category tags below image (Adventure, Luxury, Family, Honeymoon, Solo)

### Tour Detail Page
- Image gallery grid (4-6 images) with lightbox modal
- Sticky inquiry widget (right sidebar desktop, bottom mobile) with WhatsApp/Call/Email buttons
- Tabbed interface: Overview, Itinerary, Inclusions/Exclusions, Reviews
- Interactive timeline for day-by-day itinerary with icon markers
- Tour guide profile card with photo and bio
- FAQ accordion component
- Social share button group

### Inquiry/Booking Forms
- Clean, single-column form layout with:
  - Full Name, Email, Phone (required fields marked with asterisk)
  - Selected Tour dropdown (pre-populated if coming from tour page)
  - Travel Date picker
  - Number of Travelers selector
  - Special Requirements textarea
- Instant WhatsApp redirect button (green, with icon)
- Direct call button (blue, with phone icon)
- Success animation: confetti effect on submission with confirmation message

### Why Choose Us Section
- 4-column icon grid (responsive to 2-col on tablet, 1-col mobile)
- Animated SVG icons with subtle bounce on scroll-into-view
- Counter animations for stats ("500+ Destinations," "50,000+ Happy Travelers")
- Brief descriptions under each feature

### Testimonials
- 3-column card grid with alternating heights for visual interest
- Star ratings with animated fill effect
- Traveler photos (circular avatars)
- Trust badges: TripAdvisor, Google Reviews logos
- Optional: Video testimonial modals

### Interactive World Map (Destinations Page)
- SVG world map with clickable continent/country regions
- Hover highlight states on regions
- Click triggers filter for that location
- Filter sidebar: price range slider, duration checkboxes, activity type chips, season selector
- Grid/list view toggle buttons

### Contact Page
- 2-column layout (lg): Form left, info/map right
- Google Maps embed with company location pin
- Contact methods listed with icons: phone (click-to-call), email, WhatsApp (direct link), office hours
- Social media icon row with hover effects

### Footer
- 4-column layout (responsive): Quick Links, Destinations, Company Info, Newsletter
- Newsletter signup: email input with inline submit button
- Social media icons with hover color transitions
- Payment method logos row
- Awards/certifications badges
- Bottom bar: Copyright, Privacy Policy, Terms links

## Sticky/Floating Elements
- WhatsApp button: Fixed bottom-right, circular green button with pulse animation
- Call button (mobile only): Fixed bottom-left when on mobile
- "Contact Us" quick inquiry modal trigger: Floating button on scroll

## Mobile Optimization
- Bottom navigation bar (5 icons max): Home, Destinations, Search, Blog, Contact
- Swipeable image galleries (touch gestures)
- Touch-friendly date pickers and selectors
- Sticky "Contact Us" button always visible
- Hamburger menu for main navigation

## Trust & Conversion Elements
- Security badges in footer and checkout areas
- "As Featured In" media logo row on homepage
- Live inquiry notifications: Toast messages ("Sarah from Mumbai just inquired...")
- Countdown timers for limited offers (if applicable)
- "Only X spots left!" availability indicators on tour cards
- Money-back guarantee seal near CTAs

## Images Strategy
**Critical: Use high-quality, vibrant travel photography throughout**
- **Hero**: Full-screen landscape/destination imagery or video (1920x1080 min)
- **Destination cards**: Landscape photos showcasing location highlights (600x400)
- **Tour detail galleries**: Multiple angles, activities, accommodations (800x600)
- **Team photos**: Professional headshots for About Us page (400x400)
- **Testimonial photos**: Real traveler photos (200x200 circular)
- **Blog thumbnails**: Featured images for each article (800x450)
- **Background overlays**: Subtle gradients (dark to transparent) for text readability on hero images

All buttons on images must have blurred backgrounds (backdrop-blur-sm, bg-white/20) for visibility against varied photo content.

## Animations (Minimal, Purposeful)
- Fade-in on scroll for sections
- Hover scale (1.05) on cards and images
- Counter number animations
- Skeleton loading screens for dynamic content
- Smooth page transitions
- Confetti on successful form submission
- Parallax on hero background only

## Accessibility
- ARIA labels for all interactive elements
- Keyboard navigation support
- Focus states on all clickable elements (ring-2 ring-offset-2)
- Alt text for all images
- Sufficient color contrast ratios (WCAG AA)
- Click targets minimum 44x44px