import mongoose from "mongoose";
import config from "../config";

const Task = mongoose.Schema({ 

	// information
	description: {
		type: String,
		required: true
	},
	date:{
		type: String,
		required: true
	}
	
});

const User = mongoose.Schema({

	//their username to they log in with
	username: {
		type: String,
		required: true,
		unique: true
	},

	//their password to they log in with but in hashed form
	hash: {
		type: String,
		required: true
	},

	//the list of rss feeds that they have saved
	tasks: [Task]
});

mongoose.model("Task", Task);
mongoose.model("User", User);


//change mongodb uri to change the database we are using
mongoose.connect(config.mongodbUri, {useNewUrlParser: true});
