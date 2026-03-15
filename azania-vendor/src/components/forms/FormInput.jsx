import React from 'react';

const FormInput = ({ 
  label, 
  name, 
  value, 
  onChange, 
  type = 'text', 
  placeholder = '' 
}) => {
  return (
    <div style={{ margin: '1rem 0' }}>
      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '0.5rem',
          borderRadius: '6px',
          border: '1px solid #ccc',
          outline: 'none'
        }}
      />
    </div>
  );
};

export default FormInput;