import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Globe, Search, ArrowRight, Plane, Clock } from 'lucide-react';
import { siteData } from '../data/siteData';

export default function Destinations({ onOpenConsultation }) {
  const { destinations } = siteData;
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const destList = Object.values(destinations);

  const filteredDests = destList.filter((d) => {
    const matchesSearch = d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          d.sectors.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          d.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;
    if (activeFilter === 'all') return true;
    if (activeFilter === 'europe') return d.slug === 'europe';
    if (activeFilter === 'gulf') return d.slug === 'gulf';
    if (activeFilter === 'english') return ['canada', 'uk', 'australia', 'nz', 'north-america'].includes(d.slug);
    if (activeFilter === 'asia') return d.slug === 'asia';
    return true;
  });

  return (
    <div className="destinations-page fade-in">
      <div className="container" style={{ padding: '30px 20px' }}>
        <div className="breadcrumb">
          <Link to="/">Home</Link> <span>/</span> <span>Destinations</span>
        </div>

        <div style={{ maxWidth: '840px', marginBottom: 32 }}>
          <div className="tag tag-amber" style={{ marginBottom: 12 }}>Worldwide Markets</div>
          <h1>Global Destination Markets &amp; Visa Pathways</h1>
          <p className="hero-subhead">
            Job availability and visa rules depend on candidate eligibility, demand sectors, and destination immigration guidelines. Explore requirements and select the best pathway for your profile.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            <button 
              className={`btn btn-sm ${activeFilter === 'all' ? 'btn-teal' : 'btn-outline'}`}
              onClick={() => setActiveFilter('all')}
            >
              All Destinations ({destList.length})
            </button>
            <button 
              className={`btn btn-sm ${activeFilter === 'europe' ? 'btn-teal' : 'btn-outline'}`}
              onClick={() => setActiveFilter('europe')}
            >
              Europe &amp; Schengen
            </button>
            <button 
              className={`btn btn-sm ${activeFilter === 'gulf' ? 'btn-teal' : 'btn-outline'}`}
              onClick={() => setActiveFilter('gulf')}
            >
              Gulf Countries
            </button>
            <button 
              className={`btn btn-sm ${activeFilter === 'english' ? 'btn-teal' : 'btn-outline'}`}
              onClick={() => setActiveFilter('english')}
            >
              UK, Canada, Aus, NZ, USA
            </button>
            <button 
              className={`btn btn-sm ${activeFilter === 'asia' ? 'btn-teal' : 'btn-outline'}`}
              onClick={() => setActiveFilter('asia')}
            >
              Asian Markets
            </button>
          </div>

          <div style={{ position: 'relative', width: '280px' }}>
            <Search size={16} style={{ position: 'absolute', left: 12, top: 12, color: 'var(--ink-muted)' }} />
            <input 
              type="text" 
              className="form-input" 
              style={{ paddingLeft: '36px' }}
              placeholder="Search country or trade..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Destination Cards */}
        <div className="grid-3" style={{ marginBottom: 48 }}>
          {filteredDests.map((dest) => (
            <div key={dest.slug} className="card card-interactive" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <h3 style={{ margin: 0, color: 'var(--teal)' }}>{dest.name}</h3>
                <span className="tag tag-amber" style={{ fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Clock size={12} />
                  <span>{dest.avgProcessingTime}</span>
                </span>
              </div>

              <p style={{ fontSize: '0.92rem', marginBottom: 16 }}>{dest.description}</p>

              <div style={{ fontSize: '0.86rem', color: 'var(--ink-secondary)', marginBottom: 14 }}>
                <div style={{ marginBottom: 4 }}><b>Hiring Sectors:</b> {dest.sectors}</div>
                <div><b>Language Needed:</b> {dest.language}</div>
              </div>

              <div style={{ marginTop: 'auto', paddingTop: 16, borderTop: '1px solid var(--line-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to={`/country/${dest.slug}`} className="btn btn-teal btn-sm">
                  <span>Country Details</span>
                  <ArrowRight size={14} />
                </Link>
                <button type="button" className="btn btn-outline btn-sm" onClick={onOpenConsultation}>
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Need Help Banner */}
        <div className="card" style={{ background: 'var(--bg-surface)', padding: '36px', textAlign: 'center' }}>
          <h2>Need Guidance on Choosing the Right Destination?</h2>
          <p style={{ maxWidth: '640px', margin: '0 auto 24px' }}>
            Our visa consultants evaluate your previous salary slips, education certificates, and English ability to identify the destination with the highest visa probability.
          </p>
          <div className="button-group" style={{ justifyContent: 'center' }}>
            <button type="button" className="btn btn-stamp btn-lg" onClick={onOpenConsultation}>
              Book Profile Assessment
            </button>
            <Link to="/packages" className="btn btn-outline btn-lg">
              Compare Consultancy Packages
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
