import React from 'react'

function Header({headerTitle}) {
    return (
        <div className="w-100 bg-primary mb-5 d-flex align-items-center justify-content-center py-2">
            <h2 className="text-white">{headerTitle}</h2>
        </div>
    )
}

export default Header
