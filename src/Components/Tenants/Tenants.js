import React, {useState} from 'react'
import TenantList from '../Tenants/TenantList'
import TenantRequestList from '../Tenants/TenantRequestList'

const Tenants = props => {
    const [newTenantDisplay, setNewTenantDisplay] = useState(false)
    const [submitTenant, setSubmitTenant] = useState(false)

    function newTenant() {
        console.log('clicked')
        setSubmitTenant(false)
        setNewTenantDisplay(true)          
    }

    function submit() {
        console.log('submitted')
        setSubmitTenant(true)
        setNewTenantDisplay(false)
    }

 return (
  <div>
      <div>
          <div>
            <h1>Current Tenants</h1>
            <TenantList />
          </div>
          <div>
            <h1>Tenant Requests</h1>
            <TenantRequestList />
          </div>
          <button className="submit" onClick={newTenant}>New Tenant</button>
      </div>
      {newTenantDisplay === true ? (
        <div>
            <div>
                <div>
                    <div>Name: </div>
                    <input></input> 
                </div>
                <div>
                    <div>Address: </div>
                    <input></input> 
                </div>
            </div>
            <div>
                <div>
                    <div>Phone: </div>
                    <input></input> 
                </div>
                <div>
                    <div>Email: </div>
                    <input></input> 
                </div>
            </div>
            <div>
                <div>
                    <div>Password: </div>
                    <input></input> 
                </div>
                <div>
                    <div>Due Date: </div>
                    <input></input> 
                </div>
            </div>
            <div>
                <div>
                    <div>Password: </div>
                    <input></input> 
                </div>
                <div>
                    <input type='radio' placeholder='Pets: '></input>
                    <button className='Submit' onClick={submit}>Submit</button> 
                </div>
            </div>
        </div>) : null}
  </div>
 )
}
export default Tenants