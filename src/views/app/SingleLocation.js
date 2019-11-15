import React from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Config from '../../util/config';
import Switch from "react-switch";

class SingleLocation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            LocationData: {},
            stations: [],
            waterConsumed: {},
            add_station_enabled: false,
            polygo_set: true,
        }
    }

    getData = () => {

        fetch(Config.server + '/location/' + this.props.match.params.id)
            .then(response => response.json()).then(response => {

                if(this.state.polygo_set){
                    var polygon = L.polygon(JSON.parse(response.data.polygon), { color: '#00C9A7' }).addTo(this._map);
                    this._map.fitBounds(polygon.getBounds());
                }

                this.setState({
                    LocationData: {
                        ...response.data
                    },
                    polygo_set: false
                });
            });

        fetch(Config.server + '/location/' + this.props.match.params.id + '/stations')
            .then(response => response.json()).then(response => {
                console.log(response.data)
                response.data.forEach((item, index) => {
                    const Icon = L.Icon.extend({
                        options: {
                            iconSize: [20, 20],
                            iconAnchor: [20, 20],
                        }
                    });

                    const marker = L.marker([item.lat, item.lng]);
                    marker.on('click', (e) => {
                        L.popup().setLatLng({lat: item.lat + 0.00006, lng: item.lng - 0.00005}).setContent("Humedad: " + item.humidity + "<br/>" + "Temperatura: " + item.temperature + "<br/>" + "Luminosidad: " + item.luminosity).addTo(this._map).openPopup();
                    });
                    const icon = new Icon({ iconUrl: item.is_water_open ?  require('../../images/active.png') :  require('../../images/normal.png')})
                    marker.setIcon(icon);
                    marker.addTo(this._map);
                });
            });

        fetch(Config.server + '/location/' + this.props.match.params.id + '/water-consumed')
            .then(response => response.json()).then(response => {
                console.log(response.data)
                this.setState({waterConsumed: response.data || {}})
            });
    }


    toggleStationAdd = (checked) => {
        this.setState({ add_station_enabled: checked });
    }

    componentDidMount() {
        this._map = L.map('map');
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', { foo: 'bar', attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>' }).addTo(this._map);
           
        this._map.on('click', (event) => {
            if (this.state.add_station_enabled) {
                const { latlng } = event;
                const body = new FormData();
                body.append('lat', latlng.lat - 0.00001);
                body.append('lng', latlng.lng + 0.00006);
                body.append('location_id', this.props.match.params.id);
                body.append('is_water_open', 0);
                fetch(Config.server + '/station', { method: 'POST', body: body }).then(response => response.json()).then(response => {
                    console.log(response);
                    this.getData();
                });
            }

        });

        this.getData();
    }

    render() {
        const { LocationData, waterConsumed, show_water_open } = this.state;

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
                        <h4 className="title text-center p-3"  id="location-name">{LocationData.name}</h4>
                        <div className="accordion" id="accordionExample">
                            <div className="card">
                                <div className="card-header" id="headingOne">
                                    <h2 className="mb-0">
                                        <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            Stations Options
                                    </button>
                                    </h2>
                                </div>
                                <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-4">
                                                <p>Station add</p>
                                                <label>
                                                    <Switch onChange={this.toggleStationAdd} checked={this.state.add_station_enabled} />
                                                </label>
                                            </div>
                                            <div className="col-8">
                                                <h5 id="lbl-title">Water Pressure : <span id="value-location">{waterConsumed.water_pressure} L/s</span></h5>
                                                <h5 id="lbl-title">Time opened: <span id="value-location">{waterConsumed.open_time} s</span></h5>
                                                <h5 id="lbl-title">Water Consume: <span id="value-location">{waterConsumed.water_pressure * waterConsumed.open_time} L</span></h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div style={{ width: '90%', height: '90vh' }} id="map"></div>
                    </div>

                </div>

            </div>
        );
    }
}

export default SingleLocation;