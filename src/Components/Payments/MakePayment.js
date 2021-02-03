import axios from 'axios';
import React, { useEffect, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';

toast.configure();

const MakePayment = props => {
    const [rentAmount, setRentAmount] = useState(1500);

    const { user_id } = props;

    // http://localhost:5555/api/tenant/36/rent

    useEffect(() => {
        axios.get(`/api/tenant/${user_id}/rent`)
            .then(res => {
                console.log(res.data)
                setRentAmount(res.data[0].lease_amt)
            })
            .catch(err => console.log(err))
    }, [props]);


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
                <div> Your rent amount due:
                    {rentAmount}
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

function mapStateToProps(state) {
    console.log("state:", state);
    return {
        user_id: state.user_id,
        admin: state.admin
    }
}

export default connect(mapStateToProps)(MakePayment)
