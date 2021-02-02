import React from 'react';
import PaymentsList from './PaymentList';
import MakePayment from './MakePayment';

// Overall View when they click on payments tab

const Payments = props => {
    return (
        <div>
            <p>Payments Component</p>
            <PaymentsList />
            <MakePayment />

        </div>
    )
}
export default Payments