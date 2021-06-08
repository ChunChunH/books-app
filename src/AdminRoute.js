import React, { useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom';
import { useBooks } from './context/MyContext';

export const AdminRoute = ({component: Component, ...rest}) => {

    const {user} = useBooks()

    return (
        <>
            <Route {...rest} render={props => (
                (user && user.userType === "admin")
                ? <Component {...props}/>
                : <Redirect to="/" />
            )} />
            
        </>
        
    )
}