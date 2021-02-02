import axios from 'axios'
import React, {useState} from 'react'
import TenantList from '../Tenants/TenantList'
import TenantRequestList from '../Tenants/TenantRequestList'

const Tenants = props => {
    const [newTenantDisplay, setNewTenantDisplay] = useState(false)
    const [currentTenants, setCurrentTenants] = useState([])
    const [submitTenant, setSubmitTenant] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [propId, setPropId] = useState()
    const [dueDate, setDueDate] = useState('')
    const [password, setPassword] = useState('')
    const [petBool, setPetBool] = useState(null)

    function newTenant() {
        console.log('clicked')
        setSubmitTenant(false)
        setNewTenantDisplay(true)          
    }

    function submit() {
        console.log('submitted')
        
        axios.post('/api/manager/tenants', {
            first_name: firstName,
            last_name: lastName,
            phone: phone,
            email: email,
            pet: petBool !== null ? petBool : false,
            is_approved: true,
            prop_id: propId,
            password: password,
            due_date: dueDate
        })
        .then(res => {
            setSubmitTenant(true)
            setNewTenantDisplay(false)
            setFirstName('')
            setLastName('')
            setPhone('')
            setEmail('')
            setPetBool(null)
            setPropId()
            setPassword('')
            setDueDate('')
            axios.get('/api/manager/tenants/true')
            .then(res => {
                setCurrentTenants(res.data)
            })
            .catch(err => console.log(err))
        })
    }

    function checkbox(checkbox) {
        if (checkbox.checked === true) {
            setPetBool(true)
        } else if (checkbox.checked === false){
            setPetBool(false)
        }
    }

 return (
  <div>
      <div>
          <div>
            <h1>Current Tenants</h1>
            <TenantList setCurrentTenants={setCurrentTenants} currentTenants={currentTenants}/>
          </div>
          <div>
            <h1>Tenant Requests</h1>
            <TenantRequestList setCurrentTenants={setCurrentTenants} />
          </div>
          <button className="submit" onClick={newTenant}>New Tenant</button>
      </div>
      {newTenantDisplay === true ? (
        <div>
            <div>
                <div>
                    <div>First Name: </div>
                    <input onChange={e => setFirstName(e.target.value)}></input> 
                </div>
                <div>
                    <div>Last Name: </div>
                    <input onChange={e => setLastName(e.target.value)}></input> 
                </div>
                <div>
                    <div>Property ID: </div>
                    <input onChange={e => setPropId(e.target.value)}></input> 
                </div>
            </div>
            <div>
                <div>
                    <div>Phone: </div>
                    <input onChange={e => setPhone(e.target.value)}></input> 
                </div>
                <div>
                    <div>Email: </div>
                    <input onChange={e => setEmail(e.target.value)}></input> 
                </div>
                <div>
                    <div>Password: </div>
                    <input onChange={e => setPassword(e.target.value)}></input> 
                </div>
            </div>
            <div>
                <div>
                    <div>Due Date: </div>
                    <input onChange={e => setDueDate(e.target.value)}></input> 
                </div>
                <div>
                    <input type='checkbox' name='pets' id='pets' onClick={() => checkbox(document.getElementById('pets'))}></input>
                    <label htmlFor={'pets'}>Pets?</label>
                </div>
                <div>
                    <button className='Submit' onClick={submit}>Submit</button> 
                </div>
            </div>
        </div>) : null}
  </div>
 )
}
export default Tenants