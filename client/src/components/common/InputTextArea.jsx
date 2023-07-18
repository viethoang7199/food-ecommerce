import React from 'react';

const InputTextArea = ({ name, placeholder, value, className, onChange }) => {
    return (
        <textarea
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            rows="4"
            cols="50"
            className={`text-lg border border-dark-blue rounded-lg outline-none ${className}`}
        ></textarea>
    );
};

export default InputTextArea;