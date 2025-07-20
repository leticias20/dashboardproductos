import React, { useState } from 'react';

const HamburgerMenu = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        style={{
          fontSize: '2rem',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
        }}
        aria-label="Abrir menú"
      >
        &#9776;
      </button>
      {open && (
        <nav
          style={{
            position: 'absolute',
            top: '50px',
            left: 0,
            background: '#fff',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            padding: '1rem',
            zIndex: 100,
          }}
        >
          {children}
        </nav>
      )}
    </div>
  );
};

export default HamburgerMenu;