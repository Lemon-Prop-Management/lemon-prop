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

  console.log(props.email)
  console.log(props.admin)
  console.log(props.approved)

  return (
    <div>
      {
        !props.email && !props.approved ? (
          <nav></nav>
        ) : (
            props.admin === true ? (
              <nav className="navigation">
                <h1>LemonProp</h1>
                <div>
                  <Link to='/dashboard'>Home</Link>
                  <Link to='/payments'>Payments</Link>
                  <Link to='/maintreq'>Requests</Link>
                  <Link to='/properties'>Properties</Link>
                  <Link to='/tenants'>Tenants</Link>
                </div>
                <button><Link to='/' onClick={logoutUser}>Logout</Link></button>
              </nav>
            ) : (
                <nav>
                  <div>
                    <Link to='/dashboard'>Home</Link>
                    <Link to='/payments'>Payments</Link>
                    <Link to='/maintreq'>Requests</Link>
                  </div>
                  <button><Link to='/' onClick={logoutUser}>Logout</Link></button>
                </nav>
              )
          )
      }
    </div>
  )
}
function mapStateToProps(reduxState) {
  return {
    email: reduxState.email,
    admin: reduxState.admin,
    approved: reduxState.approved
  }
}

export default withRouter((connect(mapStateToProps, { loginUser, logout })(AccNav)))