import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Briefcase, Truck, HardHat, HeartPulse, ShieldAlert, PhoneCall } from 'lucide-react';
import { siteData } from '../data/siteData';

export default function JobsAbroad({ onOpenConsultation }) {
  const { destinations } = siteData;

  const jobSectors = [
    {
      title: "Hospitality & Food Service",
      icon: <Briefcase size={24} />,
      desc: "Hotels, fine dining restaurants, catering, and kitchen assistance across European and Gulf markets."
    },
    {
      title: "Construction & Skilled Trades",
      icon: <HardHat size={24} />,
      desc: "Site technicians, welders, electricians, plumbers, carpenters, and certified trade specialists."
    },
    {
      title: "Warehouse & Logistics",
      icon: <Truck size={24} />,
      desc: "Order pickers, packers, forklift operators, inventory supervisors, and supply-chain logistics staff."
    },
    {
      title: "Healthcare Support",
      icon: <HeartPulse size={24} />,
      desc: "Care assistants, nursing aids, and elderly home support staff, subject to qualification requirements."
    },
    {
      title: "Manufacturing & Production",
      icon: <Globe size={24} />,
      desc: "Factory assembly line operators, packaging staff, machine operators, and quality controllers."
    },
    {
      title: "Drivers & Transport",
      icon: <Truck size={24} />,
      desc: "Heavy vehicle and commercial transport roles, subject to licensing conversion and destination rules."
    }
  ];

  return (
    <div className="jobs-abroad-page fade-in">
      <div className="container" style={{ padding: '30px 20px' }}>
        <div className="breadcrumb">
          <Link to="/">Home</Link> <span>/</span> <Link to="/services">Services</Link> <span>/</span> <span>Jobs Abroad</span>
        </div>

        <div style={{ maxWidth: '840px', marginBottom: 36 }}>
          <div className="tag tag-stamp" style={{ marginBottom: 12 }}>International Recruitment</div>
          <h1>Jobs Abroad for Indians | Overseas Job Consultants</h1>
          <p className="hero-subhead">
            We coordinate with verified employers and licensed opportunity sources across multiple international markets. Roles and vacancies change regularly based on employer demand.
          </p>
        </div>

        {/* Sectors Grid */}
        <div className="grid-3" style={{ marginBottom: 40 }}>
          {jobSectors.map((sector, i) => (
            <div key={i} className="card">
              <div className="card-header-icon" style={{ background: 'var(--teal-light)', color: 'var(--teal)' }}>
                {sector.icon}
              </div>
              <h3>{sector.title}</h3>
              <p style={{ margin: 0, fontSize: '0.92rem' }}>{sector.desc}</p>
            </div>
          ))}
        </div>

        {/* Advisory on Fake Job Offers */}
        <div className="card" style={{ background: 'var(--bg-surface)', borderLeft: '4px solid var(--stamp)', padding: '28px', marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--stamp)', marginBottom: 8 }}>
            <ShieldAlert size={22} />
            <h3 style={{ margin: 0, color: 'var(--stamp)' }}>How to Avoid Fake Job Offers Abroad</h3>
          </div>
          <p style={{ fontSize: '0.94rem' }}>
            Job availability across every market depends on employer demand, candidate eligibility, and applicable immigration rules. Please keep these facts in mind:
          </p>
          <ul className="checklist">
            <li>Always verify the employer and demand letter before paying any agency fees.</li>
            <li>Be cautious of agents promising guaranteed visas or instant job offers without an interview.</li>
            <li>Insist on a written client engagement agreement specifying service inclusions and refund terms.</li>
          </ul>
        </div>

        {/* Destination-Wise Demand Table / Cards */}
        <div style={{ marginBottom: 40 }}>
          <h2>Current Market Demand by Country</h2>
          <div className="grid-2" style={{ marginTop: 20 }}>
            {Object.values(destinations).slice(0, 6).map((dest) => (
              <div key={dest.slug} className="card">
                <h3 style={{ color: 'var(--teal)', marginBottom: 6 }}>{dest.name}</h3>
                <p style={{ fontSize: '0.9rem', marginBottom: 8 }}><b>Key Hiring Sectors:</b> {dest.sectors}</p>
                <p style={{ fontSize: '0.88rem', color: 'var(--ink-secondary)', margin: 0 }}>
                  <b>Route:</b> {dest.workRoute}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="button-group">
          <button type="button" className="btn btn-stamp btn-lg" onClick={onOpenConsultation}>
            <PhoneCall size={18} />
            <span>Submit Your CV For Evaluation</span>
          </button>
          <Link to="/work-visa" className="btn btn-outline btn-lg">Work Visa Service Details</Link>
          <Link to="/packages" className="btn btn-outline btn-lg">View Package Charges</Link>
        </div>
      </div>
    </div>
  );
}
