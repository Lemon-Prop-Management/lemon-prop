import React from 'react';
import PaymentsList from './PaymentList';
import MakePayment from './MakePayment';

// Overall View when they click on payments ta
const Payments = props => {
    return (
        <div className='page'>
            <div className='title-container'>
                <h1>Payments</h1>
            </div>
            <MakePayment />
            <PaymentsList />
        </div>
    )
}

export default Payments