import React from 'react';
import {withRouter} from 'react-router-dom';

class Navbar extends React.Component{

    render(){
        return(
            <header>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <a className="navbar-brand" href="#">Watering plants</a>
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item">
                            <a className="nav-link" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Locations</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#" tabIndex="-1">Disabled</a>
                        </li>
                        </ul>
                        <div className="form-inline my-2 my-lg-0">
                            <button to='/login' onClick={() => this.props.history.push('/login')} className="btn btn-sm btn-outline-info my-2 my-sm-0" type="submit">Login</button>
                        </div>
                    </div>
                </nav>
            </header>
        )
    }

}

Navbar = withRouter(Navbar);
export default Navbar;