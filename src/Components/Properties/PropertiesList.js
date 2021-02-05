import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

const PropertiesList = props => {
  const { setCurrentProperties, currentProperties } = props
  const [address, setAddress] = useState('')
  const [leaseAmt, setLeaseAmt] = useState()
  const [leaseStatus, setLeaseStatus] = useState(null)
  const [buttonId, setButtonId] = useState()
  const [editBool, setEditBool] = useState(false)
  const { user_id, admin } = props

  useEffect(() => {
    if (admin === true) {
      axios.get('/api/manager/properties')
        .then(res => {
          setCurrentProperties(res.data)
        })
        .catch(err => console.log(err))
    }
  }, [user_id])

  function clickEdit(id) {
    setEditBool(true)
    setButtonId(id)
  }

  function checkbox(checkbox) {
    if (checkbox.checked === true) {
      setLeaseStatus(true)
    } else if (checkbox.checked === false) {
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
          <div>
            {editBool === false ? (
              <div className='row'>
                <button className="btn-edit" onClick={() => clickEdit(element.prop_id)}>Edit</button>
                <div className='list-item'>{element.prop_id}</div>
                <div className='list-item'>{element.address}</div>
                <div className='list-item'>{`$${element.lease_amt}`}</div>
                <div className='list-item'>{element.lease_status === true ? 'Yes' : 'No'} </div>
              </div>
            ) : (
                element.prop_id === buttonId ? (
                  <div className='row'>
                    <div>{element.prop_id}</div>
                    <input className='list-item' defaultValue={element.address} onChange={e => setAddress(e.target.value)}></input>
                    <input className='list-item' defaultValue={element.lease_amt} onChange={e => setLeaseAmt(e.target.value)}></input>
                    <input className='list-item' type='checkbox' name='leaseStatus' id='leaseStatus' defaultChecked={element.lease_status} onClick={() => checkbox(document.getElementById('leaseStatus'))}></input>
                    <label htmlFor={'leaseStatus'}>Active Lease?</label>
                    <button className='submit btn-save' onClick={() => submit(element)}>Save</button>
                  </div>
                ) : (
                    <div >
                      <div className='list-item'>{element.prop_id}</div>
                      <div className='list-item'>{element.address}</div>
                      <div className='list-item'>{`$${element.lease_amt}`}</div>
                
                      <div className='list-item'>{element.lease_status === true ? 'Yes' : 'No'} </div>

                    </div>
                  )
              )
            }
          </div>
        </div>
      )
    })
  }

  return (
    <div className='sub-page'>
      <div className='row properties-titles'>
                {/* <div className='list-item list-title'>{null}</div> */}
                <div className='list-item list-title'>Property ID</div>
                <div className='list-item list-title'>Address</div>
                <div className='list-item list-title'>Lease Amount</div>
                <div className='list-title list-item'>Occupied?</div>
            </div>
      {mapIt(currentProperties)}
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
export default connect(mapStateToProps)(PropertiesList)