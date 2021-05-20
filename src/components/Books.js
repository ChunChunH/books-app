
import React, {useContext, useState} from 'react'
import Header from './Header'
import Footer from './Footer';
import ReactPaginate from "react-paginate";
import '../index.css'
import {Link} from "react-router-dom"
import CircularProgress from '@material-ui/core/CircularProgress';
import { myContext } from '../context';

function Books() {

    const {books} = useContext(myContext)
    const [pageNumber, setPageNumber] = useState(0)

    const booksPerPage = 16
    const pagesVisited = pageNumber * booksPerPage 

    const displayBooks = books?.slice(pagesVisited, pagesVisited + booksPerPage).map((book) => {
        return (
            <div className="col-lg-3 col-md-4 col-sm-12 mb-5">
                <div className="card w-100">
                    <img className="card-img-left" src="Landscape.jpg" alt="Card image cap"/>
                    <div className="card-body">
                        <h5 className="card-title">{book.title}</h5>
                        <p className="card-text description">{book.description}</p>
                        <p className="text-muted">{book.pageCount} pages</p>
                        <Link to="/book"><button className="btn btn-primary mb-2">See more</button></Link>
                    </div>
                </div> 
            </div>
        )
    })


    const pageCount = Math.ceil(books?.length / booksPerPage)

    const changePage = ({selected}) => {
        setPageNumber(selected)
    }


    return (
        <>
        <Header
            headerTitle="My Library"
        />
        
        {
            books
            ? <div className="container">
                <input type="text" className="w-25 mb-4 form-control" placeholder="Book name"/>
                <div className="row">
                    {displayBooks}
                </div>

                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={"paginationBttns"}
                    previousLinkClassName={"previosBttn"}
                    nextLinkClassName={"nextBttn"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"paginationActive"}
                />
            </div>
            : <div className="d-flex justify-content-center align-items-center loader-container">
                <CircularProgress/>
            </div>
        }
        
        <Footer
            linkText="Admin"
            path="/admin"
        />
        </>
    )
}

export default Books
