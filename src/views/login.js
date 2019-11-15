import React, { Component } from 'react';
import Config from '../util/config';
import { withRouter } from 'react-router-dom';
import flowerUser from '../images/flower.png';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            dataUser: {
                userName: '',
                password: ''
            }
        }
    }

    auth = (event) => {
        event.preventDefault();
        const { dataUser } = this.state;
        console.log(dataUser);
        let body = new FormData();
        body.append('username', dataUser.userName);
        body.append('password', dataUser.password);
        fetch(Config.server + 'login', {
            method: 'post',
            body: body,
        }).then(response => response.json()).then(response => {
            console.log(response);
            debugger;;
            if (response.success) {
                this.props.history.push({
                    pathname: '/Home/Location',
                });
            }
            else {
                alert(response.message)
            }
        });
    }

    onChangeInput = (event) => {
        let { dataUser } = this.state;
        dataUser[event.target.name] = event.target.value;
        dataUser[event.target.name] = event.target.value;
        this.setState({ dataUser })
    }

    render() {
        const { userName, password } = this.state.dataUser;

        return (
            <div>
                <div className="row">
                    <div className="col-md-5 login-right">
                    </div>
                    <div className="col-md-7 login-half">
                        <h1><p className="title-plants">WATERING PLANTS</p></h1>
                        <h3>Control of your plants</h3>
                        &nbsp;
                        <form className="form-signin" onSubmit={this.auth}>
                            <label className="sr-only">Email address</label>
                            <input name="userName" type="text" className="form-control" value={userName} onChange={this.onChangeInput} placeholder="Username" required autoFocus />
                            <label className="sr-only">Password</label>
                            <input name="password" type="password" className="form-control pass" value={password} onChange={this.onChangeInput} placeholder="Password" required />
                            &nbsp;
                        <button className="btn btn-login" type="submit">Sign In</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);