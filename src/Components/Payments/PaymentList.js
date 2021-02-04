import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { updatePaymentsTnt, updatePaymentsMgr } from '../../redux/paymentReducer';

// List of tenants' past payments
const PaymentList = props => {
    let { properties, changeProperties } = useState([])
    const { admin, user_id } = props

    useEffect(() => {
        if (admin === false) {
            props.updatePaymentsTnt(user_id).then(res => console.log(res)
            )
        } else if (admin === true) {
            props.updatePaymentsMgr()
        }
    }, [user_id])

    function mappedList(array) {
        return array.map((el) => {
            return (
                <div key={el.invoice_id}>
                    <div> {el.invoice_id} </div>
                    <div> {el.date_paid} </div>
                    <div> {el.amt_paid} </div>
                    {admin === true ? <div> {el.user_id} </div> : null}
                </div>
            )
        })
    }

    return (
        <div>
            <p>PaymentList</p>
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