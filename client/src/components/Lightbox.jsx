import React, { useEffect } from 'react';
import { X, ZoomIn } from 'lucide-react';

export default function Lightbox({ image, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!image) return null;

  return (
    <div 
      className="lightbox-overlay" 
      onClick={onClose}
      role="dialog"
      aria-label="Enlarged client departure photo"
    >
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button 
          className="lightbox-close-btn" 
          onClick={onClose}
          aria-label="Close photo viewer"
        >
          <X size={26} />
        </button>

        <img 
          src={image.image} 
          alt={image.caption || image.title} 
          className="lightbox-img" 
        />

        <div className="lightbox-caption-box">
          <h4 style={{ color: '#fff', fontSize: '1rem', marginBottom: 2 }}>{image.title}</h4>
          <p style={{ color: '#a9bccd', fontSize: '0.85rem', margin: 0 }}>{image.caption}</p>
        </div>
      </div>
    </div>
  );
}
