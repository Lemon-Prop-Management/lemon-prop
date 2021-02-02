import { Switch, Route } from 'react-router-dom'
import React from 'react'
import LandingPage from './Components/Landing/LandingPage'
import TheDashboard from './Components/AccountDash/TheDashboard'
import RequestAccess from './Components/Landing/RequestAccess'
import RequestSubmitted from './Components/Landing/RequestSubmitted'
import MaintReq from './Components/MaintReq/MaintReq'
import SingleMaintReq from './Components/MaintReq/SingleMaintReq'
import RequestReset from './Components/PasswordReset/RequestReset'
import UpdatePassword from './Components/PasswordReset/UpdatePassword'
import Payments from './Components/Payments/Payments'
import Properties from './Components/Properties/Properties'
import Tenants from './Components/Tenants/Tenants'
// import MaintReqList from './components/MaintReq/MaintReq'
// import RequestSubmitted from './components/MaintReq/RequestSubmitted'
// import MakePayment from './components/Payments/MakePayment'
// import PaymentList from './components/Payments/PaymentList'

export default (
  <Switch>
    <Route exact path='/' component={LandingPage} />
    <Route exact path='/dashboard' component={TheDashboard} />
    <Route exact path='/payments' component={Payments} />
    <Route exact path='/maintreq' component={MaintReq} />
    <Route exact path='/maintreq/request' component={SingleMaintReq} />
    <Route exact path='/properties' component={Properties} />
    <Route exact path='/tenants' component={Tenants} />
    <Route exact path='/requestreset' component={RequestReset} />
    <Route exact path='/reset/:token' component={UpdatePassword} />
    <Route exact path='/requestaccess' component={RequestAccess} />
    <Route exact path='/requestaccess/submitted' component={RequestSubmitted} />
    {/* will probably need a route for stripe to actually make the payment 
    <Route exact path='/' component={}/>*/}
  </Switch>
)