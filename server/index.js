import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { Resend } from 'resend';
import { siteData } from './siteData.js';

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

// Resend Email Helper
const getResendClient = () => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || !apiKey.trim()) return null;
  return new Resend(apiKey.trim());
};

const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || 'tanshimmigration@gmail.com';
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'Tansh Immigration <onboarding@resend.dev>';

const sendInquiryNotification = async (inquiry) => {
  const resend = getResendClient();
  if (!resend) {
    console.warn(`[Resend] RESEND_API_KEY is not configured in server/.env. Email notification to ${NOTIFICATION_EMAIL} was skipped.`);
    return { skipped: true, reason: 'RESEND_API_KEY not configured' };
  }

  try {
    const formattedDate = new Date(inquiry.createdAt).toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short'
    });

    const subject = `🔔 New Consultation Request: ${inquiry.name} (${inquiry.visaType}) - ${inquiry.timeSlot}`;

    const textContent = `🔔 NEW CONSULTATION INQUIRY - TANSH IMMIGRATION
===============================================
Inquiry ID: ${inquiry.id}
Received: ${formattedDate} (IST)

CLIENT CONTACT:
- Full Name: ${inquiry.name}
- Phone Number: ${inquiry.phone}
- Preferred Call Time Slot: ${inquiry.timeSlot}
- Email: ${inquiry.email || 'Not provided'}

APPLICATION DETAILS:
- Visa Type: ${inquiry.visaType}
- Target Destination: ${inquiry.destination || 'Not specified'}
- Education: ${inquiry.education || 'Not provided'}
- Experience: ${inquiry.experience || 'Not provided'}

CLIENT MESSAGE / NOTES:
${inquiry.message || 'No additional message provided'}

-----------------------------------------------
Tansh Immigration Client Notification System
C-46 BPS Tower, RDC, Raj Nagar, Ghaziabad`;

    const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Consultation Request</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f5f8fb; margin: 0; padding: 24px; color: #0f2a43;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #d6e2fb; overflow: hidden; box-shadow: 0 4px 16px rgba(15,42,67,0.06);">
    <div style="background: linear-gradient(135deg, #0a2a66 0%, #1d6bff 100%); color: #ffffff; padding: 28px 24px;">
      <h1 style="margin: 0 0 6px 0; font-size: 22px; font-weight: 700; color: #ffffff;">🔔 New Consultation Request</h1>
      <p style="margin: 0; opacity: 0.9; font-size: 14px; color: #dbeafe;">A candidate has submitted a consultation request and is expecting a call.</p>
      <div style="display: inline-block; background: rgba(255,255,255,0.2); padding: 4px 12px; border-radius: 999px; font-size: 12px; font-weight: 600; margin-top: 12px; color: #ffffff;">
        ID: ${inquiry.id} &bull; ${formattedDate} IST
      </div>
    </div>
    
    <div style="padding: 24px;">
      <div style="background: #eef5ff; border-left: 4px solid #1d6bff; padding: 14px 18px; border-radius: 6px; margin-bottom: 22px;">
        <div style="font-weight: 700; color: #0a2a66; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Primary Candidate Contact</div>
        <div style="font-size: 19px; font-weight: 800; color: #0a2a66; margin-bottom: 4px;">${inquiry.name}</div>
        <div style="font-size: 16px; margin-bottom: 6px;">
          📞 <a href="tel:${encodeURIComponent(inquiry.phone)}" style="font-weight: 700; color: #1d6bff; text-decoration: none;">${inquiry.phone}</a>
        </div>
        <div style="font-size: 14px; color: #41567c;">
          ⏰ <b>Preferred Call Slot:</b> <span style="background: #dbeafe; color: #0a2a66; font-weight: 700; padding: 2px 8px; border-radius: 4px;">${inquiry.timeSlot}</span>
        </div>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
        <tbody>
          <tr>
            <td style="width: 38%; padding: 10px 12px; border-bottom: 1px solid #edf2f7; font-size: 13px; font-weight: 600; color: #41567c; background-color: #f8fafc;">Visa Category</td>
            <td style="width: 62%; padding: 10px 12px; border-bottom: 1px solid #edf2f7; font-size: 14px; color: #0f2a43; font-weight: 600;">${inquiry.visaType}</td>
          </tr>
          ${inquiry.destination ? `<tr>
            <td style="padding: 10px 12px; border-bottom: 1px solid #edf2f7; font-size: 13px; font-weight: 600; color: #41567c; background-color: #f8fafc;">Destination</td>
            <td style="padding: 10px 12px; border-bottom: 1px solid #edf2f7; font-size: 14px; color: #0f2a43;">${inquiry.destination}</td>
          </tr>` : ''}
          ${inquiry.email ? `<tr>
            <td style="padding: 10px 12px; border-bottom: 1px solid #edf2f7; font-size: 13px; font-weight: 600; color: #41567c; background-color: #f8fafc;">Email</td>
            <td style="padding: 10px 12px; border-bottom: 1px solid #edf2f7; font-size: 14px; color: #0f2a43;"><a href="mailto:${inquiry.email}" style="color: #1d6bff; text-decoration: none;">${inquiry.email}</a></td>
          </tr>` : ''}
          ${inquiry.education ? `<tr>
            <td style="padding: 10px 12px; border-bottom: 1px solid #edf2f7; font-size: 13px; font-weight: 600; color: #41567c; background-color: #f8fafc;">Education</td>
            <td style="padding: 10px 12px; border-bottom: 1px solid #edf2f7; font-size: 14px; color: #0f2a43;">${inquiry.education}</td>
          </tr>` : ''}
          ${inquiry.experience ? `<tr>
            <td style="padding: 10px 12px; border-bottom: 1px solid #edf2f7; font-size: 13px; font-weight: 600; color: #41567c; background-color: #f8fafc;">Work Experience</td>
            <td style="padding: 10px 12px; border-bottom: 1px solid #edf2f7; font-size: 14px; color: #0f2a43;">${inquiry.experience}</td>
          </tr>` : ''}
        </tbody>
      </table>

      ${inquiry.message ? `
      <div style="margin-top: 20px;">
        <div style="font-size: 13px; font-weight: 700; color: #41567c; text-transform: uppercase; margin-bottom: 6px;">Client Message / Notes</div>
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; font-size: 14px; line-height: 1.5; color: #1e293b; white-space: pre-wrap;">${inquiry.message}</div>
      </div>` : ''}
    </div>

    <div style="padding: 18px 24px; background: #f8fafc; border-top: 1px solid #edf2f7; text-align: center; font-size: 12px; color: #64748b;">
      <p style="margin: 0 0 4px 0;"><b>Tansh Immigration</b> &bull; C-46 BPS Tower, RDC, Raj Nagar, Ghaziabad</p>
      <p style="margin: 0;">Automated consultation lead alert via Resend.</p>
    </div>
  </div>
