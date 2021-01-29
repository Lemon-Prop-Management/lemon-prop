import React, { useState } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { loginUser } from '../../redux/reducer'
import { Link } from 'react-router-dom'

const Login = props => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function submit() {
    // setEmail(email)
    // setPassword(password)
    axios.post('/auth/login', { email, password })
      .then((res) => {
        console.log('login successful - 1')
        props.loginUser(res.data.email, res.data.user_id, res.data.admin, res.data.approved)
        console.log('login successful - 2')
        props.history.push('/dashboard')
      })
      .catch(err => console.log(err))
  }

  return (
    <div>
      <input
        placeholder='Email'
        type="text"
        value={email}
        onChange={e => setEmail(e.target.value)}>
      </input>
      <input
        placeholder='Password'
        type="text"
        value={password}
        onChange={e => setPassword(e.target.value)}>
      </input>
      {/* <Link to='/dashboard'> */}
        <button onClick={e => submit()}>Login</button>
      {/* </Link> */}
      <button>I need access</button>
    </div>
  )
}


export default connect(null, { loginUser })(Login)