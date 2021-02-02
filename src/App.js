import React, { useEffect } from 'react'
import axios from 'axios'
import routes from './Routes'
import AccountNavigation from './Components/AccountNavigation'
import './App.css';
import { connect } from 'react-redux';
import { loginUser } from './redux/reducer'

function App(props) {
  useEffect(() => {
    console.log(props)
    axios.get(`/auth/user`).then((res) => {
      console.log(res.data)
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
function mapStateToProps(reduxState) { return reduxState }
export default connect(mapStateToProps, { loginUser })(App)