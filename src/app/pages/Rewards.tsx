import { useApp } from '../context/AppContext';
import { PROJECTS } from '../data/projects';
import { toast } from '../components/Toast';

export default function Rewards() {
  const { state, claimReward } = useApp();

  const level = Math.floor(state.pts / 100) + 1;
  const levelProgress = state.pts % 100;
  const levelNames = ['Curious Beginner', 'Apprentice Maker', 'Junior Builder', 'Creative Inventor', 'Expert Maker', 'DIY Master', 'Champion'];
  const levelName = levelNames[Math.min(level - 1, 6)];

  const earnedBadges = state.badges.filter(b => b.earned);
  const completedProjects = state.done.map(id => PROJECTS.find(p => p.id === id)).filter(Boolean);

  const handleClaim = () => {
    if (!state.claimable) return;
    claimReward();
    toast('🎁 +25 bonus points claimed!');

    // Confetti
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
    <div style={{ padding: 'clamp(3rem, 8vw, 6rem) clamp(1rem, 5vw, 3rem)', minHeight: 'calc(100vh - var(--nav-h))' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--c-purple)', marginBottom: '0.8rem', justifyContent: 'center' }}>
            🏆 Rewards
          </div>
          <div style={{ content: '', display: 'block', width: '60px', height: '4px', background: 'var(--g-hero)', borderRadius: '4px', margin: '0.8rem auto 0' }} />
          <h2 style={{ fontFamily: "'Fredoka One', cursive", fontSize: 'clamp(1.9rem, 4vw, 3rem)', color: 'var(--c-text)', margin: '1.2rem 0 0.6rem' }}>Your Achievement Hub</h2>
          <p style={{ color: 'var(--c-text2)', fontSize: '1rem', fontWeight: 500, maxWidth: '520px', lineHeight: 1.7, margin: '0 auto' }}>
            Every project completed brings you closer to becoming a DIY Champion
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: '2rem' }}>
          <div>
            <div
              style={{
                background: 'var(--g-hero)',
                borderRadius: 'var(--r)',
                padding: '2.5rem 2rem',
                textAlign: 'center',
                color: '#fff',
                boxShadow: '0 16px 48px rgba(124, 58, 237, 0.4)',
                position: 'relative',
                overflow: 'hidden',
                marginBottom: '1.5rem'
              }}
            >
              <div style={{ position: 'absolute', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.08)', top: '-60px', right: '-60px' }} />
              <div style={{ position: 'absolute', width: '140px', height: '140px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.06)', bottom: '-50px', left: '-30px' }} />
              <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: '4rem', lineHeight: 1, position: 'relative', zIndex: 1 }}>{state.pts}</div>
              <div style={{ fontSize: '0.85rem', opacity: 0.8, fontWeight: 600, position: 'relative', zIndex: 1, marginTop: '0.3rem' }}>⭐ Total Points Earned</div>
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
              <div style={{ marginBottom: '1.2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 700, color: 'var(--c-text2)', marginBottom: '0.6rem' }}>
                  <span>Level Progress</span>
                  <span>Level {level} — {levelName}</span>
                </div>
                <div style={{ height: '10px', background: 'rgba(124, 58, 237, 0.1)', borderRadius: '10px', overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      background: 'var(--g-hero)',
                      borderRadius: '10px',
                      transition: 'width 0.7s var(--ease)',
                      width: `${levelProgress}%`
                    }}
                  />
                </div>
              </div>

              <h3 style={{ fontFamily: "'Fredoka One', cursive", fontSize: '1.05rem', color: 'var(--c-text)', marginBottom: '0.9rem' }}>🎖 Your Badges</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', marginBottom: '1.5rem' }}>
                {state.badges.map(badge => (
                  <div
                    key={badge.id}
                    style={{
                      background: badge.earned ? 'rgba(245, 158, 11, 0.06)' : 'var(--c-bg2)',
                      border: badge.earned ? '1.5px solid rgba(245, 158, 11, 0.5)' : '1.5px solid var(--c-border)',
                      borderRadius: '16px',
                      padding: '0.9rem',
                      textAlign: 'center',
                      transition: 'all 0.25s var(--spring)',
                      position: 'relative',
                      overflow: 'hidden',
                      boxShadow: badge.earned ? '0 0 24px rgba(245, 158, 11, 0.15)' : 'none'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = ''}
                  >
                    {badge.earned && (
                      <span style={{ position: 'absolute', top: '0.4rem', right: '0.6rem', fontSize: '0.7rem', fontWeight: 700, color: 'var(--c-yellow)' }}>✓</span>
                    )}
                    <div style={{ fontSize: '2rem', marginBottom: '0.4rem', filter: badge.earned ? 'none' : 'grayscale(1) opacity(0.35)' }}>{badge.em}</div>
                    <div style={{ fontSize: '0.72rem', fontWeight: 700, color: badge.earned ? 'var(--c-yellow)' : 'var(--c-text2)' }}>
                      {badge.earned ? badge.name : '🔒 Locked'}
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={handleClaim}
                disabled={!state.claimable}
                style={{
                  width: '100%',
                  padding: '0.9rem',
                  borderRadius: '14px',
                  background: 'var(--g-c2)',
                  color: '#fff',
                  fontFamily: "'Fredoka One', cursive",
                  fontSize: '1.1rem',
                  boxShadow: '0 6px 20px rgba(249, 115, 22, 0.4)',
                  transition: 'transform 0.25s var(--spring), box-shadow 0.2s, opacity 0.2s',
                  opacity: state.claimable ? 1 : 0.4,
                  cursor: state.claimable ? 'pointer' : 'not-allowed'
                }}
                onMouseEnter={(e) => {
                  if (state.claimable) {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(249, 115, 22, 0.5)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (state.claimable) {
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(249, 115, 22, 0.4)';
                  }
                }}
              >
                {state.claimable ? '🎁 Claim Bonus Reward' : '🎁 Complete projects to unlock'}
              </button>
            </div>
          </div>

          <div>
            <div
              style={{
                background: 'var(--c-surface)',
                border: '1.5px solid var(--c-border)',
                borderRadius: 'var(--r)',
                padding: '1.8rem',
                boxShadow: 'var(--sh-sm)',
                marginBottom: '1.4rem'
              }}
            >
              <h3 style={{ fontFamily: "'Fredoka One', cursive", fontSize: '1.15rem', color: 'var(--c-text)', marginBottom: '1.2rem' }}>✅ Completed Projects</h3>
              {completedProjects.length > 0 ? (
                completedProjects.map(project => (
                  <div
                    key={project!.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.8rem',
                      padding: '0.6rem 0.9rem',
                      borderRadius: '10px',
                      background: 'rgba(16, 185, 129, 0.07)',
                      border: '1px solid rgba(16, 185, 129, 0.2)',
                      marginBottom: '0.6rem',
                      fontSize: '0.87rem',
                      fontWeight: 700,
                      color: 'var(--c-text)',
                      transition: 'transform 0.2s var(--spring)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(4px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = ''}
                  >
                    <span style={{ color: 'var(--c-green)', fontSize: '1.1rem' }}>✅</span>
                    {project!.em} {project!.title}
                    <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: 'var(--c-purple)', fontWeight: 700 }}>+{project!.pts}pts</span>
                  </div>
                ))
              ) : (
                <div style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--c-text3)' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '0.8rem' }}>🛠️</div>
                  <p>Complete your first project!</p>
                </div>
              )}
            </div>

            <div
              style={{
                background: 'var(--c-surface)',
                border: '1.5px solid var(--c-border)',
                borderRadius: 'var(--r)',
                padding: '1.8rem',
                boxShadow: 'var(--sh-sm)'
              }}
            >
              <h3 style={{ fontFamily: "'Fredoka One', cursive", fontSize: '1.15rem', color: 'var(--c-text)', marginBottom: '1.2rem' }}>📊 Achievements Unlocked</h3>
              {earnedBadges.length > 0 ? (
                earnedBadges.map(badge => (
                  <div
                    key={badge.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '0.85rem 1rem',
                      borderRadius: '12px',
                      background: 'var(--c-bg)',
                      border: '1px solid var(--c-border)',
                      marginBottom: '0.7rem',
                      transition: 'transform 0.2s var(--spring)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(5px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = ''}
                  >
                    <span style={{ fontSize: '1.8rem' }}>{badge.em}</span>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--c-text)' }}>{badge.name}</h4>
                      <p style={{ fontSize: '0.75rem', color: 'var(--c-text3)', fontWeight: 500 }}>Badge unlocked!</p>
                    </div>
                    <span
                      style={{
                        marginLeft: 'auto',
                        background: 'var(--g-c1)',
                        color: '#fff',
                        padding: '0.25rem 0.7rem',
                        borderRadius: '20px',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        flexShrink: 0
                      }}
                    >
                      Earned ✓
                    </span>
                  </div>
                ))
              ) : (
                <div style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--c-text3)' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '0.8rem' }}>🏅</div>
                  <p>Unlock badges by completing projects!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          [style*="grid-template-columns: 360px 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
