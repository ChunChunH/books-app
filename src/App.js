import React, { useEffect, useState } from 'react'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Administration from './components/Administration';
import Books from './components/Books';
import BookScreen from './components/BookScreen';
import { myContext } from './context';
import axios from 'axios';

axios.defaults.baseURL = "https://fakerestapi.azurewebsites.net"

function App() {
  
  const [books, setBooks] = useState()
  
  useEffect(() => {
    async function fetchData() {
        let response = await axios.get('/api/v1/Books')
        if(response){
            setBooks(response.data)

        }else{
            console.log("error")
        }
    }
    fetchData()
  }, [])

  return (
    <myContext.Provider value={{books}}>
      <Router>
        <Switch>
          <Route exact path="/" component={Books} />
          <Route path="/book/:bookId" component={BookScreen}/>
          <Route exact path="/admin" component={Administration}/>
        </Switch>
      </Router>
    </myContext.Provider>
    
  );
}

export default App;
