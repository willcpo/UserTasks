// all routes for the api
import express from "express";
import mongoose from "mongoose";
const db = require('./db');
const Task = mongoose.model('Task');
const User = mongoose.model('User');
const eLogIn = require('connect-ensure-login');


const router = express.Router();


// router.put("/updateUserTask", (req, res)=>{
// 	let RSSurl = req.body.RSSurl

// 	User.findOneAndUpdate({username:req.user.username}, { "$pull": {"favoriteFeeds":{ "RSSurl" : RSSurl }} }, { "new": true }, 
// 		(error, docs) => {
// 			if (error) res.redirect(`/user?message=${encodeURI("Feed cannot be removed")}`)
// 			else res.redirect(`/user?message=${encodeURI("Feed successfully removed")}`)	
// 	});
	
// })

router.post("/deleteTask", eLogIn.ensureLoggedIn("/login"), function(req, res){
	
	let id = req.body.id;

	console.log( "deleting id: "+id)

	User.findOneAndUpdate({username:req.user.username}, { "$pull": {"tasks":{ _id: id }} }, { "new": true }, 
		(error, docs) => {
			if (error) res.send(error)
			else {
				console.log( "deleted id: "+id)
				console.log( "docs are now: "+docs)	}
				res.send(docs)
				
	});
});

router.get('/getTasks', eLogIn.ensureLoggedIn("/login"), function(req, res){

		let tasks = req.user.tasks.map((task)=>{
			return {
				description: task.description,
				date: task.date,
				id: task.id
			}
		});

		console.log("getting tasks:",tasks);
		
		res.send(JSON.stringify(tasks))
})

router.post("/postTask", eLogIn.ensureLoggedIn("/login"), function(req, res){

	console.log("adding task: ", req.body)

	let task = new Task({
		description : req.body.description,
		date : req.body.date,
	})

	User.findOneAndUpdate({username:req.user.username}, { "$push": { tasks: task } }, { "new": true }, 
		(error, docs) => {
			if (error){
				console.log("error");
				res.send(error)
			}
			else{
				res.send("Saved");
				console.log("added task: ", docs)
			} 
	});

});



export default router;
