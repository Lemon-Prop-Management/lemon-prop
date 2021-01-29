import React from 'react'
import Login from './Login'


const LandingPage = props => {
 return (
  <div>
   <h1>Landing Page</h1>
   {/* The Login that is rendered below will eventually be moved to an onClick function for a popover. We are displaying it now to test further functionality while
   we are still getting the popover up and running */}
   <Login />
  </div>
 )
}
export default LandingPage