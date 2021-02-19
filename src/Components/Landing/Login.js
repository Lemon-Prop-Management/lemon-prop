import React, { useState } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { loginUser } from '../../redux/reducer'
import Popup from '../Popup'
import { useForm } from 'react-hook-form'
import '../../scss/main.scss'
import logo from '../../img/lemon_prop.png'

const Login = props => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    console.log(data)
  }

  const togglePopup = () => {
    setIsOpen(!isOpen)
  }

  function submit() {
    axios.post('/auth/login', { email, password })
      .then((res) => {
        // console.log('login successful - 1')
        props.loginUser(res.data.email, res.data.user_id, res.data.admin, res.data.approved, res.data.prop_id)
        props.history.push('/dashboard')
      })
      .catch(err => console.log(err))
  }

  return (
    <div className='login-page'>
      {/* <input
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
      <button onClick={e => submit()}>Login</button>
      <button>I need access</button> */}
      <input className="btn-1" type="button"
        value="Login"
        onClick={(e) => togglePopup()}
      />


      {/* THIS IS THE POPUP THAT APPEARS WHEN "LOGIN" IS CLICKED ON THE LANDING PAGE */}
      {isOpen ? <Popup content={<>
        <div className="popup-header">
          {/* <img className="logo" src={logo} ></img> */}
          <h2>Lemon Prop Mgmt</h2>
        </div>
        <div className="member-login">
          <p>Please login with your email and password</p>
          <div>

            <input
              placeholder='Email'
              type="text"
              value={email}
              onChange={e => setEmail(e.target.value)}>
            </input>
            <input
              placeholder='Password'
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}>
            </input>
          </div>
          <button className="btn-1" type="button" onClick={e => submit()}>Log in</button>
        </div>
        {/* Request access */}
        <div className="login-request">
          <h2>Request access to the portal</h2>
          <p>Need access? Fill out your information below and we'll send you an activation link via email. To best match your account, please use the same information provided to your Property Manager.</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" name="first name" placeholder="First Name" ref={register({ required: true })} />
            <input type="text" name="last name" placeholder="Last Name" ref={register({ required: true })} />
            <input type="tel" name="phone" placeholder="Phone number" ref={register({ required: true, minLength: 6, maxLength: 12 })} />
            <input type="text" name="email" placeholder="Email address" ref={register({ required: true, pattern: /^\S+@\S+$/i })} />
            {/* <input type="radio" name="pets" placeholder="Pets" ref={register} />Pets */}
            <button className="btn-1" type="button">Submit</button>
          </form>
        </div>
      </>}
        handleClose={togglePopup} />
        :
        null
      }

    </div>
  )
}


export default connect(null, { loginUser })(Login)