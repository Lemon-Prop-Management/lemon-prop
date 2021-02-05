import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

const TenantRequestList = props => {

  const [tenantRequests, setTenantRequests] = useState([])
  const { setCurrentTenants } = props
  const { user_id, admin } = props

  useEffect(() => {
    if (admin === false) {
      return ('You do not have access to this data.')
    } else if (admin === true) {
      axios.get('/api/manager/tenants/false')
        .then(res => {
          setTenantRequests(res.data)
        })
        .catch(err => console.log(err))
    }
  }, [user_id])

  function approve(element) {
    axios.put(`/api/manager/tenants/${element.user_id}`, {
      first_name: element.first_name,
      last_name: element.last_name,
      phone: element.phone,
      email: element.email,
      pet: element.pet,
      is_approved: true,
      prop_id: element.prop_id
    })
      .then(res => {
        axios.get('/api/manager/tenants/false')
          .then(res => {
            setTenantRequests(res.data)
            axios.get('/api/manager/tenants/true')
              .then(res => {
                setCurrentTenants(res.data)
              })
              .catch(err => console.log(err))
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  }

  function mapIt(array) {
    return array.map((element) => {
      let date = element.due_date.slice(0, 10)
      return (
        <div key={element.user_id} className='row tenant-row'>
          {admin === true && element.approved === false ? <button
            className='btn-save'
            onClick={() => approve(element)}>Approve</button> : null}
          <div className='list-item tenant-item'>{element.user_id}</div>
          <div className='list-item tenant-item'>{`${element.first_name} ${element.last_name}`}</div>
          <div className='list-item tenant-item'>No Address Available</div>
          <div className='list-item tenant-item'>{element.email}</div>
          <div className='list-item tenant-item'>{element.phone}</div>
          {element.pets === true ? <div>Yes</div> : <div>No</div>}
          <div>{date}</div>
        </div>
      )
    })
  }

  return (
    <div className='sub-page'>
      {mapIt(tenantRequests)}
    </div>
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

export default connect(mapStateToProps)(TenantRequestList)