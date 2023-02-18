import React from 'react'
import {Link} from 'react-router-dom'
import loginpic from '../asset/loginpic.png'
import logo from '../asset/logo.png'
import google from '../asset/google.png'
function Login() {
  return (
    <div>
      {/* <div><img className='logo' src={logo} alt='logo' /></div> */}
      <div className='login-container'>
        <div className='loginvectordiv'>
          <img className='loginvector' src={loginpic} alt="img" />
        </div>

        <div className='Login-form'>
          <h1 className='Login-Title'>Hello There!</h1>

          <div className='Name input'>
            <label>Name</label>
            <input type="text" placeholder=' Name'/>
          </div>
          <div className='Email input'>
            <label>Email Id</label>
            <input type="email" placeholder=' Email id'/>
          </div>
          <div className='Password input'>
            <label>Password</label>
            <input type="password" placeholder=' Password'/>
          </div>
          <div className='Password input'>
            <label>Confirm Password</label>
            <input type="password" placeholder=' Confirm Password'/>
          </div>
          <div>
            <button className='Signup-button'>Signup</button>
          </div>
          <div>
            <button className='Google-button'><div className='flex'><img className='google' src={google} alt=""/> Continue with Google</div></button>
          </div>
          <div>
            <p className='Login-Title'>Already have an account <Link to="Login">Signin</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
