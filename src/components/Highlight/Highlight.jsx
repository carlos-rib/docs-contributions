import React from 'react';

const highlightStyles = {
  state: { backgroundColor: '#ffc107', color: '#fffff' },
  operator: { backgroundColor: '#dc3545', color: '#ffffff' },
  helper: { backgroundColor: '#28a745', color: '#ffffff' },
  algorithm: { backgroundColor: '#007bff', color: '#ffffff' },
};

const Highlight = ({ type = 'state', children }) => {
  return (
    <span
      style={{
        backgroundColor: highlightStyles[type].backgroundColor,
        borderRadius: '6px',
        color: highlightStyles[type].color,
        padding: '0.5rem',
      }}
    >
      {children}
    </span>
  );
};

export { Highlight };
