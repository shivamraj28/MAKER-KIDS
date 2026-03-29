import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { toast } from '../components/Toast';
// import BASE_URL from '../../config/api';
const BASE_URL = "http://localhost:3000";

export default function Feedback() {
  const { state } = useApp();
  const [formData, setFormData] = useState({
    name: state.user?.name || '',
    email: state.user?.email || '',
    category: 'general',
    rating: 5,
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast('⚠️ Please fill in all required fields');
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/api/feedback/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          rating: formData.rating,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to submit feedback');
      }

      setSubmitted(true);
      toast('🎉 Thank you for your feedback!');
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: state.user?.name || '',
          email: state.user?.email || '',
          category: 'general',
          rating: 5,
          message: ''
        });
      }, 3000);

      // Confetti
      const colors = ['#7c3aed', '#ec4899', '#f97316', '#10b981', '#06b6d4', '#f59e0b'];
      for (let i = 0; i < 25; i++) {
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
        }, i * 30);
      }
    } catch (err: any) {
      toast(err.message || 'Failed to submit feedback');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div style={{ padding: 'clamp(3rem, 8vw, 6rem) clamp(1rem, 5vw, 3rem)', minHeight: 'calc(100vh - var(--nav-h))' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--c-purple)', marginBottom: '0.8rem', justifyContent: 'center' }}>
            💭 We'd Love to Hear From You
          </div>
          <div style={{ content: '', display: 'block', width: '60px', height: '4px', background: 'var(--g-hero)', borderRadius: '4px', margin: '0.8rem auto 0' }} />
          <h2 style={{ fontFamily: "'Fredoka One', cursive", fontSize: 'clamp(1.9rem, 4vw, 3rem)', color: 'var(--c-text)', margin: '1.2rem 0 0.6rem' }}>Share Your Feedback</h2>
          <p style={{ color: 'var(--c-text2)', fontSize: '1rem', fontWeight: 500, maxWidth: '520px', lineHeight: 1.7, margin: '0 auto' }}>
            Help us make MakerKids even better! Tell us about your experience, suggest new projects, or report any issues.
          </p>
        </div>

        {submitted ? (
          <div
            style={{
              background: 'var(--c-surface)',
              border: '1.5px solid var(--c-border)',
              borderRadius: 'var(--r)',
              padding: '3rem 2rem',
              boxShadow: 'var(--sh-xl)',
              textAlign: 'center',
              animation: 'fUp 0.4s var(--ease)'
            }}
          >
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
            <h3 style={{ fontFamily: "'Fredoka One', cursive", fontSize: '1.8rem', color: 'var(--c-text)', marginBottom: '0.8rem' }}>
              Thank You!
            </h3>
            <p style={{ fontSize: '1rem', color: 'var(--c-text2)', lineHeight: 1.7, fontWeight: 500 }}>
              Your feedback has been submitted successfully. We really appreciate you taking the time to help us improve!
            </p>
            <div
              style={{
                marginTop: '2rem',
                padding: '1rem',
                background: 'var(--c-bg2)',
                borderRadius: '16px',
                border: '1.5px solid var(--c-border)'
              }}
            >
              <p style={{ fontSize: '0.88rem', color: 'var(--c-text3)', fontWeight: 600 }}>
                💡 Keep building amazing projects and earning points!
              </p>
            </div>
          </div>
        ) : (
          <div
            style={{
              background: 'var(--c-surface)',
              border: '1.5px solid var(--c-border)',
              borderRadius: 'var(--r)',
              padding: '2rem',
              boxShadow: 'var(--sh-xl)',
              animation: 'fUp 0.4s var(--ease)'
            }}
          >
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem', marginBottom: '1.2rem' }}>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      color: 'var(--c-text2)',
                      marginBottom: '0.5rem'
                    }}
                  >
                    Your Name <span style={{ color: 'var(--c-red)' }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Young Maker"
                    required
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      borderRadius: '12px',
                      border: '1.5px solid var(--c-border)',
                      background: 'var(--c-bg)',
                      color: 'var(--c-text)',
                      fontFamily: 'inherit',
                      fontSize: '0.93rem',
                      fontWeight: 600,
                      transition: 'border-color 0.2s, box-shadow 0.2s'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'var(--c-purple)';
                      e.currentTarget.style.boxShadow = '0 0 0 4px rgba(124, 58, 237, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'var(--c-border)';
                      e.currentTarget.style.boxShadow = '';
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      color: 'var(--c-text2)',
                      marginBottom: '0.5rem'
                    }}
                  >
                    Email Address <span style={{ color: 'var(--c-red)' }}>*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      borderRadius: '12px',
                      border: '1.5px solid var(--c-border)',
                      background: 'var(--c-bg)',
                      color: 'var(--c-text)',
                      fontFamily: 'inherit',
                      fontSize: '0.93rem',
                      fontWeight: 600,
                      transition: 'border-color 0.2s, box-shadow 0.2s'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'var(--c-purple)';
                      e.currentTarget.style.boxShadow = '0 0 0 4px rgba(124, 58, 237, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'var(--c-border)';
                      e.currentTarget.style.boxShadow = '';
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem', marginBottom: '1.2rem' }}>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      color: 'var(--c-text2)',
                      marginBottom: '0.5rem'
                    }}
                  >
                    Feedback Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      borderRadius: '12px',
                      border: '1.5px solid var(--c-border)',
                      background: 'var(--c-bg)',
                      color: 'var(--c-text)',
                      fontFamily: 'inherit',
                      fontSize: '0.93rem',
                      fontWeight: 600,
                      transition: 'border-color 0.2s, box-shadow 0.2s',
                      cursor: 'pointer'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'var(--c-purple)';
                      e.currentTarget.style.boxShadow = '0 0 0 4px rgba(124, 58, 237, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'var(--c-border)';
                      e.currentTarget.style.boxShadow = '';
                    }}
                  >
                    <option value="general">💬 General Feedback</option>
                    <option value="bug">🐛 Report a Bug</option>
                    <option value="feature">✨ Feature Request</option>
                    <option value="project">🎨 New Project Idea</option>
                    <option value="praise">❤️ Compliment</option>
                  </select>
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      color: 'var(--c-text2)',
                      marginBottom: '0.5rem'
                    }}
                  >
                    Rate Your Experience
                  </label>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', height: '54px' }}>
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                        style={{
                          fontSize: '2rem',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          transition: 'transform 0.2s var(--spring)',
                          filter: star <= formData.rating ? 'none' : 'grayscale(1) opacity(0.3)'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = ''}
                      >
                        ⭐
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label
                  style={{
                    display: 'block',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    color: 'var(--c-text2)',
                    marginBottom: '0.5rem'
                  }}
                >
                  Your Feedback <span style={{ color: 'var(--c-red)' }}>*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us what you think! What do you love? What could be better? Any project ideas?"
                  required
                  rows={6}
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    borderRadius: '12px',
                    border: '1.5px solid var(--c-border)',
                    background: 'var(--c-bg)',
                    color: 'var(--c-text)',
                    fontFamily: 'inherit',
                    fontSize: '0.93rem',
                    fontWeight: 600,
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                    resize: 'vertical'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'var(--c-purple)';
                    e.currentTarget.style.boxShadow = '0 0 0 4px rgba(124, 58, 237, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'var(--c-border)';
                    e.currentTarget.style.boxShadow = '';
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '1.05rem',
                  borderRadius: '16px',
                  background: 'var(--g-hero)',
                  color: '#fff',
                  fontFamily: "'Fredoka One', cursive",
                  fontSize: '1.15rem',
                  letterSpacing: '0.02em',
                  boxShadow: '0 8px 24px rgba(124, 58, 237, 0.4)',
                  transition: 'transform 0.25s var(--spring), box-shadow 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.6rem'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 14px 36px rgba(124, 58, 237, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = '';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(124, 58, 237, 0.4)';
                }}
              >
                📤 Submit Feedback
              </button>
            </form>

            <div
              style={{
                marginTop: '1.5rem',
                padding: '1rem',
                background: 'var(--c-bg2)',
                borderRadius: '16px',
                border: '1.5px solid var(--c-border)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.8rem'
              }}
            >
              <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>💡</span>
              <div>
                <h4 style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--c-text)', marginBottom: '0.3rem' }}>
                  Your Voice Matters!
                </h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--c-text2)', lineHeight: 1.6, fontWeight: 500 }}>
                  Every piece of feedback helps us create better projects and improve the experience for all young makers. Thank you for being part of our community!
                </p>
              </div>
            </div>
          </div>
        )}

        <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <div
              style={{
                background: 'var(--c-surface)',
                border: '1.5px solid var(--c-border)',
                borderRadius: '16px',
                padding: '1.2rem 1.5rem',
                boxShadow: 'var(--sh-sm)',
                transition: 'transform 0.2s var(--spring)',
                minWidth: '200px'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = ''}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📧</div>
              <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--c-text2)', marginBottom: '0.2rem' }}>Email Us</div>
              <a href="mailto:hello@makerkids.com" style={{ fontSize: '0.88rem', color: 'var(--c-purple)', fontWeight: 600 }}>
                hello@makerkids.com
              </a>
            </div>

            <div
              style={{
                background: 'var(--c-surface)',
                border: '1.5px solid var(--c-border)',
                borderRadius: '16px',
                padding: '1.2rem 1.5rem',
                boxShadow: 'var(--sh-sm)',
                transition: 'transform 0.2s var(--spring)',
                minWidth: '200px'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = ''}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🤖</div>
              <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--c-text2)', marginBottom: '0.2rem' }}>Chat with AI</div>
              <a href="/chat" style={{ fontSize: '0.88rem', color: 'var(--c-purple)', fontWeight: 600 }}>
                Ask MakerBot →
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          [style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}