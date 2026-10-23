import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { siteData } from './siteData.js';
import { sendInquiryNotification } from './emailService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from server/.env
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Inquiries database path
const INQUIRIES_FILE = path.join(__dirname, 'data', 'inquiries.json');

// Helper to read inquiries
const readInquiries = () => {
  try {
    if (!fs.existsSync(INQUIRIES_FILE)) {
      fs.mkdirSync(path.dirname(INQUIRIES_FILE), { recursive: true });
      fs.writeFileSync(INQUIRIES_FILE, JSON.stringify([], null, 2));
      return [];
    }
    const data = fs.readFileSync(INQUIRIES_FILE, 'utf8');
    return JSON.parse(data || '[]');
  } catch (err) {
    console.error('Error reading inquiries:', err);
    return [];
  }
};

// Helper to write inquiries
const writeInquiries = (inquiries) => {
  try {
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error writing inquiries:', err);
    return false;
  }
};


// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'Tansh Immigration Backend API',
    timestamp: new Date().toISOString()
  });
});

// Company information & contact
app.get('/api/company', (req, res) => {
  res.json(siteData.company);
});

// Real-time statistics
app.get('/api/stats', (req, res) => {
  const inquiries = readInquiries();
  res.json({
    ...siteData.company.stats,
    inquiriesReceived: inquiries.length,
    activeCases: 142
  });
});

// Destinations
app.get('/api/destinations', (req, res) => {
  res.json(Object.values(siteData.destinations));
});

app.get('/api/destinations/:slug', (req, res) => {
  const dest = siteData.destinations[req.params.slug.toLowerCase()];
  if (!dest) {
    return res.status(404).json({ error: 'Destination not found' });
  }
  res.json(dest);
});

// Services
app.get('/api/services', (req, res) => {
  res.json(siteData.services);
});

// Packages & Pricing
app.get('/api/packages', (req, res) => {
  res.json(siteData.packages);
});

// Process Steps
app.get('/api/process', (req, res) => {
  res.json(siteData.processSteps);
});

// Team
app.get('/api/team', (req, res) => {
  res.json(siteData.team);
});

// Reviews / Testimonials
app.get('/api/reviews', (req, res) => {
  res.json(siteData.reviews);
});

// Gallery & Departures
app.get('/api/gallery', (req, res) => {
  res.json(siteData.gallery);
});

// FAQs
app.get('/api/faqs', (req, res) => {
  res.json(siteData.faqs);
});

// Blog posts - generated dynamically from destination insights
const generateBlogPosts = () => {
  const posts = [];
  for (const [slug, dest] of Object.entries(siteData.destinations)) {
    // Work visa guide
    posts.push({
      id: `${slug}-work`,
      slug: slug,
      type: 'work',
      category: 'Work Visa',
      title: `${dest.name} Work Visa Guide: Requirements, Process & Jobs`,
      excerpt: `Comprehensive roadmap for Indians aiming to obtain a legal work permit in ${dest.name}. Sectors in demand: ${dest.sectors}.`,
      readingTime: '5 min read',
      destination: dest.name,
      publishedDate: '2026-10-10',
      author: 'Tansh Immigration Editorial Team',
      content: {
        overview: `Employers in ${dest.name} actively seek qualified candidates in ${dest.sectors}. The standard route is ${dest.workRoute}.`,
        eligibility: [
          'Relevant formal qualification or certified vocational skill',
          'Documented work experience letters with clear job duties',
          `Language proficiency requirement: ${dest.language}`,
          'Clean police record and fitness clearance (PCC & Medical)'
        ],
        documents: [
          'Valid Indian Passport with minimum 12 months validity',
          'Updated European/International format CV and work references',
          'Academic degrees, diplomas, and marksheets',
          'Police Clearance Certificate (PCC) issued by Passport Seva Kendra (PSK)',
          'Medical fitness and blood work reports from authorized diagnostic centers',
          'Employment offer letter, contract, or sponsorship document from employer'
        ],
        processSteps: [
          'Initial profile review and candidate credential verification',
          'Employer coordination, interview scheduling, and offer letter issuance',
          'Work permit file preparation and submission to destination labor authorities',
          'Embassy/VFS visa appointment, biometrics, and interview readiness',
          'Visa stamping, flight booking, and pre-departure orientation'
        ],
        commonMistakes: [
          'Submitting unverified or inconsistent employer certificates',
          'Failing to show adequate proof of prior technical experience',
          'Applying under the wrong national occupation classification (NOC/ISCO)',
          'Relying on unregulated middlemen promising 100% visa guarantees'
        ]
      }
    });

    // Study visa guide
    posts.push({
      id: `${slug}-study`,
      slug: slug,
      type: 'study',
      category: 'Study Abroad',
      title: `Study in ${dest.name}: Admission, Visas & Post-Study Work`,
      excerpt: `Complete guide for Indian students planning higher education in ${dest.name}. Explore universities, intakes, costs, and student visa files.`,
      readingTime: '6 min read',
      destination: dest.name,
      publishedDate: '2026-10-12',
      author: 'Ms. Ritika Thakur, Senior Consultant',
      content: {
        overview: `${dest.name} offers ${dest.studyRoute}.`,
        eligibility: [
          'Consistent academic performance in 10th, 12th, and Bachelor degree',
          `Proficiency in language: ${dest.language} (IELTS, TOEFL, PTE or Duolingo)`,
          'Clear financial capability to cover tuition and living expenses',
          'Genuine intention to study with a well-structured Statement of Purpose (SOP)'
        ],
        documents: [
          'Passport and attested educational marksheets & degrees',
          'Official Offer Letter or Confirmation of Enrolment from the university',
          'English language test scorecards',
          'Bank balance certificate, ITRs of sponsors, and education loan sanction letter',
          'Statement of Purpose (SOP) explaining course selection and career goals',
          'Letters of recommendation (LORs) from professors or managers'
        ],
        processSteps: [
          'Free profile evaluation, course selection, and university shortlisting',
          'Application submission and securing an offer letter (Conditional / Unconditional)',
          'Tuition fee deposit and obtaining CAS / I-20 / LOA / Visa letter',
          'Financial documentation structuring and visa file compilation',
          'Biometrics, visa interview preparation, and arrival coordination'
        ],
        commonMistakes: [
          'Plagiarized or generic Statement of Purpose (SOP)',
          'Submitting funds held for insufficient duration without provenance',
          'Missing intake deadlines leading to deferred admissions',
          'Applying without meeting minimum band scores in English proficiency'
        ]
      }
    });
  }
  return posts;
};

