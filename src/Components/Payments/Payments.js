import axios from 'axios'
import React, { useEffect, useState } from 'react'
import MakePayment from './MakePayment'

const Payments = props => {
  const [paymentsHistory, setPaymentsHistory] = useState([])
  const [paymentsList, setPaymentsList] = useState([])

  useEffect(() => {
    if (admin === false) {
      axios.get(`/api/tenant/${user_id}/payments`)
        .then(res => {
          setPaymentsHistory(res.data)
        })
        .catch(err => console.log(err))
    } else if (admin === true) {
      axios.get('/api/manager/payments')
        .then(res => {
          setPaymentsList(res.data)
        })
        .catch(err => console.log(err))
    }
  }, [])

  return (
    <div className="payment-history">
      <h1>Payment History</h1>

      {/* {admin === false ? } */}
      <table className="tenant-payments">
        <tr>
          <th>Invoice</th>
          <th>Amount Paid</th>
          <th>Date Paid</th>
          <th>Past Due</th>
        </tr>
        {paymentsHistory.map((element) => {
          return (
            <tr>
              <td>{element.invoice_id}</td>
              <td>{element.amt_paid}</td>
              <td>{element.date_paid}</td>
              <td>{/* The difference between due date and current date */}</td>
            </tr>
          )
        })}
      </table>
      <MakePayment />

      {/* {admin === false ? } */}
      <table className="mgr-payments">
        <tr>
          <th>Tenant ID</th>
          <th>Tenant</th>
          <th>Rent Amount</th>
          <th>Date Paid</th>
          <th>Past Due</th>
        </tr>
        {paymentsList.map((element) => {
          return (
            <tr>
              <td>{element.user_id}</td>
              <td>{element.last_name}</td>
              <td>{element.lease_amt}</td>
              <td>{element.due_date}</td>
              <td>{/* The difference between due date and current date */}</td>
            </tr>
          )
        })}
      </table>
      <table className="single-tenant">
        <tr>
          <th>Tenant</th>
          <th>Address</th>
          <th>Email</th>
          <th>Phone</th>
        </tr>
        {paymentsList.map((element) => {
          return (
            <tr>
              <td>{element.last_name}</td>
              <td>{element.address}</td>
              <td>{element.email}</td>
              <td>{element.phone}</td>
              <td>{/* The difference between due date and current date */}</td>
            </tr>
          )
        })}
      </table>
    </div>
  )
}
export default Payments