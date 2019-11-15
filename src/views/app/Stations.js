import React from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Config from '../../util/config';

class Stations extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        this._map = L.map('map');
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                this._map.setView([position.coords.latitude, position.coords.longitude], 18);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', { foo: 'bar', attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>' }).addTo(this._map);

                var latlngs = [[37, -109.05], [41, -109.03], [41, -102.05], [37, -102.04]];
                var polygon = L.polygon(latlngs, { color: 'red' }).addTo(this._map);
                this._map.fitBounds(polygon.getBounds());

            });
        }
    }

    render() {
        return (
            <div>
                <div className="container md-12">
                    <strong><h2>Stations</h2></strong>
                    <div className="row">
                        <button type="button" className="btn btn-primary" data-toggle="button" aria-pressed="false" autocomplete="off">
                            Single toggle
                        </button>
                    </div>
                </div>
                <div className="container md-12 map-station">
                    <div style={{ width: '80%', height: '90vh' }} id="map"></div>
                </div>
            </div>
        );
    }
}

export default Stations;