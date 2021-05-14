import React from 'react'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Books from './components/Books';
import BookScreen from './components/BookScreen';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Books} />
        <Route exact path="/book" component={BookScreen}/>
      </Switch>
    </Router>
  );
}

export default App;
