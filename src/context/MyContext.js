import React, { useContext, useEffect, useState } from 'react';
import { createContext } from "react";
import axios from 'axios'

axios.defaults.baseURL = "https://fakerestapi.azurewebsites.net"

export const myContext = createContext();

export function BooksProvider(props) {
    const [books, setBooks] = useState()
  
    useEffect(() => {
        async function fetchData() {
            let response = await axios.get('/api/v1/Books')
            if(response){
                setBooks(response.data)

            }else{
                console.log("error")
            }
        }
        fetchData()
    }, [])

    return <myContext.Provider value={{books}} {...props} />
}

export function useBooks() {
    const context = useContext(myContext)
    if (!context) {
        throw new Error("Error en el context")
    }
    return context;
}