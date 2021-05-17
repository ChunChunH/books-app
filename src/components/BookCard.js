import React from 'react'

function BookCard() {
    return (
        <div className="col-lg-3 col-md-4 col-sm-12 mb-5">
            <div className="card w-100">
                <img className="card-img-left" src="Landscape.jpg" alt="Card image cap"/>
                <div className="card-body">
                    <h5 className="card-title">Title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <p className="text-muted">16 pages</p>
                    <button className="btn btn-primary mb-2">See more...</button>
                </div>
            </div> 
        </div>
    )
}

export default BookCard
