import { Link, useLocation } from 'react-router';
import { useApp } from '../context/AppContext';
import { useState } from 'react';
import AuthModal from './AuthModal';

export default function Navbar() {
  const { state, isDarkMode, toggleDarkMode } = useApp();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const navLinks = [
    { path: '/', label: '🏠 Home' },
    { path: '/projects', label: '🗂 Projects' },
    { path: '/rewards', label: '🏆 Rewards' },
    { path: '/feedback', label: '📝 Feedback' },
    { path: '/chat', label: '💬 Chat' },
    { path: '/contact', label: '� Contact' },
    { path: '/profile', label: '👤 Profile' }
  ];

  const handleAuthClick = () => {
    if (state.user) {
      window.location.href = '/profile';
    } else {
      setAuthModalOpen(true);
    }
  };

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: 'var(--nav-h)',
          background: 'var(--g-nav)',
          backdropFilter: 'blur(20px) saturate(1.6)',
          borderBottom: '1px solid var(--c-border)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 clamp(1rem, 4vw, 2.5rem)',
          gap: '1rem',
          transition: 'background 0.4s'
        }}
      >
        <Link
          to="/"
          style={{
            fontFamily: "'Fredoka One', cursive",
            fontSize: '1.7rem',
            background: 'var(--g-hero)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            flexShrink: 0
          }}
        >
          <span style={{ 
            fontSize: '1.5rem',
            WebkitTextFillColor: 'initial',
            animation: 'spin 8s linear infinite',
            display: 'inline-block'
          }}>⚙️</span>
          MakerKids
        </Link>

        <div
          className="nav-links"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.2rem',
            margin: '0 auto'
          }}
        >
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                position: 'relative',
                padding: '0.5rem 1rem',
                borderRadius: '40px',
                fontWeight: 700,
                fontSize: '0.88rem',
                color: isActive(link.path) ? '#fff' : 'var(--c-text2)',
                transition: 'color 0.2s',
                whiteSpace: 'nowrap'
              }}
              onClick={() => setMobileMenuOpen(false)}
            >
              <span style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '40px',
                background: 'var(--g-c1)',
                opacity: isActive(link.path) ? 1 : 0,
                transition: 'opacity 0.25s',
                zIndex: -1
              }} />
              {link.label}
            </Link>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.35rem 0.85rem',
              borderRadius: '40px',
              background: 'var(--g-c2)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '0.82rem',
              boxShadow: '0 4px 12px rgba(249, 115, 22, 0.35)',
              whiteSpace: 'nowrap',
              transition: 'transform 0.2s var(--spring)'
            }}
          >
            ⭐ {state.pts} pts
          </div>

          <button
            onClick={toggleDarkMode}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--c-surface)',
              border: '1.5px solid var(--c-border)',
              fontSize: '1.1rem',
              boxShadow: 'var(--sh-sm)',
              transition: 'transform 0.25s var(--spring), box-shadow 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'rotate(25deg) scale(1.12)';
              e.currentTarget.style.boxShadow = 'var(--sh-md)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = '';
              e.currentTarget.style.boxShadow = 'var(--sh-sm)';
            }}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>

          <button
            onClick={handleAuthClick}
            style={{
              padding: '0.45rem 1.2rem',
              borderRadius: '40px',
              background: 'var(--g-hero)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '0.85rem',
              boxShadow: '0 4px 14px rgba(124, 58, 237, 0.35)',
              transition: 'transform 0.2s var(--spring), box-shadow 0.2s',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(124, 58, 237, 0.45)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = '';
              e.currentTarget.style.boxShadow = '0 4px 14px rgba(124, 58, 237, 0.35)';
            }}
          >
            {state.user ? state.user.name.split(' ')[0] : 'Sign In'}
          </button>

          <button
            className="hbg"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'none',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '5px',
              width: '36px',
              height: '36px',
              background: 'var(--c-surface)',
              border: '1.5px solid var(--c-border)',
              borderRadius: '10px',
              padding: '0 8px'
            }}
          >
            <span style={{
              display: 'block',
              height: '2px',
              background: 'var(--c-purple)',
              borderRadius: '3px',
              transition: '0.3s var(--ease)',
              transform: mobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : ''
            }} />
            <span style={{
              display: 'block',
              height: '2px',
              background: 'var(--c-purple)',
              borderRadius: '3px',
              transition: '0.3s var(--ease)',
              opacity: mobileMenuOpen ? 0 : 1,
              transform: mobileMenuOpen ? 'scaleX(0)' : ''
            }} />
            <span style={{
              display: 'block',
              height: '2px',
              background: 'var(--c-purple)',
              borderRadius: '3px',
              transition: '0.3s var(--ease)',
              transform: mobileMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : ''
            }} />
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div
          className="mob-menu"
          style={{
            position: 'fixed',
            top: 'var(--nav-h)',
            left: 0,
            right: 0,
            zIndex: 999,
            background: 'var(--g-nav)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid var(--c-border)',
            padding: '1rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.3rem',
            boxShadow: 'var(--sh-md)'
          }}
        >
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.7rem 1rem',
                position: 'relative',
                borderRadius: '40px',
                fontWeight: 700,
                fontSize: '0.88rem',
                color: isActive(link.path) ? '#fff' : 'var(--c-text2)',
                transition: 'color 0.2s'
              }}
            >
              <span style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '40px',
                background: 'var(--g-c1)',
                opacity: isActive(link.path) ? 1 : 0,
                transition: 'opacity 0.25s',
                zIndex: -1
              }} />
              {link.label}
            </Link>
          ))}
        </div>
      )}

      <AuthModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} />

      <style>{`
        @media (max-width: 680px) {
          .nav-links { display: none !important; }
          .hbg { display: flex !important; }
        }
      `}</style>
    </>
  );
}
