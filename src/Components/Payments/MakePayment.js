import axios from 'axios';
import React, { useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

toast.configure();


// Reuseable component that just displays the ability to make a payment. I believe this would just be the StripeCheckout button

const MakePayment = props => {
    return (
        <div>
            <p>MakePayment</p>
        </div>
    )
}
export default MakePayment