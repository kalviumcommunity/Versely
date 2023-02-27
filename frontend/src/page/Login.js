import React,{useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import loginpic3 from '../asset/loginpic3.png'
import logo from '../asset/logo.png'
import google from '../asset/google.png'


function Login() {
  const navigate = useNavigate()
  const [password,setPassword] = useState("")
  const [email,setEmail] = useState("")
  const [error,setError] = useState("")
  const [message,setMessage] = useState("")

  const PostData = ()=>{
    fetch("/api/user/signin",{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        password,
        email
      })
    }).then(res=>res.json())
    .then(data=>{
      console.log(data)
      if(data.error){
        setError(data.error)
      }
      else{
        setMessage(data.message)
        setTimeout(() => {
          navigate('/')
        }, 2000);
      }
    }).catch(err=>{
      console.log(err)
    })
  }

  return (
    <div>
      <div className='login-container'>
        <div className='loginvectordiv'>
          <img className='loginvector3' src={loginpic3} alt="img" />
        </div>

        <div className='Login-form'>
        <div><img className='logo' src={logo} alt='logo' /></div>
        <br /><br/>
          <div className='Email input'>
            <label>Email Id</label>
            <input type="email" 
            placeholder=' Email id'
            value={email} 
            onChange={(e)=>setEmail(e.target.value)}/>
          </div>
          <div className='Password input'>
            <label>Password</label>
            <input type="password" 
            placeholder=' Password'
            value={password} 
            onChange={(e)=>setPassword(e.target.value)}/>
          </div>
          {error && (
          <p className="error"> {error} </p>
          )}
          {message && (
          <p className="message"> {message} </p>
          )}
          <div>
            <button className='Signup-button' onClick={()=>PostData()}>Signin</button>
          </div>
          <div>
            <button className='Google-button'><div className='flex'><img className='google' src={google} alt=""/> Continue with Google</div></button>
          </div>
          <div>
            <p className='Login-Title'>Don't have an account ?<Link to="/Signup">Signup</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
