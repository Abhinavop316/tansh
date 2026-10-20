import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, GraduationCap, Plane, Globe, FileCheck, ArrowRight, ShieldCheck } from 'lucide-react';
import { siteData } from '../data/siteData';

export default function Services({ onOpenConsultation }) {
  const { services } = siteData;

  return (
    <div className="services-page fade-in">
      <div className="container" style={{ padding: '30px 20px' }}>
        <div className="breadcrumb">
          <Link to="/">Home</Link> <span>/</span> <span>Services</span>
        </div>

        <div style={{ maxWidth: '820px', marginBottom: 36 }}>
          <div className="tag tag-amber" style={{ marginBottom: 12 }}>Comprehensive Visa Solutions</div>
          <h1>Visa &amp; Immigration Services in Ghaziabad</h1>
          <p className="hero-subhead">
            Three core visa categories, each handled with proper profile assessment, correct documentation, and full process support from our Raj Nagar office.
          </p>
        </div>

        {/* Services List Grid */}
        <div className="grid-2" style={{ gap: 28, marginBottom: 48 }}>
          {services.map((srv) => (
            <div key={srv.id} className="card card-interactive" style={{ padding: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div className="card-header-icon" style={{ marginBottom: 0 }}>
                  {srv.id === 'work-visa' && <Briefcase size={24} />}
                  {srv.id === 'study-visa' && <GraduationCap size={24} />}
                  {srv.id === 'tourist-visa' && <Plane size={24} />}
                  {srv.id === 'jobs-abroad' && <Globe size={24} />}
                  {srv.id === 'documentation' && <FileCheck size={24} />}
                </div>
                <span className="tag tag-stamp">{srv.subtitle}</span>
              </div>

              <h2 style={{ fontSize: '1.45rem', marginTop: 0, marginBottom: 10 }}>{srv.title}</h2>
              <p style={{ fontSize: '0.96rem', marginBottom: 18 }}>{srv.shortDescription}</p>

              <h4 style={{ fontSize: '0.95rem', color: 'var(--ink)', marginBottom: 10 }}>What We Handle:</h4>
              <ul className="checklist" style={{ marginBottom: 24 }}>
                {srv.details.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>

              <div style={{ marginTop: 'auto', display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link to={`/${srv.id}`} className="btn btn-primary btn-sm">
                  <span>Full Service Details</span>
                  <ArrowRight size={14} />
                </Link>
                <button type="button" className="btn btn-outline btn-sm" onClick={onOpenConsultation}>
                  Check Eligibility
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="card" style={{ background: 'var(--bg-surface)', padding: '36px', textAlign: 'center' }}>
          <h2>Not Sure Which Visa Route Suits You?</h2>
          <p style={{ maxWidth: '640px', margin: '0 auto 24px' }}>
            Eligibility depends on your education, years of experience, age, and language proficiency. Book a zero-obligation assessment and our consultants will guide you honestly.
          </p>
          <div className="button-group" style={{ justifyContent: 'center' }}>
            <button type="button" className="btn btn-stamp btn-lg" onClick={onOpenConsultation}>
              Book Free Profile Assessment
            </button>
            <Link to="/packages" className="btn btn-outline btn-lg">
              View Consultancy Packages
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
