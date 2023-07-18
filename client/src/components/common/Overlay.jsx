import React from 'react';

const Overlay = ({ className, onClick }) => {
    return (
        <div
            className={`bg-overlay overflow-hidden overlay z-50 fixed top-0 left-0 right-0 bottom-0 w-full h-full ${className}`}
            onClick={onClick}
        >
        </div>
    );
};

export default Overlay;