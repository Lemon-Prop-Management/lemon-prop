import React, { useState } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { loginUser } from '../../redux/reducer'
import { Link } from 'react-router-dom'
import Popup from '../Popup'

const Login = props => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const togglePopup = () => {
    setIsOpen(!isOpen)
  }

  const inceptionTogglePopup = () => {
    setIsOpen(!isOpen)
  }

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
      <input type="button"
        value="Login (popup)"
        onClick={togglePopup} />
      {isOpen && <Popup content={<>
        <b>Lemon Prop Mgmt</b>
        <p>Just a placeholder for any extra text we may need here</p>
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
        <button onClick={e => submit()}>Log in</button>

        {/* Request access */}
        <p>Request access to the portal</p>
        <input type="button"
          value="Request access"
          onClick={inceptionTogglePopup}
        />
      </>}
        handleClose={togglePopup} />
      }
      {/* {isOpen && <Popup content={<>
        <b>Lemon Prop Mgmt</b>
        <p>Fill out your information below and we'll send you an activation link via email. To best match your account, please use the same information provided to your Property Manager.</p>
        <input
          placeholder='First Name'
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
        <button onClick={e => submit()}>Log in</button>
      </>}
        handleClose={togglePopup} />
      } */}
    </div>
  )
}


export default connect(null, { loginUser })(Login)