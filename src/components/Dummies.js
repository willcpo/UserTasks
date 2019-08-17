import React from "react";

export class Yes extends React.Component{ 

	render(){
		return (
			<a href="/other">Click for other page</a>
		);
	}

}

export class No extends React.Component{ 

	render(){
		return (
			<a href="/">Click to go back</a>
		);
	}

}

