import React from 'react'
import '../index.css'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

function BooksTable() {
    return (
        <div className="container mt-5">
            <table className="table table-bordered my-table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Publication Date</th>
                        <th scope="col">Pages</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Book 1</td>
                        <td>23/4/18</td>
                        <td>89</td>
                        <td>
                            <div>
                                <IconButton> <EditIcon/> </IconButton>
                                <IconButton> <DeleteIcon/> </IconButton>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Book 2</td>
                        <td>12/7/20</td>
                        <td>287</td>
                        <td>
                            <div>
                                <IconButton> <EditIcon/> </IconButton>
                                <IconButton> <DeleteIcon/> </IconButton>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>Book 3</td>
                        <td>2/3/17</td>
                        <td>56</td>
                        <td>
                            <div>
                                <IconButton> <EditIcon/> </IconButton>
                                <IconButton> <DeleteIcon/> </IconButton>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>Book 3</td>
                        <td>2/3/17</td>
                        <td>56</td>
                        <td>
                            <div>
                                <IconButton> <EditIcon/> </IconButton>
                                <IconButton> <DeleteIcon/> </IconButton>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>Book 3</td>
                        <td>2/3/17</td>
                        <td>56</td>
                        <td>
                            <div>
                                <IconButton> <EditIcon/> </IconButton>
                                <IconButton> <DeleteIcon/> </IconButton>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        
    )
}

export default BooksTable
