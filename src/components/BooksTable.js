import React, { useState } from 'react'
import '../index.css'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import ReactPaginate from "react-paginate";


function BooksTable({books}) {

    const [pageNumber, setPageNumber] = useState(0)

    const booksPerPage = 16
    const pagesVisited = pageNumber * booksPerPage 

    const displayBooks = books?.slice(pagesVisited, pagesVisited + booksPerPage).map((book) => {
        return (
            <tr>
                <th scope="row">{book.id}</th>
                <td>{book.title}</td>
                <td>23/4/18</td>
                <td>{book.pageCount} pages</td>
                <td>
                    <div>
                        <IconButton> <EditIcon/> </IconButton>
                        <IconButton> <DeleteIcon/> </IconButton>
                    </div>
                </td>
            </tr>
        )
    })

    const pageCount = Math.ceil(books?.length / booksPerPage)

    const changePage = ({selected}) => {
        setPageNumber(selected)
    }

    return (
        <div className="container mt-5 ">
            <div className="row">
                <div className="col-12 px-0 my-table">
                {
                    books ?
                    <>
                        <table className="table table-bordered w-100">
                            <thead>
                                <tr >
                                    <th scope="col">ID</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Publication Date</th>
                                    <th scope="col">Pages</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayBooks}
                            </tbody>
                        </table>

                        <div className="row">
                            <div className="col-12 mt-3">
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
                        </div>
                        
                    </>
                    : <div className="d-flex justify-content-center align-items-center loader-container-admin">
                        <CircularProgress/>
                    </div>
                }
                
                </div>
            </div>
        </div>
        
    )
}

export default BooksTable
