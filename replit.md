# Wanderlust Tours - Travel & Tourism Website

## Overview

Wanderlust Tours is a modern, full-stack travel and tourism website built with React, Express, and PostgreSQL. The application allows users to browse destinations, explore tour packages, read travel blogs, and submit inquiries without requiring authentication. The platform features an immersive, image-rich design inspired by modern travel platforms like Airbnb and Booking.com, with glassmorphism effects, smooth animations, and a mobile-first responsive layout.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- **Framework**: React 18+ with TypeScript
- **Routing**: Wouter (lightweight client-side routing)
- **Styling**: Tailwind CSS with custom design system based on shadcn/ui components
- **State Management**: TanStack Query (React Query) for server state
- **Form Handling**: React Hook Form with Zod validation
- **UI Components**: Radix UI primitives with custom styling

**Design System:**
- Custom color palette with Deep Teal (#0A7E8C) as primary and Sunset Orange (#FF6B35) as accent
- Typography using Montserrat/Poppins for headings and Inter/Open Sans for body text
- Glassmorphism effects with backdrop blur and semi-transparent backgrounds
- Animation system with scroll-triggered fade-ins, hover effects, and micro-interactions
- Fully responsive grid layouts using Tailwind's breakpoint system

**Key Pages:**
- Home: Hero section with search functionality, featured destinations, popular tours, testimonials, and blog preview
- Destinations: Filterable grid with continent, price range, and search filters
- Tours: Category-based tour listings with detailed filtering options
- Tour Detail: Image gallery, tabbed content (overview, itinerary, inclusions), inquiry widget
- About: Company timeline, team members, values, and statistics
- Blog: Article listings with search and category filters
- Contact: Contact form, FAQ accordion, and company information

**Component Strategy:**
- Reusable UI components in `client/src/components/ui/` following shadcn/ui patterns
- Feature components in `client/src/components/` (header, footer, hero, etc.)
- Page components in `client/src/pages/` for route-level organization
- Custom hooks for common functionality (mobile detection, toast notifications)

### Backend Architecture

**Technology Stack:**
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ESNext modules
- **Build System**: esbuild for server bundling, Vite for client bundling
- **Database ORM**: Drizzle ORM with PostgreSQL dialect

**Server Structure:**
- Express middleware setup with JSON parsing and URL encoding
- Custom logging middleware tracking request duration and responses
- Static file serving for production builds
- API routes prefixed with `/api` (currently placeholder implementation)
- Separate storage abstraction layer for data operations

**Storage Layer:**
- Interface-based design (`IStorage`) for flexible data access
- In-memory implementation (`MemStorage`) for development/testing
- Prepared for PostgreSQL integration via Drizzle ORM
- CRUD operations for users (extensible for destinations, tours, inquiries, etc.)

**Development vs. Production:**
- Development: Vite dev server with HMR over WebSocket
- Production: Pre-built static assets served via Express
- Environment-specific configuration through NODE_ENV

### Database Design

**Schema Structure (PostgreSQL via Drizzle):**

**Destinations Table:**
- Geographic information (name, country, continent)
- Descriptive content (description, short description)
- Imagery (image URLs)
- Metrics (rating, review count, price from)
- Categorization flags (featured, trending, popular, new)

**Tours Table:**
- Links to destinations via `destinationId`
- Pricing information (price, original price for discounts)
- Tour details (duration, category, max group size)
- Rich content (descriptions, highlights, inclusions/exclusions arrays)
- Image galleries (multiple image URLs)
- Availability tracking (spots left)

**Supporting Schemas:**
- Tour itineraries with day-by-day breakdowns
- Tour guides with profile information
- Testimonials with user feedback
- Blog posts with author and category metadata
- Team members for about page
- FAQs organized by category

**Data Relationships:**
- Tours belong to destinations (one-to-many)
- Itineraries belong to tours (one-to-many)
- Guides associated with tours
- Testimonials reference tours
- All relationships use UUID primary keys

### Form Handling & Validation

**Strategy:**
- Zod schemas for runtime type validation
- Drizzle-Zod integration for database schema validation
- React Hook Form for client-side form state management
- Server-side validation planned for API endpoints

**Key Forms:**
- Search form in hero (destination, dates, travelers, budget)
- Inquiry modal (contact information, tour selection, travel preferences)
- Contact form (general inquiries)
- Newsletter subscription

### Build & Deployment

**Build Process:**
- Client built with Vite (React + TypeScript)
- Server bundled with esbuild to single CJS file
- Selective dependency bundling (allowlist approach) to reduce cold start times
- Custom build script orchestrating both client and server builds
- Output: `dist/public/` for client assets, `dist/index.cjs` for server

**Development Workflow:**
- Hot module replacement via Vite
- TypeScript type checking separate from runtime
- Source maps for debugging
- Replit-specific plugins for error overlays and dev banners

## External Dependencies

### Third-Party UI Libraries
- **Radix UI**: Unstyled, accessible component primitives (dialogs, dropdowns, tooltips, etc.)
- **shadcn/ui**: Pre-styled components built on Radix UI with Tailwind
- **Embla Carousel**: Touch-friendly carousel for image galleries
- **cmdk**: Command palette component for search interfaces
- **Lucide React**: Icon library for consistent iconography

### Database & ORM
- **@neondatabase/serverless**: PostgreSQL driver optimized for serverless environments
- **Drizzle ORM**: Type-safe SQL query builder and migration tool
- **Drizzle Kit**: CLI tool for schema management and migrations

### Form & Validation
- **React Hook Form**: Performant form state management
- **Zod**: TypeScript-first schema validation
- **@hookform/resolvers**: Integration between React Hook Form and Zod

### Styling & Animation
- **Tailwind CSS**: Utility-first CSS framework
- **class-variance-authority**: Variant-based component styling
- **clsx** & **tailwind-merge**: Conditional class name utilities
- **PostCSS** & **Autoprefixer**: CSS processing

### Utilities
- **date-fns**: Date manipulation and formatting
- **nanoid**: Unique ID generation
- **wouter**: Lightweight client-side routing (alternative to React Router)

### Development Tools
- **Vite**: Build tool and dev server
- **esbuild**: Fast JavaScript/TypeScript bundler
- **TypeScript**: Static type checking
- **tsx**: TypeScript execution for Node.js
- **@replit/vite-plugin-runtime-error-modal**: Development error overlays

### Fonts
- **Google Fonts**: Montserrat, Poppins (headings), Inter, Open Sans (body text)

### Planned Integrations
The schema and architecture suggest readiness for:
- Session management (connect-pg-simple for PostgreSQL sessions)
- Email functionality (nodemailer)
- Payment processing (Stripe)
- AI features (OpenAI, Google Generative AI)
- Real-time features (WebSocket support via ws)
- File uploads (multer)
- Rate limiting (express-rate-limit)