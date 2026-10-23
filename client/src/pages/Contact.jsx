import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { siteData } from '../data/siteData';
import { submitInquiry } from '../api';

export default function Contact() {
  const { company } = siteData;

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    visaType: 'Work visa',
    destination: 'Europe and Schengen',
    education: '',
    experience: '',
    timeSlot: '9:00 AM - 12:00 PM',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = {
        ...formData,
        destination: (formData.destination === 'Other' && formData.customCountry?.trim())
          ? formData.customCountry.trim()
          : formData.destination
      };
      await submitInquiry(payload);
      setSuccess(true);
      try {
        confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
      } catch (err) {}
    } catch (err) {
      console.error(err);
      setError(err.message || 'Error submitting request. Please call us at +91 92110 71319.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page fade-in">
      <div className="container" style={{ padding: '30px 20px' }}>
        <div className="breadcrumb">
          <Link to="/">Home</Link> <span>/</span> <span>Contact Us</span>
        </div>

        <div style={{ maxWidth: '840px', marginBottom: 36 }}>
          <div className="tag tag-stamp" style={{ marginBottom: 12 }}>Raj Nagar, Ghaziabad</div>
          <h1>Contact Tansh Immigration</h1>
          <p className="hero-subhead">
            Get in touch for a free, zero-obligation profile assessment. Visit our office in RDC, Raj Nagar, Ghaziabad, or contact our team via phone or WhatsApp.
          </p>
        </div>

        <div className="grid-2" style={{ gap: 40, marginBottom: 48 }}>
          {/* Form */}
          <div className="form-card">
            {success ? (
              <div style={{ textAlign: 'center', padding: '36px 12px' }}>
                <CheckCircle2 size={56} style={{ color: 'var(--success)', margin: '0 auto 16px' }} />
                <h2>Thank You, {formData.name}!</h2>
                <p style={{ color: 'var(--ink-secondary)', fontSize: '1.05rem', marginBottom: 24 }}>
                  Your consultation request has been logged successfully into our system. Our senior visa consultant will contact you on <b>{formData.phone}</b> shortly.
                </p>
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={() => {
                    setSuccess(false);
                    setFormData({
                      name: '',
                      phone: '',
                      email: '',
                      visaType: 'Work visa',
                      destination: 'Europe and Schengen',
                      education: '',
                      experience: '',
                      message: ''
                    });
                  }}
                >
                  Submit Another Profile
                </button>
              </div>
            ) : (
              <div>
                <h2 style={{ marginTop: 0, marginBottom: 8, fontSize: '1.5rem' }}>
                  Request Free Profile Assessment
                </h2>
                <p style={{ fontSize: '0.9rem', marginBottom: 20 }}>
                  Fill out your details below and we will advise which destinations and roles realistically match your background.
                </p>

                {error && (
                  <div style={{ background: 'var(--stamp-light)', color: 'var(--stamp)', padding: '10px 14px', borderRadius: 'var(--radius-md)', fontSize: '0.88rem', marginBottom: 16 }}>
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      required 
                      placeholder="e.g. Ramesh Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                    <div className="form-group">
                      <label className="form-label">Phone / WhatsApp *</label>
                      <input 
                        type="tel" 
                        className="form-input" 
                        required 
                        placeholder="+91 92110 71319"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Email Address</label>
                      <input 
                        type="email" 
                        className="form-input" 
                        placeholder="ramesh@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                    <div className="form-group">
                      <label className="form-label">Interested In</label>
                      <select 
                        className="form-select"
                        value={formData.visaType}
                        onChange={(e) => setFormData({ ...formData, visaType: e.target.value })}
                      >
                        <option value="Work visa">Work Visa (Core)</option>
                        <option value="Study visa">Study Abroad / Student Visa</option>
                        <option value="Tourist visa">Tourist & Visit Visa</option>
                        <option value="Jobs abroad">Jobs Abroad Placement</option>
                        <option value="Documentation">File Audit / Documentation</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Which Country Visa? *</label>
                      <select 
                        className="form-select"
                        value={formData.destination}
                        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      >
                        <option value="Europe and Schengen">Europe & Schengen</option>
                        <option value="Germany">Germany</option>
                        <option value="Poland">Poland</option>
                        <option value="United Kingdom">United Kingdom (UK)</option>
                        <option value="Canada">Canada</option>
                        <option value="Australia">Australia</option>
                        <option value="New Zealand">New Zealand</option>
                        <option value="United States">USA / North America</option>
                        <option value="Gulf Countries">Gulf Countries (UAE, Saudi, Qatar)</option>
                        <option value="Asia">Asia (Malaysia, Singapore)</option>
                        <option value="Other">Other Country (Specify)</option>
                      </select>
                    </div>
                  </div>

                  {formData.destination === 'Other' && (
                    <div className="form-group">
                      <label className="form-label">Specify Country Name *</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        required 
                        placeholder="e.g. Malta, Croatia, Portugal, Dubai..."
                        value={formData.customCountry || ''}
                        onChange={(e) => setFormData({ ...formData, customCountry: e.target.value })}
                      />
                    </div>
                  )}

                  <div className="form-group">
                    <label className="form-label">Time Slot to Talk</label>
                    <select 
                      className="form-select"
                      value={formData.timeSlot}
                      onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    >
                      <option value="9:00 AM - 12:00 PM">9:00 AM - 12:00 PM</option>
                      <option value="12:30 PM - 1:30 PM">12:30 PM - 1:30 PM</option>
                      <option value="3:00 PM - 6:00 PM">3:00 PM - 6:00 PM</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Education / Work Experience / Message</label>
                    <textarea 
                      className="form-textarea" 
                      rows={3}
                      placeholder="Briefly describe your trade, qualifications, language scores, or queries..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-stamp btn-lg" 
                    style={{ width: '100%' }}
                    disabled={loading}
                  >
                    {loading ? 'Submitting File...' : 'Request Free Consultation'}
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Office Details & Map */}
          <div>
            <div className="card" style={{ padding: '28px', marginBottom: 24 }}>
              <h3>Office Information</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 16 }}>
                <div style={{ display: 'flex', gap: 12 }}>
                  <MapPin size={20} style={{ color: 'var(--stamp)', flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <b>Address:</b><br />
                    {company.address.full}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 12 }}>
                  <Phone size={20} style={{ color: 'var(--teal)', flexShrink: 0 }} />
                  <div>
                    <b>Phone / WhatsApp:</b><br />
                    <a href={`tel:${company.contact.phoneRaw}`} style={{ color: 'var(--teal)', fontWeight: 600 }}>
                      {company.contact.phone}
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 12 }}>
                  <Mail size={20} style={{ color: 'var(--accent-amber)', flexShrink: 0 }} />
                  <div>
                    <b>Email:</b><br />
                    <a href={`mailto:${company.contact.email}`} style={{ color: 'inherit' }}>
                      {company.contact.email}
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 12 }}>
                  <Clock size={20} style={{ color: 'var(--ink-secondary)', flexShrink: 0 }} />
                  <div>
                    <b>Working Hours:</b><br />
                    Monday – Saturday: 10:00 AM – 6:30 PM (Sunday Closed)
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--line-light)' }}>
                <a 
                  href={company.contact.whatsappUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-teal btn-sm"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
                >
                  <MessageCircle size={16} />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Google Map Embed */}
            <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--line)', height: '280px' }}>
              <iframe 
                title="Tansh Immigration office map" 
                loading="lazy" 
                src={company.contact.mapEmbedUrl}
                style={{ width: '100%', height: '100%', border: 0 }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
