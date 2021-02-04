import React from 'react'
import Login from './Login'
import '../../scss/_landing.scss'
import logo from '../../img/lemon_prop.png'
/*
https://stackoverflow.com/questions/40982337/rotated-squares-as-an-image
*/

const LandingPage = props => {
  return (
    <div className="landing">
      <div className="header">
        <img className="logo" src={logo} ></img>
        <h1>Lemon Prop Management</h1>
        {/* The Login that is rendered below will eventually be moved to an onClick function for a popover. We are displaying it now to test further functionality while we are still getting the popover up and running */}
        <Login {...props} />
      </div>
          <div class="grid">
            <div id="diamond1" class="diamond-med"></div>
            <div id="diamond2" class="diamond-sm"></div>
            <div id="diamond3" class="diamond-big"></div>
          </div>
    </div>

  )
}
export default LandingPage