import React from 'react';
import { Link } from 'react-router-dom';
import { Award, ShieldCheck, CheckCircle, FileCheck, PhoneCall, ArrowRight } from 'lucide-react';
import StatCounter from '../components/StatCounter';
import { siteData } from '../data/siteData';

export default function Results({ onOpenConsultation, onOpenLightbox }) {
  const { gallery } = siteData;

  return (
    <div className="results-page fade-in">
      <div className="container" style={{ padding: '30px 20px' }}>
        <div className="breadcrumb">
          <Link to="/">Home</Link> <span>/</span> <span>Results &amp; Certificates</span>
        </div>

        <div style={{ maxWidth: '840px', marginBottom: 36 }}>
          <div className="tag tag-stamp" style={{ marginBottom: 12 }}>Our Track Record</div>
          <h1>Visa Success Rate, Registrations &amp; Track Record</h1>
          <p className="hero-subhead">
            Our numbers, accreditations, and real departures in one place. We take pride in building genuine client success stories across Europe, Schengen, Gulf, and Western markets.
          </p>
        </div>

        {/* Live Counters */}
        <StatCounter />

        {/* Real Departures Showcase */}
        <div style={{ margin: '48px 0 36px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
            <div>
              <span className="tag tag-amber">Delhi Airport Send-offs</span>
              <h2 style={{ marginTop: 8, marginBottom: 6 }}>Real Departures from Terminal 3</h2>
              <p style={{ margin: 0 }}>Verified clients holding stamped visas and boarding passes.</p>
            </div>
            <Link to="/gallery" className="btn btn-outline">
              View All Client Departures →
            </Link>
          </div>

          <div className="gallery-grid">
            {gallery.slice(0, 4).map((item) => (
              <div key={item.id} className="gallery-card">
                <button 
                  type="button"
                  className="gallery-btn"
                  onClick={() => onOpenLightbox(item)}
                  aria-label={`Enlarge photo: ${item.title}`}
                >
                  <img src={item.image} alt={item.caption} loading="lazy" />
                </button>
                <div className="gallery-caption">
                  <h4>{item.title}</h4>
                  <p>{item.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certificates & Registrations */}
        <div className="card" style={{ padding: '36px', marginBottom: 40 }}>
          <h2>Company Accreditations &amp; Registrations</h2>
          <p style={{ marginBottom: 24 }}>
            Tansh Immigration operates with full commercial registration in Uttar Pradesh, adhering strictly to the legal frameworks of candidate documentation and overseas educational guidance.
          </p>

          <div className="grid-3">
            <div className="card" style={{ background: 'var(--bg-primary)', textAlign: 'center', padding: '28px' }}>
              <ShieldCheck size={40} style={{ color: 'var(--teal)', margin: '0 auto 12px' }} />
              <h4>Commercial Registration</h4>
              <p style={{ fontSize: '0.88rem', margin: 0 }}>Registered Professional Consultancy Firm, Ghaziabad, UP</p>
            </div>

            <div className="card" style={{ background: 'var(--bg-primary)', textAlign: 'center', padding: '28px' }}>
              <Award size={40} style={{ color: 'var(--accent-amber)', margin: '0 auto 12px' }} />
              <h4>Verified Partner Network</h4>
              <p style={{ fontSize: '0.88rem', margin: 0 }}>Direct relationships with licensed employers across Europe &amp; Gulf</p>
            </div>

            <div className="card" style={{ background: 'var(--bg-primary)', textAlign: 'center', padding: '28px' }}>
              <FileCheck size={40} style={{ color: 'var(--stamp)', margin: '0 auto 12px' }} />
              <h4>Apostille &amp; MEA Compliance</h4>
              <p style={{ fontSize: '0.88rem', margin: 0 }}>Strict adherence to Ministry of External Affairs legalization guidelines</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="button-group">
          <button type="button" className="btn btn-stamp btn-lg" onClick={onOpenConsultation}>
            <PhoneCall size={18} />
            <span>Start Your Application Today</span>
          </button>
          <Link to="/reviews" className="btn btn-outline btn-lg">Read Client Reviews</Link>
          <Link to="/why-us" className="btn btn-outline btn-lg">Why Choose Us</Link>
        </div>
      </div>
    </div>
  );
}
