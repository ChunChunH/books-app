import 'date-fns';
import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import axios from 'axios';
import swal from 'sweetalert'
import Alert from '@material-ui/lab/Alert';

axios.defaults.baseURL = "https://fakerestapi.azurewebsites.net"

function AddBookForm() {

    const [newBook, setNewBook] = useState({
        name: "",
        description: "",
        id: null,
        date: null,
        page: null,
        excerpt: "",
    })
    const [error, setError] = useState(false)

    const {name, description, id, date, page, excerpt} = newBook

    const handleInputChange = e => {
        setNewBook({
            ...newBook,
            [e.target.name]: e.target.value
        })
    }

    const handleInputDateChange = e => {
        setNewBook({
            ...newBook,
            date: new Date(e)
        })
    }

    const onSubmit = e => {
        e.preventDefault()

        if(name.trim() === "" || description.trim() === "" || id === null || date === null || page === null || excerpt.trim() === ""){
            setError(true)
        }else{
            async function fetchData() {
                let response = await axios.post("/api/v1/Books", {
                    "id": id,
                    "title": name,
                    "description": description,
                    "pageCount": page,
                    "excerpt":excerpt,
                    "publishDate": date
                })
                return console.log(response)
            }
            fetchData()
            setError(false)
            swal("Added", `The book with the ID "${id}" was successfully added!`, "success")
        }

    } 

    return (
        <div className="container bg-white">
            <div className="row">
                <div className="col-12">
                    <form className="w-100 p-4">
                        <div className="row">
                            <div className="col-lg-6 col-sm-12 form-group mb-4">
                                <TextField
                                    label="Name"
                                    type="text"
                                    fullWidth
                                    value={name}
                                    name="name"
                                    autoComplete= "off"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="col-lg-6 col-sm-12 form-group mb-4">
                                
                                <TextField
                                    label="Description"
                                    type="text"
                                    fullWidth
                                    value={description}
                                    name="description"
                                    autoComplete= "off"
                                    onChange={handleInputChange}

                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-4 col-sm-12 form-group mb-4 mt-3">

                                <TextField
                                    label="ID"
                                    type="number"
                                    fullWidth
                                    InputProps={{ inputProps: { min: 0, max: 999999 } }}
                                    value={id}
                                    name="id"
                                    autoComplete= "off"
                                    onChange={handleInputChange}

                                />
                            </div>
                            <div className="col-lg-4 col-sm-12 form-group mb-4">

                                <MuiPickersUtilsProvider utils={DateFnsUtils}>

                                    <KeyboardDatePicker
                                        margin="normal"
                                        id="date-picker-dialog"
                                        label="Publication date"
                                        format="dd/MM/yyyy"
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                        fullWidth
                                        value={date}
                                        name="date"
                                        onChange={handleInputDateChange}
                                        autoComplete= "off"


                                    />

                                </MuiPickersUtilsProvider>
                            
                            </div>
                            <div className="col-lg-4 col-sm-12 form-group mb-4 mt-3">
                        
                                <TextField
                                    label="Number of pages"
                                    type="number"
                                    fullWidth
                                    InputProps={{ inputProps: { min: 1, max: 999999 } }}
                                    value={page}
                                    name="page"
                                    autoComplete= "off"
                                    onChange={handleInputChange}

                                />
                            </div>
                            
                        </div>

                        <div className="form-group mb-4">
                            <TextField
                                type="text"
                                fullWidth
                                label="A small excerpt from the book"
                                multiline
                                rows={4}
                                value={excerpt}
                                name="excerpt"
                                autoComplete= "off"
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="d-flex justify-content-end">
                            <button type="submit" className="btn btn-primary" onClick={(e) => onSubmit(e)}>Add</button>
                        </div>

                        {
                            error
                            ? <Alert severity="error" className="w-100 mt-4">The form must be completed correctly!</Alert>
                            : null

                        }

                    </form>
                </div>
            </div>
        </div>
        
    )
}

export default AddBookForm
