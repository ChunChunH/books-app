import React from 'react'
import axios from 'axios';
import swal from 'sweetalert'

axios.defaults.baseURL = "https://mern-books-server.herokuapp.com"

const useToken = () => {

    const token = localStorage.getItem('token') 

    const checkToken = async() => {
        try {
            if(token) {
                let response = await axios.get("/api/auth/renew", {
                    headers: {
                        'x-token': token
                    }
                })
                localStorage.setItem('token', response.data.user.token)
            }
        } catch (error) {
            return swal("Error", error.response.data.msg, "error")
        }
    }

    return {
        checkToken
    }
}

export default useToken

