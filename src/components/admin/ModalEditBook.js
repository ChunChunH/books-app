import React, { useState } from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import axios from 'axios';
import swal from 'sweetalert'
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import ClearIcon from "@material-ui/icons/Clear";
import { useBooks } from '../../context/MyContext';
import "../../index.css"

axios.defaults.baseURL = "https://fakerestapi.azurewebsites.net"

function ModalEditBook({open, setOpen, bookToEdit, setBookToEdit}) {

    const {books, setBooks, user} = useBooks()
    const [errors, setErrors] = useState({
        name: false,
        description: false,
        date: false,
        page: false,
        excerpt: false,
        image: false
    })

    const handleClose = () => {
        setOpen(false);
        setBookToEdit()
    };

    const onChangeInputEdit = (e) => {
        setBookToEdit({
            ...bookToEdit,
            [e.target.name]: e.target.value
        })
    }

    const onChangeDate = (e) => {
        setBookToEdit({
            ...bookToEdit,
            publicationDate: new Date(e) 
        })
    }

    const onClickChange = e => {

        e.preventDefault()

        if(bookToEdit?.name === ""){
            setErrors({
                ...errors,
                name: true
            })
        }else if(bookToEdit?.description === ""){
            setErrors({
                ...errors,
                description: true
            })
        }else if(bookToEdit?.pages === ""){
            setErrors({
                ...errors,
                page: true
            })
        }else if(bookToEdit?.excerpt === ""){
            setErrors({
                ...errors,
                excerpt: true
            })
        }else if(bookToEdit?.date === null){
            setErrors({
                ...errors,
                date: true
            })
        }else if(bookToEdit?.image === null){
            setErrors({
                ...errors,
                image: true
            })
        }else {
            if(user){ 
                async function editBook() {
                    try {   
                        const token = localStorage.getItem('token') 
    
                        const options = {
                            headers: {'x-token': token && token}
                        };
    
                        let response = await axios.put(`/api/books/${bookToEdit && bookToEdit.id}`, {
                            "id": bookToEdit.id,
                            "name": bookToEdit.name,
                            "description": bookToEdit.description,
                            "pages": bookToEdit.pages,
                            "publicationDate": bookToEdit.publicationDate,
                            "excerpt": bookToEdit.excerpt,
                            "image": bookToEdit.image
                        }, options)
                        
                        const book = response.data.book
                        let newBooks
                        if(books && books.length){
                            newBooks = books.map((singleBook, index) => {
                                if(singleBook.id === book.id){
                                    return books[index] = book
                                } else {
                                    return books[index]
                                }
                            })
                        }
        
                        swal("Edited", "Book edited successfully!", "success")
                        return setBooks(newBooks)
                    } catch (error) {
                        return swal("Warning", "Action not allowed", "warning")      
                    }
                }
                editBook()
                handleClose()
                setErrors({
                    name: false,
                    description: false,
                    page: false,
                    excerpt: false,
                    date: false,
                    image: false,
                })
            }
        }

        }
    
    return (
        <>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <div className="row me-0"> 
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
                        value={bookToEdit && bookToEdit.name}
                        name="name"
                        onChange={onChangeInputEdit}
                        error={errors.name}
                        helperText={errors.name ? "Book name is required" : null}
                        autoComplete= "off" 
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
                        error={errors.description}
                        helperText={errors.description ? "Book description is required" : null}
                        autoComplete= "off" 
                    />

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>

                        <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog"
                            label="Publication date"
                            format="dd/MM/yyyy"
                            value={bookToEdit && bookToEdit.publicationDate}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            fullWidth
                            className="mb-5"
                            onChange={onChangeDate}
                            name="publicationDate"
                            error={errors.date}
                            helperText={errors.date ? "Book publication date is required" : null}
                            autoComplete= "off" 
                        />

                    </MuiPickersUtilsProvider>

                    <TextField
                        label="Number of pages"
                        type="number"
                        fullWidth
                        InputProps={{ inputProps: { min: 1, max: 999999 } }}
                        className="mb-5"
                        value={bookToEdit && bookToEdit.pages}
                        name="pages"
                        onChange={onChangeInputEdit}
                        error={errors.page}
                        helperText={errors.page ? "Book number of pages is required" : null}
                        autoComplete= "off" 
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
                        error={errors.excerpt}
                        helperText={errors.excerpt ? "Book excerpt is required" : null}
                        autoComplete= "off" 
                    />

                    <TextField
                        label="Image link"
                        type="text"
                        fullWidth
                        value={bookToEdit && bookToEdit.image}
                        onChange={onChangeInputEdit}
                        error={errors.image}
                        helperText={errors.image ? "Book image link is required" : null}
                        autoComplete= "off"
                        className="mb-3"
                        name="image"
                    />
                </DialogContent>
                <DialogActions>
                    <button onClick={handleClose} className="btn btn-secondary">
                        Cancel
                    </button>
                    <button onClick={onClickChange} type="submit" className="btn btn-blue text-light">
                        Change
                    </button>
                </DialogActions>
            </Dialog>
        </>

    )
}

export default ModalEditBook
