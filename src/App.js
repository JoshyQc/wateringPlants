import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import Nav from './components/Navbar';
import Login from './views/login';
import Home from './views/app/Home';

function App() {
  return (
    <div className="principalPage">
        <Router>
          <div>
            <Route path='/home' component={Home}/>
            <Route exact path='/' component={Login} />
          </div>
        </Router>
    </div>
  );
}

export default App;
