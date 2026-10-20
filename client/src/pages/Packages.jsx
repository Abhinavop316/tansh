import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ShieldCheck, HelpCircle, PhoneCall, ArrowRight } from 'lucide-react';
import { siteData } from '../data/siteData';

export default function Packages({ onOpenConsultation }) {
  const { packages } = siteData;

  return (
    <div className="packages-page fade-in">
      <div className="container" style={{ padding: '30px 20px' }}>
        <div className="breadcrumb">
          <Link to="/">Home</Link> <span>/</span> <span>Packages &amp; Pricing</span>
        </div>

        <div style={{ maxWidth: '840px', marginBottom: 36 }}>
          <div className="tag tag-stamp" style={{ marginBottom: 12 }}>Transparent Charges</div>
          <h1>Visa Consultancy Packages &amp; Pricing</h1>
          <p className="hero-subhead">
            No hidden costs. We explain every stage, inclusion, and fee before you commit. Choose a package by destination group, with terms clearly documented in your client engagement agreement.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid-3" style={{ gap: 28, marginBottom: 48 }}>
          {packages.map((pkg) => (
            <div 
              key={pkg.id} 
              className={`card ${pkg.popular ? 'card-highlight' : ''}`}
              style={{ display: 'flex', flexDirection: 'column', padding: '32px 26px' }}
            >
              {pkg.popular && (
                <div className="card-stamp-badge">
                  Most Popular
                </div>
              )}

              <h3 style={{ fontSize: '1.35rem', marginBottom: 4 }}>{pkg.name}</h3>
              <div style={{ fontSize: '0.85rem', color: 'var(--ink-muted)', marginBottom: 16 }}>
                {pkg.countries}
              </div>

              <div style={{ margin: '14px 0 20px' }}>
                <div style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--ink-muted)' }}>
                  Consultancy Package
                </div>
                <div style={{ 
                  fontFamily: 'var(--font-heading)', 
                  fontSize: '2.1rem', 
                  fontWeight: 800, 
                  color: 'var(--teal)',
                  lineHeight: 1.1
                }}>
                  {pkg.price}
                </div>
              </div>

              <p style={{ fontSize: '0.88rem', color: 'var(--ink-secondary)', marginBottom: 20 }}>
                {pkg.target}
              </p>

              <h4 style={{ fontSize: '0.9rem', color: 'var(--ink)', marginBottom: 12 }}>Package Inclusions:</h4>
              <ul className="checklist" style={{ marginBottom: 24 }}>
                {pkg.features.map((feat, i) => (
                  <li key={i} style={{ fontSize: '0.88rem' }}>{feat}</li>
                ))}
              </ul>

              <div style={{ marginTop: 'auto' }}>
                <button 
                  type="button" 
                  className={`btn ${pkg.popular ? 'btn-stamp' : 'btn-outline'} btn-lg`}
                  style={{ width: '100%' }}
                  onClick={onOpenConsultation}
                >
                  Enquire for {pkg.name.split(' ')[0]}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Inclusions vs Separate Fees */}
        <div className="card" style={{ padding: '36px', marginBottom: 40, background: 'var(--bg-surface)' }}>
          <h2>What Is Included vs. What Is Separate</h2>
          <p>
            To avoid misunderstandings, we clearly distinguish our consultancy &amp; file preparation fees from official third-party and government expenses:
          </p>
          <div className="grid-2" style={{ marginTop: 20 }}>
            <div>
              <h4 style={{ color: 'var(--success)' }}>Covered in Our Packages:</h4>
              <ul className="checklist">
                <li>Complete candidate profile assessment and CV restructuring</li>
                <li>Employer coordination, offer letter verification, and document auditing</li>
                <li>Application file compilation, cover letter drafting, and forms completion</li>
                <li>Appointment booking, interview preparation, and regular case tracking</li>
                <li>Dedicated consultant assigned to your file throughout</li>
              </ul>
            </div>

            <div>
              <h4 style={{ color: 'var(--stamp)' }}>Separate Government &amp; Third-Party Fees:</h4>
              <ul className="checklist">
                <li>Government visa filing fees &amp; Embassy / VFS service charges</li>
                <li>Official medical examination and diagnostic lab charges</li>
                <li>Police Clearance Certificate (PCC) government fees</li>
                <li>Apostille, MEA attestation, and certified language translation charges</li>
                <li>Flight tickets, travel insurance, and foreign accommodation</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Refund & Agreement Notice */}
        <div className="card" style={{ borderLeft: '4px solid var(--teal)', padding: '24px', marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--teal)', marginBottom: 8 }}>
            <ShieldCheck size={22} />
            <h3 style={{ margin: 0, color: 'var(--teal)' }}>Our Written Engagement Agreement</h3>
          </div>
          <p style={{ fontSize: '0.92rem', margin: 0 }}>
            Every client receives a signed engagement agreement detailing package inclusions, payment schedules, and refund policies before any financial transaction. If you have questions regarding payment options or installment plans, speak with our managing director or case consultants.
          </p>
        </div>

        {/* CTA */}
        <div className="button-group">
          <button type="button" className="btn btn-stamp btn-lg" onClick={onOpenConsultation}>
            <PhoneCall size={18} />
            <span>Request a Custom Quote</span>
          </button>
          <Link to="/faq" className="btn btn-outline btn-lg">Read Charges &amp; Refund FAQ</Link>
          <Link to="/contact" className="btn btn-outline btn-lg">Visit Our Office</Link>
        </div>
      </div>
    </div>
  );
}
