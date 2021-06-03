import React from 'react'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Administration from './components/admin/Administration';
import Books from './components/Books';
import BookScreen from './components/BookScreen';
import { BooksProvider } from './context/MyContext';

function App() {
  return (
    <BooksProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Books} />
          <Route path="/book/:id" component={BookScreen}/>
          <Route exact path="/admin" component={Administration}/>
        </Switch>
      </Router>
    </BooksProvider>
    
  );
}

export default App;

