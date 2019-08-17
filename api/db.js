import mongoose from "mongoose";
import config from "../config";

//change mongodb uri to change the database we are using
mongoose.connect(config.mongodbUri, {useNewUrlParser: true});

export const Collection = mongoose.model("Collection", { 

	// information
	info: String
	
});
