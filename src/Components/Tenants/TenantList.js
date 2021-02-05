import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

const TenantList = props => {
  const { setCurrentTenants, currentTenants } = props
  const [addresses, setAddresses] = useState([])
  const [editBool, setEditBool] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [propId, setPropId] = useState()
  const [buttonId, setButtonId] = useState()
  const [petBool, setPetBool] = useState(null)
  const { user_id, admin } = props

  useEffect(() => {
    if (admin === true) {
      axios.get('/api/manager/tenants/true')
        .then(res => {
          setCurrentTenants(res.data)
        })
        .catch(err => console.log(err))
      axios.get('/api/manager/properties')
        .then(res => {
          setAddresses(res.data)
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
      setPetBool(true)
    } else if (checkbox.checked === false) {
      setPetBool(false)
    }
  }

  function submit(element) {
    axios.put(`/api/manager/tenants/${element.user_id}`, {
      first_name: firstName !== '' ? firstName : element.first_name,
      last_name: lastName !== '' ? lastName : element.last_name,
      phone: phone !== '' ? phone : element.phone,
      email: email !== '' ? email : element.email,
      pet: petBool !== null ? petBool : element.pet,
      is_approved: true,
      prop_id: propId ? propId : element.prop_id
    })
      .then(res => {
        setEditBool(false)
        setFirstName('')
        setLastName('')
        setPhone('')
        setEmail('')
        setPetBool(null)
        setPropId()
        axios.get('/api/manager/tenants/true')
          .then(res => {
            setCurrentTenants(res.data)
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  }

  function mapIt(array) {
    let currentAddress
    return array.map((element) => {
      let date = element.due_date.slice(0, 10)
      for (let i = 0; i < addresses.length; i++) {
        if (element.prop_id === addresses[i].prop_id) {
          currentAddress = addresses[i].address
        }
      }
      return (
        <div key={element.user_id} >
           <div >
         
            {editBool === false ? (
              <div className='row tenant-row'>
                <button className="btn-edit" onClick={() => clickEdit(element.user_id)}>Edit</button>
                <div className='list-item tenant-item'>{element.user_id}</div>
                <div className='list-item  tenant-item'>{`${element.first_name} ${element.last_name}`}</div>
                <div className='list-item tenant-item'>{element.prop_id && currentAddress}</div>
                <div className='list-item tenant-item'>{element.email}</div>
                <div className='list-item tenant-item'>{element.phone}</div>
                {element.pet === true ? <div className='list-tem'>Yes</div> : <div className='list-tem'>No</div>}
                <div className='list-tem'>{date}</div>
              </div>
            ) : (
                element.user_id === buttonId ? (
                  <div className='row tenant-row'>
                    <div>{element.user_id}</div>
                    <input className='list-item' defaultValue={`${element.first_name}`} onChange={e => setFirstName(e.target.value)}></input>
                    <input className='list-item' defaultValue={`${element.last_name}`} onChange={e => setLastName(e.target.value)}></input>
                    <input className='list-item' defaultValue={element.prop_id} onChange={e => setPropId(e.target.value)}></input>
                    <input className='list-item' defaultValue={element.email} onChange={e => setEmail(e.target.value)}></input>
                    <input className='list-item' defaultValue={element.phone} onChange={e => setPhone(e.target.value)}></input>
                    <input className='list-item' type='checkbox' name='pets' id='pets' defaultChecked={element.pet} onClick={() => checkbox(document.getElementById('pets'))}></input>
                    <label htmlFor={'pets'}>Pets?</label>
                    <button className='submit btn-save' onClick={() => submit(element)}>Save</button>
                  </div>
                ) : (
                    <div className='row tenant-row'>
                      <div className='list-item tenant-item'>{element.user_id}</div>
                      <div className='list-item tenant-item'>{`${element.first_name} ${element.last_name}`}</div>
                      <div className='list-item tenant-item'>{currentAddress}</div>
                      <div className='list-item tenant-item'>{element.email}</div>
                      <div className='list-item tenant-item'>{element.phone}</div>
                      {element.pets === true ? <div className='list-item tenant-item'>Yes</div> : <div className='list-item tenant-item' >No</div>}
                      <div className='list-item'>{date}
                      </div>
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
      {mapIt(currentTenants)}
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

export default connect(mapStateToProps)(TenantList)