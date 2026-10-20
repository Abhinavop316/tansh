import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Users, CheckCircle2, Award, PhoneCall } from 'lucide-react';
import StatCounter from '../components/StatCounter';
import { siteData } from '../data/siteData';

export default function About({ onOpenConsultation }) {
  const { company, processSteps } = siteData;

  return (
    <div className="about-page fade-in">
      <div className="container" style={{ padding: '30px 20px' }}>
        <div className="breadcrumb">
          <Link to="/">Home</Link> <span>/</span> <span>About Us</span>
        </div>

        <div style={{ maxWidth: '840px', marginBottom: 36 }}>
          <div className="tag tag-amber" style={{ marginBottom: 12 }}>Responsible Counselling</div>
          <h1>About Tansh Immigration</h1>
          <p className="hero-subhead">
            Transparent, profile-based visa guidance and overseas job assistance from Raj Nagar, Ghaziabad. We believe in realistic advice, genuine documentation, and clear communication at every stage.
          </p>
        </div>

        {/* 3 Pillars */}
        <div className="grid-3" style={{ marginBottom: 40 }}>
          <div className="card">
            <div className="card-header-icon">
              <Shield size={24} />
            </div>
            <h3>Transparent Guidance</h3>
            <p>
              Clear communication on process stages, required documents, and government fees. You always know what you are paying for and what happens next.
            </p>
          </div>

          <div className="card">
            <div className="card-header-icon" style={{ background: 'var(--stamp-light)', color: 'var(--stamp)' }}>
              <Users size={24} />
            </div>
            <h3>Individual Assessment</h3>
            <p>
              Every applicant is screened individually based on actual qualifications, age, experience, and budget — never forced into an unsuitable standard package.
            </p>
          </div>

          <div className="card">
            <div className="card-header-icon" style={{ background: 'var(--accent-amber-light)', color: 'var(--accent-amber)' }}>
              <Award size={24} />
            </div>
            <h3>Compliance &amp; Quality</h3>
            <p>
              Strict adherence to international immigration laws, apostille rules, employer licensing, and genuine employer contracts.
            </p>
          </div>
        </div>

        {/* Narrative Section */}
        <div className="grid-2" style={{ alignItems: 'center', gap: 40, marginBottom: 48 }}>
          <div>
            <h2>Who We Are</h2>
            <p>
              Tansh Immigration is an established immigration consultancy based at C-46 BPS Tower, RDC, Raj Nagar, Ghaziabad. Our core business is work-visa processing and international job opportunities, supported by structured counselling, documentation guidance, application coordination and client communication.
            </p>
            <p>
              We assist job seekers, students, and travellers across Ghaziabad, Noida, Delhi, and Greater Delhi NCR looking for legitimate pathways to Europe, Schengen countries, Asian markets, Gulf destinations, Canada, USA, the UK, Australia, and New Zealand.
            </p>
            <div className="button-group">
              <Link to="/team" className="btn btn-outline">Meet Our Team</Link>
              <Link to="/why-us" className="btn btn-outline">Why Choose Us</Link>
              <button type="button" className="btn btn-stamp" onClick={onOpenConsultation}>
                Book Consultation
              </button>
            </div>
          </div>

          <div className="card" style={{ background: 'var(--bg-surface)' }}>
            <h3 style={{ marginBottom: 14 }}>Our Code of Conduct</h3>
            <ul className="checklist">
              <li>No false promises or lawful guarantee claims — only genuine process support</li>
              <li>Complete transparency on consultancy fees vs. official embassy charges</li>
              <li>Every file is vetted by senior consultants before submission to VFS/Embassies</li>
              <li>Free eligibility re-evaluation if destination regulations shift</li>
              <li>Direct coordination with accredited employers and recognized DLIs</li>
            </ul>
          </div>
        </div>

        {/* How We Work: 6 Process Stages */}
        <div style={{ marginBottom: 48 }}>
          <h2 style={{ textAlign: 'center', marginBottom: 24 }}>How We Work: Six Process Stages</h2>
          <div className="grid-3">
            {processSteps.map((s) => (
              <div key={s.step} className="card">
                <span className="tag tag-amber" style={{ marginBottom: 10 }}>Stage 0{s.step}</span>
                <h3 style={{ fontSize: '1.15rem' }}>{s.title}</h3>
                <p style={{ margin: 0, fontSize: '0.92rem' }}>{s.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <StatCounter />

        {/* Office Location Callout */}
        <div className="card" style={{ marginTop: 36, padding: '32px' }}>
          <h3>Serving Ghaziabad &amp; Delhi NCR</h3>
          <p>
            Visit us in person at our office in RDC, Raj Nagar, Ghaziabad. Initial consultations can also be conducted via phone or WhatsApp for clients across India.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 16 }}>
            <Link to="/contact" className="btn btn-primary">Office Directions &amp; Contact</Link>
            <a href="tel:+919211071319" className="btn btn-outline">Call +91 92110 71319</a>
          </div>
        </div>
      </div>
    </div>
  );
}
