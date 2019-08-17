import { Collection } from "./db";

//this must be called on its own to set up the database

// run "./node_modules/.bin/babel-node api/LoadDataToDB"
// !!!!!!      MAKE SURE mongod is running        !!!!!!


const newItem = new Collection({ 
	// data
	info: "Set up database"
});

newItem.save().then((doc) => console.log(doc.id + "item saved"));

