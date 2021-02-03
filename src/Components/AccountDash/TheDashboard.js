import React, { useEffect, useState } from 'react'
import MakePayment from '../Payments/MakePayment'
import axios from 'axios'
import { connect } from 'react-redux'
import MaintReqList from '../MaintReq/MaintReqList'


const TheDashboard = props => {
  const [tenantOpenMr, setTenantOpenMr] = useState([])
  const [managerOpenMr, setManagerOpenMr] = useState([])
  const [admin, setAdmin] = useState(props.admin)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [user_id, setUserId] = useState(props.user_id)
  const [tenantInfo, setTenantInfo] = useState([])
  const [editBool, setEditBool] = useState(false)
  const [buttonId, setButtonId] = useState()

  useEffect(() => {
    if (admin === false) {
      axios.put(`/api/tenant/:${user_id}`)
        .then(res => {
          setTenantOpenMr(res.data)
        })
        .catch(err => console.log(err))
    } else if (admin === true) {
      axios.get('/api/manager/manager/mr/false')
        .then(res => {
          setManagerOpenMr(res.data)
        })
        .catch(err => console.log(err))
    }
  }, [])

  function clickEdit(id) {
    setEditBool(true)
    setButtonId(id)
  }

  function editTenant(element) {
    axios.put(`/api/tenant/:${element.user_id}`, {
      first_name: firstName !== '' ? firstName : element.first_name,
      last_name: lastName !== '' ? lastName : element.last_name,
      phone: phone !== '' ? phone : element.phone,
      email: email !== '' ? email : element.email
    })
      .then(res => {
        setFirstName('')
        setLastName('')
        setPhone('')
        setEmail('')
      })
      .catch(err => console.log(err))
  }

  function mappedTenant(array) {
    return array.map((element) => {

      return (
        <div key={element.user_id}>
          <button onClick={() => clickEdit(element.user_id)}>Edit</button>
          {editBool === false ? (
            <div>
              <div>{element.user_id}</div>
              <div>{element.first_name}</div>
              <div>{element.last_name}</div>
              <div>{element.phone}</div>
              <div>{element.email}</div>
            </div>
          ) : (
              element.user_id === buttonId ? (
                <div>
                  <div>{element.user_id}</div>
                  <input defaultValue={`${element.first_name}`} onChange={e => setFirstName(e.target.value)}></input>
                  <input defaultValue={`${element.last_name}`} onChange={e => setLastName(e.target.value)}></input>
                  <input defaultValue={element.phone} onChange={e => setPhone(e.target.value)}></input>
                  <input defaultValue={element.email} onChange={e => setEmail(e.target.value)}></input>
                  <button className='submit' onClick={() => editTenant(element)}>Save</button>
                </div>
              ) : (
                  <div>
                    <div>{element.user_id}</div>
                    <div>{element.first_name}</div>
                    <div>{element.last_name}</div>
                    <div>{element.phone}</div>
                    <div>{element.email}</div>
                  </div>
                )
            )
          }
        </div >
      )
    })
  }

  return (
    <div>
      <p>TheDashboard</p>
      <div>
        {/* <h2>Open Maintenance Requests:</h2> */}
        <MaintReqList open={true}/>
      </div>
      <div>
        <h2>My Info:</h2>
        <div className="edit-tenant">
          {mappedTenant(tenantInfo)}
        </div>
      </div>
    </div>
    
  )
}
export default TheDashboard

//Tenant: 
// Display make payment
// get open Maintenance requests or show some "error if you should have a request still open email manager..."
// Edit user app.put('/api/tenant/:user_id', tenantCtrl.editUser)

//Manager: 
//Total Income this month (maybe add, outstanding balance -- can add the past due amounts below and display it)
//all open mrs
//past due payments