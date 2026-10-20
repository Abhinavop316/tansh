import React from 'react';
import { Link } from 'react-router-dom';
import { FileCheck, ShieldCheck, CheckCircle2, AlertCircle, PhoneCall } from 'lucide-react';

export default function Documentation({ onOpenConsultation }) {
  return (
    <div className="documentation-page fade-in">
      <div className="container" style={{ padding: '30px 20px' }}>
        <div className="breadcrumb">
          <Link to="/">Home</Link> <span>/</span> <Link to="/services">Services</Link> <span>/</span> <span>Documentation</span>
        </div>

        <div style={{ maxWidth: '840px', marginBottom: 36 }}>
          <div className="tag tag-amber" style={{ marginBottom: 12 }}>File Audit &amp; Verification</div>
          <h1>Visa Documentation &amp; File Preparation Services</h1>
          <p className="hero-subhead">
            Incomplete or inconsistent documents are the #1 cause of visa delays and refusals. At Tansh Immigration in Raj Nagar, Ghaziabad, we prepare destination-specific checklists and review every file thoroughly before submission.
          </p>
        </div>

        {/* 4 Process Pillars */}
        <div className="grid-2" style={{ gap: 28, marginBottom: 40 }}>
          <div className="card">
            <h3>Document Checklists for Every Category</h3>
            <p>
              We provide clear checklists tailored to your exact visa stream (Work, Study, or Tourist) covering identity proofs, academic credentials, work history letters, financial solvency, and health clearances.
            </p>
            <ul className="checklist">
              <li>Passport validity and biographical page verification</li>
              <li>Apostille and Ministry of External Affairs (MEA) attestation</li>
              <li>Police Clearance Certificate (PCC) verification</li>
              <li>Authorized panel physician medical clearance</li>
            </ul>
          </div>

          <div className="card">
            <h3>Financial Document Auditing</h3>
            <p>
              Embassies pay strict attention to source of funds and bank statement patterns. We ensure your financial presentation meets visa officer guidelines.
            </p>
            <ul className="checklist">
              <li>6-Month bank statement calculation with clean provenance</li>
              <li>Income Tax Return (ITR) verification and sponsor affidavits</li>
              <li>Education loan sanction letters from recognized banks</li>
              <li>Chartered Accountant (CA) net worth evaluations</li>
            </ul>
          </div>
        </div>

        {/* Audit Stages Card */}
        <div className="card" style={{ padding: '32px', marginBottom: 40 }}>
          <h2>Our 5-Stage Documentation Audit</h2>
          <div className="grid-3" style={{ marginTop: 20 }}>
            <div>
              <h4 style={{ color: 'var(--teal)' }}>1. Checklist Issuance</h4>
              <p style={{ fontSize: '0.9rem' }}>Comprehensive breakdown of all mandatory, supporting, and optional documents for your destination.</p>
            </div>
            <div>
              <h4 style={{ color: 'var(--teal)' }}>2. Primary Verification</h4>
              <p style={{ fontSize: '0.9rem' }}>Cross-checking names, dates of birth, passport numbers, and designations across all records.</p>
            </div>
            <div>
              <h4 style={{ color: 'var(--teal)' }}>3. Official Translations</h4>
              <p style={{ fontSize: '0.9rem' }}>Certified translations and notary stamps for regional language documents into English or destination language.</p>
            </div>
            <div>
              <h4 style={{ color: 'var(--teal)' }}>4. Cover Letter &amp; SOP</h4>
              <p style={{ fontSize: '0.9rem' }}>Professional drafting of visa cover letters, employer statements, and personal statements of purpose.</p>
            </div>
            <div>
              <h4 style={{ color: 'var(--teal)' }}>5. Final Senior Sign-Off</h4>
              <p style={{ fontSize: '0.9rem' }}>Thorough pre-submission review by senior visa consultants to eliminate red flags before VFS appointment.</p>
            </div>
            <div>
              <h4 style={{ color: 'var(--teal)' }}>6. Submission Support</h4>
              <p style={{ fontSize: '0.9rem' }}>Guidance on biometrics, visa interview preparation, and status tracking through embassy portals.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="button-group">
          <button type="button" className="btn btn-stamp btn-lg" onClick={onOpenConsultation}>
            <PhoneCall size={18} />
            <span>Have Your Documents Audited</span>
          </button>
          <Link to="/work-visa" className="btn btn-outline btn-lg">Work Visa Service</Link>
          <Link to="/study-visa" className="btn btn-outline btn-lg">Study Visa Service</Link>
          <Link to="/contact" className="btn btn-outline btn-lg">Visit Ghaziabad Office</Link>
        </div>
      </div>
    </div>
  );
}
