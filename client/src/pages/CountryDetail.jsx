import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Globe, Briefcase, GraduationCap, Clock, CheckCircle2, PhoneCall, ArrowRight, ShieldCheck } from 'lucide-react';
import { siteData } from '../data/siteData';

export default function CountryDetail({ onOpenConsultation }) {
  const { slug } = useParams();
  const { destinations } = siteData;
  const dest = destinations[slug?.toLowerCase()];

  if (!dest) {
    return <Navigate to="/destinations" replace />;
  }

  return (
    <div className="country-detail-page fade-in">
      <div className="container" style={{ padding: '30px 20px' }}>
        <div className="breadcrumb">
          <Link to="/">Home</Link> <span>/</span> <Link to="/destinations">Destinations</Link> <span>/</span> <span>{dest.name}</span>
        </div>

        <div style={{ maxWidth: '840px', marginBottom: 36 }}>
          <div className="tag tag-stamp" style={{ marginBottom: 12 }}>
            Visa Consultants in Ghaziabad
          </div>
          <h1>{dest.name} Work, Study &amp; Tourist Visa Guidance</h1>
          <p className="hero-subhead">
            {dest.description} Explore legal work routes, university study admissions, and tourist visas for {dest.name} from India.
          </p>
        </div>

        {/* Quick Highlights Row */}
        <div className="grid-3" style={{ marginBottom: 36 }}>
          <div className="card">
            <h4 style={{ color: 'var(--teal)', fontSize: '0.95rem', marginBottom: 4 }}>Processing Time</h4>
            <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>{dest.avgProcessingTime}</div>
          </div>
          <div className="card">
            <h4 style={{ color: 'var(--teal)', fontSize: '0.95rem', marginBottom: 4 }}>Language Requirement</h4>
            <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>{dest.language}</div>
          </div>
          <div className="card">
            <h4 style={{ color: 'var(--teal)', fontSize: '0.95rem', marginBottom: 4 }}>Primary Hiring Industries</h4>
            <div style={{ fontSize: '0.92rem' }}>{dest.sectors}</div>
          </div>
        </div>

        {/* Work & Study Dual Cards */}
        <div className="grid-2" style={{ gap: 28, marginBottom: 40 }}>
          <div className="card" style={{ padding: '32px' }}>
            <div className="card-header-icon" style={{ background: 'var(--stamp-light)', color: 'var(--stamp)' }}>
              <Briefcase size={24} />
            </div>
            <h2>Work in {dest.name}</h2>
            <p style={{ marginBottom: 16 }}>
              The standard pathway is <b>{dest.workRoute}</b>. We coordinate with genuine employers, draft compliant employment files, and guide you through embassy biometrics.
            </p>
            <div className="button-group" style={{ marginTop: 'auto' }}>
              <Link to={`/blog/${dest.slug}-work`} className="btn btn-primary btn-sm">
                <span>Read Full Work Visa Guide</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          <div className="card" style={{ padding: '32px' }}>
            <div className="card-header-icon">
              <GraduationCap size={24} />
            </div>
            <h2>Study in {dest.name}</h2>
            <p style={{ marginBottom: 16 }}>
              Options include <b>{dest.studyRoute}</b>. Our counsellors assist with university shortlisting, offer letter acquisition, education loan guidance, and student visa filing.
            </p>
            <div className="button-group" style={{ marginTop: 'auto' }}>
              <Link to={`/blog/${dest.slug}-study`} className="btn btn-teal btn-sm">
                <span>Read Full Study Guide</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* Key Highlights */}
        {dest.highlights && (
          <div className="card" style={{ padding: '32px', marginBottom: 40 }}>
            <h2>Key Benefits &amp; Opportunities in {dest.name}</h2>
            <ul className="checklist" style={{ marginTop: 16 }}>
              {dest.highlights.map((h, idx) => (
                <li key={idx}><b>{h}</b></li>
              ))}
            </ul>
          </div>
        )}

        {/* Process with Tansh Immigration */}
        <div className="card" style={{ background: 'var(--bg-surface)', padding: '32px', marginBottom: 40 }}>
          <h2>Process With Tansh Immigration</h2>
          <p>
            Every country has distinct immigration quotas, language benchmarks, and medical regulations. Our structured process ensures zero documentation errors:
          </p>
          <ul className="checklist">
            <li>Free preliminary profile assessment and CV audit at our Raj Nagar office</li>
            <li>Selection of viable job trade or higher education academic course</li>
            <li>Employer coordination, offer letter acquisition, or CAS/I-20 issuance</li>
            <li>Document checklist, certified translations, apostille, and financial proof verification</li>
            <li>Visa application filing, appointment scheduling, and mock interview preparation</li>
          </ul>
        </div>

        {/* FAQs about this country */}
        <div style={{ marginBottom: 40 }}>
          <h2>Frequently Asked Questions for {dest.name}</h2>
          <details className="faq-item">
            <summary className="faq-question">How can I get a work visa for {dest.name} from India?</summary>
            <div className="faq-answer">
              Work visas usually require an employer offer, proven trade qualifications, and destination labor approval. Tansh Immigration assesses your profile, coordinates with employers where suitable vacancies exist, and compiles your complete visa dossier.
            </div>
          </details>

          <details className="faq-item">
            <summary className="faq-question">What do I need for a student visa for {dest.name}?</summary>
            <div className="faq-answer">
              Typically, you need an unconditional admission offer, academic certificates, verified financial funds for tuition and living, and an English/language score (IELTS, TOEFL, PTE). We provide a checklist tailored to your university.
            </div>
          </details>

          <details className="faq-item">
            <summary className="faq-question">Are there visa consultants near me in Ghaziabad for {dest.name}?</summary>
            <div className="faq-answer">
              Yes! Tansh Immigration is conveniently located at C-46 BPS Tower, RDC, Raj Nagar, Ghaziabad. You can meet our senior consultants in person, or connect via phone and WhatsApp.
            </div>
          </details>
        </div>

        {/* Bottom CTA */}
        <div className="button-group">
          <button type="button" className="btn btn-stamp btn-lg" onClick={onOpenConsultation}>
            <PhoneCall size={18} />
            <span>Apply For {dest.name}</span>
          </button>
          <Link to="/destinations" className="btn btn-outline btn-lg">View All Countries</Link>
          <Link to="/tourist-visa" className="btn btn-outline btn-lg">Tourist Visa Option</Link>
        </div>
      </div>
    </div>
  );
}
