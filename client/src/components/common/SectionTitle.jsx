import React from 'react';

const SectionTitle = ({ title, className }) => {
    return (
        <h3 className={`text-2xl md:text-3xl xl:text-[40px] font-bold text-center text-black mb-4 capitalize ${className}`}>{title}</h3>
    );
};

export default SectionTitle;