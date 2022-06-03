// import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Feed from './component/Feed/Feed';
import Login from './component/Login/Login';
import Register from './component/Register/Register';
import CreateMovie from './component/Create/CreateMovie';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { UserContext } from './component/context/context';
import MovieDetails from './component/MovieDetail/MovieDetails';


function App() {
  const [user, setUser] = useState(null)
  const [movies, setMovies] = useState([])
  const [searchMovies, setSearchMovies] = useState('a')
  const [movieDetails1, setMovieDetails1] = useState('')
  return (
    <div className="App">
      {/* <Feed/> */}
      <Router>
        <UserContext.Provider value={{user, setUser, movies, setMovies, searchMovies, setSearchMovies, movieDetails1, setMovieDetails1}}>
       {/* < CreateMovie/> */}
        <Routes>
          
        <Route path="/" element={<Feed/>} exact />
        <Route path="/Register" element={<Register/>} exact />
        <Route path="/Login" element={<Login/>}exact />
        <Route path="/CreateMovie" element={<CreateMovie/>} exact/>
        <Route path="/MovieDetails" element={<MovieDetails/>} exact/>
        </Routes>
        </UserContext.Provider>
      </Router>
      
      {/* <Register/> */}
      {/* <Feed/> */}
      {/* <Login/> */}
      {/* <h1>Hello World</h1> */}
    </div>
  );
}

export default App;
