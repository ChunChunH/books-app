import React from 'react'

function AddProductForm() {
    return (
        <div className="container d-flex justify-content-center">
            <form className="w-100">

                <div className="row">
                    <div className="col-lg-6 col-sm-12 form-group mb-4">
                        <label for="inputName" className="mb-2">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputName"
                            aria-describedby="emailHelp" 
                            placeholder="Book name"
                        />
                    </div>
                    <div className="col-lg-6 col-sm-12 form-group mb-4">
                        <label for="inputDescription" className="mb-2">Description</label>
                        <input
                            type="text" 
                            className="form-control"
                            id="inputDescription"
                            placeholder="Book description"
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-6 col-sm-12 form-group mb-4">
                        <label for="inputDescription" className="mb-2">Publication date</label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputDescription"
                            placeholder="Book publication date"
                        />
                    </div>
                    <div className="col-lg-6 col-sm-12 form-group mb-4">
                        <label for="inputDescription" className="mb-2">Pages</label>
                        <input
                            type="number"
                            className="form-control"
                            id="inputDescription"
                            placeholder="Number of pages"
                            min="1"
                        />
                    </div>
                </div>
            
                <div className="form-group mb-4">
                    <label for="inputDescription" className="mb-2">Excerpt</label>
                    <textarea type="text" rows="4" className="form-control" id="inputDescription" placeholder="A small excerpt from the book"/>
                </div>

                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-primary ">Add</button>
                </div>

            </form>
        </div>
        
    )
}

export default AddProductForm
