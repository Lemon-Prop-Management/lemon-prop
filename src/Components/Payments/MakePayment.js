import axios from 'axios';
import React, { useEffect, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import { updatePaymentsMgr, updatePaymentsTnt } from '../../redux/paymentReducer'

toast.configure();

const MakePayment = props => {
    const [rentAmount, setRentAmount] = useState();

    const { user_id, admin } = props;


    useEffect(() => {
        if (user_id) {
            axios.get(`/api/tenant/${user_id}/rent`)
                .then(res => {
                    setRentAmount(+res.data[0].lease_amt)
                })
                .catch(err => console.log(err))
        }
    }, [user_id]);

    async function handleToken(token) {
        await axios.post('/pay_rent', {
            token,
            rentAmount
        }).then(res => {
            if (res.data.status === 'success') {
                axios.post(`/api/tenant/${user_id}/payments`, { rentAmount }).then(res => {
                    toast('Success! Your rent has been paid!',
                        { type: 'success' });
                    admin === false ? props.updatePaymentsTnt(user_id) : props.updatePaymentsMgr()
                    setRentAmount(rentAmount)
                }).catch(err => console.log(err))
            } else {
                console.log('status = error')
                toast('Something went wrong',
                    { type: 'error' })
            }
            setRentAmount('')
        }).catch(err => console.log(err))
    }

    return (
        <div >{!props.admin ? (
            <div className='title-container secondary-container'>
                <h2> Your rent amount due:    $
                    {rentAmount}
                </h2>
                <StripeCheckout
                    stripeKey='pk_test_51IEMDRHaijm3D4Gz5082wV01blikaeeyYMcLRDpCWBUPTHQSOhYA5t5lRF7VfAmzitNMVR1JIxYSuKwOPYPAmfY700a2qf4x3J'
                    token={handleToken}
                    billingAddress
                    amount={rentAmount * 100}
                    label='Pay Rent'
                    className='btn-1'
                />
            </div>
        ) : null}
        </div>
    )
}

function mapStateToProps(state) {
    return {
        user_id: state.user.user_id,
        admin: state.user.admin
    }
}

export default connect(mapStateToProps, { updatePaymentsMgr, updatePaymentsTnt })(MakePayment)
