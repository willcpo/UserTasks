import axios from "axios";
import config from "../config";



// executes callback with response
// also returns promise if you would like to asynchronously return something from the callback 
export function fetchData (path, callback) {
	return axios.get(`${config.serverUrl}/${path}`)
		.then( callback );
}

