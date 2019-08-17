
import React from "react";
import {Route} from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
//import * as api from "../api";

class HeaderBar extends React.Component {

	constructor(props){
		super(props);
		this.state={
			name:""
		}
		//Remember to set 'this' to the component for all custom functions
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(){
		this.setState({clickColor: [Math.random()*255,Math.random()*255,Math.random()*255]});
	}

	componentDidMount(){
		
		//api.fetchData(path, cb)
		this.setState({name:window.user})

	}

	componentDidCatch(){
		// handle errors
	}

	componentWillUnmount(){
		// clear timers and etc. so they don't leak
	}


	render(){
		return (
			<AppBar position="static" className="userPane">
					<Toolbar>
						<Typography variant="h6"  className="user">
							Hello {this.state.name}!
						</Typography>
                        <Route exact path="/tasks" render={()=>{
                            return (<Button color="inherit" className="logout" onClick={()=>{window.location="/logout"}}>Logout</Button>)
                        }}/>
					</Toolbar>
			</AppBar>
		);
	}

	
}

export default HeaderBar;