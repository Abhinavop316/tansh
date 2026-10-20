import React from 'react';
import { Link } from 'react-router-dom';
import { Plane, Compass, AlertCircle, FileCheck, PhoneCall } from 'lucide-react';
import { siteData } from '../data/siteData';

export default function TouristVisa({ onOpenConsultation }) {
  const { destinations, reviews } = siteData;

  return (
    <div className="tourist-visa-page fade-in">
      <div className="container" style={{ padding: '30px 20px' }}>
        <div className="breadcrumb">
          <Link to="/">Home</Link> <span>/</span> <Link to="/services">Services</Link> <span>/</span> <span>Tourist Visa</span>
        </div>

        <div style={{ maxWidth: '840px', marginBottom: 36 }}>
          <div className="tag tag-amber" style={{ marginBottom: 12 }}>Travel &amp; Visits</div>
          <h1>Tourist &amp; Visitor Visa Consultants in Ghaziabad</h1>
          <p className="hero-subhead">
            Whether you are travelling for leisure, visiting family or exploring a new destination, we provide profile-based visa guidance, documentation support, and complete application preparation for Schengen, UK, USA, Canada, Australia and NZ.
          </p>
        </div>

        {/* 3 Pillars */}
        <div className="grid-3" style={{ marginBottom: 40 }}>
          <div className="card">
            <h3>Document Preparation</h3>
            <p>
              Destination-wise checklists including financial solvency documents, employment leave letters, hotel bookings, and flight itineraries.
            </p>
          </div>
          <div className="card">
            <h3>Application Handling</h3>
            <p>
              Meticulous form preparation, cover letter drafting, VFS / Embassy appointment booking, and submission coordination.
            </p>
          </div>
          <div className="card">
            <h3>Honest Profile Review</h3>
            <p>
              We tell you upfront which destinations are realistically worth applying to based on your travel history and financial strength.
            </p>
          </div>
        </div>

        {/* Refusal Prevention */}
        <div className="card" style={{ marginBottom: 40, padding: '32px' }}>
          <h2>Honest Guidance on What Your Profile Supports</h2>
          <p>
            Tourist visa decisions depend heavily on travel history, financial documentation, and proof of ties to India. We review your profile first so you apply to destinations where your file is genuinely strong, avoiding needless refusals.
          </p>

          <div className="grid-2" style={{ marginTop: 20 }}>
            <div>
              <h4 style={{ color: 'var(--teal)' }}>Popular Tourist Destinations:</h4>
              <ul className="checklist">
                <li><b>Schengen Area (29 European Countries):</b> Paris, Switzerland, Germany, Italy</li>
                <li><b>United Kingdom:</b> Standard 6-month &amp; 2-year multi-entry visitor visas</li>
                <li><b>United States:</b> B1/B2 10-Year multi-entry tourist &amp; business visa</li>
                <li><b>Canada:</b> Temporary Resident Visa (TRV) &amp; Super Visa for parents</li>
                <li><b>Australia &amp; New Zealand:</b> Subclass 600 tourist &amp; family visit streams</li>
              </ul>
            </div>
            <div>
              <h4 style={{ color: 'var(--stamp)' }}>Common Reasons for Tourist Visa Refusal:</h4>
              <ul className="checklist">
                <li>Incomplete, inconsistent, or unverified bank statements</li>
                <li>Unclear purpose of visit or poorly structured day-wise itinerary</li>
                <li>Weak proof of ties to home country (no job letter or property proof)</li>
                <li>Discrepancies in previous international travel disclosures</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Testimonial Spotlight */}
        <div className="review-card" style={{ marginBottom: 40 }}>
          <p className="review-quote">“{reviews[1].quote}”</p>
          <div style={{ borderTop: '1px solid var(--line-light)', paddingTop: 12 }}>
            <div className="review-author">{reviews[1].name}</div>
            <div className="review-dest">{reviews[1].category} • {reviews[1].destination}</div>
          </div>
        </div>

        {/* CTA */}
        <div className="button-group">
          <button type="button" className="btn btn-stamp btn-lg" onClick={onOpenConsultation}>
            <PhoneCall size={18} />
            <span>Check Your Tourist Visa Eligibility</span>
          </button>
          <Link to="/faq" className="btn btn-outline btn-lg">Visa FAQ &amp; Refusal Questions</Link>
          <Link to="/destinations" className="btn btn-outline btn-lg">View Destinations</Link>
        </div>
      </div>
    </div>
  );
}
