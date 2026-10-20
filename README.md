# Tansh Immigration - Full Stack Multi-Page Web Application

A modern, high-converting, full-stack multi-page web platform for **Tansh Immigration** (C-46 BPS Tower, RDC, Raj Nagar, Ghaziabad), built with a **React (JavaScript) frontend** and a **Node.js Express backend**.

---

## 🚀 Quick Start (Run in 1 Command)

### 1. Install all dependencies:
```bash
npm install
cd client && npm install
cd ../server && npm install
cd ..
```

### 2. Start both Frontend & Backend concurrently:
```bash
npm run dev
```

- **Frontend (React + Vite):** [http://localhost:3000](http://localhost:3000)
- **Backend API (Express):** [http://localhost:5000/api](http://localhost:5000/api)
- **Staff Lead Management Portal:** [http://localhost:3000/admin](http://localhost:3000/admin)

---

## 🏗️ Architecture & Project Structure

```
tansh/
├── client/                     # React (JavaScript) + Vite Frontend
│   ├── public/
│   │   └── images/             # Extracted real client departure photos (a1 - a9)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx           # Glassmorphic navbar + dark mode toggle + mobile drawer
│   │   │   ├── Footer.jsx           # Office address, contact info & quick links
│   │   │   ├── HeroCollage.jsx      # Layered 3-photo floating hero stack
│   │   │   ├── Marquee.jsx          # Seamless animated destination ticker
│   │   │   ├── StatCounter.jsx      # Animated count-up statistics
│   │   │   ├── Lightbox.jsx         # Fullscreen departure photo modal (ESC support)
│   │   │   ├── ConsultationModal.jsx# Interactive free assessment modal with confetti
│   │   │   └── FloatingWhatsApp.jsx # Sticky WhatsApp button
│   │   ├── pages/
│   │   │   ├── Home.jsx             # Comprehensive landing page
│   │   │   ├── About.jsx            # About company, 6-stage process, ethics
│   │   │   ├── Team.jsx             # Managing Director & consultant team
│   │   │   ├── Services.jsx         # Visa services hub
│   │   │   ├── WorkVisa.jsx         # Core work visa specialisation
│   │   │   ├── StudyVisa.jsx        # University shortlisting & student visas
│   │   │   ├── TouristVisa.jsx      # Schengen, UK, USA & Canada visit visas
│   │   │   ├── JobsAbroad.jsx       # Demand sectors (Hospitality, Logistics, etc.)
│   │   │   ├── Documentation.jsx    # File audit & checklists
│   │   │   ├── Destinations.jsx     # Interactive country directory with filters
│   │   │   ├── CountryDetail.jsx    # Dynamic country page (/country/:slug)
│   │   │   ├── Packages.jsx         # Gulf, European & Tier-1 pricing packages
│   │   │   ├── WhyUs.jsx            # Honesty vs. generic agents comparison
│   │   │   ├── Results.jsx          # Track record, certificates, departure preview
│   │   │   ├── Gallery.jsx          # All 9 authentic airport departure photos
│   │   │   ├── Reviews.jsx          # Verified testimonials with star ratings
│   │   │   ├── Blog.jsx             # Visa guides with search and filters
│   │   │   ├── BlogPost.jsx         # Complete work/study guide (/blog/:id)
│   │   │   ├── FAQ.jsx              # Searchable question accordion
│   │   │   ├── Contact.jsx          # Profile assessment form + Google Maps embed
│   │   │   └── AdminInquiries.jsx   # Staff CRM to manage and update incoming leads
│   │   ├── data/
│   │   │   └── siteData.js          # Centralized data model & blog generator
│   │   ├── App.jsx                  # Main routing & global modals
│   │   ├── index.css                # Curated Vanilla CSS design system
│   │   └── main.jsx
│   ├── index.html                   # SEO tags, Bricolage & Figtree fonts, Schema.org
│   └── vite.config.js               # Dev server with proxy to backend
│
├── server/                     # Node.js + Express Backend
│   ├── data/
│   │   └── inquiries.json           # Persistent consultations database
│   ├── siteData.js                  # Shared data and business logic
│   ├── index.js                     # Express REST API endpoints
│   └── package.json
│
├── Tansh Immigration – Multi-page Website.html  # Original source template
└── package.json                # Root orchestration scripts
```

---

## 🌟 Key Features

### 1. Rich Modern Design & Aesthetics
- **Bespoke Color Palette:** Deep Ink (`#0f2a43`), Ocean Blue (`#35506b`), Teal (`#0b7a75`), Stamp Red (`#c8372d`), Warm Amber (`#f2a33a`), and Slate lines (`#d9e2ec`).
- **Typography:** Google Fonts **Bricolage Grotesque** (display/headings) & **Figtree** (body).
- **Glassmorphism & Micro-Interactions:** Blurred sticky header, hover lift on cards, smooth badge animations.
- **Theme Switcher:** Dark Mode / Light Mode with state persisted in `localStorage`.
- **Authentic Visual Assets:** Extracted all real departure photos (`a1.jpg` to `a9.jpg`) from the source HTML.

### 2. Multi-Page Experience (20+ Interactive Routes)
- **Work, Study & Tourist Visas:** Dedicated service hubs with checklists and refusal avoidance tips.
- **Dynamic Country Guides:** Route `/country/:slug` with specific labor routes, student programs, and FAQs.
- **Comprehensive Blog & Articles:** Route `/blog/:id` with step-by-step roadmap, checklists, and common mistakes.
- **Client Departures Gallery:** Zoomable modal lightbox with keyboard `Escape` closing.

### 3. Full-Stack Lead Management
- **Inquiry Submission:** Forms on `/contact` and the global `ConsultationModal` submit real-time data to `POST /api/inquiries`.
- **Celebratory Feedback:** Confetti burst on successful lead capture.
- **Staff CRM Dashboard (`/admin`):**
  - View all inquiries with candidate contact, visa type, destination, and details.
  - Search by candidate name or phone.
  - Filter by status (`New`, `Contacted`, `Assessment Scheduled`, `Closed`).
  - Update status inline (`PATCH /api/inquiries/:id/status`).
  - Delete inquiries.
  - Data automatically persists to `server/data/inquiries.json`.

---

## 📡 Express Backend REST API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Backend status & uptime |
| `GET` | `/api/company` | Company address, contact, and metadata |
| `GET` | `/api/stats` | Real-time numbers & inquiry count |
| `GET` | `/api/destinations` | All destination markets |
| `GET` | `/api/destinations/:slug` | Single destination guide |
| `GET` | `/api/packages` | Visa consultancy packages & pricing |
| `GET` | `/api/blog` | Filterable list of work and study guides |
| `GET` | `/api/blog/:id` | Single blog article |
| `GET` | `/api/reviews` | Verified client reviews |
| `GET` | `/api/gallery` | Client departure photos & stories |
| `GET` | `/api/faqs` | FAQs list |
| `GET` | `/api/inquiries` | Retrieve consultation inquiries (supports search & filter) |
| `POST` | `/api/inquiries` | Submit new consultation request |
| `PATCH` | `/api/inquiries/:id/status` | Update lead status (`New`, `Contacted`, etc.) |
| `DELETE` | `/api/inquiries/:id` | Remove inquiry |

---

## 🏢 Business Information
- **Company:** Tansh Immigration
- **Address:** C-46 BPS Tower, RDC, Raj Nagar, Ghaziabad, Uttar Pradesh 201002
- **Phone:** +91 92110 71319
- **Email:** tanshimmigration@gmail.com
- **WhatsApp:** [https://wa.me/919211071319](https://wa.me/919211071319)
