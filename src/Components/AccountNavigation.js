import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser, logout } from '../redux/reducer'
import axios from 'axios'
import lemon from '../img/lemon_prop.png'

const AccNav = props => {
  function logoutUser() {
    axios.delete('/auth/logout')
      .then((res) => {
        props.logout()
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="navigation-comp">
      {
        !props.email && !props.approved ? (
          null
        ) : (
            props.admin === true ? (
              <nav>
                <div className='nav-header'>
                  <img className='logo' src={lemon} />
                  <h1>LemonProp</h1>
                </div>
                <div className='links'>
                  <Link className='nav-link' id='home' to='/dashboard'>Home</Link>
                  <Link className='nav-link' to='/payments'>Payments</Link>
                  <Link className='nav-link' to='/maintreq'>Requests</Link>
                  <Link className='nav-link' to='/properties'>Properties</Link>
                  <Link className='nav-link' to='/tenants'>Tenants</Link>
                </div>

                <Link
                  to='/'
                  className='btn-1'
                  onClick={logoutUser}>
                  Logout
                </Link>

              </nav>
            ) : (
                <nav>
                  <div className='nav-header'>
                    <img className='logo' src={lemon} />
                    <h1>LemonProp</h1>
                  </div>
                  <div className='links'>
                    <Link className='nav-link' id='home' to='/dashboard'>Home</Link>
                    <Link className='nav-link' to='/payments'>Payments</Link>
                    <Link className='nav-link' to='/maintreq'>Requests</Link>
                  </div>
                  <Link
                    to='/'
                    className='btn-1'
                    onClick={logoutUser}>
                    Logout
                  </Link>

                </nav>
              )
          )
      }
    </div >
  )
}
function mapStateToProps(reduxState) {
  return {
    email: reduxState.user.email,
    admin: reduxState.user.admin,
    approved: reduxState.user.approved
  }
}

export default withRouter((connect(mapStateToProps, { loginUser, logout })(AccNav)))