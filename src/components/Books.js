import React, {useContext, useState} from 'react'
import Header from './Header'
import Footer from './Footer';
import ReactPaginate from "react-paginate";
import '../index.css'
import {Link} from "react-router-dom"
import CircularProgress from '@material-ui/core/CircularProgress';
import { myContext } from '../context';
import TextField from '@material-ui/core/TextField';
import ClearIcon from "@material-ui/icons/Clear";
import { IconButton } from "@material-ui/core";

function Books() {

    const {books} = useContext(myContext)
    const [pageNumber, setPageNumber] = useState(0)
    const [filter, setFilter] = useState()
    const [shrink, setShrink] = useState(false)

    const booksPerPage = 16
    const pagesVisited = pageNumber * booksPerPage 

    const numberOfFilterBooks = books?.filter(book => book.title.includes(filter) || book.description.includes(filter))
    const displayBooks = filter ? books?.filter(book => book.title.includes(filter) || book.description.includes(filter)).slice(pagesVisited, pagesVisited + booksPerPage) : books?.slice(pagesVisited, pagesVisited + booksPerPage)
        

    const pageCount = filter ? Math.ceil(numberOfFilterBooks?.length / booksPerPage) : Math.ceil(books?.length / booksPerPage)

    const onChangeFilter = e => {
        setFilter(e.target.value)
    }

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
                <div className="row">
                    <div className="col-lg-3 col-md-4 col-sm-12">
                        <TextField
                            value={filter}
                            label="Name or description"
                            type="text"
                            className="w-100 mb-4"
                            onChange={onChangeFilter}
                            onFocus={() => setShrink(true)}
                            onBlur={() => filter ? setShrink(true) : setShrink(false)}
                            InputProps={{
                                endAdornment: (
                                  <IconButton onClick={() => {
                                      setFilter("")
                                      setShrink(false)
                                    }}>
                                    <ClearIcon />
                                  </IconButton>
                                )
                            }}
                            InputLabelProps={{ shrink: shrink }}
                        />
                    </div>
                </div>
                
                <div className="row">
                    {displayBooks.length >= 1
                        ?
                        displayBooks.map((book) => {

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

                        : <div className="loader-container">
                            <p>No results found</p>
                        </div>
                    }
                </div>

                {displayBooks.length >= 1 &&
                    <div className="row">
                        <div className="col-12">
                            <ReactPaginate
                                previousLabel={"Previous"}
                                nextLabel={"Next"}
                                pageCount={pageCount}
                                onPageChange={changePage}
                                containerClassName={"paginationBttns"}
                                previousLinkClassName={"previousBttn"}
                                nextLinkClassName={"nextBttn"}
                                disabledClassName={"paginationDisabled"}
                                activeClassName={"paginationActive"}
                            />
                        </div>
                    </div>
                }
                
                                
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
