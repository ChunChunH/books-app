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

axios.defaults.baseURL = "https://fakerestapi.azurewebsites.net"

function ModalEditBook({open, setOpen, bookToEdit, setBookToEdit}) {

    const [errors, setErrors] = useState({
        title: false,
        description: false,
        date: false,
        page: false,
        excerpt: false
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
            date: new Date(e) 
        })
    }

    const onClickChange = e => {

        e.preventDefault()

        if(bookToEdit?.title === ""){
            setErrors({
                ...errors,
                title: true
            })
        }else if(bookToEdit?.description === ""){
            setErrors({
                ...errors,
                description: true
            })
        }else if(bookToEdit?.page === ""){
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
        }else {
            async function fetchData() {
                let response = await axios.put(`/api/v1/Books/${bookToEdit && bookToEdit.id}`, {
                    "id": bookToEdit?.id,
                    "title": bookToEdit?.title,
                    "description": bookToEdit?.description,
                    "pageCount": bookToEdit?.page,
                    "excerpt": bookToEdit?.excerpt,
                    "publishDate": bookToEdit?.date
                })
                return console.log(response.data)
            }
            fetchData()
            handleClose()
            swal("Edited", "Book edited successfully!", "success")
            setErrors({
                title: false,
                description: false,
                page: false,
                excerpt: false,
                date: false
            })
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
                        value={bookToEdit && bookToEdit.title}
                        name="title"
                        onChange={onChangeInputEdit}
                        error={errors.title}
                        helperText={errors.title ? "Book name is required" : null}
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
                            value={bookToEdit && bookToEdit.date}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            fullWidth
                            className="mb-5"
                            onChange={onChangeDate}
                            name="date"
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
                        value={bookToEdit && bookToEdit.page}
                        name="page"
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
                </DialogContent>
                <DialogActions>
                    <button onClick={handleClose} className="btn btn-secondary">
                        Cancel
                    </button>
                    <button onClick={onClickChange} type="submit" className="btn btn-primary">
                        Change
                    </button>
                </DialogActions>
            </Dialog>
        </>

    )
}

export default ModalEditBook
