import React from 'react';
import {withRouter, Link } from 'react-router-dom';

class Navbar extends React.Component{

    render(){
        return(
            <header>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <Link to="/Home" className="navbar-brand">WATERING PLANTS</Link> 
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                            <li className="nav-item">
                                <Link to="/Home/Location" className="nav-link">Locations</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        )
    }

}

Navbar = withRouter(Navbar);
export default Navbar;