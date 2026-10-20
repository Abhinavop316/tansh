import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, UserCheck, FileText, PhoneCall, ArrowRight } from 'lucide-react';
import StatCounter from '../components/StatCounter';

export default function WhyUs({ onOpenConsultation }) {
  const differentiators = [
    {
      title: "Work Visa Specialists",
      desc: "Unlike generic travel agencies, work-visa processing and legitimate international job opportunities are our core business."
    },
    {
      title: "Individual Profile Evaluation",
      desc: "Every candidate is evaluated individually based on education, trade skill, and background — not forced into standard packages."
    },
    {
      title: "Genuine Documentation & Compliance",
      desc: "We strictly comply with applicable destination immigration laws, ensuring error-free paperwork and verified contracts."
    },
    {
      title: "Upfront & Transparent Charges",
      desc: "You always know what you pay for. Inclusions, stages, and official third-party fees are documented in writing before payment."
    },
    {
      title: "No False Promises or Fake Guarantees",
      desc: "We never unlawfully claim '100% visa guarantees'. We tell you honestly when a destination is risky or unsuitable for your profile."
    },
    {
      title: "Dedicated Case Manager & Updates",
      desc: "You are assigned a dedicated consultant who communicates status updates at every milestone from filing to departure."
    }
  ];

  return (
    <div className="why-us-page fade-in">
      <div className="container" style={{ padding: '30px 20px' }}>
        <div className="breadcrumb">
          <Link to="/">Home</Link> <span>/</span> <span>Why Us</span>
        </div>

        <div style={{ maxWidth: '840px', marginBottom: 36 }}>
          <div className="tag tag-amber" style={{ marginBottom: 12 }}>Trust &amp; Integrity</div>
          <h1>Why Students &amp; Job Seekers Trust Tansh Immigration</h1>
          <p className="hero-subhead">
            Responsible counselling, authentic documentation, and clear communication at every stage. See why applicants across Ghaziabad and Delhi NCR choose us over generic agents.
          </p>
        </div>

        {/* 6 Key Differentiators */}
        <div className="grid-3" style={{ marginBottom: 48 }}>
          {differentiators.map((item, idx) => (
            <div key={idx} className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <CheckCircle2 size={22} style={{ color: 'var(--teal)', flexShrink: 0 }} />
                <h3 style={{ margin: 0, fontSize: '1.15rem' }}>{item.title}</h3>
              </div>
              <p style={{ margin: 0, fontSize: '0.92rem' }}>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="card" style={{ padding: '36px', marginBottom: 48 }}>
          <h2>What to Look For in an Immigration Consultant</h2>
          <p style={{ marginBottom: 24 }}>How Tansh Immigration compares to typical unregistered agents in the market:</p>

          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Parameters</th>
                  <th>Tansh Immigration</th>
                  <th>Typical Unregulated Agents</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><b>Visa Guarantees</b></td>
                  <td style={{ color: 'var(--teal)', fontWeight: 600 }}>Honest guidance; no unlawful guarantees</td>
                  <td style={{ color: 'var(--stamp)' }}>Fake "100% Guaranteed" claims</td>
                </tr>
                <tr>
                  <td><b>Profile Assessment</b></td>
                  <td style={{ color: 'var(--teal)', fontWeight: 600 }}>Thorough eligibility screening first</td>
                  <td style={{ color: 'var(--stamp)' }}>Accepts anyone regardless of qualifications</td>
                </tr>
                <tr>
                  <td><b>Fee Structure</b></td>
                  <td style={{ color: 'var(--teal)', fontWeight: 600 }}>Itemized &amp; documented in engagement agreement</td>
                  <td style={{ color: 'var(--stamp)' }}>Hidden charges and unexpected demands</td>
                </tr>
                <tr>
                  <td><b>Employer Contracts</b></td>
                  <td style={{ color: 'var(--teal)', fontWeight: 600 }}>Verified with legitimate licensed partners</td>
                  <td style={{ color: 'var(--stamp)' }}>Forged or unverified offer letters</td>
                </tr>
                <tr>
                  <td><b>Physical Office</b></td>
                  <td style={{ color: 'var(--teal)', fontWeight: 600 }}>C-46 BPS Tower, RDC, Raj Nagar, Ghaziabad</td>
                  <td style={{ color: 'var(--stamp)' }}>Temporary setups or phone-only presence</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* In Numbers */}
        <StatCounter />

        {/* CTA */}
        <div className="button-group" style={{ marginTop: 24 }}>
          <button type="button" className="btn btn-stamp btn-lg" onClick={onOpenConsultation}>
            <PhoneCall size={18} />
            <span>Speak to an Honest Consultant</span>
          </button>
          <Link to="/reviews" className="btn btn-outline btn-lg">Read Verified Client Reviews</Link>
          <Link to="/results" className="btn btn-outline btn-lg">View Track Record &amp; Results</Link>
        </div>
      </div>
    </div>
  );
}
