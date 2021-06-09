import React, { useContext, useEffect, useState } from 'react';
import { createContext } from "react";
import axios from 'axios'

axios.defaults.baseURL = "https://mern-books-server.herokuapp.com"

export const myContext = createContext();

export function BooksProvider(props) {
    const [books, setBooks] = useState()
    const [user, setUser] = useState()

    useEffect(() => {
        async function fetchData() {
            let response = await axios.get('/api/books', {
                headers: {
                    'x-token': user?.token
                }
            })
            if(response){
                setBooks(response.data.books)
                
            }else{
                console.log("error")
            }
        }
         
        fetchData()
        
        
    }, [])
    
    return <myContext.Provider value={{books, setBooks, user, setUser}} {...props} />
}

export function useBooks() {
    const context = useContext(myContext)
    if (!context) {
        throw new Error("Error en el context")
    }
    return context;
}