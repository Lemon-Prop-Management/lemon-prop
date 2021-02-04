import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

const PropertiesList = props => {
    const {setCurrentProperties, currentProperties} = props
    const [admin, setAdmin] = useState(true)
    const [address, setAddress] = useState('')
    const [leaseAmt, setLeaseAmt] = useState()
    const [leaseStatus, setLeaseStatus] = useState(null)
    const [buttonId, setButtonId] = useState()
    const [editBool, setEditBool] = useState(false)

    useEffect(() => {
        setAdmin(props.admin)
      }, [])
    
      useEffect(() => {
  
         if (admin === true) {
          axios.get('/api/manager/properties')
            .then(res => {
              setCurrentProperties(res.data)
            })
            .catch(err => console.log(err))
        }
      }, [props])
  
      function clickEdit(id) {
          setEditBool(true)
          setButtonId(id)
      }
  
      function checkbox(checkbox) {
          if (checkbox.checked === true) {
              setLeaseStatus(true)
          } else if (checkbox.checked === false){
              setLeaseStatus(false)
          }
      }
  
      function submit(element) {
          axios.put(`/api/manager/properties/${element.prop_id}`, {
              address: address !== '' ? address : element.address,
              leaseAmt: leaseAmt !== undefined ? leaseAmt : element.lease_amt,
              status: leaseStatus !== null ? leaseStatus : element.lease_status
          })
          .then(res => {
                setEditBool(false)
                setAddress('')
                setLeaseAmt()
                setLeaseStatus(null)
              axios.get('/api/manager/properties')
              .then(res => {
                  setCurrentProperties(res.data)
              })
              .catch(err => console.log(err))
          })
          .catch(err => console.log(err))
      }
  
      function mapIt(array) {
          return array.map((element) => {
            return (
              <div key={element.prop_id}>
              <button onClick={() => clickEdit(element.prop_id)}>Edit</button>
                {editBool === false ? (
                  <div>
                      <div>{element.prop_id}</div>
                      <div>{element.address}</div>
                      <div>{`$${element.lease_amt}`}</div>
                      {element.lease_status === true ? <div>Yes</div> : <div>No</div>}
                  </div>
                  ) : (
                      element.prop_id === buttonId ? (
                      <div>
                          <div>{element.prop_id}</div>
                          <input defaultValue={element.address} onChange={e => setAddress(e.target.value)}></input>
                          <input defaultValue={element.lease_amt} onChange={e => setLeaseAmt(e.target.value)}></input>
                          <input type='checkbox' name='leaseStatus' id='leaseStatus' defaultChecked={element.lease_status} onClick={() => checkbox(document.getElementById('leaseStatus'))}></input>
                          <label htmlFor={'leaseStatus'}>Active Lease?</label>
                          <button className='submit' onClick={() => submit(element)}>Save</button>
                       </div>
                      ) : (
                          <div>
                              <div>{element.prop_id}</div>
                                <div>{element.address}</div>
                                <div>{`$${element.lease_amt}`}</div>
                                {element.lease_status === true ? <div>Yes</div> : <div>No</div>}
                          </div>
                      )
                  )
                }
              </div>
            )
          })
        }
  
      return (
          <div className='maint-req'>
              {mapIt(currentProperties)}
          </div>
      )
  }
  
  function mapStateToProps(state) {
      return {
        email: state.email,
        user_id: state.user_id,
        admin: state.admin,
        approved: state.approved
      }
  
}
export default connect(mapStateToProps)(PropertiesList)