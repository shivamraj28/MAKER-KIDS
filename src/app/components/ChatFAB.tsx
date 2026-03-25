import { useState, useEffect, useRef } from 'react';
import { BOT_RESPONSES } from '../data/projects';

interface ChatFABProps {
  chatOpen: boolean;
  setChatOpen: (open: boolean) => void;
}

interface Message {
  text: string;
  isUser: boolean;
}

const QUICK_REPLIES = [
  'Tell me a project idea',
  'How do I earn badges?',
  'What materials do I need?',
  "Help, I'm stuck!"
];

export default function ChatFAB({ chatOpen, setChatOpen }: ChatFABProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [typing, setTyping] = useState(false);
  const [quickReplies, setQuickReplies] = useState(QUICK_REPLIES);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (chatOpen && !initialized) {
      setInitialized(true);
      setTimeout(() => {
        addBotMessage("Hey there, maker! 👋 I'm MakerBot AI. Ask me anything about DIY projects, tips, or earning badges!");
      }, 400);
    }
  }, [chatOpen, initialized]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const addBotMessage = (text: string) => {
    setTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { text, isUser: false }]);
      setTyping(false);
    }, 700);
  };

  const respond = (userText: string) => {
    const lo = userText.toLowerCase();
    let response = BOT_RESPONSES.default[0];
    
    for (const [key, value] of Object.entries(BOT_RESPONSES)) {
      if (lo.includes(key)) {
        response = value[0];
        break;
      }
    }
    
    setTimeout(() => addBotMessage(response), 200);
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
    <>
      <button
        onClick={() => setChatOpen(!chatOpen)}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 900,
          width: '62px',
          height: '62px',
          borderRadius: '50%',
          background: 'var(--g-hero)',
          color: '#fff',
          boxShadow: '0 8px 28px rgba(124, 58, 237, 0.55)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.6rem',
          transition: 'transform 0.3s var(--spring), box-shadow 0.2s',
          animation: 'fabIn 0.5s var(--spring) 1s both'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.12) rotate(-8deg)';
          e.currentTarget.style.boxShadow = '0 14px 40px rgba(124, 58, 237, 0.65)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = '';
          e.currentTarget.style.boxShadow = '0 8px 28px rgba(124, 58, 237, 0.55)';
        }}
      >
        🤖
        {!chatOpen && (
          <span
            style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              background: 'var(--c-orange)',
              color: '#fff',
              fontSize: '0.68rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2.5px solid var(--c-bg)',
              animation: 'bpls 2s ease infinite'
            }}
          >
            1
          </span>
        )}
      </button>

      {chatOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '6.5rem',
            right: '2rem',
            zIndex: 890,
            width: '370px',
            maxHeight: '560px',
            background: 'var(--c-surface)',
            border: '1.5px solid var(--c-border)',
            borderRadius: '28px',
            boxShadow: 'var(--sh-xl)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            animation: 'fUp 0.35s var(--spring)'
          }}
        >
          <div
            style={{
              background: 'var(--g-hero)',
              padding: '1.1rem 1.3rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.9rem',
              color: '#fff',
              flexShrink: 0
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.3rem',
                border: '2px solid rgba(255, 255, 255, 0.4)',
                flexShrink: 0
              }}
            >
              🤖
            </div>
            <div style={{ flex: 1 }}>
              <h4 style={{ fontWeight: 700, fontSize: '0.95rem' }}>MakerBot AI</h4>
              <p style={{ fontSize: '0.73rem', opacity: 0.8 }}>Ask me anything!</p>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.75rem',
                opacity: 0.85
              }}
            >
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
            <button
              onClick={() => setChatOpen(false)}
              style={{
                marginLeft: '0.5rem',
                background: 'none',
                color: '#fff',
                fontSize: '1rem',
                opacity: 0.7
              }}
            >
              ✕
            </button>
          </div>

          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.7rem',
              minHeight: '220px'
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
                gap: '0.4rem',
                padding: '0.6rem 1rem 0.8rem',
                flexShrink: 0
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
              display: 'flex',
              gap: '0.6rem',
              alignItems: 'center',
              padding: '0.8rem 1rem',
              borderTop: '1px solid var(--c-border)',
              flexShrink: 0
            }}
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a question…"
              style={{
                flex: 1,
                padding: '0.6rem 0.9rem',
                borderRadius: '12px',
                border: '1.5px solid var(--c-border)',
                background: 'var(--c-bg)',
                color: 'var(--c-text)',
                fontFamily: 'inherit',
                fontSize: '0.86rem',
                fontWeight: 600,
                transition: 'border-color 0.2s'
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
      )}

      <style>{`
        @media (max-width: 680px) {
          .chat-fab { bottom: 1rem !important; right: 1rem !important; }
          .chat-panel { 
            width: calc(100vw - 2rem) !important; 
            right: 1rem !important; 
          }
        }
      `}</style>
    </>
  );
}
