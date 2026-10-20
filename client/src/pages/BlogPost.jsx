import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Clock, User, Calendar, CheckCircle2, AlertTriangle, ArrowRight, PhoneCall, ShieldAlert } from 'lucide-react';
import { getBlogPosts, siteData } from '../data/siteData';

export default function BlogPost({ onOpenConsultation }) {
  const { id } = useParams();
  const posts = getBlogPosts();
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const { content } = post;
  const isWork = post.type === 'work';

  return (
    <div className="blog-post-page fade-in">
      <div className="container" style={{ padding: '30px 20px' }}>
        <div className="breadcrumb">
          <Link to="/">Home</Link> <span>/</span> <Link to="/blog">Blog</Link> <span>/</span> <span>{post.destination}</span>
        </div>

        <div style={{ maxWidth: '860px', marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <span className={`tag ${isWork ? 'tag-stamp' : 'tag-amber'}`}>
              {post.category}
            </span>
            <span className="tag">
              {post.destination}
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.2, marginBottom: 16 }}>
            {post.title}
          </h1>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18, color: 'var(--ink-muted)', fontSize: '0.88rem', paddingBottom: 20, borderBottom: '1px solid var(--line)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <User size={15} />
              <span>{post.author}</span>
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Calendar size={15} />
              <span>Published {post.publishedDate}</span>
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Clock size={15} />
              <span>{post.readingTime}</span>
            </span>
          </div>
        </div>

        {/* Article Body */}
        <div style={{ maxWidth: '860px' }}>
          {/* Section: Overview */}
          <div className="card" style={{ padding: '32px', marginBottom: 36 }}>
            <h2>Overview &amp; Market Dynamics</h2>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--ink)' }}>
              {content.overview}
            </p>
          </div>

          {/* Section: Who Can Apply */}
          <div className="card" style={{ padding: '32px', marginBottom: 36 }}>
            <h2>Who Can Apply (Eligibility Criteria)</h2>
            <p>To qualify for this pathway, candidates generally need to satisfy:</p>
            <ul className="checklist">
              {content.eligibility.map((item, i) => (
                <li key={i}><b>{item}</b></li>
              ))}
            </ul>
          </div>

          {/* Section: Document Checklist */}
          <div className="card" style={{ padding: '32px', marginBottom: 36, background: 'var(--bg-surface)' }}>
            <h2>Complete Documents Checklist</h2>
            <p>Ensure every document is prepared in original and verified copies:</p>
            <ul className="checklist">
              {content.documents.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Section: Step by Step */}
          <div className="card" style={{ padding: '32px', marginBottom: 36 }}>
            <h2>Step-by-Step Application Roadmap</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 16 }}>
              {content.processSteps.map((step, idx) => (
                <div key={idx} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div style={{ 
                    width: 28, 
                    height: 28, 
                    borderRadius: '50%', 
                    background: 'var(--teal)', 
                    color: '#fff', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    flexShrink: 0,
                    marginTop: 2
                  }}>
                    {idx + 1}
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 4px', fontSize: '1.05rem' }}>Stage {idx + 1}</h4>
                    <p style={{ margin: 0, fontSize: '0.94rem' }}>{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Common Mistakes */}
          <div className="card" style={{ padding: '32px', marginBottom: 36, borderLeft: '4px solid var(--stamp)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--stamp)', marginBottom: 10 }}>
              <ShieldAlert size={24} />
              <h2 style={{ margin: 0, color: 'var(--stamp)' }}>Common Mistakes to Avoid</h2>
            </div>
            <p>Errors that commonly cause processing delays or visa refusals:</p>
            <ul className="checklist">
              {content.commonMistakes.map((item, i) => (
                <li key={i} style={{ color: 'var(--ink)' }}>{item}</li>
              ))}
            </ul>
          </div>

          {/* FAQs for this post */}
          <div style={{ marginBottom: 40 }}>
            <h2>Frequently Asked Questions</h2>
            <details className="faq-item">
              <summary className="faq-question">
                {isWork 
                  ? `Do I need a verified job offer for a ${post.destination} work visa?` 
                  : `Do I need an unconditional admission offer for a ${post.destination} student visa?`}
              </summary>
              <div className="faq-answer">
                {isWork
                  ? `Most work visa categories require an employer sponsorship or approved work permit, with exceptions for job-seeker routes. We confirm current availability during your initial profile consultation.`
                  : `Yes, student visa files require an official CAS, I-20, or Letter of Acceptance from a designated institution before submission to the embassy.`}
              </div>
            </details>

            <details className="faq-item">
              <summary className="faq-question">
                How long does the {post.destination} {isWork ? 'work' : 'student'} visa process take?
              </summary>
              <div className="faq-answer">
                Timelines depend on seasonal embassy workloads and employer verification. Gulf employment visas average 30–60 days, while European work permits take 3–5 months. We share a realistic schedule for your specific profile.
              </div>
            </details>

            <details className="faq-item">
              <summary className="faq-question">
                Can Tansh Immigration guarantee visa approval?
              </summary>
              <div className="faq-answer">
                No consultancy can lawfully guarantee visa approvals. Visa issuance is the sole prerogative of the relevant immigration department. What we provide is professional evaluation, genuine documentation, employer coordination, and error-free filing.
              </div>
            </details>
          </div>

          {/* Bottom Callout */}
          <div className="card" style={{ background: 'var(--bg-surface)', padding: '36px', textAlign: 'center', marginBottom: 40 }}>
            <h2>Get Help from Visa Consultants in Ghaziabad</h2>
            <p style={{ maxWidth: '640px', margin: '0 auto 20px' }}>
              Planning to work or study in {post.destination}? Book a free profile assessment at our Raj Nagar office or by phone.
            </p>
            <div className="button-group" style={{ justifyContent: 'center' }}>
              <button type="button" className="btn btn-stamp btn-lg" onClick={onOpenConsultation}>
                <PhoneCall size={18} />
                <span>Get Free Profile Assessment</span>
              </button>
              <Link to={`/country/${post.slug}`} className="btn btn-outline btn-lg">
                View {post.destination} Country Page
              </Link>
              <Link to={isWork ? '/work-visa' : '/study-visa'} className="btn btn-outline btn-lg">
                {isWork ? 'Work Visa Service' : 'Study Visa Service'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
