import React, { useState } from 'react';

const ShippingForm = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit({ name, address, phone });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label className="block mb-2">
                <span className="font-bold">Name</span>
                <input
                    className="block w-full px-3 py-2 mt-1 border border-gray-400 rounded"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                />
            </label>
            <label className="block mb-2">
                <span className="font-bold">Address</span>
                <input
                    className="block w-full px-3 py-2 mt-1 border border-gray-400 rounded"
                    type="text"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                    required
                />
            </label>
            <label className="block mb-2">
                <span className="font-bold">Phone</span>
                <input
                    className="block w-full px-3 py-2 mt-1 border border-gray-400 rounded"
                    type="tel"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    required
                />
            </label>
            <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
                Continue
            </button>
        </form>
    );
};

export default ShippingForm;