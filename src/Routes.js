import { Switch, Route } from 'react-router-dom'
import React from 'react'
import LandingPage from './components/Landing/LandingPage'
import TheDashboard from './components/AccountDash/TheDashboard'
import RequestAccess from './components/Landing/RequestAccess'
import RequestSubmitted from './components/Landing/RequestSubmitted'
import MaintReq from './components/MaintReq/MaintReq'
import SingleMaintReq from './components/MaintReq/SingleMaintReq'
import RequestReset from './components/PasswordReset/RequestReset'
import UpdatePassword from './components/PasswordReset/UpdatePassword'
import Payments from './components/Payments/PaymentList'
import Properties from './components/Properties/Properties'
import Tenants from './components/Tenants/Tenants'
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