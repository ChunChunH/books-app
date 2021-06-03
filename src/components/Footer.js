import React from 'react'
import '../index.css'
import {Link} from "react-router-dom"


function Footer({linkText, path}) {
    return (
        <div className="footer w-100 mt-5 d-flex align-items-center justify-content-end">
            <Link className="text-white me-5" to={path}>{linkText}</Link>
        </div>
    )
}

export default Footer
