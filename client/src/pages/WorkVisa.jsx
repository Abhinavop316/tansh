import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, CheckCircle2, AlertTriangle, FileText, Globe, PhoneCall } from 'lucide-react';
import { siteData } from '../data/siteData';

export default function WorkVisa({ onOpenConsultation }) {
  const { destinations, reviews } = siteData;
  const slugs = Object.keys(destinations);

  return (
    <div className="work-visa-page fade-in">
      <div className="container" style={{ padding: '30px 20px' }}>
        <div className="breadcrumb">
          <Link to="/">Home</Link> <span>/</span> <Link to="/services">Services</Link> <span>/</span> <span>Work Visa</span>
        </div>

        <div style={{ maxWidth: '840px', marginBottom: 36 }}>
          <div className="tag tag-stamp" style={{ marginBottom: 12 }}>Core Specialisation</div>
          <h1>Work Visa and International Job Assistance</h1>
          <p className="hero-subhead">
            Work-visa processing is our core specialisation. We assist with candidate profile evaluation, destination selection based on current market demand, employer-side coordination, complete documentation preparation and application filing.
          </p>
        </div>

        {/* 3 Core Aspects */}
        <div className="grid-3" style={{ marginBottom: 40 }}>
          <div className="card">
            <h3>Profile Assessment</h3>
            <p>
              Honest evaluation of your educational background, vocational skills, and verifiable experience against destination requirements.
            </p>
          </div>
          <div className="card">
            <h3>Employer Coordination</h3>
            <p>
              Direct coordination with licensed employers and placement partners across European, Schengen, and Gulf markets where vacancies exist.
            </p>
          </div>
          <div className="card">
            <h3>Documentation &amp; Filing</h3>
            <p>
              Destination-specific checklists, work contract audits, apostille, PCC, medical test guidance, and complete application filing.
            </p>
          </div>
        </div>

        {/* End to End Support */}
        <div className="card" style={{ marginBottom: 40, padding: '32px' }}>
          <h2>End-to-End Support, From Consultation to Submission</h2>
          <p>
            Candidates from Ghaziabad, Delhi NCR, and across India approach us for work permits in Europe, the Gulf, Canada, the UK, Australia, and New Zealand. Our service covers the entire journey:
          </p>
          <ul className="checklist">
            <li>Reviewing your CV, trade certifications, and previous work references</li>
            <li>Identifying realistic destinations with active demand for your specific trade</li>
            <li>Employer coordination, contract issuance, and work permit verification</li>
            <li>Arranging destination-specific checklists for medical, police clearance (PCC), and biometrics</li>
            <li>Embassy / VFS interview preparation and departure briefing</li>
          </ul>
        </div>

        {/* Documents Needed */}
        <div className="grid-2" style={{ gap: 32, marginBottom: 48 }}>
          <div className="card">
            <h3>Documents Usually Needed</h3>
            <ul className="checklist">
              <li>Valid Indian Passport (minimum 12–18 months validity)</li>
              <li>Updated CV and previous employer experience / relieving letters</li>
              <li>Educational certificates and marksheets (10th, 12th, ITI, Diploma or Degree)</li>
              <li>Police Clearance Certificate (PCC) issued by PSK</li>
              <li>Authorized medical examination and blood reports</li>
              <li>Genuine job offer or employment contract where required</li>
              <li>Basic language score certificate where applicable</li>
            </ul>
          </div>

          <div className="card" style={{ background: 'var(--bg-surface)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--stamp)', marginBottom: 12 }}>
              <AlertTriangle size={24} />
              <h3 style={{ margin: 0, color: 'var(--stamp)' }}>Avoid Fake Job Offers</h3>
            </div>
            <p style={{ fontSize: '0.94rem' }}>
              Unfortunately, fraudulent agents often promise "guaranteed visas" or fake employment letters. At Tansh Immigration:
            </p>
            <ul className="checklist">
              <li>We never promise or guarantee visa approvals — final decisions rest solely with embassies.</li>
              <li>All employer contracts are verifiable and legally structured.</li>
              <li>Every charge is itemized in your client engagement agreement before payment.</li>
            </ul>
          </div>
        </div>

        {/* Destination Guides Grid */}
        <div style={{ marginBottom: 48 }}>
          <h2>Work Visa Guides by Destination</h2>
          <p>Read about work pathways, hiring sectors, and permit rules across our key markets:</p>
          <div className="grid-3">
            {slugs.map((s) => (
              <Link to={`/blog/${s}-work`} key={s} className="card card-interactive">
                <h3 style={{ color: 'var(--teal)', marginBottom: 6 }}>{destinations[s].name}</h3>
                <p style={{ fontSize: '0.9rem', marginBottom: 12 }}>
                  Demand sectors: {destinations[s].sectors.slice(0, 70)}...
                </p>
                <span className="tag" style={{ marginTop: 'auto', alignSelf: 'flex-start' }}>
                  Read work visa guide →
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Review Spotlight */}
        <div className="review-card" style={{ marginBottom: 40 }}>
          <p className="review-quote">“{reviews[0].quote}”</p>
          <div style={{ borderTop: '1px solid var(--line-light)', paddingTop: 12 }}>
            <div className="review-author">{reviews[0].name}</div>
            <div className="review-dest">{reviews[0].category} • {reviews[0].destination}</div>
          </div>
        </div>

        {/* CTA */}
        <div className="button-group">
          <button type="button" className="btn btn-stamp btn-lg" onClick={onOpenConsultation}>
            <PhoneCall size={18} />
            <span>Get Free Profile Assessment</span>
          </button>
          <Link to="/jobs-abroad" className="btn btn-outline btn-lg">Explore In-Demand Sectors</Link>
          <Link to="/packages" className="btn btn-outline btn-lg">Work Visa Packages</Link>
        </div>
      </div>
    </div>
  );
}
