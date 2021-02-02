import React, { useEffect } from 'react'
import axios from 'axios'
import routes from './Routes'
import AccountNavigation from './Components/AccountNavigation'
import './App.css';
// import { Provider } from 'react-redux'
// import { BrowserRouter, HashRouter } from 'react-router-dom'
// import store from './redux/store'
import { connect } from 'react-redux';
import { loginUser } from './redux/reducer'
// const Router = process.env.NODE_ENV === 'development' ? HashRouter : BrowserRouter

function App(props) {
  useEffect(() => {
    console.log(props)
    if (!props.user_id) {
      axios.get(`/auth/user`).then((res) => {
        console.log(res.data)
        props.loginUser(res.data.user_id);
      }).catch(err => console.log(err))
    }
  }, [props])
  return (
    <div className="App">
      <AccountNavigation />
      {routes}
    </div>
  );
}
function mapStateToProps(reduxState) { return reduxState }
export default connect(mapStateToProps, { loginUser })(App)