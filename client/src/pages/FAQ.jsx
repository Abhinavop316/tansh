import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, Search, PhoneCall } from 'lucide-react';
import { siteData } from '../data/siteData';

export default function FAQ({ onOpenConsultation }) {
  const { faqs } = siteData;
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFaqs = faqs.filter((f) => 
    f.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.a.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="faq-page fade-in">
      <div className="container" style={{ padding: '30px 20px' }}>
        <div className="breadcrumb">
          <Link to="/">Home</Link> <span>/</span> <span>FAQ</span>
        </div>

        <div style={{ maxWidth: '840px', marginBottom: 32 }}>
          <div className="tag tag-amber" style={{ marginBottom: 12 }}>Got Questions?</div>
          <h1>Frequently Asked Questions</h1>
          <p className="hero-subhead">
            Common questions about our visa categories, destination markets, processing timelines, required documents, charges, and refund policies.
          </p>
        </div>

        {/* Search Bar */}
        <div style={{ position: 'relative', maxWidth: '540px', marginBottom: 32 }}>
          <Search size={18} style={{ position: 'absolute', left: 14, top: 14, color: 'var(--ink-muted)' }} />
          <input 
            type="text" 
            className="form-input" 
            style={{ paddingLeft: '40px' }}
            placeholder="Search questions (e.g. refund, work permit, cost, timeline)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* FAQ Accordion List */}
        <div style={{ maxWidth: '860px', marginBottom: 48 }}>
          {filteredFaqs.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '36px' }}>
              <p>No questions matched your search term "{searchTerm}".</p>
              <button className="btn btn-outline btn-sm" onClick={() => setSearchTerm('')}>
                Reset Search
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => (
              <details key={idx} className="faq-item" open={idx === 0}>
                <summary className="faq-question">
                  {faq.q}
                </summary>
                <div className="faq-answer">
                  {faq.a}
                </div>
              </details>
            ))
          )}
        </div>

        {/* Still Have Questions CTA */}
        <div className="card" style={{ background: 'var(--bg-surface)', padding: '36px', textAlign: 'center' }}>
          <h2>Cannot Find The Answer You're Looking For?</h2>
          <p style={{ maxWidth: '640px', margin: '0 auto 24px' }}>
            Our team in Raj Nagar, Ghaziabad is available on phone and WhatsApp to clarify any questions regarding your specific background or destination requirements.
          </p>
          <div className="button-group" style={{ justifyContent: 'center' }}>
            <button type="button" className="btn btn-stamp btn-lg" onClick={onOpenConsultation}>
              <PhoneCall size={18} />
              <span>Talk to a Consultant</span>
            </button>
            <Link to="/contact" className="btn btn-outline btn-lg">
              Contact &amp; Map Location
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
