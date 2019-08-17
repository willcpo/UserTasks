import React from "react";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import axios from "axios";
//import * as api from "../api";

class LogInPage extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			clickColor: [255,0,0]
		};

		//Remember to set 'this' to the component for all custom functions
		this.logIn = this.logIn.bind(this);
		this.signUp = this.signUp.bind(this);
	}

	logIn(){
		let username = document.querySelector(".username").childNodes[1].childNodes[0].value
		let password = document.querySelector(".password").childNodes[1].childNodes[0].value
		
		axios.post("/login",{
			username,
			password
		}).then(function (response){
			if (response.data.redirect == '/tasks') {
				window.location = "/tasks"
            } else if (response.data.redirect == '/login'){
                this.loginError()
            }

		}).catch(function (error){
			this.loginError()
		})
	}
	
	signUp(){
		let username = document.querySelector(".username").childNodes[1].childNodes[0].value
		let password = document.querySelector(".password").childNodes[1].childNodes[0].value
	
		axios.post("/signup",{
			username,
			password
		}).then(function (response){
			if (response.data.redirect == '/tasks') {
                window.location = "/tasks"
            } else if (response.data.redirect == '/login'){
                his.signUpError()
            }

		}).catch(function (error){
			this.signUpError()
		})
	}
	

	componentDidMount(){
		
		//api.fetchData(path, cb)

	}

	componentDidCatch(){
		// handle errors
	}

	componentWillUnmount(){
		// clear timers and etc. so they don't leak
	}


	render(){
		return (
			<div className="LoginPane">
				<Card>
					<TextField 
						id="standard-name"
						label="Username"
						margin="normal"
						className="username"
					/>
					<TextField
						id="standard-password-input"
						label="Password"
						className="password"
						type="password"
						autoComplete="current-password"
						margin="normal"
					/>
					<div className="homeButtons">
						<Button onClick={this.logIn} className="loginButton" variant="contained" color="secondary" className="Login">Log In</Button>
						<Button onClick={this.signUp} className="SignUpButton" variant="contained" color="primary" className="SignIn" >Sign Up</Button>
					</div>
				</Card>
			
			</div>
		);
	}

	
}

export default LogInPage;