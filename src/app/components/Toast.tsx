import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface ToastContextType {
  showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

let toastCallback: ((message: string) => void) | null = null;

export const toast = (message: string) => {
  if (toastCallback) {
    toastCallback(message);
  }
};

export default function Toast() {
  const [message, setMessage] = useState('');
  const [show, setShow] = useState(false);

  const showToast = useCallback((msg: string) => {
    setMessage(msg);
    setShow(true);
    setTimeout(() => setShow(false), 3200);
  }, []);

  // Set the global callback
  toastCallback = showToast;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '2rem',
        left: '50%',
        transform: show ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(80px)',
        background: 'var(--c-text)',
        color: 'var(--c-bg)',
        padding: '0.85rem 1.6rem',
        borderRadius: '50px',
        fontWeight: 700,
        fontSize: '0.87rem',
        boxShadow: 'var(--sh-lg)',
        zIndex: 3000,
        transition: 'transform 0.45s var(--spring)',
        whiteSpace: 'nowrap',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}
    >
      {message}
    </div>
  );
}
