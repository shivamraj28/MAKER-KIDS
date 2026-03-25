import { useState } from 'react';
import { Link } from 'react-router';
import { PROJECTS, Project } from '../data/projects';
import { useApp } from '../context/AppContext';

export default function Projects() {
  const { state } = useApp();
  const [filter, setFilter] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const [search, setSearch] = useState('');

  const filteredProjects = PROJECTS.filter(p => {
    const matchesFilter = filter === 'all' || p.diff === filter;
    const matchesSearch = !search || 
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.cat.toLowerCase().includes(search.toLowerCase()) ||
      p.desc.toLowerCase().includes(search.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const gradients = ['var(--g-c1)', 'var(--g-c2)', 'var(--g-c3)', 'var(--g-c4)'];

  return (
    <div style={{ padding: 'clamp(3rem, 8vw, 6rem) clamp(1rem, 5vw, 3rem)', minHeight: 'calc(100vh - var(--nav-h))' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--c-purple)', marginBottom: '0.8rem', justifyContent: 'center' }}>
            🗂 All Projects
          </div>
          <div style={{ content: '', display: 'block', width: '60px', height: '4px', background: 'var(--g-hero)', borderRadius: '4px', margin: '0.8rem auto 0' }} />
          <h2 style={{ fontFamily: "'Fredoka One', cursive", fontSize: 'clamp(1.9rem, 4vw, 3rem)', color: 'var(--c-text)', margin: '1.2rem 0 0.6rem' }}>Choose Your Challenge</h2>
          <p style={{ color: 'var(--c-text2)', fontSize: '1rem', fontWeight: 500, maxWidth: '520px', lineHeight: 1.7, margin: '0 auto' }}>
            Filter by difficulty and find the perfect project for your skill level
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2.5rem' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '220px', maxWidth: '380px' }}>
            <span style={{ position: 'absolute', left: '1.1rem', top: '50%', transform: 'translateY(-50%)', fontSize: '1rem', pointerEvents: 'none' }}>🔍</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects…"
              style={{
                width: '100%',
                padding: '0.75rem 1rem 0.75rem 3rem',
                borderRadius: '50px',
                border: '1.5px solid var(--c-border)',
                background: 'var(--c-surface)',
                color: 'var(--c-text)',
                fontFamily: 'inherit',
                fontSize: '0.9rem',
                fontWeight: 600,
                transition: 'border-color 0.2s, box-shadow 0.2s',
                boxShadow: 'var(--sh-sm)'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'var(--c-purple)';
                e.currentTarget.style.boxShadow = '0 0 0 4px rgba(124, 58, 237, 0.12)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'var(--c-border)';
                e.currentTarget.style.boxShadow = 'var(--sh-sm)';
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {[
              { id: 'all', label: '🌟 All' },
              { id: 'beginner', label: '🟢 Beginner' },
              { id: 'intermediate', label: '🟡 Intermediate' },
              { id: 'advanced', label: '🔴 Advanced' }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id as any)}
                style={{
                  padding: '0.5rem 1.1rem',
                  borderRadius: '50px',
                  border: '1.5px solid var(--c-border)',
                  background: filter === f.id ? 'var(--g-c1)' : 'var(--c-surface)',
                  color: filter === f.id ? '#fff' : 'var(--c-text2)',
                  fontWeight: 700,
                  fontSize: '0.83rem',
                  transition: 'all 0.2s var(--ease)',
                  boxShadow: filter === f.id ? '0 4px 14px rgba(124, 58, 237, 0.35)' : 'var(--sh-sm)',
                  borderColor: filter === f.id ? 'transparent' : 'var(--c-border)'
                }}
                onMouseEnter={(e) => {
                  if (filter !== f.id) {
                    e.currentTarget.style.borderColor = 'var(--c-purple)';
                    e.currentTarget.style.color = 'var(--c-purple)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (filter !== f.id) {
                    e.currentTarget.style.borderColor = 'var(--c-border)';
                    e.currentTarget.style.color = 'var(--c-text2)';
                  }
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 2rem', color: 'var(--c-text3)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.8rem' }}>🔍</div>
            <h3 style={{ fontFamily: "'Fredoka One', cursive", fontSize: '1.3rem', color: 'var(--c-text2)', marginBottom: '0.4rem' }}>No projects found</h3>
            <p>Try a different filter or search</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.4rem' }}>
            {filteredProjects.map((project, i) => {
              const isDone = state.done.includes(project.id);

              return (
                <Link
                  key={project.id}
                  to={`/projects/${project.id}`}
                  style={{
                    background: 'var(--c-surface)',
                    border: '1.5px solid var(--c-border)',
                    borderRadius: 'var(--r)',
                    overflow: 'hidden',
                    boxShadow: 'var(--sh-sm)',
                    transition: 'transform 0.3s var(--spring), box-shadow 0.3s',
                    animation: `cIn 0.4s var(--ease) ${i * 0.06}s both`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px) rotate(0.4deg)';
                    e.currentTarget.style.boxShadow = 'var(--sh-xl)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.boxShadow = 'var(--sh-sm)';
                  }}
                >
                  <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                    <div className={project.bg} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '5rem', transition: 'transform 0.5s' }}>
                      {project.em}
                    </div>
                    <span
                      style={{
                        position: 'absolute',
                        top: '0.85rem',
                        left: '0.85rem',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '20px',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        background: project.diff === 'beginner' ? 'rgba(16, 185, 129, 0.15)' : project.diff === 'intermediate' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                        color: project.diff === 'beginner' ? '#059669' : project.diff === 'intermediate' ? '#b45309' : '#b91c1c'
                      }}
                    >
                      {project.diff.charAt(0).toUpperCase() + project.diff.slice(1)}
                    </span>
                    {isDone && (
                      <span
                        style={{
                          position: 'absolute',
                          top: '0.85rem',
                          right: '0.85rem',
                          padding: '0.25rem 0.7rem',
                          borderRadius: '20px',
                          background: 'rgba(16, 185, 129, 0.9)',
                          color: '#fff',
                          fontSize: '0.72rem',
                          fontWeight: 700
                        }}
                      >
                        ✅ Done
                      </span>
                    )}
                  </div>

                  <div style={{ padding: '1.4rem' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--c-purple)', marginBottom: '0.4rem' }}>
                      {project.cat}
                    </div>
                    <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: '1.15rem', color: 'var(--c-text)', marginBottom: '0.5rem', lineHeight: 1.3 }}>
                      {project.title}
                    </div>
                    <div style={{ fontSize: '0.83rem', color: 'var(--c-text2)', lineHeight: 1.65, marginBottom: '1rem', fontWeight: 500 }}>
                      {project.desc}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span
                        style={{
                          padding: '0.28rem 0.75rem',
                          borderRadius: '20px',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          color: '#fff',
                          background: gradients[i % 4]
                        }}
                      >
                        {isDone ? '✅ Completed' : `⭐ +${project.pts} pts`}
                      </span>
                      <span style={{ fontSize: '0.78rem', color: 'var(--c-text3)', fontWeight: 600 }}>
                        ⏱ {project.time}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
