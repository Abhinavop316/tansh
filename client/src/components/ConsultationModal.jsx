import React, { useState } from 'react';
import { X, CheckCircle, Send, PhoneCall } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ConsultationModal({ isOpen, onClose, defaultVisaType = 'Work visa', defaultDestination = 'Europe and Schengen' }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    visaType: defaultVisaType,
    destination: defaultDestination,
    education: '',
    experience: '',
    timeSlot: '9:00 AM - 12:00 PM',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit consultation request');
      }

      setSuccess(true);
      // Trigger confetti celebration
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // ignore if confetti fails
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'Something went wrong. Please call us directly at +91 92110 71319.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSuccess(false);
    setFormData({
      name: '',
      phone: '',
      email: '',
      visaType: defaultVisaType,
      destination: defaultDestination,
      education: '',
      experience: '',
      timeSlot: '9:00 AM - 12:00 PM',
      message: ''
    });
    onClose();
  };

  return (
    <div 
      className="lightbox-overlay" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="form-card" 
        onClick={(e) => e.stopPropagation()} 
        style={{ maxWidth: '560px', width: '100%', position: 'relative', animation: 'slideDown 0.25s ease' }}
      >
        <button 
          onClick={onClose}
          style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', color: 'var(--ink-secondary)', cursor: 'pointer' }}
          aria-label="Close consultation modal"
        >
          <X size={22} />
        </button>

        {success ? (
          <div style={{ textAlign: 'center', padding: '24px 8px' }}>
            <CheckCircle size={56} style={{ color: 'var(--success)', margin: '0 auto 16px' }} />
            <h2 style={{ fontSize: '1.8rem', marginBottom: 10 }}>Thank You!</h2>
            <p style={{ color: 'var(--ink-secondary)', fontSize: '1.05rem', marginBottom: 20 }}>
              We have received your profile details. Senior consultant <b>Thakur Divyansh</b> or our team will review your case and reach out on <b>{formData.phone}</b> within 24 hours.
            </p>
            <div className="button-group" style={{ justifyContent: 'center' }}>
              <button type="button" className="btn btn-teal" onClick={handleReset}>
                Done / Close Window
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div className="tag tag-stamp">Free Profile Evaluation</div>
            </div>
            <h2 style={{ marginTop: 6, marginBottom: 6, fontSize: '1.6rem' }}>
              Book Your Free Consultation
            </h2>
            <p style={{ fontSize: '0.92rem', color: 'var(--ink-secondary)', marginBottom: 20 }}>
              Transparent, honest advice from Raj Nagar, Ghaziabad. We never charge for initial eligibility assessments.
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
                  placeholder="e.g. Aman Sharma"
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
                    placeholder="name@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div className="form-group">
                  <label className="form-label">Visa Service Needed *</label>
                  <select 
                    className="form-select"
                    value={formData.visaType}
                    onChange={(e) => setFormData({ ...formData, visaType: e.target.value })}
                  >
                    <option value="Work visa">Work Visa (Core Specialisation)</option>
                    <option value="Study visa">Study Abroad / Student Visa</option>
                    <option value="Tourist visa">Tourist & Visit Visa</option>
                    <option value="Jobs abroad">Jobs Abroad Placement</option>
                    <option value="Documentation">File Review / Documentation</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Preferred Destination</label>
                  <select 
                    className="form-select"
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  >
                    <option value="Europe and Schengen">Europe & Schengen</option>
                    <option value="Gulf Countries">Gulf Countries (UAE, Saudi, Qatar)</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Australia">Australia</option>
                    <option value="New Zealand">New Zealand</option>
                    <option value="Asia">Asia (Malaysia, Singapore)</option>
                    <option value="United States">USA / North America</option>
                  </select>
                </div>
              </div>

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
                <label className="form-label">Your Qualifications / Experience Summary</label>
                <textarea 
                  className="form-textarea" 
                  rows={2}
                  placeholder="e.g. 12th pass, 3 years experience as welder / IELTS 6.5 graduate looking for UK Master degree..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-stamp btn-lg" 
                style={{ width: '100%', marginTop: 8 }}
                disabled={loading}
              >
                {loading ? 'Submitting Request...' : 'Submit Profile For Free Assessment'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
