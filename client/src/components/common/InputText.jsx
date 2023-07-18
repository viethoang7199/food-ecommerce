import React from 'react';

const InputText = ({ placeholder, value, name, className, onChange, autoComplete, checked, onClick, type, disabled }) => {
    return (
        <input
            type={`${type}`}
            className={`text-base border border-gray-400 outline-1 outline-none px-4 py-2 rounded-lg ${className}`}
            placeholder={placeholder}
            value={value}
            name={name}
            onChange={onChange}
            onClick={onClick}
            disabled={disabled}
            autoComplete={autoComplete}
            checked={checked}
        />
    );
};

export default InputText;