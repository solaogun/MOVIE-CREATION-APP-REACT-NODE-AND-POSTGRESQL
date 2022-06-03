import React, {Children, useState, useContext} from 'react'


export const UserContext = React.createContext()

// const Context = ({children}) => {

//     const [user, setUser] = useState([''])
//     const [movies, setMovies] = useState([''])
//     return(
    
//         <UserContext.Provider value={{user, setUser, movies, setMovies}}>
        
//         </UserContext.Provider>
//     )
// }

// export const useGlobalContext = () =>{
//     return useContext(UserContext)
// }
// export default {Context, UserContext}