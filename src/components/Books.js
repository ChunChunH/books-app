
import React, {useEffect, useState} from 'react'
import BookCard from './BookCard'
import Header from './Header'
import axios from 'axios';
import Footer from './Footer';


axios.defaults.baseURL = "https://fakerestapi.azurewebsites.net"

function Books() {

    const [books, setBooks] = useState()

    useEffect(async () => {
        
        let response = await axios.get('/api/v1/Books')
        if(response){
            setBooks(response.data)
            console.log(books)
        }else{
            console.log("error")
        }

        // .then(response => {

        //     setBooks(response?.data)
        //     console.log(books)
        // })

        // .catch(e => {
        //     console.log(e)
        // })

    }, [])

   

    return (
        <>
        <Header
            headerTitle="My Library"
        />
        <div className="container">
            <input type="text" className="w-25 mb-4 form-control" placeholder="Book name"/>
            <div className="row">
                {/* {
                    books ?
                    books.map((book) => {
                        <BookCard
                            id={book.id}
                            description={book.description}
                            excerpt={book.excerpt}
                            pageCount={book.pageCount}
                            publishDate={book.publishDate}
                            title={book.title}
                        />
                    })
                    : null
                } */}
                <BookCard/>
                <BookCard/>
                <BookCard/>
                <BookCard/>
                <BookCard/>
            </div>
        </div>
        <Footer/>
        </>
    )
}

export default Books
