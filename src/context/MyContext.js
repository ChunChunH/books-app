import React, { useContext, useEffect, useState } from 'react';
import { createContext } from "react";
import jwt_decode from 'jwt-decode'

export const myContext = createContext();

export function BooksProvider(props) {
    const [books, setBooks] = useState()
    const [user, setUser] = useState()
    const token = localStorage.getItem('token')
    
    useEffect(() => {
        if(token){
            const {id, name, userType} = jwt_decode(token);
            setUser({id, name, userType})
        }
        console.log("SETEANDO TOKEN")
    }, [token])
    
    return <myContext.Provider value={{books, setBooks, user, setUser}} {...props} />
}

export function useBooks() {
    const context = useContext(myContext)
    if (!context) {
        throw new Error("Error en el context")
    }
    return context;
}