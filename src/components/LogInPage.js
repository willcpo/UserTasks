import React from "react";
//import * as api from "../api";

class LogInPage extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			clickColor: [255,0,0]
		};

		//Remember to set 'this' to the component for all custom functions
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(){
		this.setState({clickColor: [Math.random()*255,Math.random()*255,Math.random()*255]});
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
			<>
			<h2>Hello World, Loser</h2>
			<p onClick={this.handleClick} style={{color:`rgb(${this.state.clickColor[0]},${this.state.clickColor[1]},${this.state.clickColor[2]})`}}>Click Me</p>
			</>
		);
	}

	
}

export default LogInPage;