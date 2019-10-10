import React from 'react';
import Modal from 'react-modal-view';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Config from '../../util/config';


class Location extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            data: [],
            dataLocation: {
                locationName: '',
                locationPressure: '',
                polygon: []
            },
        }
    }

    addLocation = (event) => {
        event.preventDefault();
        const { dataLocation } = this.state;
        dataLocation.polygon = [...dataLocation.polygon, [dataLocation.polygon[0][0], dataLocation.polygon[0][1]]];
        const body = new FormData();
        body.append('name', dataLocation.locationName);
        body.append('water_pressure', dataLocation.locationPressure);
        body.append('polygon', JSON.stringify(dataLocation.polygon));

        fetch(Config.server + 'location', {
            method: 'POST',
            body: body
        }).then(response => response.json()).then(response => {
            if (response && response.success) {
                this._closeModalButton.click();
                dataLocation.locationName = '';
                dataLocation.locationPressure = '';
                dataLocation.polygon = [];
                this.setState({ dataLocation });
                this._formADD.reset();
                this.getData();
            } else {
                alert("ERROR al crear");
            }
        });
    }

    getData = () => {
        fetch(Config.server + 'location').then(response => response.json()).then(response => {
            console.log(response);
            if (response && response.success) {
                this.setState({ data: response.data });
            }
        });
    }

    onChangeInput = (event) => {
        let { dataLocation } = this.state;
        dataLocation[event.target.name] = event.target.value;
        dataLocation[event.target.name] = event.target.value;
        this.setState({ dataLocation })
    }

    componentDidMount() {
        this._map = L.map('map');
        this._map.on('click', (event) => {
            const { latlng } = event;
            let { dataLocation } = this.state;
            dataLocation.polygon = [...dataLocation.polygon, [latlng.lat, latlng.lng]];
            //dataLocation.polygon.push([latlng.lat, latlng.lng]); 
            if (dataLocation.polygon.length > 0) {
                var polygon = L.polyline(dataLocation.polygon, { color: 'red', fill: true }).addTo(this._map);
                this._map.fitBounds(polygon.getBounds());

                // const Icon = L.Icon.extend({
                //     options: {
                //         shadowUrl: require('../../images/pin.png'),
                //         iconSize: [20, 20],
                //         shadowSize: [20, 20],
                //         iconAnchor: [20, 20],
                //     }
                // });
                // L.marker([latlng.lat, latlng.lng],{icon: new Icon({iconUrl: require('../../images/pin.png')})}).addTo(this._map);
            }

            this.setState({ dataLocation })
        });

        this.getData();
    }

    loadMap = () => {
        this._map.invalidateSize(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                this._map.setView([position.coords.latitude, position.coords.longitude], 18);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', { foo: 'bar', attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>' }).addTo(this._map);

            });
        }
    }

    onModalClose = () => {

    }

    render() {
        const handleClose = () => this.setState({ showModal: false });
        const handleShow = () => this.setState({ showModal: true });
        const { locationName, locationPressure } = this.state.dataLocation;

        const { data } = this.state;
        return (
            <div>
                <div className="container md-6">
                    <button onClick={() => {
                        setTimeout(() => {
                            this.loadMap();
                        }, 500);
                    }} type="button" className="btn btn-lg btn-block btn-success" data-toggle="modal" data-target="#exampleModal">Add New Location</button>
                </div>
                <table className="table table-hover table-bordered table-location">
                    <thead className="bg-success">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Water Pressure</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={'location_' + index}>
                                <th scope="row">{item.id}</th>
                                <td>{item.name}</td>
                                <td>{item.water_pressure}</td>
                                <td><button type="button" className="btn btn-outline-warning">Ver</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <form ref={formADD => this._formADD = formADD} onSubmit={this.addLocation}>
                    <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">New Location</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">

                                    <div className="form-group">
                                        <label>Name</label>
                                        <input name="locationName" value={locationName} onChange={this.onChangeInput} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Name" />
                                    </div>
                                    <div className="form-group">
                                        <label>Water Pressure</label>
                                        <input name="locationPressure" value={locationPressure} onChange={this.onChangeInput} type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Water Pressure" />
                                    </div>
                                    <div className="form-group">
                                        <label>Polygon</label>
                                        <div style={{ width: '100%', height: 400 }} id="map"></div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button onClick={this.onModalClose} ref={closeModalButton => this._closeModalButton = closeModalButton} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary">Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default Location;