import React from 'react'
import BookCard from './BookCard'
import Header from './Header'

function Books() {
    return (
        <>
        <Header/>
        <div className="container">
            <div className="row">
                <BookCard/>
                <div className="col-3">
                    <div className="card w-100">
                        <img className="card-img-left" src="Landscape.jpg" alt="Card image cap"/>
                        <div className="card-body">
                            <h5 className="card-title">Title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <p className="text-muted">16 pages</p>
                            <a href="#" class="card-link">See more...</a>
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <div className="card w-100">
                        <img className="card-img-left" src="Landscape.jpg" alt="Card image cap"/>
                        <div className="card-body">
                            <h5 className="card-title">Title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <p className="text-muted">16 pages</p>
                            <a href="#" class="card-link">See more...</a>
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <div className="card w-100">
                        <img className="card-img-left" src="Landscape.jpg" alt="Card image cap"/>
                        <div className="card-body">
                            <h5 className="card-title">Title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <p className="text-muted">16 pages</p>
                            <a href="#" class="card-link">See more...</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Books
