import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, BookOpen, CheckCircle, PhoneCall, Award } from 'lucide-react';
import { siteData } from '../data/siteData';

export default function StudyVisa({ onOpenConsultation }) {
  const { destinations, reviews } = siteData;
  const slugs = Object.keys(destinations);

  return (
    <div className="study-visa-page fade-in">
      <div className="container" style={{ padding: '30px 20px' }}>
        <div className="breadcrumb">
          <Link to="/">Home</Link> <span>/</span> <Link to="/services">Services</Link> <span>/</span> <span>Study Visa</span>
        </div>

        <div style={{ maxWidth: '840px', marginBottom: 36 }}>
          <div className="tag tag-amber" style={{ marginBottom: 12 }}>Academic Pathways</div>
          <h1>Study Abroad Counselling &amp; Student Visa Support</h1>
          <p className="hero-subhead">
            We help students identify suitable courses and recognized universities, prepare required financial documentation, and complete their student visa applications with proper guidance at each stage.
          </p>
        </div>

        {/* 3 Core Aspects */}
        <div className="grid-3" style={{ marginBottom: 40 }}>
          <div className="card">
            <h3>Course &amp; University Shortlisting</h3>
            <p>
              Guidance tailored to your academic scores, long-term career aspirations, and financial budget across top global destinations.
            </p>
          </div>
          <div className="card">
            <h3>Intake Planning &amp; Offers</h3>
            <p>
              Shortlisting institutions aligned with seasonal intakes (Fall, Spring, Summer) and securing official offer letters (CAS / I-20 / LOA).
            </p>
          </div>
          <div className="card">
            <h3>Financial &amp; Visa Documentation</h3>
            <p>
              Structuring student education loans, sponsor affidavits, ITRs, bank balance certificates, and compelling Statement of Purpose (SOP).
            </p>
          </div>
        </div>

        {/* Planning Matters Section */}
        <div className="card" style={{ marginBottom: 40, padding: '32px' }}>
          <h2>Planning Matters More Than Paperwork</h2>
          <p>
            Study visa officers evaluate academic suitability, genuine student intent, and clear financial capability. Rather than filing random generic applications, our counsellors assess your profile first to find programs where your visa chances are strongest:
          </p>
          <div className="grid-2" style={{ marginTop: 20 }}>
            <div>
              <h4 style={{ color: 'var(--teal)' }}>Key Study Destinations:</h4>
              <ul className="checklist">
                <li><b>United Kingdom:</b> 1-Year Masters &amp; 2-Year Graduate Post-Study Work Route</li>
                <li><b>Canada:</b> Designated Learning Institutions (DLI) with PGWP up to 3 years</li>
                <li><b>Australia:</b> Top Group of Eight &amp; regional post-study work rights</li>
                <li><b>Europe:</b> Low/no tuition public universities in Germany, France &amp; Poland</li>
                <li><b>New Zealand:</b> Green List high-demand qualifications and work rights</li>
              </ul>
            </div>
            <div>
              <h4 style={{ color: 'var(--teal)' }}>Documents Required:</h4>
              <ul className="checklist">
                <li>Valid Passport</li>
                <li>10th, 12th, and Graduation marksheets and degree certificates</li>
                <li>University Offer Letter or Acceptance Confirmation</li>
                <li>Language Test Report (IELTS, PTE, TOEFL, or Duolingo)</li>
                <li>Proof of Funds (Education loan letter, bank savings, sponsor ITRs)</li>
                <li>Statement of Purpose (SOP) and Letters of Recommendation</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Study Guides by Destination */}
        <div style={{ marginBottom: 48 }}>
          <h2>Study Guides by Destination</h2>
          <p>Read about tuition ranges, living expenses, and student visa processes:</p>
          <div className="grid-3">
            {slugs.map((s) => (
              <Link to={`/blog/${s}-study`} key={s} className="card card-interactive">
                <h3 style={{ color: 'var(--teal)', marginBottom: 6 }}>Study in {destinations[s].name}</h3>
                <p style={{ fontSize: '0.9rem', marginBottom: 12 }}>
                  {destinations[s].studyRoute}
                </p>
                <span className="tag" style={{ marginTop: 'auto', alignSelf: 'flex-start' }}>
                  Read student guide →
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Testimonial Spotlight */}
        <div className="review-card" style={{ marginBottom: 40 }}>
          <p className="review-quote">“{reviews[2].quote}”</p>
          <div style={{ borderTop: '1px solid var(--line-light)', paddingTop: 12 }}>
            <div className="review-author">{reviews[2].name}</div>
            <div className="review-dest">{reviews[2].category} • {reviews[2].destination}</div>
          </div>
        </div>

        {/* CTA */}
        <div className="button-group">
          <button type="button" className="btn btn-stamp btn-lg" onClick={onOpenConsultation}>
            <PhoneCall size={18} />
            <span>Speak to a Study Visa Counsellor</span>
          </button>
          <Link to="/packages" className="btn btn-outline btn-lg">View Student Packages</Link>
          <Link to="/destinations" className="btn btn-outline btn-lg">Explore All Destinations</Link>
        </div>
      </div>
    </div>
  );
}
