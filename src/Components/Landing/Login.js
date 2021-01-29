import React, { useState } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { loginUser } from '../../redux/reducer'
import { Link } from 'react-router-dom'

const Login = props => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function submit() {
    setEmail(email)
    setPassword(password)
    axios.post('/auth/login', { email, password })
      .then((res) => {
        props.loginUser({
          email: email,
          admin: res.data.admin,
          approved: res.data.approved
        })
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
      <Link to='/dashboard'>
        <button onClick={e => submit()}>Login</button>
      </Link>
      <button>I need access</button>
    </div>
  )
}


export default connect(null, { loginUser })(Login)