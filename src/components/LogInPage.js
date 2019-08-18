import React from "react";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import axios from "axios";

class LogInPage extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			error:""
		};

		//Remember to set 'this' to the component for all custom functions
		this.createSession = this.createSession.bind(this);
	}

	createSession(type){

		let usernameNode = document.querySelector(".username")
		let username = usernameNode.childNodes[1].childNodes[0].value
		let passwordNode = document.querySelector(".password")
		let password = passwordNode.childNodes[1].childNodes[0].value

		if (!username){
			usernameNode.childNodes[1].classList.add("Mui-error")
		}
		if (!password){
			passwordNode.childNodes[1].classList.add("Mui-error")
		}
		if (!username || !password) {
			this.setState({error:"All fields must be filled out"})	
			return
		};

		let setState = this.setState.bind(this)

		axios.post(`/${type}`,{
			username,
			password
		}).then(function (response){
			console.log(response)
			if (response.data.redirect == '/tasks') {
				window.location = "/tasks"
			} else if (response.data.redirect == '/login'){
				setState({error:response.data.message})
			}
	
		}).catch(function (error){
			console.log(error);
			setState({error:`error with ${type}`})
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
			<div className="loginBackground">
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
							<Button onClick={this.createSession.bind(this,"login")} className="loginButton" variant="contained" color="secondary" className="Login">Log In</Button>
							<Button onClick={this.createSession.bind(this,"signup")} className="SignUpButton" variant="contained" color="primary" className="SignIn" >Sign Up</Button>
						</div>
						<div className="error">
							{this.state.error}
						</div>
					</Card>
				
				</div>
			</div>
		);
	}

	
}

export default LogInPage;