import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

const TenantRequestList = props => {

    const [tenantRequests, setTenantRequests] = useState([])
    const [addresses, setAddresses] = useState([])
    const [admin, setAdmin] = useState(props.admin)
    // const [firstName, setFirstName] = useState('')
    // const [lastName, setLastName] = useState('')
    // const [email, setEmail] = useState('')
    // const [phone, setPhone] = useState('')
    // const [propId, setPropId] = useState()
    // const [buttonId, setButtonId] = useState()
    // const [petBool, setPetBool] = useState(null)
  
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
    }, [])

    function mapIt(array) {
        let currentAddress
        return array.map((element) => {
            for (let i = 0; i < addresses.length; i++) {
               if (element.prop_id === addresses[i].prop_id) {
                currentAddress = addresses[i].address
            }  
        }
           
          return (
            <div key={element.user_id}>
              <div>{element.user_id}</div>
              <div>{`${element.first_name} ${element.last_name}`}</div>
              <div>{currentAddress}</div>
              <div>{element.email}</div>
              <div>{element.phone}</div>
              {element.pets === true ? <div>Yes</div> : <div>No</div>}
              <div>{element.due_date}</div>
              {admin === true && element.approved === false ? <button>Approve</button> : null}
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