import React, { useState, useRef, useEffect } from 'react';

const HamburgerMenu = ({ children }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  return (
    <div className="hamburger-wrapper" ref={ref} style={{ position: 'relative' }}>
      <button
        className="hamburger-btn"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Abrir menú"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: 8,
          borderRadius: 8,
          border: '1px solid rgba(0,0,0,0.06)',
          background: open ? '#eef6ff' : '#fff',
          cursor: 'pointer'
        }}
      >
        <span style={{ width: 18, height: 2, background: '#333', display: 'block', transform: open ? 'rotate(45deg) translate(3px, 3px)' : 'none', transition: 'all .18s' }} />
        <span style={{ width: 18, height: 2, background: '#333', display: 'block', opacity: open ? 0 : 1, transition: 'all .18s' }} />
        <span style={{ width: 18, height: 2, background: '#333', display: 'block', transform: open ? 'rotate(-45deg) translate(3px, -3px)' : 'none', transition: 'all .18s' }} />
      </button>

      <nav
        className={`hamburger-panel ${open ? 'open' : ''}`}
        style={{
          position: 'absolute',
          top: '48px',
          left: 0,
          minWidth: 220,
          background: '#fff',
          borderRadius: 8,
          boxShadow: '0 8px 24px rgba(16,24,40,0.08)',
          padding: 12,
          zIndex: 50,
          display: open ? 'block' : 'none'
        }}
      >
        {children}
      </nav>
    </div>
  );
};

export default HamburgerMenu;