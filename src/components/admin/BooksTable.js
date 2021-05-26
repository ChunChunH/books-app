import React, { useState } from 'react'
import '../../index.css'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import ReactPaginate from "react-paginate";
import TextField from '@material-ui/core/TextField';
import ClearIcon from "@material-ui/icons/Clear";
import 'date-fns';
import {format} from "date-fns"
import ModalEditBook from './ModalEditBook';
import swal from 'sweetalert'
import axios from 'axios';

axios.defaults.baseURL = "https://fakerestapi.azurewebsites.net"

function BooksTable({books}) {

    const [pageNumber, setPageNumber] = useState(0)
    const [filter, setFilter] = useState()
    const [shrink, setShrink] = useState(false)
    const [open, setOpen] = useState(false);
    const [bookToEdit, setBookToEdit] = useState()

    const booksPerPage = 16
    const pagesVisited = pageNumber * booksPerPage 

    const numberOfFilterBooks = books?.filter(book => book.title.includes(filter) || book.id === filter)
    const displayBooks = filter ? books?.filter(book => book.title.includes(filter) || book.id === filter).slice(pagesVisited, pagesVisited + booksPerPage) : books?.slice(pagesVisited, pagesVisited + booksPerPage)

    const pageCount = filter ? Math.ceil(numberOfFilterBooks?.length / booksPerPage) : Math.ceil(books?.length / booksPerPage)

    const changePage = ({selected}) => {
        setPageNumber(selected)
    }

    const onChangeFilter = e => {
        setFilter(e.target.value)
    }

    const handleClickOpen = () => {
        setOpen(true);
      };

    const deleteBook = (id) => {
        async function fetchData() {
            let response = await axios.delete(`/api/v1/Books/${id}`)
            if(response){
                if(response.status === 200){
                    swal("Removed", `The book with the ID "${id}" was successfully removed!`, "success")
                }else {
                    swal("Error", "The book could not be erased", "error")
                }
            }else{
                console.log("error")
            }
        }
        fetchData()
    }

    const editBook = (id, title, description, date, page, excerpt) => {
        handleClickOpen();
        setBookToEdit({
            id: id,
            title,
            description,
            date,
            page,
            excerpt
        })        
    }

    return (
        <>
            <div className="container mt-5 ">
                <div className="row">
                    <div className="col-lg-3 col-md-4 col-sm-12">
                            <TextField
                                value={filter}
                                label="Name or ID"
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
                                    {
                                        displayBooks.map(book => {

                                            const date = new Date(book.publishDate)

                                            return (
                                                <tr>
                                                    <th scope="row">{book.id}</th>
                                                    <td>{book.title}</td>
                                                    <td>{format(date,'dd/MM/yyyy' )}</td>
                                                    <td>{book.pageCount} pages</td>
                                                    <td>
                                                        <div>
                                                            <IconButton onClick={() => editBook(book.id, book.title, book.description, book.publishDate, book.pageCount, book.excerpt)}> <EditIcon/> </IconButton>
                                                            <IconButton onClick={() => deleteBook(book.id)}> <DeleteIcon/> </IconButton>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>

                            <div className="row justify-content-center align-items-center">
                                <div className="col-12 mt-3">
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
                            
                        </>
                        : <div className="d-flex justify-content-center align-items-center loader-container-admin">
                            <CircularProgress/>
                        </div>
                    }
                    
                    </div>
                </div>
            </div>

            <div className="container">
                <ModalEditBook
                    open={open}
                    setOpen={setOpen}
                    bookToEdit={bookToEdit}
                    setBookToEdit={setBookToEdit}
                />
            </div>
            
    </>
        
    )
}

export default BooksTable
