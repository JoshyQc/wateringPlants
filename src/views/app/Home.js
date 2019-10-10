import React from 'react';
import Nav from '../../components/Navbar';
import pin from '../../images/pin.png';
import Location from './Location';
import { BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';


class Home extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        // this._map = L.map('map');
        // if (navigator.geolocation) {
        // navigator.geolocation.getCurrentPosition((position)=>{
        //     this._map.setView([position.coords.latitude, position.coords.longitude], 18);
        //     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar', attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'}).addTo(this._map);
            
        //     var latlngs = [[37, -109.05],[41, -109.03],[41, -102.05],[37, -102.04]];
        //     var polygon = L.polygon(latlngs, {color: 'red'}).addTo(this._map);
        //     this._map.fitBounds(polygon.getBounds());
        
        // });
        // }
    }

    render(){
        return(
            <div>
                <Nav/>
                <Route exact path='/home/location' component={Location}/>
                
            </div>
        )
    }
}
/*
[
      [
        -72.2817974,
        42.9276141
      ],
      [
        -72.2791568,
        42.9279598
      ],
      [
        -72.27935,
        42.9270407
      ],
      [
        -72.2799082,
        42.9269621
      ],
      [
        -72.2802409,
        42.9269857
      ],
      [
        -72.2813895,
        42.9268678
      ],
      [
        -72.281733,
        42.9276141
      ]
    ]

*/
export default Home;