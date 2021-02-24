import React, { useEffect, useState } from 'react'
import MakePayment from '../Payments/MakePayment'
import axios from 'axios'
import { connect } from 'react-redux'
import MaintReqList from '../MaintReq/MaintReqList'

const TheDashboard = props => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [tenantInfo, setTenantInfo] = useState([])
  const [editBool, setEditBool] = useState(false)
  const [buttonId, setButtonId] = useState()
  const { user_id, admin } = props

  useEffect(() => {
    if (admin === false) {
      axios.get(`/api/tenant/get/${user_id}`)
        .then(res => {
          setTenantInfo(res.data)
          console.log(res.data)
        })
        .catch(err => console.log(err))
    }
  }, [user_id])

  function clickEdit(id) {
    setEditBool(true)
    setButtonId(id)
  }

  function editTenant(element) {
    axios.put(`/api/tenant/${element.user_id}`, {
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
        setEditBool(false)
        setTenantInfo(res.data)
        console.log(res.data)
        // axios.get(`/api/tenant/${user_id}`)
        //   .then(res => {
        //     setTenantInfo(res.data)
        //   })
        //   .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  }

  function mappedTenant(array) {
    return array.map((element) => {

      return (
        <div key={element.user_id}>
          <button className="btn-1" onClick={() => clickEdit(element.user_id)}>Edit</button>
          {editBool === false ? (
            <div>
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
                  <button className='submit btn-save' onClick={() => editTenant(element)}>Save</button>
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
    <div className='page'>
      <h1>Dashboard</h1>
      <div>
        {admin === false ? (
          <MakePayment />
        ) : null}
      </div>
      <div>
        <MaintReqList open={true} />
      </div>

      {
        admin === false ? (
          <div>
            <h2>My Info:</h2>
            <div className="edit-tenant">
              {mappedTenant(tenantInfo)}
            </div>
          </div>
        ) : null
      }
    </div >

  )
}

function mapStateToProps(state) {
  return {
    email: state.user.email,
    user_id: state.user.user_id,
    admin: state.user.admin,
    approved: state.user.approved
  }
}

export default connect(mapStateToProps)(TheDashboard)

//Tenant: 
// [X] Display make payment
// [X] get open Maintenance requests or show some "error if you should have a request still open email manager..."
// [X] Edit user app.put('/api/tenant/:user_id', tenantCtrl.editUser)

//Manager: 
// [ ] Total Income this month (maybe add, outstanding balance -- can add the past due amounts below and display it)
// [X]all open mrs
// [ ]past due payments