import React, { useState } from 'react'
import '../index.css'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import ReactPaginate from "react-paginate";
import TextField from '@material-ui/core/TextField';
import ClearIcon from "@material-ui/icons/Clear";
import 'date-fns';
import {format} from "date-fns"
import axios from 'axios';
import swal from 'sweetalert'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';

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
    
      const handleClose = () => {
        setOpen(false);
        setBookToEdit()
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

    const onChangeInputEdit = (e) => {
        setBookToEdit({
            ...bookToEdit,
            [e.target.name]: e.target.value
        })
    }

    const onChangeDate = (e) => {
        setBookToEdit({
            ...bookToEdit,
            date: new Date(e) 
        })
    }

    const onClickChange = () => {
        async function fetchData() {
            let response = await axios.put(`/api/v1/Books/${bookToEdit && bookToEdit.id}`, {
                "id": bookToEdit.id,
                "title": bookToEdit.title,
                "description": bookToEdit.description,
                "pageCount": bookToEdit.page,
                "excerpt": bookToEdit.excerpt,
                "publishDate": bookToEdit.date
            })
            return console.log(response)
        }
        fetchData()
        handleClose()
        swal("Edited", "Book edited successfully!", "success")
    }

    return (
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
                

                <div>
                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <div className="row"> 
                            <div className="col-6">
                                <DialogTitle id="form-dialog-title">Edit Book</DialogTitle>
                            </div>
                            <div className="col-6 d-flex justify-content-end">
                                <IconButton
                                    onClick={handleClose}
                                >
                                    <ClearIcon />
                                </IconButton>
                            </div>

                        </div>

                        
                        <DialogContent>
        
                            <TextField
                                label="Name"
                                type="text"
                                fullWidth
                                className="mb-5"
                                value={bookToEdit && bookToEdit.title}
                                name="title"
                                onChange={onChangeInputEdit}
                            />
                          
                            <TextField
                                label="Description"
                                type="text"
                                fullWidth
                                className="mb-5"
                                value={bookToEdit && bookToEdit.description}
                                name="description"
                                onChange={onChangeInputEdit}
                                multiline
                                rows={4}
                            />
            

                            <MuiPickersUtilsProvider utils={DateFnsUtils}>

                                <KeyboardDatePicker
                                    margin="normal"
                                    id="date-picker-dialog"
                                    label="Publication date"
                                    format="dd/MM/yyyy"
                                    value={bookToEdit && bookToEdit.date}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                    fullWidth
                                    className="mb-5"
                                    onChange={onChangeDate}
                                    name="date"
                                />

                            </MuiPickersUtilsProvider>

                            <TextField
                                label="Number of Pages"
                                type="number"
                                fullWidth
                                InputProps={{ inputProps: { min: 1, max: 999999 } }}
                                className="mb-5"
                                value={bookToEdit && bookToEdit.page}
                                name="page"
                                onChange={onChangeInputEdit}
                            />

                            <TextField
                                type="text"
                                fullWidth
                                label="Excerpt"
                                multiline
                                rows={4}
                                className="mb-5"
                                value={bookToEdit && bookToEdit.excerpt}
                                name="excerpt"
                                onChange={onChangeInputEdit}
                            />

                        </DialogContent>
                        <DialogActions>
                            <button onClick={handleClose} className="btn btn-secondary">
                                Cancel
                            </button>
                            <button onClick={() => onClickChange()} className="btn btn-primary">
                                Change
                            </button>
                        </DialogActions>
                    </Dialog>
                </div>

                </div>
            </div>
        </div>
        
    )
}

export default BooksTable
