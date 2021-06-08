import React, { useEffect } from 'react'
import "../index.css"
import MenuBookIcon from '@material-ui/icons/MenuBook'
import { useBooks } from '../context/MyContext'
import { useHistory, useLocation } from "react-router-dom";

function Header() {

    const {user, setUser} = useBooks()
    const history = useHistory()
    const {pathname} = useLocation();

    const logOut = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('token-init-date')
        setUser()
        history.push("/login")
    }

    const adminAction = () => {
        if(pathname === "/admin"){
            history.replace("/")
        }else {
            history.replace("/admin")
        }
    }

    return (
        <div className="header mb-5 d-flex align-items-center justify-content-between p-5">
            <div className="d-flex align-items-center">
                <MenuBookIcon style={{ color: 'white', fontSize: 40 }}/>
                <h2 className="text-white ms-2">My Library</h2>
            </div>
            <div className="d-flex align-items-center">
                <h4 className="text-white">{user?.name}</h4>
                {
                    user?.userType === "admin"
                    && <button className="btn btn-outline-light ms-4" onClick={() => adminAction()}>{pathname === "/admin" ? "Home" : "Admin"}</button>
                }
                <button className="btn btn-outline-light ms-4" onClick={() => logOut()}>Log out</button>
            </div>
        </div>

    )
}

export default Header
