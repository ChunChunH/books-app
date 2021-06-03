import React, {useState} from 'react'
import Header from './Header'
import Footer from './Footer';
import ReactPaginate from "react-paginate";
import '../index.css'
import {Link} from "react-router-dom"
import CircularProgress from '@material-ui/core/CircularProgress';
import { useBooks } from '../context/MyContext';
import TextField from '@material-ui/core/TextField';
import ClearIcon from "@material-ui/icons/Clear";
import { IconButton } from "@material-ui/core";


function Books() {

    const {books} = useBooks()
    const [pageNumber, setPageNumber] = useState(0)
    const [filter, setFilter] = useState()
    const [shrink, setShrink] = useState(false)

    const booksPerPage = 16
    const pagesVisited = pageNumber * booksPerPage 

    const numberOfFilterBooks = books?.filter(book => book.name.toLowerCase().includes(filter?.toLowerCase()) || book.description.toLowerCase().includes(filter?.toLowerCase()))
    const displayBooks = filter ? books?.filter(book => book.name.toLowerCase().includes(filter?.toLowerCase()) || book.description.toLowerCase().includes(filter?.toLowerCase())).slice(pagesVisited, pagesVisited + booksPerPage) : books?.slice(pagesVisited, pagesVisited + booksPerPage)
        

    const pageCount = filter ? Math.ceil(numberOfFilterBooks?.length / booksPerPage) : Math.ceil(books?.length / booksPerPage)

    const onChangeFilter = e => {
        let filterText = e.target.value
        setFilter(filterText)
    }

    const changePage = ({selected}) => {
        setPageNumber(selected)
    }

    return (
        <>
        <Header/>
        
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

                            const paramsLink = {
                                pathname: `/book/${book.id}`,
                                id: book.id,
                            }

                            return (
                                
                                <div className="col-lg-3 col-md-4 col-sm-12 mb-5">
                                    <div className="card w-100">
                                        <div className="image-container">
                                            <img className="card-img-left image" width="100%" src={book.image} alt={book.name}/>
                                        </div>                                        
                                        <div className="card-body cardBodyContainer">
                                            <h5 className="card-title name">{book.name}</h5>
                                            <p className="card-text description">{book.description}</p>
                                            <p className="text-muted">{book.pages} pages</p>
                                            <Link to={paramsLink}><button className="btn btn-blue text-light mb-2">See more</button></Link>
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
