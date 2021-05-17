import React from 'react'
import AddProductForm from './AddProductForm'
import BooksTable from './BooksTable'
import Footer from './Footer'
import Header from './Header'

function Administration() {
    return (
        <>
            <Header
                headerTitle="Administration"
            />
            <div className="d-flex justify-content-center mb-4">
                <h4>Add Book</h4>
            </div>
            <AddProductForm/>
            <BooksTable/>
            <Footer/>
        </>
    )
}

export default Administration
