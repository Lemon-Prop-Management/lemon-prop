import axios from 'axios';
import React, { useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import PaymentList from './PaymentList';

toast.configure();


// Reuseable component that just displays the ability to make a payment. I believe this would just be the StripeCheckout button

const MakePayment = props => {
    const [rentAmount, setRentAmount] = useState(1500.55)


    async function handleToken(token) {
        console.log(token, rentAmount)
        await axios.post('/pay_rent', {
            token,
            rentAmount
        }).then(res => {
            console.log(res.data.status);
            if (res.data.status === 'success') {
                console.log('status = success')
                toast('Success! Your rent has been paid!',
                    { type: 'success' })
            } else {
                console.log('status = error')
                toast('Something went wrong',
                    { type: 'error' })
            }
            setRentAmount('')
        }).catch(err => console.log(err))
    }

    return (
        <div className='donate'>
            <div className='container'>
                <div>MakePayment.js</div>
                <div> Your rent amount due: {rentAmount} </div>
                <StripeCheckout
                    stripeKey='pk_test_51IEMDRHaijm3D4Gz5082wV01blikaeeyYMcLRDpCWBUPTHQSOhYA5t5lRF7VfAmzitNMVR1JIxYSuKwOPYPAmfY700a2qf4x3J'
                    token={handleToken}
                    billingAddress
                    amount={rentAmount * 100}
                    label='Pay Rent'

                />
            </div>
        </div>
    )
}

export default MakePayment