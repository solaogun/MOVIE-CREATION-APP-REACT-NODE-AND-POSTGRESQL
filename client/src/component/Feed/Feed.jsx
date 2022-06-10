import React,{useContext, useState, useEffect} from 'react'
import './Feed.css'
import CreateMovie from './../Create/CreateMovie';
import{Link} from 'react-router-dom'
import Axios from 'axios'
import { UserContext } from '../context/context';
import {useNavigate} from 'react-router-dom'


const Feed = () => {

  const navigate = useNavigate()

  const {movieDetails1,setMovieDetails1} = useContext(UserContext)

  const [searchValue, setSearchValue] = useState('')

  const {setSearchMovies} = useContext(UserContext)


  // const [films, setFilms] = useState('')

  const movieDetailsFun = (obj) =>{
   setMovieDetails1(obj)
   navigate('/MovieDetails')
  }

  const {movies, setMovies} = useContext(UserContext)

 const searchFilm = (name) => {
   console.log("saidat search")
   const newMovies = movies.filter((movie) => movie.name == name)
   setMovies(newMovies)
   console.log(movies)
 }
 console.log(searchValue)

const filteredMovies = movies.filter((movie)=> movie.name?.toLowerCase().includes(searchValue.toLowerCase()))
// const filteredMovies = movies.filter((movie)=> movie.name.includes(searchValue))
console.log(filteredMovies)


const url = "/api/movie/movies"

useEffect(()=>{
  Axios.get(url).then(response => {
    setMovies(response.data)
    }).catch((err)=>{console.log(err)})
    console.log(movies)
},[])

// Axios.get(url).then(response => {
// setMovies(response.data)
// })
// console.log(movies)
  
  return (
    <div>
        <div className='banner'>
              <div className="nav">
                <h1 className='nav-logo'>Saidat</h1>
                  <ul className="navbar">
                    <li><Link to="/Login" className="nav-link">Login</Link></li>
                    <li><Link to="/CreateMovie" className="nav-link">CreateMovie</Link></li>
                    <li><Link to="/Register" className="nav-link">SignUp</Link></li>
                    <li><Link to="" className="nav-link login-btn">About Us</Link></li>
                  </ul>
              </div>
           <div className='banner-content'>
            <h1 className='title'>Movie Creation App</h1>
            <p className='banner-desc'>Use Our App to Create Movies</p>

            <div action="" className="search" >
               <input type="text" placeholder="Search For Movies" className="banner-input" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
               <input type="submit" name="name" id="name" placeholder="search" value="search" className="search-btn" onChange={searchFilm}/>
           </div>
           </div>
        </div>


              <div>
                  <h3>Our List of Movies</h3>
                  <div className='container'>
                    {/* <h3>Our List of Movies</h3> */}
                    <div className='main'>
                        {
                        filteredMovies.map((movie, index)=>
                        // movies.map((movie, index)=>
                        {
                          console.log(filteredMovies.map(movie=>movie.name))
                            // const {id, name, photo, descriptiom, rating, releaseDate, country} = movie
                            return(
                              <div className='food-container'>
                                      {/* <Link to="/MovieDetails"> */}
                                        <div className='card' onClick={()=>movieDetailsFun(movie)} key={index}>
                                              {/* <div className='movie-con'> */}
                                              <img className='img' src={movie.photo} alt="photoImg" />
                                              {/* <p>{movie.photo}</p> */}
                                              <span>{movie.rating}</span>
                                              <p className='title'>{movie.name}</p>
                                              <p>{movie.description}</p>
                                              <p>{movie.releasedate}</p>
                                              <p>{movie.ticketprice}</p>
                                              <p>{movie.country}</p>
                                              <p>{movie.genre}</p>
                                          </div>
                                        {/* </Link> */}
                                      {/* </div> */}
                                </div>
                                )
                            })}
                            </div>
                  </div>
              </div>
     </div>
  )
}

export default Feed