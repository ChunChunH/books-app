import React from 'react'
import AddBookForm from './AddBookForm'
import BooksTable from './BooksTable'
import Footer from '../Footer'
import Header from '../Header'
import { useBooks } from '../../context/MyContext';

function Administration() {


    return (
        <>
            <Header
                headerTitle="Administration"
            />
            <div className="d-flex justify-content-center mb-4">
                <h4>Add Book</h4>
            </div>
            <AddBookForm/>
            <BooksTable/>
            <Footer
                linkText= "Home"
                path="/"
            />
        </>
    )
}

export default Administration
