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
        console.log('Frontend line 12:', { token, rentAmount })
        await axios.post('/donate', {
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
        <div className='donate'>
            <div className='container'>
                <div>MakePayment.js</div>
                <div> Your rent amount due: {rentAmount} </div>
                <StripeCheckout
                    stripeKey='pk_live_51IAKa4GUHQ1yJgjQ6P0nPicBE51uc23f34KwVYl3K3DqfejUdGW8tj2UF8rLWN989GYY1XS5V7q5d7Lwd1UVvSRb00exfqliHK'
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