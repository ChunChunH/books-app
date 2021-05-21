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


axios.defaults.baseURL = "https://fakerestapi.azurewebsites.net"

function BookScreen(props) {

    const id = props.location.id
    const [book, setBook] = useState()

    useEffect(() => {
        async function fetchData() {
            let response = await axios.get(`/api/v1/Books/${id}`)
            if(response){
                setBook(response.data)
            }else{
                console.log("error")
            }
        }
        fetchData()
      }, [])

    return (
        <>

        <Header
            headerTitle="My Library"
        />
        {
            book ?

            <div className="container">
                <Link to="/"><button className="btn btn-primary"><ArrowBackIcon/> Back to books</button></Link>
                <div className="row mt-4">
                    <div className="col-lg-3 col-md-4 col-sm-12">
                        <div className="bg-primary image mb-5"></div>
                    </div>
                    <div className="col-lg-9 col-md-8 col-sm-12 d-flex align-items-center">
                        <div>
                            <h1 className="mb-4">{book.title}</h1>
                            <p className="mb-4">{book.description}</p>
                            <p>Publish date: <span className="text-muted">{format(new Date(book.publishDate),'dd/MM/yyyy' )}</span></p>
                            <p className="text-muted mb-5">{book.pageCount} pages</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <h2>Excerpt</h2>
                    <p>{book.excerpt}</p>
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
