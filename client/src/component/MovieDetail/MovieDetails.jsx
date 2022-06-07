import React, {useState, useEffect, useContext} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../context/context'
import './movie.css'


const MovieDetails = () => {
    const initialState={
        name:'',
        description:'',
        releasedate:'',
        rating:'',
        country:'',
        ticketprice:'',
        genre:'',
        photo:''

    }

    const {movieDetails1} = useContext(UserContext)

    const [errorm, setErrorm] = useState('')

    const [successm, setSuccessm] = useState('')

    const [userMessage, setUserMessage] = useState('')

    const [movieDetails, setMovieDetails] = useState(movieDetails1)

    const {name, description, releasedate, rating, country,ticketprice,genre, photo} = movieDetails

    const user = localStorage.getItem("user")
    const userEmail =  user? JSON.parse(user )?.email : ''

    const token = localStorage.getItem("token")
    const userToken =token? JSON.parse(token) : ''
    
    const commentForm = () => {
        // setError('')
        // setSuccess('')
        console.log(userEmail, user)
        console.log(userToken, token)
        if(!userEmail){
            setErrorm('User unauthorized')
            return
        }
        axios.post('/api/comments', {
            email: userEmail, 
            message: userMessage
        },{
            headers: {'x-api-key': userToken}
        }).then(response => {
            switch (response.status){
                case 200:
                    setSuccessm(response.data.message)
                break;
            }
            console.log(response.data.message, 'Azeez')
            // setUserMessage(response.data)
           
        }).catch((err)=>{
            // err.response.data
            setErrorm(err.response.data.message)
            console.log(err.response.data, 'Baba')
            switch (err.response.status) {
        
                // case 200:
                //     setSuccessm(err.response.data.msg)
                //   const errorAccess = JSON.stringify(response.data?.error)
                //   localStorage.setItem('error', errorAccess)
          
                //   const success = JSON.stringify(response.data?.success)
                //   localStorage.setItem('success', success)
          
                //   navigate('/')
                //   break;
          
                case 400:
                    setErrorm(err.response.data)
                  console.log(400)
                  break;
          
                case 401:
                    setErrorm(err.response.data)
                  console.log(401)
                  break;
          
                case 500:
                    setErrorm(err.response.data)
                 console.log(500)
                  break;
              
                
              }
        })
    } 


  return (
      <>
    <section>
      <Link to="/">
      back home
      </Link>

      <h2 className=''>Movie Details</h2>
        <div className=''>
          <div className=''>
            <h1 className='err'>{errorm}</h1>  
             <h1 className='suc'>{successm}</h1>
            <p>
              <span className=''>Name :</span> {name}
            </p>
            <p>
              <span className=''>Description :</span> {description}
            </p>
            <p>
              <span className=''>Releasedate :</span> {releasedate}
            </p>
            <p>
              <span className=''>Rating :</span> {rating}
            </p>
            <p>
              <span className=''>Country :</span> {country}
            </p>
            <p>
              <span className=''>Ticketprice :</span> {ticketprice}
            </p>
            <p>
              {/* <span className=''>Photo :</span> {photo} */}
              <img src={photo} alt="photo" />
            </p>
            <p>
              <span className=''>Genre :</span> {genre}
            </p>

            </div>
            </div>
    </section>

    <section>
        <input type="text" placeholder='Enter your comment' onInput={(e) => setUserMessage(e.target.value)} />
        <button type='submit' onClick={commentForm}>Submit</button>
    </section>

    </>
  )
}

export default MovieDetails