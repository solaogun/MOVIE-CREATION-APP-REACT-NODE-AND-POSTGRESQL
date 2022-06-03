import React, {useState} from 'react'
import './login.css'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'


             
const Login = () => {
  const navigate = useNavigate()

  const initialState = {
    username:'',
    email:'',
    password:''
  }

  

  const [user, setUser] = useState(initialState)
 
  const {username, email, password} = user

  const handleChange = (e) => {
    e.preventDefault()
    const name = e.target.name
    const value = e.target.value
    setUser({...user, [name]:value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post("http://localhost:3300/api/user/login", {username,email,password}).then(response =>{
     setUser(response.data)
     console.log(response.data[0])
     switch (response.status) {
        
      case 200:
        const tokenAccess = JSON.stringify(response.data[0].token)
        localStorage.setItem('token', tokenAccess)

        const user = JSON.stringify(response.data[0])
        localStorage.setItem('user', user)

        // navigate('/')
        break;

      case 400:
        console.log(400)
        break;

      case 401:
        console.log(401)
        break;

      case 500:
       console.log(500)
        break;
    
      default:
        break;
    }
    //  console.log(user)
      navigate('/')
    }).catch((err)=>{console.log(err, "error")
    })
  }


  return (
    <div className='login-con'>
      <div className="login">
        <div className="login-header">
          <h1 className="tag">Welcome to Movie Creation App</h1>
        </div>
          <form className='login-form' onSubmit={handleSubmit}>

          <h3>Username:</h3>
          <input type="text" placeholder="Enter your email" name="username" id="username" value={username} onChange={handleChange} />

          <h3>Email:</h3>
          <input type="text" placeholder="Enter your email" name="email" id="email" onChange={handleChange} />

           <h3>Password:</h3>
          <input type="text" placeholder="Enter your password" name="password" id="password" onChange={handleChange} />

          <input type="submit" className="button"  value="Login button" />

          <p className="login-text">Not a member?<Link to="/Register" className='login-text'>Sign Up</Link></p>

          <Link to="/forgot" className="login-text">Forgot your password</Link>

          {/* <p class="login-term"> you agree to our terms</p> */}
          </form>
        </div>
      {/* </div> */}
    </div>
  )
}

export default Login