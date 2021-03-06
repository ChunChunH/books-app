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
import { useBooks } from '../../context/MyContext';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';

axios.defaults.baseURL = "https://mern-books-server.herokuapp.com"

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: "#3f51b5",
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

const StyledTableRow = withStyles((theme) => ({
root: {
    '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
    },
},
}))(TableRow);

function BooksTable() {

    const {books, setBooks} = useBooks()
    const [pageNumber, setPageNumber] = useState(0)
    const [filter, setFilter] = useState()
    const [shrink, setShrink] = useState(false)
    const [open, setOpen] = useState(false);
    const [bookToEdit, setBookToEdit] = useState()
    const {user} = useBooks()

    const booksPerPage = 16
    const pagesVisited = pageNumber * booksPerPage 

    const numberOfFilterBooks = books?.filter(book => book.name.toLowerCase().includes(filter?.toLowerCase()) || book.id.toLowerCase().includes(filter?.toLowerCase()))
    const displayBooks = filter ? books?.filter(book => book.name.toLowerCase().includes(filter?.toLowerCase()) || book.id.toLowerCase().includes(filter?.toLowerCase())).slice(pagesVisited, pagesVisited + booksPerPage) : books?.slice(pagesVisited, pagesVisited + booksPerPage)

    const pageCount = filter ? Math.ceil(numberOfFilterBooks?.length / booksPerPage) : Math.ceil(books?.length / booksPerPage)

    const changePage = ({selected}) => {
        setPageNumber(selected)
    }

    const onChangeFilter = e => {
        let filterText = e.target.value
        setFilter(filterText)
    }

    const handleClickOpen = () => {
        setOpen(true);
      };

    const deleteBook = (id) => {
        async function fetchData() {

            const token = localStorage.getItem('token') 
            try {
                if(user) {
                    let response = await axios.delete(`/api/books/${id}`, {
                        headers: {
                            'x-token': token && token
                        }
                    })
                    let newBooks = books.filter(book => book.id !== id)
                    if(response){
                        if(response.status === 200){
                            swal("Removed", `The book with the ID "${id}" was successfully removed!`, "success")
                            return (setBooks(newBooks))
                        }else {
                            swal("Error", "The book could not be erased", "error")
                        }
                    }else{
                        console.log("error")
                    }
                }
            } catch (error) {
                return swal("Warning", "Action not allowed", "warning")
            }
        }
        fetchData()
    }

    const editBook = (id, name, description, pages, publicationDate, excerpt, image) => {
        handleClickOpen();
        setBookToEdit({
            id: id,
            name,
            description,
            pages,
            publicationDate,
            excerpt,
            image
        })        
    }

    return (
        <>
            <div className="container mt-5 ">
                <div className="row">
                    <div className="col-lg-3 col-md-4 col-sm-12 ps-0">
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
                                        <IconButton
                                            onClick={() => {
                                                setFilter("")
                                                setShrink(false)
                                            }}
                                            className="p-0"
                                        >
                                            <ClearIcon />
                                        </IconButton>
                                    )
                                }}
                                InputLabelProps={{ shrink: shrink }}
                            />
                    </div>
                </div>
                <div className="row px-0 my-table">
                    {
                        books ?
                        <>
                            <TableContainer className="col-12 w-100 p-0 pb-3">
                                <Table aria-label="customized table">
                                    <TableHead>
                                    <TableRow>
                                        <StyledTableCell>ID</StyledTableCell>
                                        <StyledTableCell>Name</StyledTableCell>
                                        <StyledTableCell>Publication Date</StyledTableCell>
                                        <StyledTableCell>Pages</StyledTableCell>
                                        <StyledTableCell>Actions</StyledTableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {displayBooks.map((book) => {

                                            const date = new Date(book.publicationDate)

                                            return (
                                                <StyledTableRow key={book.id}>
                                                <StyledTableCell component="th" scope="row">
                                                    {book.id}
                                                </StyledTableCell>
                                                <StyledTableCell>{book.name}</StyledTableCell>
                                                <StyledTableCell>{format(date,'dd/MM/yyyy' )}</StyledTableCell>
                                                <StyledTableCell>{book.pages} pages</StyledTableCell>
                                                <StyledTableCell>
                                                    <div>
                                                        <IconButton onClick={() => editBook(book.id, book.name, book.description, book.pages, book.publicationDate, book.excerpt, book.image)}> <EditIcon/> </IconButton>
                                                        <IconButton onClick={() => deleteBook(book.id)}> <DeleteIcon/> </IconButton>
                                                    </div>
                                                </StyledTableCell>
                                                </StyledTableRow>
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>

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
