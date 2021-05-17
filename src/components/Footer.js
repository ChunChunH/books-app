import React from 'react'
import '../index.css'
import {Link} from "react-router-dom"


function Footer() {
    return (
        <div className="footer w-100 bg-primary mt-5 d-flex align-items-center justify-content-end">
            <Link className="text-white me-5" to="/admin">Admin</Link>
        </div>
    )
}

export default Footer
