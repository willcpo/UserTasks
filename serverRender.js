import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";

import App from "./src/components/App";


///          ! ! ! ! ! ! ! ! ! ! ! ! ! !

// This will need to be altered with conditionals
// to make sure every page gets the initial data it needs

///          ! ! ! ! ! ! ! ! ! ! ! ! ! !


function serverRender (url){

		return {
			initialMarkup: ReactDOMServer.renderToString(
				<StaticRouter location={url} context={{}}>
					<App initialData = {initialData}/>
				</StaticRouter>
			)
		};
}
export default serverRender;