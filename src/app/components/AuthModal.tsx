import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { toast } from './Toast';
// import BASE_URL from '../../config/api';
const BASE_URL = "https://maker-kid-backend-live.onrender.com";
import { useNavigate } from "react-router";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AuthModal({ open, onClose }: AuthModalProps) {
  const { updateUser } = useApp();
  const navigate = useNavigate();
  const [tab, setTab] = useState<'login' | 'signup'>('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  if (!open) return null;

 const handleLogin = async () => {
  if (!loginEmail || !loginPassword) {
    toast('⚠️ Fill all fields');
    return;
  }

  

  try {
    console.log("Making login request to:", `${BASE_URL}/api/auth/login`);
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email: loginEmail,
        password: loginPassword,
      }),
    });

    console.log("Login response status:", res.status);
    const data = await res.json();
    console.log("Login response data:", data);

    if (!res.ok) {
      throw new Error(data.message || "Login failed");
    }

    updateUser(data.user);
    toast(`👋 Welcome back, ${data.user.name}!`);
    console.log("About to close modal and navigate");
    onClose();
    console.log("Modal closed, navigating to /");
    navigate("/");
    console.log("Navigation called");

  } catch (err: any) {
    toast(err.message || "Login failed");
  }
};



const handleSignup = async () => {
  if (!signupName || !signupEmail || !signupPassword) {
    toast('⚠️ Fill all fields');
    return;
  }

  try {
    console.log("BASE_URL:", BASE_URL);
    console.log("Making signup request to:", `${BASE_URL}/api/auth/signup`);
    const res = await fetch(`${BASE_URL}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        name: signupName,
        email: signupEmail,
        password: signupPassword,
      }),
    });

    console.log("Response status:", res.status);
    const data = await res.json();
    console.log("Response data:", data);

    if (!res.ok) {
      throw new Error(data.message || "Signup failed");
    }

    const user = data.data;

    updateUser(user);
    toast(`🎉 Welcome, ${user.name || "User"}!`);
    console.log("About to close modal and navigate after signup");
    navigate("/");  
    onClose();
    console.log("Signup navigation completed");

  } catch (err: any) {
    console.error(err);
    toast(err.message || "Signup failed");
  }
};


  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        background: 'rgba(13, 7, 24, 0.6)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--c-surface)',
          border: '1.5px solid var(--c-border)',
          borderRadius: '28px',
          padding: '2.5rem',
          width: '100%',
          maxWidth: '420px',
          boxShadow: 'var(--sh-xl)',
          position: 'relative',
          animation: 'fUp 0.4s var(--ease)'
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.2rem',
            right: '1.2rem',
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            background: 'var(--c-bg2)',
            border: '1.5px solid var(--c-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.9rem',
            color: 'var(--c-text2)',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--c-red)';
            e.currentTarget.style.color = '#fff';
            e.currentTarget.style.borderColor = 'var(--c-red)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--c-bg2)';
            e.currentTarget.style.color = 'var(--c-text2)';
            e.currentTarget.style.borderColor = 'var(--c-border)';
          }}
        >
          ✕
        </button>

        <div
          style={{
            fontFamily: "'Fredoka One', cursive",
            fontSize: '1.8rem',
            color: 'var(--c-text)',
            textAlign: 'center',
            marginBottom: '1.5rem'
          }}
        >
          🔧 Join MakerKids
        </div>

        <div
          style={{
            display: 'flex',
            gap: '0.4rem',
            background: 'var(--c-bg)',
            borderRadius: '14px',
            padding: '0.3rem',
            marginBottom: '1.5rem'
          }}
        >
          <button
            onClick={() => setTab('login')}
            style={{
              flex: 1,
              padding: '0.55rem',
              borderRadius: '10px',
              fontWeight: 700,
              fontSize: '0.88rem',
              color: tab === 'login' ? '#fff' : 'var(--c-text2)',
              textAlign: 'center',
              transition: 'all 0.2s',
              background: tab === 'login' ? 'var(--g-hero)' : 'transparent',
              boxShadow: tab === 'login' ? '0 4px 12px rgba(124, 58, 237, 0.3)' : 'none'
            }}
          >
            Sign In
          </button>
          <button
            onClick={() => setTab('signup')}
            style={{
              flex: 1,
              padding: '0.55rem',
              borderRadius: '10px',
              fontWeight: 700,
              fontSize: '0.88rem',
              color: tab === 'signup' ? '#fff' : 'var(--c-text2)',
              textAlign: 'center',
              transition: 'all 0.2s',
              background: tab === 'signup' ? 'var(--g-hero)' : 'transparent',
              boxShadow: tab === 'signup' ? '0 4px 12px rgba(124, 58, 237, 0.3)' : 'none'
            }}
          >
            Sign Up
          </button>
        </div>

        {tab === 'login' ? (
          <div>
            <div style={{ marginBottom: '1rem' }}>
              <label
                style={{
                  display: 'block',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  color: 'var(--c-text2)',
                  marginBottom: '0.4rem'
                }}
              >
                Email
              </label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="your@email.com"
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem',
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
            <div style={{ marginBottom: '1rem' }}>
              <label
                style={{
                  display: 'block',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  color: 'var(--c-text2)',
                  marginBottom: '0.4rem'
                }}
              >
                Password
              </label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem',
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
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            <button
              onClick={handleLogin}
              style={{
                width: '100%',
                padding: '0.95rem',
                borderRadius: '14px',
                background: 'var(--g-hero)',
                color: '#fff',
                fontFamily: "'Fredoka One', cursive",
                fontSize: '1.1rem',
                boxShadow: '0 6px 20px rgba(124, 58, 237, 0.4)',
                transition: 'transform 0.25s var(--spring), box-shadow 0.2s',
                marginTop: '0.3rem'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 10px 28px rgba(124, 58, 237, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = '';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(124, 58, 237, 0.4)';
              }}
            >
              Sign In 🚀
            </button>
            <div
              style={{
                textAlign: 'center',
                fontSize: '0.8rem',
                color: 'var(--c-text3)',
                marginTop: '0.8rem',
                fontWeight: 500
              }}
            >
              Demo: any email & password works!
            </div>
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: '1rem' }}>
              <label
                style={{
                  display: 'block',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  color: 'var(--c-text2)',
                  marginBottom: '0.4rem'
                }}
              >
                Your Name
              </label>
              <input
                type="text"
                value={signupName}
                onChange={(e) => setSignupName(e.target.value)}
                placeholder="Young Maker"
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem',
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
            <div style={{ marginBottom: '1rem' }}>
              <label
                style={{
                  display: 'block',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  color: 'var(--c-text2)',
                  marginBottom: '0.4rem'
                }}
              >
                Email
              </label>
              <input
                type="email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                placeholder="your@email.com"
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem',
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
            <div style={{ marginBottom: '1rem' }}>
              <label
                style={{
                  display: 'block',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  color: 'var(--c-text2)',
                  marginBottom: '0.4rem'
                }}
              >
                Password
              </label>
              <input
                type="password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                placeholder="Create a password"
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem',
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
                onKeyDown={(e) => e.key === 'Enter' && handleSignup()}
              />
            </div>
            <button
              onClick={handleSignup}
              style={{
                width: '100%',
                padding: '0.95rem',
                borderRadius: '14px',
                background: 'var(--g-hero)',
                color: '#fff',
                fontFamily: "'Fredoka One', cursive",
                fontSize: '1.1rem',
                boxShadow: '0 6px 20px rgba(124, 58, 237, 0.4)',
                transition: 'transform 0.25s var(--spring), box-shadow 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 10px 28px rgba(124, 58, 237, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = '';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(124, 58, 237, 0.4)';
              }}
            >
              Create Account 🎉
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
