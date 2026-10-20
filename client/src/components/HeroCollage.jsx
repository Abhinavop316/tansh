import React from 'react';
import { Plane, Award } from 'lucide-react';

export default function HeroCollage({ onOpenGallery }) {
  return (
    <div className="collage-container" aria-label="Client departures photo collage">
      {/* Top Left photo: Mauritius group departure */}
      <img
        src="/images/a4.jpg"
        alt="Tansh Immigration clients with passports at Delhi airport before departure"
        className="collage-img collage-p1"
        loading="eager"
      />

      {/* Top Right photo: Client with passport and boarding pass */}
      <img
        src="/images/a6.jpg"
        alt="Client holding passport and boarding pass, ready to travel abroad"
        className="collage-img collage-p2"
        loading="eager"
      />

      {/* Bottom Center photo: Terminal 3 departure */}
      <img
        src="/images/a1.jpg"
        alt="Client with passport and e-ticket at Delhi airport Terminal 3"
        className="collage-img collage-p3"
        loading="eager"
      />

      {/* Signature Floating Badge */}
      <div className="collage-badge">
        <Plane size={16} />
        <span>Real departures, Delhi airport</span>
      </div>
    </div>
  );
}
