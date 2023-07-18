import React from 'react';

const PaymentForm = ({ onSubmit }) => {
    const [cardNumber, setCardNumber] = React.useState('');
    const [expiration, setExpiration] = React.useState('');
    const [cvv, setCvv] = React.useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit({ cardNumber, expiration, cvv });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label className="block mb-2">
                <span className="font-bold">Card number</span>
                <input
                    className="block w-full px-3 py-2 mt-1 border border-gray-400 rounded"
                    type="text"
                    value={cardNumber}
                    onChange={(event) => setCardNumber(event.target.value)}
                    required
                />
            </label>
            <label className="block mb-2">
                <span className="font-bold">Expiration date</span>
                <input
                    className="block w-full px-3 py-2 mt-1 border border-gray-400 rounded"
                    type="text"
                    value={expiration}
                    onChange={(event) => setExpiration(event.target.value)}
                    required
                />
            </label>
            <label className="block mb-2">
                <span className="font-bold">CVV</span>
                <input
                    className="block w-full px-3 py-2 mt-1 border border-gray-400 rounded"
                    type="text"
                    value={cvv}
                    onChange={(event) => setCvv(event.target.value)}
                    required
                />
            </label>
            <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"> Continue
            </button>
        </form>
    );
};

export default PaymentForm;