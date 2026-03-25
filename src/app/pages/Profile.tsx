import { useState } from 'react';
import { useApp } from '../context/AppContext';
import AuthModal from '../components/AuthModal';

export default function Profile() {
  const { state, isDarkMode, toggleDarkMode } = useApp();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [soundEffects, setSoundEffects] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);

  const earnedBadges = state.badges.filter(b => b.earned).length;

  return (
    <div style={{ padding: '2rem clamp(1rem, 4vw, 2rem) 5rem', minHeight: 'calc(100vh - var(--nav-h))' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div
          style={{
            borderRadius: 'var(--r)',
            overflow: 'hidden',
            boxShadow: 'var(--sh-xl)',
            marginBottom: '1.5rem'
          }}
        >
          <div
            style={{
              background: 'var(--g-hero)',
              padding: '2.5rem 2rem 4rem',
              textAlign: 'center',
              color: '#fff',
              position: 'relative'
            }}
          >
            <div style={{ position: 'absolute', width: '180px', height: '180px', top: '-50px', left: '-50px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.07)' }} />
            <div style={{ position: 'absolute', width: '220px', height: '220px', bottom: '-80px', right: '-30px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.07)' }} />
            
            <div
              style={{
                width: '88px',
                height: '88px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.2)',
                border: '4px solid rgba(255, 255, 255, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2.5rem',
                margin: '0 auto 0.8rem',
                position: 'relative',
                zIndex: 1
              }}
            >
              {state.user ? '👤' : '🧒'}
            </div>
            <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: '1.7rem', position: 'relative', zIndex: 1 }}>
              {state.user ? state.user.name : 'Young Maker'}
            </div>
            <div style={{ fontSize: '0.85rem', opacity: 0.8, marginTop: '0.2rem', position: 'relative', zIndex: 1 }}>
              {state.user ? state.user.email : 'Sign in to save your progress'}
            </div>
          </div>

          <div
            style={{
              background: 'var(--c-surface)',
              padding: '1.2rem 2rem',
              display: 'flex',
              justifyContent: 'space-around',
              borderTop: '1px solid var(--c-border)'
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: '1.7rem', color: 'var(--c-purple)', lineHeight: 1 }}>
                {state.done.length}
              </div>
              <div style={{ fontSize: '0.73rem', color: 'var(--c-text3)', fontWeight: 600, marginTop: '0.2rem' }}>
                Projects Done
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: '1.7rem', color: 'var(--c-purple)', lineHeight: 1 }}>
                {state.pts}
              </div>
              <div style={{ fontSize: '0.73rem', color: 'var(--c-text3)', fontWeight: 600, marginTop: '0.2rem' }}>
                Points
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: '1.7rem', color: 'var(--c-purple)', lineHeight: 1 }}>
                {earnedBadges}
              </div>
              <div style={{ fontSize: '0.73rem', color: 'var(--c-text3)', fontWeight: 600, marginTop: '0.2rem' }}>
                Badges
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            background: 'var(--c-surface)',
            border: '1.5px solid var(--c-border)',
            borderRadius: 'var(--r)',
            padding: '1.6rem',
            boxShadow: 'var(--sh-sm)',
            marginBottom: '1.2rem'
          }}
        >
          <h3 style={{ fontFamily: "'Fredoka One', cursive", fontSize: '1.1rem', color: 'var(--c-text)', marginBottom: '1.2rem' }}>
            ⚙️ Preferences
          </h3>
          
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.75rem 0',
              borderBottom: '1px solid var(--c-border)'
            }}
          >
            <label style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--c-text2)' }}>Dark Mode</label>
            <button
              onClick={toggleDarkMode}
              style={{
                position: 'relative',
                width: '46px',
                height: '26px',
                background: isDarkMode ? 'var(--c-purple)' : 'var(--c-border)',
                borderRadius: '13px',
                transition: 'background 0.25s var(--ease)'
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  left: isDarkMode ? '24px' : '4px',
                  top: '4px',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  background: '#fff',
                  boxShadow: '0 1px 4px rgba(0, 0, 0, 0.2)',
                  transition: 'left 0.25s var(--spring)'
                }}
              />
            </button>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.75rem 0',
              borderBottom: '1px solid var(--c-border)'
            }}
          >
            <label style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--c-text2)' }}>Sound Effects</label>
            <button
              onClick={() => setSoundEffects(!soundEffects)}
              style={{
                position: 'relative',
                width: '46px',
                height: '26px',
                background: soundEffects ? 'var(--c-purple)' : 'var(--c-border)',
                borderRadius: '13px',
                transition: 'background 0.25s var(--ease)'
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  left: soundEffects ? '24px' : '4px',
                  top: '4px',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  background: '#fff',
                  boxShadow: '0 1px 4px rgba(0, 0, 0, 0.2)',
                  transition: 'left 0.25s var(--spring)'
                }}
              />
            </button>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.75rem 0'
            }}
          >
            <label style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--c-text2)' }}>Email Notifications</label>
            <button
              onClick={() => setEmailNotifications(!emailNotifications)}
              style={{
                position: 'relative',
                width: '46px',
                height: '26px',
                background: emailNotifications ? 'var(--c-purple)' : 'var(--c-border)',
                borderRadius: '13px',
                transition: 'background 0.25s var(--ease)'
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  left: emailNotifications ? '24px' : '4px',
                  top: '4px',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  background: '#fff',
                  boxShadow: '0 1px 4px rgba(0, 0, 0, 0.2)',
                  transition: 'left 0.25s var(--spring)'
                }}
              />
            </button>
          </div>
        </div>

        <div
          style={{
            background: 'var(--c-surface)',
            border: '1.5px solid var(--c-border)',
            borderRadius: 'var(--r)',
            padding: '1.6rem',
            boxShadow: 'var(--sh-sm)'
          }}
        >
          <h3 style={{ fontFamily: "'Fredoka One', cursive", fontSize: '1.1rem', color: 'var(--c-text)', marginBottom: '1.2rem' }}>
            🔑 Account
          </h3>
          <button
            onClick={() => setAuthModalOpen(true)}
            style={{
              width: '100%',
              padding: '1rem 2rem',
              borderRadius: '50px',
              background: 'var(--g-hero)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '1rem',
              boxShadow: '0 8px 28px rgba(124, 58, 237, 0.4)',
              transition: 'transform 0.25s var(--spring), box-shadow 0.2s',
              marginBottom: '0.8rem',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.6rem'
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
            {state.user ? 'Update Account' : 'Sign In / Create Account'}
          </button>
          <p style={{ fontSize: '0.85rem', color: 'var(--c-text3)', fontWeight: 500 }}>
            Sign in to save progress across devices and unlock exclusive badges.
          </p>
        </div>
      </div>

      <AuthModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  );
}
