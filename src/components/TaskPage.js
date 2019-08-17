import React from "react";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import DatePicker from "./DatePicker";
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
//import * as api from "../api";

class TaskPage extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			tasks: [
				{
					description:"Do this",
					date: new Date()
				},
				{
					description:"Do THAT",
					date: new Date()
				}
			]
		};
		console.log(Date.now());
		//Remember to set 'this' to the component for all custom functions
		this.displayTasks = this.displayTasks.bind(this);
	}

	displayTasks(){
		return this.state.tasks.map((task)=>(
			<>
			<Card className="task">
				<div className="description">{task.description}</div>
				<div className="date">{task.date.toDateString()}</div>
				<Button variant="contained" color="secondary" className="deleteTask" >X</Button>
			</Card>
			</>
		))
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
		console.log("rendering Task Page")
		return (
			<div className="taskPane">
				<div className="addPane">
					<div className="addDescription">
						<TextField
							label="Description"
						/>
					</div>
					<div className="addDate">
						<DatePicker />
					</div>
					<div className="submitAdd" >
						<Button variant="contained" color="primary">Add&nbsp;Task</Button>
					</div>
					
				</div>
				<Paper className="tasks">
					{this.displayTasks()}
				</Paper>
			</div>
		);
	}

	
}

export default TaskPage;