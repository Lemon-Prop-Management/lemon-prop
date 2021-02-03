import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
// List of tenants past payments
// Study maintReqList Component

const PaymentList = props => {
    console.log('PAYMENT LIST PROPS:   ', props)

    const [paymentsList, setPaymentsList] = useState([])
    const { admin, user_id } = props

    useEffect(() => {
        if (admin === false) {
            axios.get(`/api/tenant/${user_id}/payments`)
                .then(res => {
                    setPaymentsList(res.data)
                })
                .catch(err => console.log(err))
        } else if (admin === true) {
            axios.get('/api/manager/payments')
                .then(res => {
                    setPaymentsList(res.data)
                })
                .catch(err => console.log(err))
        }
    }, [props])


    let mappedList = paymentsList.map((el) => {
        return (
            <div key={el.invoice_id}>
                <div> {el.date_paid} </div>
                <div> {el.amt_paid} </div>
            </div>
        )
    })

    return (
        <div>
            <p>PaymentList</p>
            <div> {mappedList} </div>
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

export default connect(mapStateToProps)(PaymentList)