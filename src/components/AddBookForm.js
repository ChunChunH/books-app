import 'date-fns';
import React, { useEffect, useState } from 'react'
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import axios from 'axios';
import swal from 'sweetalert'
import Alert from '@material-ui/lab/Alert';
import { useForm, Controller } from "react-hook-form";

axios.defaults.baseURL = "https://fakerestapi.azurewebsites.net"


function AddBookForm() {

    const { register, handleSubmit, control} = useForm();

    const [newBook, setNewBook] = useState({
        name: "",
        description: "",
        date: null,
        page: null,
        excerpt: "",
    })
    const [error, setError] = useState(false)

    const {name, description, date, page, excerpt} = newBook

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

    const getRandomId = () => {
        return parseInt(Math.random() * (99999 - 1) + 1);
    }

    const onSubmitForm = data => {

        console.log("onSubmit funciona")

        if(name.trim() === "" || description.trim() === "" || date === null || page === null || excerpt.trim() === ""){
            setError(true)
        }else{
            async function fetchData() {
                let response = await axios.post("/api/v1/Books", {
                    "id": getRandomId(),
                    "title": name,
                    "description": description,
                    "pageCount": page,
                    "excerpt": excerpt,
                    "publishDate": date
                })
                console.log(response)
            }
            fetchData()
            setError(false)
            swal("Added", `The book "${name}" was successfully added!`, "success")
        }

    } 

    return (
        <div className="container bg-white">
            <div className="row">
                <div className="col-12">
                    <form className="w-100 p-4 " onSubmit={handleSubmit(onSubmitForm)}>
                        <div className="row">
                            <div className="col-lg-6 col-sm-12 form-group mb-4">
                                <Controller
                                    name="name"
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: 'Book name is required' }}
                                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                                        <TextField
                                            label="Name"
                                            type="text"
                                            fullWidth
                                            value={value}
                                            onChange={onChange}
                                            error={!!error}
                                            autoComplete= "off"
                                            helperText={error ? error.message : null}
                                        />
                                    )}
                                />

                                {/* <TextField
                                    id='name'
                                    label="Name"
                                    type="text"
                                    fullWidth
                                    value={name}
                                    name="name"
                                    autoComplete= "off"
                                    onChange={handleInputChange}
                
                                /> */}

                            </div>
                            <div className="col-lg-6 col-sm-12 form-group mb-4">
                                <Controller
                                    name="description"
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: 'Book description is required' }}
                                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                                        <TextField
                                            label="Description"
                                            type="text"
                                            fullWidth
                                            value={value}
                                            onChange={onChange}
                                            error={!!error}
                                            helperText={error ? error.message : null}
                                            autoComplete= "off"
                                        />
                                    )}
                                />

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
                            <div className="col-lg-6 col-sm-12 form-group mb-4">

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
                                        type="text"

                                    />

                                </MuiPickersUtilsProvider>
                            
                            </div>
                            <div className="col-lg-6 col-sm-12 form-group mb-4 mt-3">
                        
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
                            <button type="submit" className="btn btn-primary">Add</button>
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
