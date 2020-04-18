// Import dotenv;
// Dotenv is a zero-dependency module that loads 
// environment variables from a .env file into process.env. 
// Storing configuration in the environment separate from code 
// is based on The Twelve-Factor App methodology.
require('dotenv').config();

const express = require('express');

// Get the routes from the ./routes/index.js
const routes = require('./routes/index.js')
// Built in module: makes it easy to set file paths
const path = require('path')

const body_parser = require('body-parser')

// Create an express application
const app = express();

/* ------ Next 2 functions are examples of middleware implementations
    ----- middleware are pieces of functionality that run before requests:
    ----- check if there's a login user, cookies, etc ----------------------- */
// Instruct the app to use the public directory for any static asset requests
app.use(express.static(path.join(__dirname, 'public')));

// Instruct our app to use the body parser
// body_parser.urlencoded() enables us to extract the form data (in the html page)
// from a post request
app.use(body_parser.urlencoded({extended:false}));

// This is a piece of middleware that which we do the implementation
// This will run before every other request is handled: it intercepts the
// request, runs its logic and then passes control to the next handler; only passes
// control after we call next()
app.use((req, res, next) => {
    // This variable is now available for us to use in all the requests 
    req.timestamp = new Date().toString();
    next();
})

// Tell the express app to use the ./routes/index.js file to service requests
// In this case route requests to '/'
app.use('/', routes)

// Tell the app where your views dir is
app.set('views', path.join(__dirname, 'views'))
// Specify a view template engine: allows to inject files like html in a dyanamic way
// rather than statically which is the nature of files like html
app.set('view engine', 'hjs')

// Port number we want our server to listen on
// 5000 is a typical localhost port number
app.listen(5000);
// Comfirmation for developer that server is fact running
console.log('Server running on http://localhost:5000);
