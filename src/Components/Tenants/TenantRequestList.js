import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

const TenantRequestList = props => {

    const [tenantRequests, setTenantRequests] = useState([])
    const {setCurrentTenants} = props
     // const [addresses, setAddresses] = useState([])
    const [admin, setAdmin] = useState(props.admin)
  
    useEffect(() => {
        setAdmin(props.admin)
      }, [])
      
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
    }, [props])

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
          return (
            <div key={element.user_id}>
              <div>{element.user_id}</div>
              <div>{`${element.first_name} ${element.last_name}`}</div>
              {/* <div>{currentAddress}</div> */}
              <div>{element.email}</div>
              <div>{element.phone}</div>
              {element.pets === true ? <div>Yes</div> : <div>No</div>}
              <div>{element.due_date}</div>
              {admin === true && element.approved === false ? <button 
                className='submit' 
                onClick={() => approve(element)}>Approve</button> : null}
            </div>
          )
        })
      }

    return (
        <div>
            {mapIt(tenantRequests)}
        </div>
    )
}

function mapStateToProps(state) {
    console.log('state:', state)
    return {
      email: state.email,
      user_id: state.user_id,
      admin: state.admin,
      approved: state.approved
    }
}

export default connect(mapStateToProps)(TenantRequestList)