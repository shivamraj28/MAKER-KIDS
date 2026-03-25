import { Outlet } from 'react-router';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import ChatFAB from './components/ChatFAB';
import Toast from './components/Toast';
import { useState } from 'react';

export default function Root() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <CustomCursor />
      <Navbar />
      <div style={{ paddingTop: 'var(--nav-h)' }}>
        <Outlet />
      </div>
      <ChatFAB chatOpen={chatOpen} setChatOpen={setChatOpen} />
      <Toast />
    </>
  );
}
