import { useParams, useNavigate } from 'react-router';
import { PROJECTS } from '../data/projects';
import { useApp } from '../context/AppContext';
import { useState, useEffect } from 'react';
import { toast } from '../components/Toast';

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state, markProjectDone } = useApp();
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  const project = PROJECTS.find(p => p.id === Number(id));
  const isDone = project ? state.done.includes(project.id) : false;

  useEffect(() => {
    if (isDone) {
      setProgress(100);
    }
  }, [isDone]);

  if (!project) {
    return (
      <div style={{ padding: 'clamp(3rem, 8vw, 6rem) clamp(1rem, 5vw, 3rem)', textAlign: 'center', minHeight: 'calc(100vh - var(--nav-h))' }}>
        <div style={{ fontSize: '3rem', marginBottom: '0.8rem' }}>🔍</div>
        <h3 style={{ fontFamily: "'Fredoka One', cursive", fontSize: '1.3rem', color: 'var(--c-text2)', marginBottom: '0.4rem' }}>Project not found</h3>
        <button onClick={() => navigate('/projects')} style={{ marginTop: '1rem', padding: '0.5rem 1.1rem', borderRadius: '40px', background: 'var(--c-purple)', color: '#fff', fontWeight: 700 }}>
          Back to Projects
        </button>
      </div>
    );
  }

  const handleMarkDone = () => {
    if (isDone) return;
    markProjectDone(project.id, project);
    setProgress(100);
    toast(`🎉 +${project.pts} points earned!`);
    
    // Trigger confetti
    const colors = ['#7c3aed', '#ec4899', '#f97316', '#10b981', '#06b6d4', '#f59e0b'];
    for (let i = 0; i < 35; i++) {
      setTimeout(() => {
        const el = document.createElement('div');
        el.style.cssText = `
          position: fixed;
          left: ${Math.random() * 100}vw;
          top: 0;
          width: ${6 + Math.random() * 10}px;
          height: ${6 + Math.random() * 10}px;
          background: ${colors[Math.floor(Math.random() * colors.length)]};
          border-radius: ${Math.random() > 0.5 ? '50%' : '3px'};
          z-index: 9999;
          pointer-events: none;
          animation: cfF ${1 + Math.random() * 0.8}s ease ${Math.random() * 0.4}s forwards;
        `;
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 2500);
      }, i * 35);
    }
  };

  return (
    <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '1.8rem clamp(1rem, 4vw, 2.5rem) 5rem' }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1.1rem',
          borderRadius: '40px',
          background: 'var(--c-surface)',
          border: '1.5px solid var(--c-border)',
          fontWeight: 700,
          fontSize: '0.85rem',
          color: 'var(--c-text2)',
          transition: 'all 0.2s',
          boxShadow: 'var(--sh-sm)',
          marginBottom: '1.5rem'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--c-purple)';
          e.currentTarget.style.color = 'var(--c-purple)';
          e.currentTarget.style.transform = 'translateX(-3px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--c-border)';
          e.currentTarget.style.color = 'var(--c-text2)';
          e.currentTarget.style.transform = '';
        }}
      >
        ← Back
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '2rem' }}>
        <div>
          <div
            style={{
              borderRadius: 'var(--r)',
              overflow: 'hidden',
              aspectRatio: '16/9',
              background: '#0d0718',
              boxShadow: 'var(--sh-xl)',
              position: 'relative',
              marginBottom: '2rem'
            }}
          >
            {!videoLoaded ? (
              <div
                onClick={() => setVideoLoaded(true)}
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, #1e1035, #2e1065)',
                  color: '#fff',
                  gap: '1rem',
                  cursor: 'pointer'
                }}
              >
                <div
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.12)',
                    border: '3px solid rgba(255, 255, 255, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem',
                    transition: 'transform 0.3s var(--spring), background 0.2s'
                  }}
                >
                  ▶
                </div>
                <strong style={{ fontSize: '1rem' }}>{project.title}</strong>
                <p style={{ fontSize: '0.88rem', opacity: 0.7 }}>Click to play the tutorial video</p>
              </div>
            ) : (
              <iframe
                src={`https://www.youtube.com/embed/${project.yt}?autoplay=1`}
                style={{ width: '100%', height: '100%', border: 'none' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>

          <div
            style={{
              fontFamily: "'Fredoka One', cursive",
              fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
              color: 'var(--c-text)',
              marginBottom: '1rem',
              lineHeight: 1.2
            }}
          >
            {project.em} {project.title}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '1.8rem' }}>
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.35rem 0.9rem',
                borderRadius: '40px',
                background: 'var(--c-surface)',
                border: '1.5px solid var(--c-border)',
                fontSize: '0.78rem',
                fontWeight: 700,
                color: 'var(--c-text2)',
                boxShadow: 'var(--sh-sm)'
              }}
            >
              📂 {project.cat}
            </span>
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.35rem 0.9rem',
                borderRadius: '40px',
                fontSize: '0.78rem',
                fontWeight: 700,
                border: 'none',
                background: project.diff === 'beginner' ? 'rgba(16, 185, 129, 0.15)' : project.diff === 'intermediate' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                color: project.diff === 'beginner' ? '#059669' : project.diff === 'intermediate' ? '#b45309' : '#b91c1c'
              }}
            >
              {project.diff.charAt(0).toUpperCase() + project.diff.slice(1)}
            </span>
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.35rem 0.9rem',
                borderRadius: '40px',
                background: 'var(--c-surface)',
                border: '1.5px solid var(--c-border)',
                fontSize: '0.78rem',
                fontWeight: 700,
                color: 'var(--c-text2)',
                boxShadow: 'var(--sh-sm)'
              }}
            >
              ⏱ {project.time}
            </span>
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.35rem 0.9rem',
                borderRadius: '40px',
                background: 'var(--c-surface)',
                border: '1.5px solid var(--c-border)',
                fontSize: '0.78rem',
                fontWeight: 700,
                color: 'var(--c-text2)',
                boxShadow: 'var(--sh-sm)'
              }}
            >
              ⭐ +{project.pts} pts
            </span>
            {isDone && (
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.35rem 0.9rem',
                  borderRadius: '40px',
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1.5px solid rgba(16, 185, 129, 0.3)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: 'var(--c-green)',
                  boxShadow: 'var(--sh-sm)'
                }}
              >
                ✅ Completed!
              </span>
            )}
          </div>

          <div
            style={{
              fontFamily: "'Fredoka One', cursive",
              fontSize: '1.4rem',
              color: 'var(--c-text)',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem'
            }}
          >
            📋 Step-by-Step
          </div>

          {project.steps.map((step, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: '1.1rem',
                marginBottom: '1rem',
                animation: `cIn 0.4s var(--ease) ${i * 0.07}s both`
              }}
            >
              <div
                style={{
                  flexShrink: 0,
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'var(--g-c1)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "'Fredoka One', cursive",
                  fontSize: '1rem',
                  boxShadow: '0 4px 12px rgba(124, 58, 237, 0.35)',
                  marginTop: '0.15rem'
                }}
              >
                {i + 1}
              </div>
              <div
                style={{
                  flex: 1,
                  background: 'var(--c-surface)',
                  border: '1.5px solid var(--c-border)',
                  borderRadius: '16px',
                  padding: '1rem 1.2rem',
                  boxShadow: 'var(--sh-sm)',
                  transition: 'border-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--c-purple)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--c-border)'}
              >
                <h4 style={{ fontWeight: 700, color: 'var(--c-text)', marginBottom: '0.3rem' }}>{step.t}</h4>
                <p style={{ fontSize: '0.87rem', color: 'var(--c-text2)', lineHeight: 1.65, fontWeight: 500 }}>{step.d}</p>
              </div>
            </div>
          ))}
        </div>

        <div>
          <div
            style={{
              background: 'var(--c-surface)',
              border: '1.5px solid var(--c-border)',
              borderRadius: 'var(--r)',
              padding: '1.5rem',
              boxShadow: 'var(--sh-sm)',
              marginBottom: '1.2rem'
            }}
          >
            <div style={{ marginBottom: '1.2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 700, color: 'var(--c-text2)', marginBottom: '0.6rem' }}>
                <span>Your Progress</span>
                <span>{progress}%</span>
              </div>
              <div style={{ height: '10px', background: 'rgba(124, 58, 237, 0.1)', borderRadius: '10px', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    background: 'var(--g-hero)',
                    borderRadius: '10px',
                    transition: 'width 0.7s var(--ease)',
                    width: `${progress}%`
                  }}
                />
              </div>
            </div>
          </div>

          <div
            style={{
              background: 'var(--c-surface)',
              border: '1.5px solid var(--c-border)',
              borderRadius: 'var(--r)',
              padding: '1.5rem',
              boxShadow: 'var(--sh-sm)',
              marginBottom: '1.2rem'
            }}
          >
            <h3
              style={{
                fontFamily: "'Fredoka One', cursive",
                fontSize: '1.1rem',
                color: 'var(--c-text)',
                marginBottom: '1.1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              🛒 Materials Needed
            </h3>
            {project.mats.map((mat, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.8rem',
                  padding: '0.55rem 0',
                  borderBottom: i === project.mats.length - 1 ? 'none' : '1px solid var(--c-border)',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  color: 'var(--c-text2)'
                }}
              >
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    flexShrink: 0,
                    background: 'rgba(124, 58, 237, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.9rem'
                  }}
                >
                  ✓
                </div>
                {mat}
              </div>
            ))}
          </div>

          <div
            style={{
              background: 'var(--c-surface)',
              border: '1.5px solid var(--c-border)',
              borderRadius: 'var(--r)',
              padding: '1.5rem',
              boxShadow: 'var(--sh-sm)',
              marginBottom: '1.2rem'
            }}
          >
            <h3
              style={{
                fontFamily: "'Fredoka One', cursive",
                fontSize: '1.1rem',
                color: 'var(--c-text)',
                marginBottom: '1.1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              🏆 Project Reward
            </h3>
            <p style={{ color: 'var(--c-text2)', fontSize: '0.88rem', marginBottom: '1rem', fontWeight: 500 }}>
              Complete this project to earn <strong style={{ color: 'var(--c-purple)' }}>⭐ {project.pts} points</strong>
            </p>
            <button
              onClick={handleMarkDone}
              disabled={isDone}
              style={{
                width: '100%',
                padding: '1.05rem',
                borderRadius: '16px',
                background: isDone ? 'var(--g-c3)' : 'var(--g-hero)',
                color: '#fff',
                fontFamily: "'Fredoka One', cursive",
                fontSize: '1.1rem',
                letterSpacing: '0.02em',
                boxShadow: '0 8px 24px rgba(124, 58, 237, 0.4)',
                transition: 'transform 0.25s var(--spring), box-shadow 0.2s, opacity 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.6rem',
                opacity: isDone ? 0.65 : 1,
                cursor: isDone ? 'not-allowed' : 'pointer'
              }}
              onMouseEnter={(e) => {
                if (!isDone) {
                  e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 14px 36px rgba(124, 58, 237, 0.5)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isDone) {
                  e.currentTarget.style.transform = '';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(124, 58, 237, 0.4)';
                }
              }}
            >
              {isDone ? '✅ Project Complete!' : '🎯 Mark as Completed'}
            </button>
          </div>

          <div
            style={{
              background: 'var(--c-surface)',
              border: '1.5px solid var(--c-border)',
              borderRadius: 'var(--r)',
              padding: '1.5rem',
              boxShadow: 'var(--sh-sm)'
            }}
          >
            <h3
              style={{
                fontFamily: "'Fredoka One', cursive",
                fontSize: '1.1rem',
                color: 'var(--c-text)',
                marginBottom: '1.1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              💬 Need Help?
            </h3>
            <p style={{ color: 'var(--c-text2)', fontSize: '0.85rem', marginBottom: '0.9rem', fontWeight: 500 }}>
              Ask MakerBot AI anything about this project!
            </p>
            <button
              onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
              style={{
                width: '100%',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
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
              🤖 Chat with AI
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          ${id} > div > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
