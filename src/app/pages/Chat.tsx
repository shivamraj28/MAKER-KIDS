import { useState, useRef, useEffect } from 'react';
import { BOT_RESPONSES } from '../data/projects';

interface Message {
  text: string;
  isUser: boolean;
}

const QUICK_REPLIES = [
  '🔧 Beginner projects',
  '📦 What materials do I need?',
  '🏅 How to earn badges',
  '🆘 I need help!'
];

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hi, future maker! 👋 I'm MakerBot AI. Ask me about any project, material list, or how to earn badges!", isUser: false }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [typing, setTyping] = useState(false);
  const [quickReplies, setQuickReplies] = useState(QUICK_REPLIES);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const respond = (userText: string) => {
    const lo = userText.toLowerCase();
    let response = BOT_RESPONSES.default[0];
    
    for (const [key, value] of Object.entries(BOT_RESPONSES)) {
      if (lo.includes(key)) {
        response = value[0];
        break;
      }
    }
    
    setTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { text: response, isUser: false }]);
      setTyping(false);
    }, 700);
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;
    setMessages(prev => [...prev, { text: inputValue, isUser: true }]);
    setQuickReplies([]);
    respond(inputValue);
    setInputValue('');
  };

  const handleQuickReply = (text: string) => {
    setMessages(prev => [...prev, { text, isUser: true }]);
    setQuickReplies([]);
    respond(text);
  };

  return (
    <div style={{ padding: 'clamp(3rem, 8vw, 6rem) clamp(1rem, 5vw, 3rem)', minHeight: 'calc(100vh - var(--nav-h))' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--c-purple)', marginBottom: '0.8rem', justifyContent: 'center' }}>
            🤖 AI Assistant
          </div>
          <div style={{ content: '', display: 'block', width: '60px', height: '4px', background: 'var(--g-hero)', borderRadius: '4px', margin: '0.8rem auto 0' }} />
          <h2 style={{ fontFamily: "'Fredoka One', cursive", fontSize: 'clamp(1.9rem, 4vw, 3rem)', color: 'var(--c-text)', margin: '1.2rem 0 0.6rem' }}>MakerBot Chat</h2>
          <p style={{ color: 'var(--c-text2)', fontSize: '1rem', fontWeight: 500, maxWidth: '520px', lineHeight: 1.7, margin: '0 auto' }}>
            Ask anything about DIY projects, materials, or how to earn rewards!
          </p>
        </div>

        <div
          style={{
            background: 'var(--c-surface)',
            border: '1.5px solid var(--c-border)',
            borderRadius: 'var(--r)',
            overflow: 'hidden',
            boxShadow: 'var(--sh-xl)'
          }}
        >
          <div
            style={{
              background: 'var(--g-hero)',
              padding: '1.3rem 1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              color: '#fff'
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.2)',
                border: '3px solid rgba(255, 255, 255, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                flexShrink: 0
              }}
            >
              🤖
            </div>
            <div>
              <h4 style={{ fontWeight: 700, fontSize: '1rem' }}>MakerBot AI</h4>
              <p style={{ fontSize: '0.75rem', opacity: 0.8 }}>Your DIY project assistant</p>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', opacity: 0.85 }}>
              <span
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  background: '#4ade80',
                  animation: 'pls 2s ease infinite'
                }}
              />
              Online
            </div>
          </div>

          <div
            style={{
              height: '420px',
              overflowY: 'auto',
              padding: '1.4rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.9rem'
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: '0.55rem',
                  maxWidth: '90%',
                  alignSelf: msg.isUser ? 'flex-end' : 'flex-start',
                  flexDirection: msg.isUser ? 'row-reverse' : 'row',
                  animation: 'msgIn 0.3s var(--ease)'
                }}
              >
                <div style={{ fontSize: '1.2rem', flexShrink: 0, lineHeight: 1.5 }}>
                  {msg.isUser ? '😊' : '🤖'}
                </div>
                <div
                  style={{
                    padding: '0.65rem 0.95rem',
                    borderRadius: '18px',
                    fontSize: '0.86rem',
                    lineHeight: 1.55,
                    fontWeight: 600,
                    background: msg.isUser ? 'var(--g-hero)' : 'var(--c-bg2)',
                    color: msg.isUser ? '#fff' : 'var(--c-text)',
                    border: msg.isUser ? 'none' : '1px solid var(--c-border)',
                    borderBottomLeftRadius: msg.isUser ? '18px' : '4px',
                    borderBottomRightRadius: msg.isUser ? '4px' : '18px'
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {typing && (
              <div
                style={{
                  display: 'flex',
                  gap: '0.55rem',
                  maxWidth: '90%',
                  animation: 'msgIn 0.3s var(--ease)'
                }}
              >
                <div style={{ fontSize: '1.2rem', flexShrink: 0 }}>🤖</div>
                <div
                  style={{
                    display: 'flex',
                    gap: '4px',
                    alignItems: 'center',
                    padding: '0.7rem 0.95rem',
                    background: 'var(--c-bg2)',
                    border: '1px solid var(--c-border)',
                    borderRadius: '18px',
                    borderBottomLeftRadius: '4px',
                    width: 'fit-content'
                  }}
                >
                  {[0, 1, 2].map(i => (
                    <span
                      key={i}
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: 'var(--c-purple)',
                        opacity: 0.6,
                        animation: 'tBnc 0.8s ease infinite',
                        animationDelay: `${i * 0.15}s`
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {quickReplies.length > 0 && (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem',
                padding: '0.7rem 1.2rem 0.9rem'
              }}
            >
              {quickReplies.map((reply, i) => (
                <button
                  key={i}
                  onClick={() => handleQuickReply(reply)}
                  style={{
                    padding: '0.3rem 0.8rem',
                    borderRadius: '20px',
                    background: 'rgba(124, 58, 237, 0.09)',
                    border: '1px solid rgba(124, 58, 237, 0.2)',
                    color: 'var(--c-purple)',
                    fontSize: '0.76rem',
                    fontWeight: 700,
                    transition: 'all 0.18s var(--ease)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--g-c1)';
                    e.currentTarget.style.color = '#fff';
                    e.currentTarget.style.borderColor = 'transparent';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(124, 58, 237, 0.09)';
                    e.currentTarget.style.color = 'var(--c-purple)';
                    e.currentTarget.style.borderColor = 'rgba(124, 58, 237, 0.2)';
                  }}
                >
                  {reply}
                </button>
              ))}
            </div>
          )}

          <div
            style={{
              padding: '0.9rem 1.2rem',
              borderTop: '1px solid var(--c-border)',
              display: 'flex',
              gap: '0.6rem'
            }}
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about any DIY project…"
              style={{
                flex: 1,
                padding: '0.7rem 1rem',
                borderRadius: '12px',
                border: '1.5px solid var(--c-border)',
                background: 'var(--c-bg)',
                color: 'var(--c-text)',
                fontFamily: 'inherit',
                fontSize: '0.88rem',
                fontWeight: 600,
                transition: 'border-color 0.2s',
                outline: 'none'
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = 'var(--c-purple)'}
              onBlur={(e) => e.currentTarget.style.borderColor = 'var(--c-border)'}
            />
            <button
              onClick={handleSend}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'var(--g-hero)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.95rem',
                flexShrink: 0,
                transition: 'transform 0.2s var(--spring)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.12)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = ''}
            >
              ➤
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
