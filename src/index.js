import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import {BrowserRouter as Router} from "react-router-dom";



ReactDOM.hydrate(
	<Router>
		<App initialData={window.initialData} />
	</Router>,
	document.getElementById("root")
);