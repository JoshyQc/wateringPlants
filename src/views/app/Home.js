import React from 'react';
import Nav from '../../components/Navbar';
import pin from '../../images/pin.png';
import Location from './Location';
import Stations from './Stations';
import { BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import SingleLocation from './SingleLocation';


class Home extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
       
    }

    render(){
        return(
            <div>
                <Nav/>
                <Route exact path='/Home/Location' component={Location}/>
                <Route exact path='/Home/Stations' component={Stations}/>
                <Route exact path='/Home/Location/:id' component={SingleLocation} />
            </div>
        )
    }
}

export default Home;