</body>
</html>`;

    const emailResponse = await resend.emails.send({
      from: RESEND_FROM_EMAIL,
      to: NOTIFICATION_EMAIL,
      replyTo: inquiry.email && inquiry.email.includes('@') ? inquiry.email : undefined,
      subject,
      text: textContent,
      html: htmlContent
    });

    console.log(`[Resend] ✅ Notification sent to ${NOTIFICATION_EMAIL} (ID: ${emailResponse?.data?.id || 'OK'})`);
    return { success: true, id: emailResponse?.data?.id };
  } catch (err) {
    console.error('[Resend] ❌ Failed to send notification email:', err.message || err);
    return { success: false, error: err.message || err };
  }
};

// --- ROUTES ---

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
  const { name, phone, email, visaType, destination, education, experience, timeSlot, message } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'Full name is required' });
  }
  if (!phone || !phone.trim()) {
    return res.status(400).json({ error: 'Phone number is required' });
  }

  const inquiries = readInquiries();
  const newInquiry = {
    id: `INQ-${Date.now().toString().slice(-4)}${Math.floor(Math.random() * 90 + 10)}`,
    name: name.trim(),
    phone: phone.trim(),
    email: (email || '').trim(),
    visaType: visaType || 'Work visa',
    destination: destination || 'Europe and Schengen',
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
