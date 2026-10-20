import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plane, ZoomIn, PhoneCall, ShieldCheck } from 'lucide-react';
import { siteData } from '../data/siteData';

export default function Gallery({ onOpenConsultation, onOpenLightbox }) {
  const { gallery } = siteData;
  const [filter, setFilter] = useState('all');

  const filteredGallery = gallery.filter((item) => {
    if (filter === 'all') return true;
    if (filter === 'departure') return item.category.toLowerCase().includes('departure');
    if (filter === 'sendoff') return item.category.toLowerCase().includes('send-off');
    if (filter === 'permit') return item.category.toLowerCase().includes('permit') || item.category.toLowerCase().includes('employment');
    return true;
  });

  return (
    <div className="gallery-page fade-in">
      <div className="container" style={{ padding: '30px 20px' }}>
        <div className="breadcrumb">
          <Link to="/">Home</Link> <span>/</span> <span>Gallery</span>
        </div>

        <div style={{ maxWidth: '840px', marginBottom: 32 }}>
          <div className="tag tag-stamp" style={{ marginBottom: 12 }}>
            Real Departures, Delhi Airport
          </div>
          <h1>Client Success Stories &amp; Departure Gallery</h1>
          <p className="hero-subhead">
            Authentic photographs of Tansh Immigration clients at Indira Gandhi International Airport (Terminal 3) holding stamped visas and boarding passes to destinations including Mauritius, Malaysia, Thailand, Europe, and the Gulf.
          </p>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 32 }}>
          <button 
            className={`btn btn-sm ${filter === 'all' ? 'btn-stamp' : 'btn-outline'}`}
            onClick={() => setFilter('all')}
          >
            All Photos ({gallery.length})
          </button>
          <button 
            className={`btn btn-sm ${filter === 'departure' ? 'btn-stamp' : 'btn-outline'}`}
            onClick={() => setFilter('departure')}
          >
            Airport Departures
          </button>
          <button 
            className={`btn btn-sm ${filter === 'sendoff' ? 'btn-stamp' : 'btn-outline'}`}
            onClick={() => setFilter('sendoff')}
          >
            Team Send-offs
          </button>
          <button 
            className={`btn btn-sm ${filter === 'permit' ? 'btn-stamp' : 'btn-outline'}`}
            onClick={() => setFilter('permit')}
          >
            Work &amp; Employment Visas
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="gallery-grid" style={{ marginBottom: 48 }}>
          {filteredGallery.map((item) => (
            <div key={item.id} className="gallery-card">
              <button 
                type="button"
                className="gallery-btn"
                onClick={() => onOpenLightbox(item)}
                aria-label={`Enlarge photo: ${item.title}`}
              >
                <img src={item.image} alt={item.caption} loading="lazy" />
                <div style={{ 
                  position: 'absolute', 
                  bottom: 12, 
                  right: 12, 
                  background: 'rgba(15, 42, 67, 0.85)', 
                  color: '#fff', 
                  padding: '6px', 
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  <ZoomIn size={16} />
                </div>
              </button>

              <div className="gallery-caption">
                <span className="tag tag-amber" style={{ fontSize: '0.74rem', marginBottom: 6 }}>
                  {item.category}
                </span>
                <h4>{item.title}</h4>
                <p>{item.caption}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Legal Consent Notice */}
        <div className="card" style={{ background: 'var(--bg-surface)', padding: '24px', marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--teal)', marginBottom: 6 }}>
            <ShieldCheck size={20} />
            <h4 style={{ margin: 0, color: 'var(--teal)' }}>Authentic Client Records</h4>
          </div>
          <p style={{ fontSize: '0.88rem', margin: 0, color: 'var(--ink-secondary)' }}>
            All departure images display genuine clients assisted by Tansh Immigration. Visa issuance and arrival authorisations depend strictly on individual candidate eligibility, genuine employer demand, and destination immigration rules.
          </p>
        </div>

        {/* CTA */}
        <div className="button-group">
          <button type="button" className="btn btn-stamp btn-lg" onClick={onOpenConsultation}>
            <PhoneCall size={18} />
            <span>Start Your Departure Journey</span>
          </button>
          <Link to="/reviews" className="btn btn-outline btn-lg">Read Client Reviews</Link>
          <Link to="/destinations" className="btn btn-outline btn-lg">Explore Destination Countries</Link>
        </div>
      </div>
    </div>
  );
}
