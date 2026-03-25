import { Link } from 'react-router';
import { PROJECTS } from '../data/projects';
import { useApp } from '../context/AppContext';
import { useState } from 'react';
import AuthModal from '../components/AuthModal';

export default function Home() {
  const { state } = useApp();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  
  const featuredProjects = PROJECTS.slice(0, 5);
  const spans = ['s8', 's4', 's4', 's4', 's4'];
  const gradients = ['var(--g-c1)', 'var(--g-c2)', 'var(--g-c3)', 'var(--g-c4)'];

  return (
    <div>
      <section
        style={{
          minHeight: 'calc(100vh - var(--nav-h))',
          display: 'grid',
          placeItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          padding: '3rem clamp(1rem, 5vw, 4rem)'
        }}
      >
        {/* Mesh Background */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
          <div style={{ position: 'absolute', width: '70vw', height: '70vw', maxWidth: '700px', maxHeight: '700px', background: 'rgba(124, 58, 237, 0.22)', top: '-20%', left: '-15%', borderRadius: '50%', filter: 'blur(80px)', animation: 'bF 10s ease-in-out infinite' }} />
          <div style={{ position: 'absolute', width: '50vw', height: '50vw', maxWidth: '500px', maxHeight: '500px', background: 'rgba(236, 72, 153, 0.18)', bottom: '-10%', right: '-10%', borderRadius: '50%', filter: 'blur(80px)', animation: 'bF 10s ease-in-out infinite', animationDelay: '-3s' }} />
          <div style={{ position: 'absolute', width: '40vw', height: '40vw', maxWidth: '400px', background: 'rgba(6, 182, 212, 0.15)', top: '40%', left: '55%', borderRadius: '50%', filter: 'blur(80px)', animation: 'bF 10s ease-in-out infinite', animationDelay: '-6s' }} />
          <div style={{ position: 'absolute', width: '30vw', height: '30vw', maxWidth: '300px', background: 'rgba(245, 158, 11, 0.13)', top: '20%', right: '15%', borderRadius: '50%', filter: 'blur(80px)', animation: 'bF 10s ease-in-out infinite', animationDelay: '-1.5s' }} />
        </div>

        {/* Grid Background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          backgroundImage: 'linear-gradient(rgba(124, 58, 237, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(124, 58, 237, 0.06) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 0%, transparent 100%)'
        }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '1200px', width: '100%', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(124, 58, 237, 0.1)', border: '1.5px solid rgba(124, 58, 237, 0.25)', padding: '0.4rem 1rem', borderRadius: '40px', fontWeight: 700, fontSize: '0.8rem', color: 'var(--c-purple)', marginBottom: '1.5rem', animation: 'fUp 0.6s var(--ease) 0.1s both' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--c-purple)', animation: 'pls 2s ease infinite' }} />
            Free for kids aged 8–15
          </div>

          <h1 style={{ fontFamily: "'Fredoka One', cursive", fontSize: 'clamp(2.8rem, 6vw, 5.2rem)', lineHeight: 1.08, color: 'var(--c-text)', animation: 'fUp 0.6s var(--ease) 0.2s both', marginBottom: '1.2rem' }}>
            Hands-On Fun,<br />
            <span style={{ background: 'var(--g-hero)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Real Skills!</span>
          </h1>

          <p style={{ fontSize: '1.1rem', color: 'var(--c-text2)', lineHeight: 1.75, maxWidth: '560px', animation: 'fUp 0.6s var(--ease) 0.3s both', marginBottom: '2rem', fontWeight: 500, margin: '0 auto 2rem' }}>
            Discover amazing DIY projects, follow step-by-step video tutorials, earn badges, and level up as a maker. No experience needed!
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', animation: 'fUp 0.6s var(--ease) 0.4s both', justifyContent: 'center', marginBottom: '2.5rem' }}>
            <Link
              to="/projects"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '1rem 2rem',
                borderRadius: '50px',
                background: 'var(--g-hero)',
                color: '#fff',
                fontWeight: 700,
                fontSize: '1rem',
                boxShadow: '0 8px 28px rgba(124, 58, 237, 0.4)',
                transition: 'transform 0.25s var(--spring), box-shadow 0.2s',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px) scale(1.03)';
                e.currentTarget.style.boxShadow = '0 14px 40px rgba(124, 58, 237, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = '';
                e.currentTarget.style.boxShadow = '0 8px 28px rgba(124, 58, 237, 0.4)';
              }}
            >
              🚀 Explore Projects
            </Link>

            <button
              onClick={() => setAuthModalOpen(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '1rem 2rem',
                borderRadius: '50px',
                background: 'var(--c-surface)',
                border: '2px solid var(--c-border)',
                color: 'var(--c-purple)',
                fontWeight: 700,
                fontSize: '1rem',
                transition: 'transform 0.25s var(--spring), border-color 0.2s, box-shadow 0.2s',
                boxShadow: 'var(--sh-sm)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = 'var(--c-purple)';
                e.currentTarget.style.boxShadow = 'var(--sh-md)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = '';
                e.currentTarget.style.borderColor = 'var(--c-border)';
                e.currentTarget.style.boxShadow = 'var(--sh-sm)';
              }}
            >
              ✨ Join Free
            </button>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', animation: 'fUp 0.6s var(--ease) 0.5s both', flexWrap: 'wrap', justifyContent: 'center' }}>
            {[{ n: '50+', l: 'Projects' }, { n: '8', l: 'Badges' }, { n: '4', l: 'Categories' }].map((stat, i) => (
              <div
                key={i}
                style={{
                  background: 'var(--c-surface)',
                  border: '1.5px solid var(--c-border)',
                  padding: '0.8rem 1.2rem',
                  borderRadius: '16px',
                  boxShadow: 'var(--sh-sm)',
                  transition: 'transform 0.2s var(--spring)',
                  textAlign: 'center'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = ''}
              >
                <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: '1.7rem', color: 'var(--c-purple)', lineHeight: 1 }}>{stat.n}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--c-text3)', fontWeight: 600, marginTop: '0.2rem' }}>{stat.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(3rem, 8vw, 6rem) clamp(1rem, 5vw, 3rem)', position: 'relative', background: 'var(--c-bg2)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--c-purple)', marginBottom: '0.8rem', justifyContent: 'center' }}>
              ⭐ Featured This Week
            </div>
            <div style={{ content: '', display: 'block', width: '60px', height: '4px', background: 'var(--g-hero)', borderRadius: '4px', margin: '0.8rem auto 0' }} />
            <h2 style={{ fontFamily: "'Fredoka One', cursive", fontSize: 'clamp(1.9rem, 4vw, 3rem)', color: 'var(--c-text)', margin: '1.2rem 0 0.6rem' }}>Pick Your Next Project</h2>
            <p style={{ color: 'var(--c-text2)', fontSize: '1rem', fontWeight: 500, maxWidth: '520px', lineHeight: 1.7, margin: '0 auto' }}>
              Hand-picked DIY adventures for curious, creative minds
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '1.2rem' }}>
            {featuredProjects.map((project, i) => {
              const isDone = state.done.includes(project.id);
              const isBig = i === 0;

              return (
                <Link
                  key={project.id}
                  to={`/projects/${project.id}`}
                  className={`bc ${spans[i]}`}
                  style={{
                    gridColumn: `span ${spans[i] === 's8' ? 8 : 4}`,
                    background: 'var(--c-surface)',
                    border: '1.5px solid var(--c-border)',
                    borderRadius: 'var(--r)',
                    overflow: 'hidden',
                    boxShadow: 'var(--sh-sm)',
                    transition: 'transform 0.3s var(--spring), box-shadow 0.3s',
                    position: 'relative',
                    animation: `cIn 0.4s var(--ease) ${i * 0.08}s both`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px) scale(1.01)';
                    e.currentTarget.style.boxShadow = 'var(--sh-lg)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.boxShadow = 'var(--sh-sm)';
                  }}
                >
                  {isBig && (
                    <>
                      <div className={project.bg} style={{ height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '5.5rem', overflow: 'hidden', transition: 'transform 0.5s' }}>
                        {project.em}
                      </div>
                      <div style={{ padding: '1.4rem' }}>
                        <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem', opacity: 0.65, color: 'var(--c-purple)' }}>{project.cat}</div>
                        <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: '1.1rem', color: 'var(--c-text)', marginBottom: '0.4rem' }}>{project.title}</div>
                        <div style={{ fontSize: '0.82rem', color: 'var(--c-text2)', lineHeight: 1.6, fontWeight: 500 }}>{project.desc}</div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.8rem' }}>
                          <span style={{ padding: '0.25rem 0.7rem', borderRadius: '20px', fontSize: '0.72rem', fontWeight: 700, color: '#fff', background: gradients[i % 4] }}>
                            {isDone ? '✅ Done' : `⭐ +${project.pts} pts`}
                          </span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--c-text3)', fontWeight: 600 }}>⏱ {project.time}</span>
                        </div>
                      </div>
                    </>
                  )}
                  {!isBig && (
                    <div style={{ padding: '1.4rem' }}>
                      <div style={{ fontSize: '3rem', marginBottom: '0.6rem' }}>{project.em}</div>
                      <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem', opacity: 0.65, color: 'var(--c-purple)' }}>{project.cat}</div>
                      <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: '1.1rem', color: 'var(--c-text)', marginBottom: '0.4rem' }}>{project.title}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--c-text2)', lineHeight: 1.6, fontWeight: 500 }}>{project.desc.slice(0, 80)}…</div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.7rem' }}>
                        <span style={{ padding: '0.25rem 0.7rem', borderRadius: '20px', fontSize: '0.68rem', fontWeight: 700, color: '#fff', background: gradients[i % 4] }}>
                          {isDone ? '✅' : `⭐ +${project.pts}`}
                        </span>
                        <span style={{ fontSize: '0.72rem', color: 'var(--c-text3)', fontWeight: 600 }}>⏱ {project.time}</span>
                      </div>
                    </div>
                  )}
                  <span
                    style={{
                      position: 'absolute',
                      top: '0.9rem',
                      right: '0.9rem',
                      padding: '0.25rem 0.7rem',
                      borderRadius: '20px',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      background: project.diff === 'beginner' ? 'rgba(16, 185, 129, 0.15)' : project.diff === 'intermediate' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                      color: project.diff === 'beginner' ? '#059669' : project.diff === 'intermediate' ? '#b45309' : '#b91c1c'
                    }}
                  >
                    {project.diff.charAt(0).toUpperCase() + project.diff.slice(1)}
                  </span>
                </Link>
              );
            })}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link
              to="/projects"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '1rem 2rem',
                borderRadius: '50px',
                background: 'var(--g-hero)',
                color: '#fff',
                fontWeight: 700,
                fontSize: '1rem',
                boxShadow: '0 8px 28px rgba(124, 58, 237, 0.4)',
                transition: 'transform 0.25s var(--spring), box-shadow 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px) scale(1.03)';
                e.currentTarget.style.boxShadow = '0 14px 40px rgba(124, 58, 237, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = '';
                e.currentTarget.style.boxShadow = '0 8px 28px rgba(124, 58, 237, 0.4)';
              }}
            >
              View All {PROJECTS.length} Projects →
            </Link>
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(3rem, 8vw, 6rem) clamp(1rem, 5vw, 3rem)', position: 'relative' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--c-purple)', marginBottom: '0.8rem', justifyContent: 'center' }}>
              🗺 How It Works
            </div>
            <div style={{ content: '', display: 'block', width: '60px', height: '4px', background: 'var(--g-hero)', borderRadius: '4px', margin: '0.8rem auto 0' }} />
            <h2 style={{ fontFamily: "'Fredoka One', cursive", fontSize: 'clamp(1.9rem, 4vw, 3rem)', color: 'var(--c-text)', margin: '1.2rem 0 0.6rem' }}>Start Your Maker Journey</h2>
            <p style={{ color: 'var(--c-text2)', fontSize: '1rem', fontWeight: 500, maxWidth: '520px', lineHeight: 1.7, margin: '0 auto' }}>
              Four simple steps from curious beginner to DIY champion
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            {[
              { n: 'Step 01', ico: '🎯', title: 'Pick a Project', desc: 'Browse by difficulty — Beginner, Intermediate, or Advanced. Find the perfect challenge.', color: '#7c3aed' },
              { n: 'Step 02', ico: '🎬', title: 'Watch & Follow', desc: 'Each project has a video tutorial and clear step-by-step written instructions.', color: '#ec4899' },
              { n: 'Step 03', ico: '🛠️', title: 'Build It!', desc: 'Gather your materials and create something amazing. Ask MakerBot AI for help anytime.', color: '#f97316' },
              { n: 'Step 04', ico: '🏆', title: 'Earn Rewards', desc: 'Mark projects complete to earn points, unlock badges, and become a DIY Champion!', color: '#10b981' }
            ].map((step, i) => (
              <div
                key={i}
                style={{
                  position: 'relative',
                  background: 'var(--c-surface)',
                  border: '1.5px solid var(--c-border)',
                  borderRadius: 'var(--r)',
                  padding: '2rem 1.5rem',
                  textAlign: 'center',
                  boxShadow: 'var(--sh-sm)',
                  transition: 'transform 0.3s var(--spring), box-shadow 0.3s',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = 'var(--sh-lg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = '';
                  e.currentTarget.style.boxShadow = 'var(--sh-sm)';
                }}
              >
                <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '100px', height: '100px', borderRadius: '50%', background: step.color, opacity: 0.08 }} />
                <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: step.color, marginBottom: '0.5rem', opacity: 0.7 }}>{step.n}</div>
                <div style={{ fontSize: '2.8rem', marginBottom: '1rem' }}>{step.ico}</div>
                <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--c-text)' }}>{step.title}</div>
                <div style={{ fontSize: '0.87rem', color: 'var(--c-text2)', lineHeight: 1.7, fontWeight: 500 }}>{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AuthModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} />

      <style>{`
        @media (max-width: 900px) {
          .bc { grid-column: span 12 !important; }
        }
        @media (min-width: 600px) and (max-width: 900px) {
          .bc.s6, .bc.s4, .bc.s3 { grid-column: span 6 !important; }
        }
      `}</style>
    </div>
  );
}
