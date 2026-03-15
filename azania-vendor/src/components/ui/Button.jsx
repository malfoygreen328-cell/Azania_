import React from 'react';

const Button = ({ label, onClick, type = 'button' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        backgroundColor: '#043927', // bottle green
        color: 'white',
        border: 'none',
        padding: '0.75rem 1.5rem',
        borderRadius: '6px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease'
      }}
      onMouseOver={(e) => {
        e.target.style.backgroundColor = '#056848'; // lighter green on hover
      }}
      onMouseOut={(e) => {
        e.target.style.backgroundColor = '#043927'; // reset on mouse out
      }}
    >
      {label}
    </button>
  );
};

export default Button;