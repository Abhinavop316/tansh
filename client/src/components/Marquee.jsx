import React from 'react';
import { Plane } from 'lucide-react';
import { siteData } from '../data/siteData';

export default function Marquee() {
  const destinations = Object.values(siteData.destinations);
  // Duplicate for seamless infinite loop
  const items = [...destinations, ...destinations, ...destinations];

  return (
    <div className="marquee-wrapper" aria-hidden="true">
      <div className="marquee-track">
        {items.map((dest, idx) => (
          <div key={`${dest.slug}-${idx}`} className="marquee-item">
            <Plane size={15} className="marquee-icon" />
            <span>{dest.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
