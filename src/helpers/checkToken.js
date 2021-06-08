import axios from 'axios';
import swal from 'sweetalert'

axios.defaults.baseURL = "https://mern-books-server.herokuapp.com"

export const checkToken = async() => {

    const token = localStorage.getItem('token')
 
    try {
        if(token) {
            let response = await axios.get("/api/auth/renew", {
                headers: {
                    'x-token': token
                }
            })
        }
    } catch (error) {
        return swal("Error", error.response.data.msg, "error")
    }
}