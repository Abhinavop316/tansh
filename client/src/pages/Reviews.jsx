import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, MessageSquareQuote, CheckCircle2, PhoneCall } from 'lucide-react';
import { siteData } from '../data/siteData';

export default function Reviews({ onOpenConsultation }) {
  const { reviews } = siteData;
  const [filter, setFilter] = useState('all');

  const filtered = reviews.filter((r) => {
    if (filter === 'all') return true;
    if (filter === 'work') return r.category.toLowerCase().includes('work');
    if (filter === 'study') return r.category.toLowerCase().includes('study');
    if (filter === 'tourist') return r.category.toLowerCase().includes('tourist');
    return true;
  });

  return (
    <div className="reviews-page fade-in">
      <div className="container" style={{ padding: '30px 20px' }}>
        <div className="breadcrumb">
          <Link to="/">Home</Link> <span>/</span> <span>Reviews</span>
        </div>

        <div style={{ maxWidth: '840px', marginBottom: 32 }}>
          <div className="tag tag-amber" style={{ marginBottom: 12 }}>Verified Feedback</div>
          <h1>Client Reviews &amp; Testimonials</h1>
          <p className="hero-subhead">
            Hear directly from candidates, professionals, and students who entrusted Tansh Immigration with their international career and educational journeys.
          </p>
        </div>

        {/* Filter Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 32 }}>
          <button 
            className={`btn btn-sm ${filter === 'all' ? 'btn-teal' : 'btn-outline'}`}
            onClick={() => setFilter('all')}
          >
            All Reviews ({reviews.length})
          </button>
          <button 
            className={`btn btn-sm ${filter === 'work' ? 'btn-teal' : 'btn-outline'}`}
            onClick={() => setFilter('work')}
          >
            Work Visa Clients
          </button>
          <button 
            className={`btn btn-sm ${filter === 'study' ? 'btn-teal' : 'btn-outline'}`}
            onClick={() => setFilter('study')}
          >
            Study Visa Clients
          </button>
          <button 
            className={`btn btn-sm ${filter === 'tourist' ? 'btn-teal' : 'btn-outline'}`}
            onClick={() => setFilter('tourist')}
          >
            Tourist Visa Clients
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid-3" style={{ marginBottom: 48 }}>
          {filtered.map((rev) => (
            <div key={rev.id} className="review-card">
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div className="review-avatar">{rev.initials}</div>
                  <div className="review-stars">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={15} fill="currentColor" />
                    ))}
                  </div>
                </div>

                <p className="review-quote">“{rev.quote}”</p>
              </div>

              <div style={{ borderTop: '1px solid var(--line-light)', paddingTop: 14 }}>
                <div className="review-author">{rev.name}</div>
                <div className="review-dest">{rev.category} • {rev.destination}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Submit Review Invite */}
        <div className="card" style={{ background: 'var(--bg-surface)', padding: '36px', textAlign: 'center', marginBottom: 40 }}>
          <MessageSquareQuote size={36} style={{ color: 'var(--teal)', margin: '0 auto 12px' }} />
          <h2>Share Your Visa Journey With Us</h2>
          <p style={{ maxWidth: '600px', margin: '0 auto 20px' }}>
            Have you completed your visa process with our Raj Nagar office? Help other aspirants make an informed decision by sharing your feedback.
          </p>
          <a href="https://g.page/review/tanshimmigration" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            Leave a Google Review
          </a>
        </div>

        {/* CTA */}
        <div className="button-group">
          <button type="button" className="btn btn-stamp btn-lg" onClick={onOpenConsultation}>
            <PhoneCall size={18} />
            <span>Start Your Application</span>
          </button>
          <Link to="/results" className="btn btn-outline btn-lg">View Visa Track Record</Link>
          <Link to="/gallery" className="btn btn-outline btn-lg">View Departure Photos</Link>
        </div>
      </div>
    </div>
  );
}
