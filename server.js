const express = require('express');
const app = express();

// your code goes here!
const path = require('path');
import config from "./config";
const mongoose = require('mongoose');
const User = mongoose.model('User');
const sanitize = require("mongo-sanitize");
const passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const eLogIn = require('connect-ensure-login');


import apiRouter from "./api/index";
import sassMiddleware from "node-sass-middleware";
import serverRender from "./serverRender";

/// middleware for logging parsing and session handling
//app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('body-parser').json())
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));


/// Configure local strategy for passport
/// this function verrifys the user by looking in up in the database
/// then it calls the callback function with an error if there is one,
/// null if there is no user or the password is wrong, or the use
passport.use("login",new LocalStrategy(
	function(username, password, callback) {
		console.log("login")
	  User.findOne({ username: username }, function (err, user) {
		if (err) { return callback(err); }
		if (!user) { return callback(null, false); }
		bcrypt.compare(password, user.hash, function(err, res) {
			if(res){
				return callback(null, user);
			}
			if (err) return callback(err, false);
			return callback(null, false);
		});
	  });
	}
));

  

passport.use("signup",new LocalStrategy(
	function(username, password, callback) {
		console.log("signup")
	  User.findOne({ username: username }, function (err, user) {
		if (err) { return callback(err); }
		if (user) { return callback(null, false); }
		bcrypt.hash(password, saltRounds, function(err, hash) {
			if (err) return callback(err, false);
			let usr = new User({
				username: username,
				hash: hash
			})
			usr.save(function (err, usr) {
				if (err) return callback(err, false);
				return callback(null, usr);
	  		})

		  });

	  });
	}
));
// set up a session for the logged in user
//Passport needs to serialize users into and deserialize users out of the session.
// the serialization is provided by the id in the database
passport.serializeUser(function(user, callback) {
	console.log("serializeUser")
	callback(null, user.id);
  });
  
passport.deserializeUser(function(id, callback) {
	console.log("deserializeUser")
	User.findById(id, function (err, user) {
		if (err) { return callback(err); }
		callback(null, user);
	});
});



// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

app.use(sassMiddleware({
	src: path.join(__dirname, "sass"),
	dest: path.join(__dirname, "public")
}));

app.set("view engine", "ejs");

app.use("/api", apiRouter);
app.use(express.static("public"));

app.get('/', eLogIn.ensureLoggedIn("/login"),
	(req, res)=>{
	res.redirect("/tasks");
});


app.get('/login',(req, res)=>{
	console.log("go to log in")
	res.render("index",{user:"", ...serverRender(req.url)} );
});

app.post('/login',  function(req, res, next) {
	passport.authenticate('login', function(err, user, info){
		if (err){
			console.log(err)
			res.json({
				message: "username or password invalid",
				redirect: "/login"
			})
		}
		else if (!user) { 
			res.json({
				message: "username or password invalid",
				redirect: "/login"
			})
		 }
		else {
			req.logIn(user, function(err) {
				if (err) { 
					res.json({
						message: "error logging in",
						redirect: "/login"
					})
				 }
				return res.json({
					message: "success",
					redirect: "/tasks"
				});
			});
		}
	
	})(req, res, next)
 
})

app.post('/signup',  function(req, res, next) {
	passport.authenticate('signup', function(err, user, info){
		if (err){
			console.log(err)
			res.json({
				message: "username already taken",
				redirect: "/login"
			})
		}
		else if (!user) { 
			res.json({
				message: "username already taken",
				redirect: "/login"
			})
		 }
		else {
			req.logIn(user, function(err) {
				if (err) { 
					res.json({
						message: "error signing up",
						redirect: "/login"
					})
				 }
				return res.json({
					message: "success",
					redirect: "/tasks"
				});
			});
		}
	
	})(req, res, next)
 
})

app.get('/tasks',eLogIn.ensureLoggedIn("/login"),(req, res)=>{
	let data = {user:req.user.username, ...serverRender(req.url)}
	console.log(JSON.stringify(data));
	res.render("index", data);
	
});


app.get('/logout', eLogIn.ensureLoggedIn("/login"),
  function(req, res){
    req.logout();
    res.redirect('/login');
  });


  app.listen(config.port, config.host, ()=>{
	console.info("Express listening on port ", config.port);
});