import React from 'react';
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
            <img
              src={`https://flagcdn.com/w20/${dest.flag}.png`}
              width="20"
              height="15"
              alt={dest.name}
              className="marquee-flag"
              loading="lazy"
            />
            <span>{dest.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
