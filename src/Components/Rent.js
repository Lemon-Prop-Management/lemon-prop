import axios from 'axios';
import React, { useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

toast.configure();

export default function Donate(props) {
    const [rentAmount, setRentAmount] = useState()


    async function handleToken(token) {
        console.log('Frontend line 12:', { token, rentAmount })
        await axios.post('/payment', {
            token,
            rentAmount
        }).then(res => {
            console.log(res.data.status);
            if (res.data.status === 'success') {
                console.log('status = success')
                toast('Success! Thank you for your donation!',
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
        <div className='payment'>
            <div className='container'>
                <h1>We appreciate your support!</h1>
                <h3> Donation Amount:</h3>
                <div className='input-box'>
                    <p>$</p>
                    <input
                        onChange={(e) => setRentAmount(+e.target.value)}
                        value={rentAmount} />
                </div>
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