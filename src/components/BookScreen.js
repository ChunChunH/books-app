import React, { useEffect, useState } from 'react'
import Header from './Header'
import '../index.css'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Footer from './Footer';
import {Link} from "react-router-dom"
import 'date-fns';
import {format} from "date-fns"
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';


axios.defaults.baseURL = "https://mern-books-server.herokuapp.com"

function BookScreen(props) {

    const id = props.location.id || props.match.params.id
    const [book, setBook] = useState()

    useEffect(() => {
        async function fetchData() {
            let response = await axios.get(`/api/books/${id}`)
            if(response){
                setBook(response.data.book)
                console.log(response.data.book)
            }else{
                console.log("error")
            }
        }
        fetchData()
        console.log(props)
    }, [])

    return (
        <>

        <Header
            headerTitle="My Library"
        />
        {
            book ?

            <div className="container">
                <Link to="/"><button className="btn btn-blue text-light"><ArrowBackIcon/> Back to books</button></Link>
                <div className="row mt-4">
                    <div className="col-lg-3 col-md-4 col-sm-12">
                        <div className="bg-primary image mb-5 image-container-bookscren">
                            <img width="100%" src={book?.image} alt={book?.name}/>
                        </div>
                    </div>
                    <div className="col-lg-9 col-md-8 col-sm-12 d-flex align-items-center">
                        <div>
                            <h1 className="mb-4">{book?.name}</h1>
                            <p className="mb-4">{book?.description}</p>
                            <p>Publish date: <span className="text-muted">{format(new Date(book?.publicationDate),'dd/MM/yyyy' )}</span></p>
                            <p className="text-muted mb-5">{book?.pages} pages</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <h2>Excerpt</h2>
                    <p className="bookscreen-excerpt">{book?.excerpt}</p>
                </div>
            </div>

            : <div className="d-flex justify-content-center align-items-center loader-container">
                <CircularProgress/>
            </div>
        }
            
           
            <Footer
                linkText="Admin"
                path="/admin"
            />
        </>
    )
}

export default BookScreen
