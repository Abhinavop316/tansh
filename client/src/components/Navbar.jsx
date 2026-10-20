import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, Moon, Sun, Menu, X, PhoneCall, ChevronDown } from 'lucide-react';

export default function Navbar({ onOpenConsultation, theme, toggleTheme }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdown(false);
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;

  return (
    <header className="site-header">
      <div className="container">
        <div className="nav-inner">
          {/* Logo */}
          <Link to="/" className="logo">
            Tansh <b>Immigration</b>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="nav-links" aria-label="Main Navigation">
            <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
              Home
            </Link>
            <Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`}>
              About
            </Link>

            {/* Services Dropdown */}
            <div 
              style={{ position: 'relative' }}
              onMouseEnter={() => setServicesDropdown(true)}
              onMouseLeave={() => setServicesDropdown(false)}
            >
              <Link 
                to="/services" 
                className={`nav-link ${location.pathname.startsWith('/services') || ['/work-visa', '/study-visa', '/tourist-visa', '/jobs-abroad', '/documentation'].includes(location.pathname) ? 'active' : ''}`}
                style={{ display: 'flex', alignItems: 'center', gap: 4 }}
              >
                Services <ChevronDown size={14} />
              </Link>

              {servicesDropdown && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  width: '240px',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--line)',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-lg)',
                  padding: '8px 0',
                  zIndex: 200,
                  animation: 'fadeIn 0.15s ease'
                }}>
                  <Link to="/work-visa" className="nav-link" style={{ display: 'block', padding: '8px 16px', fontSize: '0.9rem' }}>
                    Work Visa Specialisation
                  </Link>
                  <Link to="/study-visa" className="nav-link" style={{ display: 'block', padding: '8px 16px', fontSize: '0.9rem' }}>
                    Study Abroad Counselling
                  </Link>
                  <Link to="/tourist-visa" className="nav-link" style={{ display: 'block', padding: '8px 16px', fontSize: '0.9rem' }}>
                    Tourist & Visit Visa
                  </Link>
                  <Link to="/jobs-abroad" className="nav-link" style={{ display: 'block', padding: '8px 16px', fontSize: '0.9rem' }}>
                    Jobs Abroad
                  </Link>
                  <Link to="/documentation" className="nav-link" style={{ display: 'block', padding: '8px 16px', fontSize: '0.9rem' }}>
                    Documentation & Audit
                  </Link>
                  <div style={{ borderTop: '1px solid var(--line-light)', margin: '6px 0' }} />
                  <Link to="/services" className="nav-link" style={{ display: 'block', padding: '8px 16px', fontSize: '0.88rem', color: 'var(--teal)', fontWeight: 700 }}>
                    View All Services →
                  </Link>
                </div>
              )}
            </div>

            <Link to="/destinations" className={`nav-link ${location.pathname.startsWith('/destinations') || location.pathname.startsWith('/country') ? 'active' : ''}`}>
              Destinations
            </Link>
            <Link to="/packages" className={`nav-link ${isActive('/packages') ? 'active' : ''}`}>
              Packages
            </Link>
            <Link to="/results" className={`nav-link ${isActive('/results') ? 'active' : ''}`}>
              Results
            </Link>
            <Link to="/gallery" className={`nav-link ${isActive('/gallery') ? 'active' : ''}`}>
              Gallery
            </Link>
            <Link to="/reviews" className={`nav-link ${isActive('/reviews') ? 'active' : ''}`}>
              Reviews
            </Link>
            <Link to="/blog" className={`nav-link ${location.pathname.startsWith('/blog') ? 'active' : ''}`}>
              Blog
            </Link>
            <Link to="/faq" className={`nav-link ${isActive('/faq') ? 'active' : ''}`}>
              FAQ
            </Link>
          </nav>

          {/* Nav Actions: Theme toggle + Consultation CTA */}
          <div className="nav-actions">
            <button 
              type="button" 
              className="btn-icon-only" 
              onClick={toggleTheme}
              aria-label="Toggle theme mode"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button 
              type="button" 
              className="btn btn-stamp btn-sm"
              onClick={onOpenConsultation}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
            >
              <PhoneCall size={15} />
              <span>Free Consultation</span>
            </button>

            {/* Mobile Hamburger */}
            <button 
              type="button" 
              className="mobile-menu-btn" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <Link to="/" className={`mobile-nav-link ${isActive('/') ? 'active' : ''}`}>
            Home
          </Link>
          <Link to="/about" className={`mobile-nav-link ${isActive('/about') ? 'active' : ''}`}>
            About Us
          </Link>
          <Link to="/services" className={`mobile-nav-link ${isActive('/services') ? 'active' : ''}`}>
            All Services
          </Link>
          <div style={{ paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Link to="/work-visa" className="nav-link">Work Visa Specialisation</Link>
            <Link to="/study-visa" className="nav-link">Study Visa Counselling</Link>
            <Link to="/tourist-visa" className="nav-link">Tourist Visa</Link>
            <Link to="/jobs-abroad" className="nav-link">Jobs Abroad</Link>
            <Link to="/documentation" className="nav-link">Documentation & Audit</Link>
          </div>
          <Link to="/destinations" className={`mobile-nav-link ${isActive('/destinations') ? 'active' : ''}`}>
            Destinations & Countries
          </Link>
          <Link to="/packages" className={`mobile-nav-link ${isActive('/packages') ? 'active' : ''}`}>
            Packages & Pricing
          </Link>
          <Link to="/why-us" className={`mobile-nav-link ${isActive('/why-us') ? 'active' : ''}`}>
            Why Trust Us
          </Link>
          <Link to="/results" className={`mobile-nav-link ${isActive('/results') ? 'active' : ''}`}>
            Success Rate & Track Record
          </Link>
          <Link to="/gallery" className={`mobile-nav-link ${isActive('/gallery') ? 'active' : ''}`}>
            Client Departures Gallery
          </Link>
          <Link to="/reviews" className={`mobile-nav-link ${isActive('/reviews') ? 'active' : ''}`}>
            Client Reviews
          </Link>
          <Link to="/blog" className={`mobile-nav-link ${isActive('/blog') ? 'active' : ''}`}>
            Visa Guides & Blog
          </Link>
          <Link to="/faq" className={`mobile-nav-link ${isActive('/faq') ? 'active' : ''}`}>
            Frequently Asked Questions
          </Link>
          <Link to="/contact" className={`mobile-nav-link ${isActive('/contact') ? 'active' : ''}`}>
            Contact & Office Location
          </Link>
          <Link to="/admin" className={`mobile-nav-link ${isActive('/admin') ? 'active' : ''}`} style={{ color: 'var(--teal)' }}>
            Staff Portal / Inquiries
          </Link>

          <div style={{ marginTop: '16px' }}>
            <button 
              type="button" 
              className="btn btn-stamp btn-lg" 
              style={{ width: '100%' }}
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
            >
              Book Free Consultation
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
