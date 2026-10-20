import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Search, ArrowRight, Briefcase, GraduationCap, Clock } from 'lucide-react';
import { getBlogPosts } from '../data/siteData';

export default function Blog({ onOpenConsultation }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const posts = getBlogPosts();

  const filteredPosts = posts.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.destination.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;
    if (typeFilter === 'all') return true;
    if (typeFilter === 'work') return p.type === 'work';
    if (typeFilter === 'study') return p.type === 'study';
    return true;
  });

  return (
    <div className="blog-page fade-in">
      <div className="container" style={{ padding: '30px 20px' }}>
        <div className="breadcrumb">
          <Link to="/">Home</Link> <span>/</span> <span>Visa Blog</span>
        </div>

        <div style={{ maxWidth: '840px', marginBottom: 32 }}>
          <div className="tag tag-amber" style={{ marginBottom: 12 }}>Knowledge Base</div>
          <h1>Visa &amp; Study Guides for Every Destination</h1>
          <p className="hero-subhead">
            Practical, in-depth guides to work permits, study visas, documentation checklists, and interview procedures across Europe, Gulf, Canada, UK, Australia, and New Zealand.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <button 
              className={`btn btn-sm ${typeFilter === 'all' ? 'btn-teal' : 'btn-outline'}`}
              onClick={() => setTypeFilter('all')}
            >
              All Guides ({posts.length})
            </button>
            <button 
              className={`btn btn-sm ${typeFilter === 'work' ? 'btn-teal' : 'btn-outline'}`}
              onClick={() => setTypeFilter('work')}
            >
              Work Visa Guides
            </button>
            <button 
              className={`btn btn-sm ${typeFilter === 'study' ? 'btn-teal' : 'btn-outline'}`}
              onClick={() => setTypeFilter('study')}
            >
              Study Abroad Guides
            </button>
          </div>

          <div style={{ position: 'relative', width: '280px' }}>
            <Search size={16} style={{ position: 'absolute', left: 12, top: 12, color: 'var(--ink-muted)' }} />
            <input 
              type="text" 
              className="form-input" 
              style={{ paddingLeft: '36px' }}
              placeholder="Search guides, country or trade..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid-3" style={{ marginBottom: 48 }}>
          {filteredPosts.map((post) => (
            <Link to={`/blog/${post.id}`} key={post.id} className="card card-interactive">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span className={`tag ${post.type === 'work' ? 'tag-stamp' : 'tag-amber'}`}>
                  {post.category}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--ink-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Clock size={12} />
                  <span>{post.readingTime}</span>
                </span>
              </div>

              <h3 style={{ fontSize: '1.2rem', marginBottom: 10, lineHeight: 1.3 }}>
                {post.title}
              </h3>

              <p style={{ fontSize: '0.9rem', marginBottom: 16 }}>
                {post.excerpt}
              </p>

              <div style={{ marginTop: 'auto', paddingTop: 14, borderTop: '1px solid var(--line-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.84rem', color: 'var(--ink-muted)' }}>{post.destination}</span>
                <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--teal)', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span>Read Guide</span>
                  <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="card" style={{ background: 'var(--bg-surface)', padding: '36px', textAlign: 'center' }}>
          <h2>Have Specific Questions About Your File?</h2>
          <p style={{ maxWidth: '640px', margin: '0 auto 24px' }}>
            Rules and policies evolve rapidly. Book a consultation at our Raj Nagar office to confirm current quota requirements.
          </p>
          <div className="button-group" style={{ justifyContent: 'center' }}>
            <button type="button" className="btn btn-stamp btn-lg" onClick={onOpenConsultation}>
              Book Free Assessment
            </button>
            <Link to="/contact" className="btn btn-outline btn-lg">Contact Us</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
