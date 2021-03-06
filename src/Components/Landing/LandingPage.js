import React from 'react'
import Login from './Login'
import '../../scss/_landing.scss'
import logo from '../../img/lemon_prop.png'
import rental1 from '../../img/rental1.png'
import rental2 from '../../img/rental2.png'
import rental7 from '../../img/rental7.png'

const LandingPage = props => {
  return (
    <div className="landing">
      <div className="grid">
        <div className="diamond-sm"></div>
        <div className="diamond-med"></div>
        <div className="diamond-big"></div>
      </div>

      <div className="header">
        <img className="logo" src={logo} ></img>
        <h1 className="main-title">LemonProp Management</h1>
        {/* The Login that is rendered below will eventually be moved to an onClick function for a popover. We are displaying it now to test further functionality while we are still getting the popover up and running */}
        <Login {...props} />
      </div>

      <div className="landing-middle">
        <h2>Finding a home?</h2>
        <h1>EASY.</h1>
        <hr />
        <h3>Checkout some of our properties:</h3>
      </div>

      <div className="rental-row">
        <div className="rental-container">
          <img src={rental1} ></img>
        </div>
        <div className="rental-container">
          <img src={rental2} ></img>
        </div>
        <div className="rental-container">
          <img src={rental7} ></img>
        </div>
      </div>

    </div>

  )
}
export default LandingPage