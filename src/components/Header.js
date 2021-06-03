import React from 'react'
import "../index.css"
import MenuBookIcon from '@material-ui/icons/MenuBook'

function Header() {
    return (
        <div className="header mb-5 d-flex align-items-center justify-content-start ps-5">
            <div className="d-flex align-items-center "><MenuBookIcon style={{ color: 'white', fontSize: 40 }}/> <h2 className="text-white ms-2">My Library</h2></div>
        </div>

    )
}

export default Header
