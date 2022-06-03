import React, {useState} from 'react'
import './register.css'
import axios from 'axios'
// import {useHistory} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate()

  const initialState = {
    username:'',
    email:'',
    password:''
  }

  const [user, setUser] = useState(initialState)
  const {email, password} = user

  const handleChange = (e) => {
    e.preventDefault()
    const {name, value} = e.target
    setUser({...user, [name]:value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3300/api/user/register', 
                user, 
                // {
                //   headers:{
                //     "Content-Type" : "application/json"
                //   }
                // }
    ).then(response => {
      console.log(response.data, "data")
      setUser(response.data)
      console.log(user)
      switch (response.status) {
        
        case 200:
          const tokenAccess = JSON.stringify(response.data?.token)
          localStorage.setItem('token', tokenAccess)

          const user = JSON.stringify(response.data?.user)
          localStorage.setItem('user', user)

          navigate('/')
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
    }).catch((err)=>{console.log(err, "error")
      
      
      // navigate('/')
    })
  }
  return (
    <div className='signUp-con'>
      <div className="signUp">
          <div className='signUp-header'>
          <h4 className="tag">You are 2 click away</h4>
          </div>

          <form className='signUp-form' onSubmit={handleSubmit}>
          <h3>Username:</h3>
          <input type="text" placeholder="Enter your username" name="username" id="username" onChange={handleChange} />

          <h3>Email:</h3>
          <input type="text" placeholder="Enter your email" name="email" id="email" onChange={handleChange} />
          
          <h3>Password:</h3>
          <input type="password" placeholder="Enter your password" name="password" id="password" onChange={handleChange}/>
    
          <input type="submit" className="button"  value="SignUp button" />
    
          <p className="signUp-text">Not a member?<a>Sign Up</a></p>
    
          <a href="" className="login-link">Forgot your password</a>
    
          <p className="login-term">Terms and Condition Apply</p>
          </form>
        </div>
     </div>

   
  )
}

export default Register