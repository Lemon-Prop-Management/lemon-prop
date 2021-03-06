import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { connect } from 'react-redux';
import { updatePaymentsTnt, updatePaymentsMgr } from '../../redux/paymentReducer';

// List of tenants' past payments
const PaymentList = props => {
    let { properties, changeProperties } = useState([])
    const { admin, user_id } = props
    const [addresses, setAddresses] = useState([]);
    const [currentAddress, setCurrentAddress] = useState()

    useEffect(() => {
        if (admin === false) {
            props.updatePaymentsTnt(user_id)
            // .then(res => console.log(res))
            axios.get(`/api/tenant/${user_id}/property`)
                .then(res => {
                    setAddresses(res.data.address)
                })
                .catch(err => console.log(err))
        } else if (admin === true) {
            props.updatePaymentsMgr()
            axios.get('/api/manager/properties')
                .then(res => {
                let add = res.data.map(e => e.address)
                console.log(add)
                setAddresses(add)
                console.log(addresses)
                })
                .catch(err => console.log(err))
        }
    }, [user_id])

    function mappedList(array) {
        return array.map((el, i, arr) => {
            console.log(el.date_paid)
            let date = el.date_paid.slice(0, 10)
            return (
                <div key={el.invoice_id} className='row'>
                    <div className='list-item'> {el.invoice_id} </div>
                    {admin === true ? <div className='list-item'> {el.user_id} </div> : null}
                    <div className='list-item'> ${el.amt_paid} </div>
                    <div className='list-item'> {date} </div>
                </div>
            )
        })
    }

    return (
        <div className='sub-page'>
            <h2>Payment History</h2>
            <div className='row'>
                <div className='list-item list-title'>Invoice ID</div>
                {admin === true ? <div className='list-item list-title'>User ID</div> : null}
                <div className='list-item list-title'>Amount Paid</div>
                <div className='list-item list-title'>Date Paid</div>
            </div>

            {admin === false ? mappedList(props.tnt_payments_list) : mappedList(props.mgr_payments_list)}
        </div>
    )
}

function mapStateToProps(state) {
    return {
        user_id: state.user.user_id,
        admin: state.user.admin,
        mgr_payments_list: state.payments.mgr_payments_list,
        tnt_payments_list: state.payments.tnt_payments_list
    }
}

export default connect(mapStateToProps, { updatePaymentsTnt, updatePaymentsMgr })(PaymentList)