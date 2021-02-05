import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser, logout } from '../redux/reducer'
import axios from 'axios'

const AccNav = props => {
  function logoutUser() {
    axios.delete('/auth/logout')
      .then((res) => {
        props.logout()
      })
      .catch(err => console.log(err))
  }

  return (
    <div>
      {
        !props.email && !props.approved ? (
          null
        ) : (
            props.admin === true ? (
              <nav>
                <h1>LemonProp</h1>
                <div className='links'>
                  <Link to='/dashboard'>Home</Link>
                  <Link to='/payments'>Payments</Link>
                  <Link to='/maintreq'>Requests</Link>
                  <Link to='/properties'>Properties</Link>
                  <Link to='/tenants'>Tenants</Link>
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
                  <h1>LemonProp</h1>
                  <div className='links'>
                    <Link to='/dashboard'>Home</Link>
                    <Link to='/payments'>Payments</Link>
                    <Link to='/maintreq'>Requests</Link>
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