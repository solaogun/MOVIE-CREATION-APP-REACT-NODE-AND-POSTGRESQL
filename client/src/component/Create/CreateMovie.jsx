import React, {useState, useContext} from 'react'
import './create.css'
import Axios from 'axios'
// import {useContext} from 'react-router-dom'
import {UserContext} from './../context/context'
import { useNavigate } from 'react-router-dom'




const CreateMovie = () => {
  const navigate = useNavigate()

  const initialState = {
    name:'',
    description:'',
    releasedate:'',
    ticketprice:'',
    rating:'',
    photo:'',
    genre:'',
    country:'',
    slug:''
  }

  const{movies, setMovies} = useContext(UserContext)
  // const {movies, setMovies} = useContext(UserContext)
  const [movie, setMovie] = useState(initialState)

  // const{movies, setMovies} = useContext(UserContext)

  const {name, description, releasedate, ticketprice, rating,photo,country, genre} = movie

  const handleChange = (e) => {
  e.preventDefault()
  const {name, value} = e.target
  setMovie({...movie, [name]:value})

  }

  const handleGenreChange = () => {
    console.log('submit')
  }

  const handleSubmit = (e) => {
    console.log(name,'We are here Saidat')
  e.preventDefault()
  console.log(name,'We are here Saidat')
     Axios.post("/api/movie/create", {name, description,releasedate,rating, photo, genre, ticketprice, country} ,{
       mode: "same-origin", mode: "cors"
      },).then(response => {
     setMovies([...movies, response.data])
    console.log(movie)
    // navigate("/Feed")
  }).catch( (err) =>{
    console.log(err, "It is well")
  })
  }

  return (
    <div>
       <div className='create-con'>
         <div className='main-box'>
           <div className='create'>
          <form onSubmit={handleSubmit} className='create-form' >
            <h2>Create Your Movies</h2>
            <div>
              <label htmlFor="name">Name:</label>
            <input type="text" placeholder="Enter the Name of the" name="name" id="name" value={name}  onChange={handleChange} />
            </div>
          
            <div>
              <label htmlFor="">Description:</label>
              <input type="text" placeholder="Enter your password" name="description" id="description" value={description} onChange={handleChange} />
            </div>
         
            <div>
              <label htmlFor="releaseDate">ReleaseDate:</label>
              <input type="text" placeholder="Enter the ReleaseDate" name="releasedate" id="releasedate" value={releasedate} onChange={handleChange} />
            </div>

            <div>
              <label htmlFor="ticketPrice">ticketPrice:</label>
              <input type="text" placeholder="Enter the Price" name="ticketprice" id="ticketprice" value={ticketprice} onChange={handleChange}/>
            </div>
          
            <div>
              <label htmlFor="rating">Rating:</label>
              <input type="number" placeholder="Rating" name="rating" max="5" min="0" value={rating} onChange={handleChange}/>
            </div>

            <div>
              <label htmlFor="rating">Country:</label>
              <input type="text" placeholder="country" name="country" value={country} onChange={handleChange}/>
            </div>
          
            <div>
              <label htmlFor="photo">Photo:</label>
              <input type="text" name="photo" placeholder="http://....." value={photo} onChange={handleChange}/>
            </div>

            <div>
              <label htmlFor="genre" >Genre:</label>
              <select name="genre" id="genre" onChange={handleGenreChange}>
                <option>Drama</option>
                <option>Music</option>
                <option>Action</option>
                <option>Adventure</option>
                <option>Historical</option>
              </select>
            </div>
          
    
          <input type="submit" className="button"  value="Create" />
    
          </form>
        </div>
      </div>
    </div>
    </div>
     
  )
}

export default CreateMovie