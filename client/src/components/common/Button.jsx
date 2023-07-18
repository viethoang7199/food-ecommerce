import React from 'react'

const Button = ({ title, className, onClick, disabled, type }) => {
    return (
        <button
            className={`bg-pink px-6 py-4 text-white font-medium rounded-full transition-all duration-300 ease-in-out hover:bg-black hover:transition-all hover:duration-300 hover:ease-linear ${className}`}
            onClick={onClick}
            disabled={disabled}
            type={type}
        >
            {title}
        </button>
    )
}

export default Button