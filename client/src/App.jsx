import React, { useState, useEffect, useRef } from 'react';
import { getPageData, enhance, IMGS } from './siteEngine';

export default function App() {
  const [currentHash, setCurrentHash] = useState(() => window.location.hash || '#/');
  const [lightbox, setLightbox] = useState({ isOpen: false, src: '', alt: '' });
  const appRef = useRef(null);

  // Sync hash routing
  useEffect(() => {
    if (!window.location.hash || window.location.hash === '#') {
      window.location.hash = '#/';
    }

    const onHashChange = () => {
      setCurrentHash(window.location.hash || '#/');
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Current primary route identifier
  const cleanPath = currentHash.replace(/^#\/?/, '').replace(/^\//, '');
  const activeNav = cleanPath.split('/')[0] || '';

  // Get exact page data
  const pageData = getPageData(currentHash);

  // Update title & description, scroll to top, and trigger enhance animations
  useEffect(() => {
    document.title = pageData.t;
    const metaDesc = document.getElementById('md');
    if (metaDesc) {
      metaDesc.content = pageData.d;
    }
    window.scrollTo(0, 0);

    // Run exact enhance animations from original HTML
    if (appRef.current) {
      enhance(appRef.current);
    }
  }, [currentHash, pageData.h]);

  // Wire form submission to Express backend & lightbox global listeners
  useEffect(() => {
    // Handle form submit globally
    const handleSubmit = async (e) => {
      const form = e.target.closest('form');
      if (form) {
        e.preventDefault();
        const n = form.querySelector('#n')?.value || '';
        const p = form.querySelector('#p')?.value || '';
        const v = form.querySelector('#v')?.value || 'Work visa';
        const ts = form.querySelector('#ts')?.value || '9:00 AM - 12:00 PM';
        const m = form.querySelector('#m')?.value || '';

        try {
          await fetch('/api/inquiries', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: n, phone: p, visaType: v, timeSlot: ts, message: m })
          });
        } catch (err) {
          console.error('Inquiry submission error:', err);
        }
        window.location.hash = '#/thank-you';
      }
    };

    // Global click listener for gallery buttons (.gb)
    const handleGlobalClick = (e) => {
      const btn = e.target.closest('.gb');
      if (btn) {
        e.preventDefault();
        const imgKey = btn.dataset.s;
        const imgEl = btn.querySelector('img');
        setLightbox({
          isOpen: true,
          src: IMGS[imgKey] || imgEl?.src || '',
          alt: imgEl?.alt || 'Enlarged photo'
        });
      }
    };

    // Keyboard ESC listener
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setLightbox(prev => ({ ...prev, isOpen: false }));
      }
    };

    document.addEventListener('submit', handleSubmit);
    document.addEventListener('click', handleGlobalClick);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('submit', handleSubmit);
      document.removeEventListener('click', handleGlobalClick);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      <header>
        <div className="w">
          <nav aria-label="Main">
            <a className="logo" href="#/">Tansh <b>Immigration</b></a>
            <a className={`l ${activeNav === 'about' ? 'on' : ''}`} href="#/about">About</a>
            <a className={`l ${activeNav === 'services' ? 'on' : ''}`} href="#/services">Services</a>
            <a className={`l ${activeNav === 'destinations' ? 'on' : ''}`} href="#/destinations">Countries</a>
            <a className={`l ${activeNav === 'blog' ? 'on' : ''}`} href="#/blog">Blog</a>
            <a className={`l ${activeNav === 'why-us' ? 'on' : ''}`} href="#/why-us">Why us</a>
            <a className={`l ${activeNav === 'results' ? 'on' : ''}`} href="#/results">Results</a>
            <a className={`l ${activeNav === 'gallery' ? 'on' : ''}`} href="#/gallery">Gallery</a>
            <a className={`l ${activeNav === 'reviews' ? 'on' : ''}`} href="#/reviews">Reviews</a>
            <a className={`l ${activeNav === 'faq' ? 'on' : ''}`} href="#/faq">FAQ</a>
            <a className="btn s" href="#/contact">Free consultation</a>
          </nav>
        </div>
      </header>

      <div className="w">
        <main id="app" ref={appRef} dangerouslySetInnerHTML={{ __html: pageData.h }} />
      </div>

      <footer>
        <div className="w">
          <div className="fg">
            <div>
              <h3>Tansh Immigration</h3>
              <p>Transparent, profile-based work, study and tourist visa guidance from Raj Nagar, Ghaziabad.</p>
            </div>
            <div>
              <h3>Services</h3>
              <a href="#/work-visa">Work visa</a>
              <a href="#/study-visa">Study visa</a>
              <a href="#/tourist-visa">Tourist visa</a>
              <a href="#/jobs-abroad">Jobs abroad</a>
            </div>
            <div>
              <h3>Company</h3>
              <a href="#/about">About us</a>
              <a href="#/why-us">Why trust us</a>
              <a href="#/results">Success rate and certificates</a>
              <a href="#/partners">Partners</a>
              <a href="#/gallery">Client gallery</a>
              <a href="#/connect">Social media</a>
            </div>
            <div>
              <h3>Contact</h3>
              <p>
                C-46 BPS Tower, RDC, Raj Nagar, Ghaziabad<br />
                +91 92110 71319<br />
                tanshimmigration@gmail.com
              </p>
            </div>
          </div>
          <p style={{ marginTop: '24px', fontSize: '.9rem' }}>© 2026 Tansh Immigration. All rights reserved.</p>
        </div>
      </footer>

      <a className="wa" href="https://wa.me/919211071319" rel="noopener">
        WhatsApp us
      </a>

      {/* Lightbox modal with exact #lb id */}
      <div 
        id="lb" 
        className={lightbox.isOpen ? 'on' : ''} 
        role="dialog" 
        aria-label="Photo viewer"
        onClick={() => setLightbox(prev => ({ ...prev, isOpen: false }))}
      >
        <img 
          src={lightbox.src} 
          alt={lightbox.alt} 
          onClick={(e) => e.stopPropagation()} 
        />
      </div>
    </>
  );
}
