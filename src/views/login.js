import React, {Component} from 'react';
import Config from '../util/config';
import {withRouter} from 'react-router-dom';
import flowerUser from '../images/flower.png';

class Login extends Component{

    constructor(props){
        super(props);
        this.state = {
            data: [],
            dataUser:{
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
            if (response) {
                this.props.history.push({
                    pathname: '/Home',
                });
            }
            else {
                alert.show("No se pudo :c")
            }
        });
    }

    onChangeInput = (event)=>{
        let { dataUser } = this.state;
        dataUser[event.target.name] = event.target.value;
        dataUser[event.target.name] = event.target.value;
        this.setState({dataUser})
    }

    render(){
        const{ userName, password } = this.state.dataUser;

        return(
            <div className="container col-lg-3 loginform">
                <form className="form-signin" onSubmit={this.auth}>
                    <div className="center-title">
                        <img className="userLogo"src={flowerUser} alt="user" />
                        <strong><h1 className="h3 mb-3 font-weight-normal">Enter Your Credentials</h1></strong>
                    </div>
                    <label className="sr-only">Email address</label>
                    <input name="userName" type="text" className="form-control" value={userName} onChange={this.onChangeInput} placeholder="Username"  required autoFocus />
                    <label className="sr-only">Password</label>
                    <input name="password" type="password" className="form-control pass" value={password} onChange={this.onChangeInput} placeholder="Password"  required />
                    &nbsp;
                    <button className="btn btn-lg btn-success btn-block" type="submit">Sign In</button>
                </form>
            </div>
        );
    }
}

export default withRouter(Login);