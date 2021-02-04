import React, { useEffect } from 'react'
import axios from 'axios'
import routes from './Routes'
import AccountNavigation from './Components/AccountNavigation'
import './App.css';
import { connect } from 'react-redux';
import { loginUser } from './redux/reducer'

function App(props) {
  useEffect(() => {
    axios.get(`/auth/user`).then((res) => {
      props.loginUser(res.data.email, res.data.user_id, res.data.admin, res.data.approved);
    }).catch(err => console.log(err))
  }, [])

  return (
    <div className="App">
      <AccountNavigation />
      {routes}
    </div>
  );
}
function mapStateToProps(reduxState) {
  console.log(reduxState);
  return reduxState
}
export default connect(mapStateToProps, { loginUser })(App)
