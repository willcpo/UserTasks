import React from "react";
import  {Route, Switch} from "react-router-dom";
import LogInPage from "./LogInPage";
import TaskPage from "./TaskPage";
import HeaderBar from "./HeaderBar";

class App extends React.Component {

	constructor(props){
		super(props);
		this.state = { initialData: props.initialData};
	}

	render(){
		console.log("rendering App")
		return(
			<>		
				
				<Switch>
					<Route exact path="/login" component={LogInPage} />
					<Route exact path="/tasks" render={()=>
					(<>
						<HeaderBar />
						<TaskPage />
					</>)} />
				</Switch>
				
			</>
		);
	}

}



export default App;