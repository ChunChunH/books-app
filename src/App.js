import React from 'react'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Administration from './components/admin/Administration';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Books from './components/Books';
import BookScreen from './components/BookScreen';
import { BooksProvider } from './context/MyContext';
import { PrivateRoute } from './PrivateRoute';
import { AdminRoute } from './AdminRoute';

function App() {

  return (
    <BooksProvider>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/register" component={Register}/>
          <PrivateRoute component={Books} path="/" exact />
          <PrivateRoute path="/book/:id" component={BookScreen}/>
          <AdminRoute exact path="/admin" component={Administration}/>
        </Switch>
      </Router>
    </BooksProvider>
    
  );
}

export default App;

