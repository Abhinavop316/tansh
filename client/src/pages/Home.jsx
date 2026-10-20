import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  GraduationCap, 
  Plane, 
  Globe, 
  ShieldCheck, 
  CheckCircle, 
  ArrowRight, 
  PhoneCall, 
  Star,
  Users,
  Compass,
  FileCheck
} from 'lucide-react';
import HeroCollage from '../components/HeroCollage';
import Marquee from '../components/Marquee';
import StatCounter from '../components/StatCounter';
import { siteData } from '../data/siteData';

export default function Home({ onOpenConsultation, onOpenLightbox }) {
  const { services, destinations, reviews, gallery, processSteps } = siteData;
  const popularDests = ['europe', 'gulf', 'canada', 'uk', 'australia', 'asia'];

  return (
    <div className="home-page fade-in">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-two">
            <div>
              <div className="tag tag-amber" style={{ marginBottom: 14 }}>
                <Compass size={14} />
                <span>Immigration Consultants in Raj Nagar, Ghaziabad</span>
              </div>
              <h1>
                Your Pathway to <span style={{ color: 'var(--teal)' }}>Work</span>, <span style={{ color: 'var(--stamp)' }}>Study</span> &amp; Travel Abroad
              </h1>
              <p className="hero-subhead">
                Tansh Immigration provides transparent, profile-based guidance for Work, Tourist and Study visa applications across Europe, Schengen, the Gulf, Canada, USA, the UK, Australia, and New Zealand.
              </p>

              <div className="button-group">
                <button 
                  type="button" 
                  className="btn btn-stamp btn-lg"
                  onClick={onOpenConsultation}
                >
                  <PhoneCall size={18} />
                  <span>Book Free Consultation</span>
                </button>
                <Link to="/destinations" className="btn btn-outline btn-lg">
                  <span>Explore Destinations</span>
                  <ArrowRight size={16} />
                </Link>
              </div>

              <div className="hero-meta-row">
                <div className="hero-meta-item">
                  <ShieldCheck size={18} style={{ color: 'var(--teal)' }} />
                  <span>Genuine Documentation</span>
                </div>
                <div className="hero-meta-item">
                  <CheckCircle size={18} style={{ color: 'var(--success)' }} />
                  <span>No False Promises</span>
                </div>
                <div className="hero-meta-item">
                  <Users size={18} style={{ color: 'var(--accent-amber)' }} />
                  <span>Individual Assessment</span>
                </div>
              </div>
            </div>

            {/* Collage */}
            <HeroCollage />
          </div>
        </div>
      </section>

      {/* Marquee Ticker */}
      <Marquee />

      {/* Trust & Foundation Section */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 36px' }}>
            <span className="tag tag-stamp">Core Specialisation</span>
            <h2 style={{ marginTop: 10 }}>A consultancy built on clear guidance, not empty promises</h2>
            <p style={{ margin: '0 auto' }}>
              We assess each applicant individually and recommend destinations and roles that actually match their education, work background, age, and language capabilities.
            </p>
          </div>

          <div className="grid-3">
            <div className="card card-interactive">
              <div className="card-header-icon" style={{ background: 'var(--stamp-light)', color: 'var(--stamp)' }}>
                <Briefcase size={24} />
              </div>
              <h3>Work Visa Specialisation</h3>
              <p>
                International job opportunities, employer coordination, legal work permits, and full process support. Our primary core business.
              </p>
              <Link to="/work-visa" className="tag" style={{ marginTop: 'auto', alignSelf: 'flex-start' }}>
                Learn more →
              </Link>
            </div>

            <div className="card card-interactive">
              <div className="card-header-icon">
                <FileCheck size={24} />
              </div>
              <h3>Documentation &amp; File Audit</h3>
              <p>
                Destination-specific checklists, credential evaluations, financial proof audits, and application-file preparation handled end-to-end.
              </p>
              <Link to="/documentation" className="tag" style={{ marginTop: 'auto', alignSelf: 'flex-start' }}>
                Learn more →
              </Link>
            </div>

            <div className="card card-interactive">
              <div className="card-header-icon" style={{ background: 'var(--accent-amber-light)', color: 'var(--accent-amber)' }}>
                <Globe size={24} />
              </div>
              <h3>Multi-Destination Coverage</h3>
              <p>
                Direct placement guidance across Europe, Schengen Area (29 countries), Gulf markets, Canada, UK, Australia, and New Zealand.
              </p>
              <Link to="/destinations" className="tag" style={{ marginTop: 'auto', alignSelf: 'flex-start' }}>
                Explore countries →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Process Stages */}
      <section className="section" style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16, marginBottom: 32 }}>
            <div>
              <span className="tag">Step-by-step Transparency</span>
              <h2 style={{ marginTop: 8, marginBottom: 8 }}>From First Consultation to Your Flight</h2>
              <p style={{ margin: 0 }}>Every stage is explained upfront with no hidden fees or surprise costs.</p>
            </div>
            <button type="button" className="btn btn-teal" onClick={onOpenConsultation}>
              Speak to a Consultant
            </button>
          </div>

          <div className="grid-3">
            {processSteps.map((step) => (
              <div key={step.step} className="card">
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <span style={{ 
                    width: 32, 
                    height: 32, 
                    borderRadius: '50%', 
                    background: 'var(--teal)', 
                    color: '#fff', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '0.9rem'
                  }}>
                    {step.step}
                  </span>
                  <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{step.title}</h3>
                </div>
                <p style={{ margin: 0, fontSize: '0.92rem' }}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Visa Services */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 36px' }}>
            <span className="tag">Our Capabilities</span>
            <h2 style={{ marginTop: 10 }}>Visa and Job Assistance, Handled Professionally</h2>
            <p style={{ margin: '0 auto' }}>
              Handled with structured eligibility screening, authentic document preparation, and dedicated follow-up.
            </p>
          </div>

          <div className="grid-3">
            {services.map((srv) => (
              <Link to={`/${srv.id}`} key={srv.id} className="card card-interactive">
                <div className="card-header-icon">
                  {srv.id === 'work-visa' && <Briefcase size={22} />}
                  {srv.id === 'study-visa' && <GraduationCap size={22} />}
                  {srv.id === 'tourist-visa' && <Plane size={22} />}
                  {srv.id === 'jobs-abroad' && <Globe size={22} />}
                  {srv.id === 'documentation' && <FileCheck size={22} />}
                </div>
                <h3>{srv.title}</h3>
                <p style={{ fontSize: '0.92rem', marginBottom: 16 }}>{srv.shortDescription}</p>
                <span className="tag" style={{ marginTop: 'auto', alignSelf: 'flex-start' }}>
                  Read service guide →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="section" style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16, marginBottom: 32 }}>
            <div>
              <span className="tag tag-amber">Worldwide Opportunities</span>
              <h2 style={{ marginTop: 8, marginBottom: 8 }}>Destinations We Assist With</h2>
              <p style={{ margin: 0 }}>Discover legal routes, average timelines, and top hiring industries.</p>
            </div>
            <Link to="/destinations" className="btn btn-outline">
              View All 8+ Destinations →
            </Link>
          </div>

          <div className="grid-3">
            {popularDests.map((slug) => {
              const dest = destinations[slug];
              if (!dest) return null;
              return (
                <Link to={`/country/${slug}`} key={slug} className="card card-interactive">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                    <h3 style={{ margin: 0, color: 'var(--teal)' }}>{dest.name}</h3>
                    <span className="tag tag-stamp" style={{ fontSize: '0.75rem' }}>{dest.avgProcessingTime}</span>
                  </div>
                  <p style={{ fontSize: '0.9rem', marginBottom: 12 }}>{dest.description}</p>
                  <div style={{ fontSize: '0.85rem', color: 'var(--ink-secondary)', marginBottom: 14 }}>
                    <b>In-demand:</b> {dest.sectors.slice(0, 75)}...
                  </div>
                  <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--teal)', marginTop: 'auto' }}>
                    View Work &amp; Study Guide →
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Real Departures Gallery Section */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16, marginBottom: 28 }}>
            <div>
              <span className="tag tag-stamp">Airport Send-offs</span>
              <h2 style={{ marginTop: 8, marginBottom: 8 }}>Real Clients, Real Departures</h2>
              <p style={{ margin: 0 }}>
                Recent departures from Delhi Airport (Terminal 3). Outcomes depend on genuine profile matching.
              </p>
            </div>
            <Link to="/gallery" className="btn btn-outline">
              See All Client Journeys →
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
      </section>

      {/* Testimonials */}
      <section className="section" style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 36px' }}>
            <span className="tag">Client Reviews</span>
            <h2 style={{ marginTop: 10 }}>Hear from Our Successful Clients</h2>
            <p style={{ margin: '0 auto' }}>
              Real experiences from candidates who secured their work permits, study visas, and travel authorisations through Tansh Immigration.
            </p>
          </div>

          <div className="grid-3">
            {reviews.slice(0, 3).map((rev) => (
              <div key={rev.id} className="review-card">
                <div>
                  <div className="review-avatar">{rev.initials}</div>
                  <div className="review-stars">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <p className="review-quote">“{rev.quote}”</p>
                </div>
                <div style={{ borderTop: '1px solid var(--line-light)', paddingTop: 12 }}>
                  <div className="review-author">{rev.name}</div>
                  <div className="review-dest">{rev.category} • {rev.destination}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Animated Stats Section */}
          <StatCounter />
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="section">
        <div className="container">
          <div className="card" style={{ 
            background: 'linear-gradient(135deg, #0f2a43, #163e63)', 
            color: '#ffffff', 
            padding: '48px 36px',
            textAlign: 'center',
            borderRadius: 'var(--radius-xl)'
          }}>
            <h2 style={{ color: '#ffffff', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', marginTop: 0, marginBottom: 12 }}>
              Ready to Explore Your Global Opportunities?
            </h2>
            <p style={{ color: '#d9e2ec', maxWidth: '680px', margin: '0 auto 28px', fontSize: '1.05rem' }}>
              Book an appointment at our Raj Nagar, Ghaziabad office, or speak with our consultants on phone and WhatsApp. We review your CV and eligibility with zero obligation.
            </p>
            <div className="button-group" style={{ justifyContent: 'center' }}>
              <button 
                type="button" 
                className="btn btn-stamp btn-lg" 
                onClick={onOpenConsultation}
              >
                <PhoneCall size={18} />
                <span>Book Free Assessment</span>
              </button>
              <Link to="/contact" className="btn btn-outline btn-lg" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.4)' }}>
                <span>Visit Our Office</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
