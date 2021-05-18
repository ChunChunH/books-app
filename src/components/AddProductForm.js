import React from 'react'
import TextField from '@material-ui/core/TextField';

function AddProductForm() {
    return (
        <div className="container d-flex justify-content-center">
            <form className="w-100">

                <div className="row">
                    <div className="col-lg-6 col-sm-12 form-group mb-4">
                        <TextField
                            label="Name"
                            type="text"
                            fullWidth
                        />
                    </div>
                    <div className="col-lg-6 col-sm-12 form-group mb-4">
                        
                        <TextField
                            label="Description"
                            type="text"
                            fullWidth
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-6 col-sm-12 form-group mb-4">
                     
                        <TextField
                            label="Publication date"
                            type="text"
                            fullWidth
                        />
                    </div>
                    <div className="col-lg-6 col-sm-12 form-group mb-4">
                  
                        <TextField
                            label="Number of pages"
                            type="number"
                            fullWidth
                            InputProps={{ inputProps: { min: 1, max: 999999 } }}
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
                    />
                </div>

                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-primary ">Add</button>
                </div>

            </form>
        </div>
        
    )
}

export default AddProductForm
