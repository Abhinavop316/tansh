import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, ShieldCheck, HeartHandshake } from 'lucide-react';
import { siteData } from '../data/siteData';

export default function Footer() {
  const { company } = siteData;

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Col 1: Brand Info */}
          <div>
            <div style={{ marginBottom: 16 }}>
              <h3 style={{ color: '#ffffff', margin: 0, fontSize: '1.4rem', whiteSpace: 'nowrap' }}>
                Tansh <span style={{ color: 'var(--stamp)' }}>Immigration</span>
              </h3>
            </div>
            <p style={{ color: '#b6c8d9', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: 18 }}>
              {company.shortDescription} Transparent, profile-based visa filing for Europe, Schengen, Gulf, Canada, USA, UK, Australia and New Zealand.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#3cc3bb', fontSize: '0.88rem', fontWeight: 600 }}>
              <ShieldCheck size={18} />
              <span>Registered & Profile-Compliant Filings</span>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="footer-title">Visa Services</h4>
            <ul className="footer-links">
              <li><Link to="/work-visa">Work Visa Specialisation</Link></li>
              <li><Link to="/study-visa">Study Abroad Counselling</Link></li>
              <li><Link to="/tourist-visa">Tourist & Visit Visa</Link></li>
              <li><Link to="/jobs-abroad">Jobs Abroad Openings</Link></li>
              <li><Link to="/documentation">File Audit & Documentation</Link></li>
              <li><Link to="/packages">Consultancy Packages</Link></li>
            </ul>
          </div>

          {/* Col 3: Company */}
          <div>
            <h4 className="footer-title">Company</h4>
            <ul className="footer-links">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/team">Our Professionals</Link></li>
              <li><Link to="/why-us">Why Trust Us</Link></li>
              <li><Link to="/results">Success Rate & Track Record</Link></li>
              <li><Link to="/gallery">Client Departures Gallery</Link></li>
              <li><Link to="/reviews">Client Reviews</Link></li>
              <li><Link to="/faq">Frequently Asked Questions</Link></li>
              <li><Link to="/admin" style={{ color: '#3cc3bb' }}>Staff Dashboard</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 className="footer-title">Ghaziabad Office</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: '0.9rem', color: '#b6c8d9' }}>
              <div style={{ display: 'flex', gap: 10 }}>
                <MapPin size={18} style={{ color: 'var(--stamp)', flexShrink: 0, marginTop: 2 }} />
                <span>{company.address.full}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Phone size={18} style={{ color: '#3cc3bb', flexShrink: 0 }} />
                <a href={`tel:${company.contact.phoneRaw}`} style={{ color: '#ffffff', fontWeight: 600 }}>
                  {company.contact.phone}
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Mail size={18} style={{ color: '#f2a33a', flexShrink: 0 }} />
                <a href={`mailto:${company.contact.email}`} style={{ color: '#b6c8d9' }}>
                  {company.contact.email}
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Clock size={18} style={{ color: '#b6c8d9', flexShrink: 0 }} />
                <span>Mon – Sat: 10:00 AM – 6:30 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Tansh Immigration. All rights reserved.</p>
          <p style={{ fontSize: '0.82rem' }}>
            Disclaimer: Job availability and visa issuance are subject to candidate eligibility and the final decision of the relevant employer or immigration authority.
          </p>
        </div>
      </div>
    </footer>
  );
}
