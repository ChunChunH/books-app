import React from 'react'
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({component: Component, ...rest}) => {

    const token = localStorage.getItem('token')

    return (
        <>
            <Route {...rest} render={props => (
                (token)
                ? <Component {...props}/>
                : <Redirect to="/login" />
            )} />
            
        </>
        
    )
}