import React, { useContext, useEffect, useState } from 'react';
import { createContext } from "react";
import axios from 'axios'

axios.defaults.baseURL = "https://mern-books-server.herokuapp.com"

export const myContext = createContext();

export function BooksProvider(props) {
    const [books, setBooks] = useState()

    useEffect(() => {
        async function fetchData() {
            let response = await axios.get('/api/books')
            if(response){
                setBooks(response.data.books)
                console.log(response)
                
            }else{
                console.log("error")
            }
        }
        fetchData()
    }, [])
    
    return <myContext.Provider value={{books, setBooks}} {...props} />
}

export function useBooks() {
    const context = useContext(myContext)
    if (!context) {
        throw new Error("Error en el context")
    }
    return context;
}