const blogPosts = generateBlogPosts();

app.get('/api/blog', (req, res) => {
  const { type, destination, search } = req.query;
  let filtered = [...blogPosts];

  if (type) {
    filtered = filtered.filter(p => p.type.toLowerCase() === type.toLowerCase());
  }
  if (destination) {
    filtered = filtered.filter(p => p.slug.toLowerCase() === destination.toLowerCase());
  }
  if (search) {
    const s = search.toLowerCase();
    filtered = filtered.filter(p => p.title.toLowerCase().includes(s) || p.excerpt.toLowerCase().includes(s));
  }

  res.json(filtered);
});

app.get('/api/blog/:id', (req, res) => {
  const post = blogPosts.find(p => p.id === req.params.id);
  if (!post) {
    return res.status(404).json({ error: 'Blog post not found' });
  }
  res.json(post);
});

// --- INQUIRIES & CONSULTATIONS CRUD ---

// Get all consultations (with search & status filter)
app.get('/api/inquiries', (req, res) => {
  const { status, visaType, search } = req.query;
  let inquiries = readInquiries();

  if (status && status !== 'all') {
    inquiries = inquiries.filter(i => i.status.toLowerCase() === status.toLowerCase());
  }
  if (visaType && visaType !== 'all') {
    inquiries = inquiries.filter(i => i.visaType.toLowerCase() === visaType.toLowerCase());
  }
  if (search) {
    const s = search.toLowerCase();
    inquiries = inquiries.filter(i =>
      i.name.toLowerCase().includes(s) ||
      i.phone.toLowerCase().includes(s) ||
      (i.email && i.email.toLowerCase().includes(s)) ||
      (i.destination && i.destination.toLowerCase().includes(s))
    );
  }

  // Sort newest first
  inquiries.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json(inquiries);
});

// Submit a new consultation inquiry
app.post('/api/inquiries', (req, res) => {
  const { name, phone, email, visaType, destination, country, education, experience, timeSlot, message } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'Full name is required' });
  }
  if (!phone || !phone.trim()) {
    return res.status(400).json({ error: 'Phone number is required' });
  }

  const resolvedDestination = (destination || country || '').trim() || 'Europe and Schengen';

  const inquiries = readInquiries();
  const newInquiry = {
    id: `INQ-${Date.now().toString().slice(-4)}${Math.floor(Math.random() * 90 + 10)}`,
    name: name.trim(),
    phone: phone.trim(),
    email: (email || '').trim(),
    visaType: visaType || 'Work visa',
    destination: resolvedDestination,
    education: (education || '').trim(),
    experience: (experience || '').trim(),
    timeSlot: (timeSlot || '9:00 AM - 12:00 PM').trim(),
    message: (message || '').trim(),
    status: 'New',
    createdAt: new Date().toISOString()
  };

  inquiries.unshift(newInquiry);
  const success = writeInquiries(inquiries);

  if (!success) {
    return res.status(500).json({ error: 'Failed to record consultation request' });
  }

  // Trigger Resend email notification asynchronously
  sendInquiryNotification(newInquiry).catch(err => {
    console.error('[Resend] Asynchronous email delivery error:', err);
  });

  res.status(201).json({
    success: true,
    message: 'Consultation request received successfully. A consultant will contact you within 24 hours.',
    inquiry: newInquiry
  });
});

// Update inquiry status
app.patch('/api/inquiries/:id/status', (req, res) => {
  const { status, notes } = req.body;
  const validStatuses = ['New', 'Contacted', 'In Progress', 'Assessment Scheduled', 'Closed'];

  if (!status || !validStatuses.includes(status)) {
    return res.status(400).json({ error: `Status must be one of: ${validStatuses.join(', ')}` });
  }

  const inquiries = readInquiries();
  const index = inquiries.findIndex(i => i.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: 'Inquiry not found' });
  }

  inquiries[index].status = status;
  if (notes !== undefined) {
    inquiries[index].notes = notes;
  }
  inquiries[index].updatedAt = new Date().toISOString();

  writeInquiries(inquiries);
  res.json({ success: true, inquiry: inquiries[index] });
});

// Delete inquiry
app.delete('/api/inquiries/:id', (req, res) => {
  const inquiries = readInquiries();
  const filtered = inquiries.filter(i => i.id !== req.params.id);

  if (filtered.length === inquiries.length) {
    return res.status(404).json({ error: 'Inquiry not found' });
  }

  writeInquiries(filtered);
  res.json({ success: true, message: 'Inquiry deleted successfully' });
});

// Serve static client build if present
const clientDist = path.join(__dirname, '..', 'client', 'dist');
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(clientDist, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`🚀 Tansh Immigration Server running on port ${PORT}`);
  console.log(`📡 API Endpoints available at http://localhost:${PORT}/api/`);
  console.log(`===============================================`);
});
