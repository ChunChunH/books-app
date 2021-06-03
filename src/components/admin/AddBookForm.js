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
import { useForm, Controller } from "react-hook-form";
import { useBooks } from '../../context/MyContext';
import "../../index.css"

axios.defaults.baseURL = "https://mern-books-server.herokuapp.com"


function AddBookForm() {

    const {books, setBooks} = useBooks()
    const { handleSubmit, control, reset} = useForm();

    const [shrink, setShrink] = useState(false)

    const onSubmitForm = data => {
        
        if(data.name || data.description || data.pages || data.excerpt || data.publicationDate || data.image){
            async function fetchData() {
                let response = await axios.post("/api/books/new", {
                    "name": data.name,
                    "description": data.description,
                    "pages": data.pages,
                    "publicationDate": new Date(data.publicationDate),
                    "excerpt": data.excerpt,
                    "image": data.image
                })
                return (setBooks([...books, response.data.book]))
            }
            fetchData()
            swal("Added", `The book "${data.name}" was successfully added!`, "success")
            reset({
                "name": "",
                "description": "",
                "pages": "",
                "publicationDate": null,
                "excerpt": "",
                "image": "" 
            })
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

                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-6 col-sm-12 form-group mb-4">

                                    <Controller
                                        name="publicationDate"
                                        control={control}
                                        defaultValue=""
                                        rules={{ required: 'Book publication date is required' }}
                                        render={({ field: { onChange, value }, fieldState: { error } }) => (
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
                                                    name="date"
                                                    autoComplete= "off"
                                                    type="text"
                                                    value={value}
                                                    onChange={onChange}
                                                    error={!!error}
                                                    helperText={error ? error.message : null}    
                                                    InputLabelProps={{shrink: (value || shrink) ? true : false}}
                                                    onFocus={() => setShrink(true)}
                                                    onBlur={() => value ? setShrink(true) : setShrink(false)}
                                                />
                                            </MuiPickersUtilsProvider>
                                        )}
                                    />
                            
                            </div>
                            <div className="col-lg-6 col-sm-12 form-group mb-4 mt-3">
                                <Controller
                                    name="pages"
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: 'Book number of pages is required' }}
                                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                                        <TextField
                                            label="Number of pages"
                                            type="number"
                                            fullWidth
                                            InputProps={{ inputProps: { min: 1, max: 999999 } }}
                                            value={value}
                                            onChange={onChange}
                                            error={!!error}
                                            helperText={error ? error.message : null}
                                            autoComplete= "off"     
                                        />
                                    )}
                                />
        
                            </div>
                            
                        </div>

                        <div className="form-group mb-5">
                            <Controller
                                name="excerpt"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'Book excerpt is required' }}
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                    <TextField
                                        label="A small excerpt from the book"
                                        type="text"
                                        fullWidth
                                        value={value}
                                        onChange={onChange}
                                        error={!!error}
                                        helperText={error ? error.message : null}
                                        autoComplete= "off"
                                        multiline
                                        rows={4}
                                        
                                    />
                                )}
                            />
    
                        </div>

                        <div className="form-group mb-4">
    
                            <Controller
                                name="image"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'Book image link is required' }}
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                    <TextField
                                        label="Image link"
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

                        </div>

                        <div className="d-flex justify-content-end">
                            <button type="submit" className="btn btn-blue text-light">Add</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        
    )
}

export default AddBookForm
