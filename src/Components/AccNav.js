import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../redux/reducer'

const AccNav = props => {
  return (
    <div>
      {
        !props.email ? (
          <nav className='display-none'></nav>
        ) : (
            props.admin ? (
              <nav>
                <h1>LemonProp</h1>
                <div>
                  <Link to='/dashboard'>Home</Link>
                  <Link to='/payments'>Payments</Link>
                  <Link to='/maintreq'>Requests</Link>
                  <Link to='/properties'>Properties</Link>
                  <Link to='/tenants'>Tenants</Link>
                </div>
                <Link to='/'>Logout</Link>
              </nav>
            ) : (
                <nav>
                  <div>
                    <Link to='/dashboard'>Home</Link>
                    <Link to='/payments'>Payments</Link>
                    <Link to='/maintreq'>Requests</Link>
                  </div>
                  <Link to='/'>Logout</Link>
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

export default withRouter((connect(mapStateToProps, { loginUser })(AccNav)))