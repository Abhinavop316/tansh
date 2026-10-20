import React from 'react';
import { Link } from 'react-router-dom';
import { UserCheck, PhoneCall, Award, Mail } from 'lucide-react';
import { siteData } from '../data/siteData';

export default function Team({ onOpenConsultation }) {
  const { team } = siteData;

  return (
    <div className="team-page fade-in">
      <div className="container" style={{ padding: '30px 20px' }}>
        <div className="breadcrumb">
          <Link to="/">Home</Link> <span>/</span> <Link to="/about">About</Link> <span>/</span> <span>Our Team</span>
        </div>

        <div style={{ maxWidth: '800px', marginBottom: 36 }}>
          <div className="tag tag-stamp" style={{ marginBottom: 12 }}>Experienced Professionals</div>
          <h1>Meet Our Visa &amp; Immigration Team</h1>
          <p className="hero-subhead">
            The dedicated consultants and case managers who handle your profile evaluation, document preparation, employer coordination, and embassy follow-ups from Raj Nagar, Ghaziabad.
          </p>
        </div>

        <div className="grid-3" style={{ marginBottom: 48 }}>
          {team.map((member, idx) => (
            <div key={idx} className="card card-interactive">
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                <div style={{ 
                  width: 52, 
                  height: 52, 
                  borderRadius: '50%', 
                  background: idx === 0 ? 'linear-gradient(135deg, var(--stamp), #8c2017)' : 'linear-gradient(135deg, var(--teal), #054f4b)', 
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '1.2rem',
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  {member.name.split(' ').map(x => x[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{member.name}</h3>
                  <div style={{ color: 'var(--teal)', fontWeight: 600, fontSize: '0.9rem' }}>{member.role}</div>
                </div>
              </div>

              <p style={{ fontSize: '0.92rem', marginBottom: 16, color: 'var(--ink-secondary)' }}>
                {member.bio}
              </p>

              <div style={{ marginTop: 'auto', paddingTop: 14, borderTop: '1px solid var(--line-light)', display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.85rem', color: 'var(--ink-muted)' }}>
                <Award size={16} style={{ color: 'var(--accent-amber)' }} />
                <span>{member.experience}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="card" style={{ background: 'var(--bg-surface)', textAlign: 'center', padding: '40px 24px' }}>
          <h2>Speak Directly With A Consultant</h2>
          <p style={{ maxWidth: '640px', margin: '0 auto 24px' }}>
            Whether you are exploring European skilled worker visas, Gulf employment, or Canadian student visas, our team is ready to evaluate your eligibility.
          </p>
          <div className="button-group" style={{ justifyContent: 'center' }}>
            <button type="button" className="btn btn-stamp btn-lg" onClick={onOpenConsultation}>
              <PhoneCall size={18} />
              <span>Book Appointment with Team</span>
            </button>
            <Link to="/contact" className="btn btn-outline btn-lg">
              <span>View Office Location</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
