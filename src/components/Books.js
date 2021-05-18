
import React, {useEffect, useState} from 'react'
// import BookCard from './BookCard'
import Header from './Header'
import axios from 'axios';
import Footer from './Footer';
import ReactPaginate from "react-paginate";
import '../index.css'


axios.defaults.baseURL = "https://fakerestapi.azurewebsites.net"

function Books() {

    const [books, setBooks] = useState()
    const [offset, setOffset] = useState(0) // INDICE A PARTIR DEL CUAL CARGAMOS LOS ELEMENTOS A MOSTRAR
    const [elements, setElements] = useState([]) // LOS LIBROS QUE SE CARGAR EN LA PÁGINA ACTUAL
    const [perPage, setPerPage] = useState(16) // NUMEROS DE ELEMENTOS POR PÁGINA
    const [currentPage, setCurrentPage] = useState(0) // PÁGINA ACTUAL, DEFAULT 0
    const [pageCount, setPageCount] = useState() // NUMERO TOTAL DE PÁGINAS

    const setElementsForCurrentPage = () => {
        let elements = books?.slice(offset, offset + perPage)
            .map((book, i) => {
                return (
                    <div className="col-lg-3 col-md-4 col-sm-12 mb-5" key={i}>
                        <div className="card w-100">
                            <img className="card-img-left" src="Landscape.jpg" alt="Card image cap"/>
                            <div className="card-body">
                                <h5 className="card-title">{book.title}</h5>
                                <p className="card-text description-card">{book.description}</p>
                                <p className="text-muted">{book.pageCount} pages</p>
                                <button className="btn btn-primary mb-2">See more</button>
                            </div>
                        </div> 
                    </div>
                )
            })
        setElements(elements)
    }

    const handlePageClick = books => {
        const selectedPage = books.selected;
        console.log(books)
        const offsetLocal = selectedPage * perPage;
        setCurrentPage(selectedPage)
        setOffset(offsetLocal)
        setElementsForCurrentPage()
    }

    useEffect(() => {
        async function fetchData() {
            let response = await axios.get('/api/v1/Books')
            if(response){
                setBooks(response.data)
                setPageCount(Math.ceil(books?.length / perPage)) //TOTAL DE LIBROS ENTRE LIBROS POR PAGINA = NUMERO TOTAL DE PAGINAS
                setElementsForCurrentPage()
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
            books?.length > 0 && 
            <div className="container">
                <input type="text" className="w-25 mb-4 form-control" placeholder="Book name"/>
                <div className="row">
                    {elements}

                    {
                        pageCount > 1 &&
                        <div>
                            <ReactPaginate
                                previousLabel={"← Anterior"}
                                nextLabel={"Siguiente →"}
                                breakLabel={<span className="gap">...</span>}
                                pageCount={pageCount}
                                onPageChange={handlePageClick}
                                forcePage={currentPage}
                                containerClassName={"pagination justify-content-center"}
                                pageClassName={"page-link"}
                                previousClassName={"page-link"}
                                previousLinkClassName={"page-item"}
                                nextClassName={"page-link"}
                                nextLinkClassName={"page-item"}
                                disabledClassName={"disabled"}
                                activeClassName={"page-item active"}
                                activeLinkClassName={"page-link"}
                            />
                        </div>
                    }
                </div>
            </div>
        }
        
        <Footer/>
        </>
    )
}

export default Books
