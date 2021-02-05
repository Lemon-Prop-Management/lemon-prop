import React from 'react';
import PaymentsList from './PaymentList';
import MakePayment from './MakePayment';

// Overall View when they click on payments ta
const Payments = props => {
    return (
        <div>
            <PaymentsList />
            <MakePayment />
        </div>
    )
}

export default Payments