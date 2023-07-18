import React from 'react';
import ShippingForm from './ShippingForm';
import PaymentForm from './PaymentForm';

const Checkout = () => {
    const [step, setStep] = React.useState(1);
    const [shippingInfo, setShippingInfo] = React.useState(null);
    const [paymentInfo, setPaymentInfo] = React.useState(null);

    const handleShippingSubmit = (data) => {
        setShippingInfo(data);
        setStep(2);
    };

    const handlePaymentSubmit = (data) => {
        setPaymentInfo(data);
        setStep(3);
    };

    return (
        <div className="max-w-md py-20 mx-auto">
            {step === 1 && <ShippingForm onSubmit={handleShippingSubmit} />}
            {step === 2 && <PaymentForm onSubmit={handlePaymentSubmit} />}
            {step === 3 && (
                <div>
                    <h2 className="mb-4 text-lg font-bold">Order summary</h2>
                    <div className="p-4 mb-4 border border-gray-400 rounded-md">
                        <p className="font-bold">Shipping information</p>
                        <p>{shippingInfo.name}</p>
                        <p>{shippingInfo.address}</p>
                        <p>{shippingInfo.phone}</p>
                    </div>
                    <div className="p-4 border border-gray-400 rounded-md">
                        <p className="font-bold">Payment information</p>
                        <p>{paymentInfo.cardNumber}</p>
                        <p>{paymentInfo.expiration}</p>
                        <p>{paymentInfo.cvv}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Checkout;