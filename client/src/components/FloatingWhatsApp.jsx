import React from 'react';
import { MessageCircle } from 'lucide-react';
import { siteData } from '../data/siteData';

export default function FloatingWhatsApp() {
  const { whatsappUrl } = siteData.company.contact;

  return (
    <a 
      href={whatsappUrl} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="whatsapp-floating"
      aria-label="Chat with Tansh Immigration on WhatsApp"
    >
      <MessageCircle size={20} />
      <span>WhatsApp Us</span>
    </a>
  );
}
