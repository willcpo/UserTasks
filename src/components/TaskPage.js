import React from "react";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import DatePicker from "./DatePicker";
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Axios from "axios";
//import * as api from "../api";

class TaskPage extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			tasks: []
		};
		//Remember to set 'this' to the component for all custom functions
		this.displayTasks = this.displayTasks.bind(this);
		this.addTask = this.addTask.bind(this);
		this.getTaskData = this.getTaskData.bind(this);
	}

	displayTasks(){
		return this.state.tasks.map((task)=>(
			<Card className="task">
				<div className="description">{task.description}</div>
				<div className="date">{task.date}</div>
				<Button 
					variant="contained" 
					color="secondary" 
					className="deleteTask" 
					onClick={this.deleteTask.bind(this,task.id)}
				>X</Button>
			</Card>
		))
	}

	addTask(){
		

		let description = document.querySelector(".addDescription div").childNodes[1].childNodes[0].value
		let date = document.querySelector(".addDate div div input").value
		console.log("posting task:",description,date)
		Axios.post('/api/postTask',{
			description,
			date
		})
		.then((response)=>{
			console.log("response from task post:", response)
		})
		.catch((error)=>{
			console.log("error from task post:", error)
		})
		this.getTaskData();
	}

	getTaskData(){
		console.log("fetching tasks")
		Axios.get('/api/getTasks')
			.then((response)=>{
				console.log("response from getting task data:", response.data)
				this.setState({tasks: response.data})
				
			}).catch((error)=>{
				console.log("error getting task data:",error)
				return []
			})
	}

	deleteTask(id){
		console.log("posting delete for task id:", id )
		Axios.post('/api/deleteTask',{
			id
		})
			.then((response)=>{
				console.log("response from posting delete: ", response)
			})
			.catch((error)=>{
				console.log("error from posting delete: ",error)
			})
			this.getTaskData();
	}

	componentDidMount(){
		this.getTaskData();
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
						<Button variant="contained" color="primary" onClick={this.addTask}>Add&nbsp;Task</Button>
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