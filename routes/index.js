const express = require('express')
const router = express.Router()

// get() takes 2 arguments: 1st is the route handler('/' means home route; when
// go to the home page, all get request will be serviced by this route hanadler);
// The home page in this case is http://localhost:5000 (same as http://localhost:5000/)
// The 2nd argument is a functioin
// router.get('/', (req, res, next) => {
//     res.send('This is the response!');
// });

// Meaning no one is logged in
let user = null;

const profiles = [
    {name: 'Mike', city: 'Sydney', profession: 'Develoepr'},
    {name: 'Cindy', city: 'Toronto'},
    {name: 'Joe', city: 'NY', profession: 'Realtor'}
];

router.get('/', (req, res, next) => {
    // find the index.hjs file and render it for home route requests
    // The hjs view engine injects view files dynamically to our main app:
    // the second parameter we pass is gonna fill some placeholder in index.hjs

    console.log('Timestamp: ' + req.timestamp);
    const data = {
        name: 'Home',
        date: req.timestamp,
        profiles: profiles,
        user: user
    }
    res.render('index.hjs', data)
});

router.get('/login', (req, res, next) => {
    res.render('login.hjs', null);
});

router.post('/login', (req, res, next) => {
    // Get the username and password fields from the submitted form
    const username = req.body.username;
    const password = req.body.password;

    // Assume correct password is '123'; if it's '123' then redirect to home page
    // (login successful)
    if (password === '123') {
        // If login successful then populate the user object with the user loggedin
        user = {username: username};
        res.redirect('/');
        return;
    }

    const data = {
        message: 'Please check your password and/or username.'
    }

    // If password is not correct then show the error page
    // Have to pass an object as the second param; cannot be a simple string
    res.render('error.hjs', data);
})

router.post('/join', (req, res, next) => {
    const body = req.body;
    // Add information provided on form to the profiles array
    profiles.push(body);
    // Redirect the request to the homepage so we can show the new data in profiles
    res.redirect('/');

    // // This shows the info provided in form as a json object
    // res.json({
    //     data: body
    // });
});

// This route handler (/json) will respond to a route specified as http://localhost:5000/json
// therefore whenever we type that url in the search bar our express app (server) 
// will respond with the object 'data' in json format
router.get('/json', (req, res, next) => {
    console.log('Timestamp: ' + req.timestamp);
    const data = {name:'David', location:'Toronto', date:req.timestamp}; 
    res.json(data);
});

// Now this route handler will respond with html
router.get('/html', (req, res, next) => {
    const html = '<html><h1 style="color:red">This is an HTML response</h1></html>'
    res.send(html)
})

// This time will return the request's query string as a json object:
// Ex: localhost:5000/query?name=andres&location=toronto
// In this case the query string is name=andres&location=toronto
router.get('/query', (req, res, next) => {
    // Get the query from the request
    const query = req.query
    // Send it back as a json object
    res.json(query)
})

// This time we use route parameters for the route handler
// All parameters defined in the route have to be spcified in the url,
// otherwise we get an error:
// Ex: if we define route as 'params/:name/:location' then we'd have to type
// localhost:5000/params/andres/toronto
// Different fromn query string bc in query string we can add as many values
// as we want
router.get('/params/:name/:location/:occupation', (req, res, next) => {
    const params = req.params
    res.json({
        params_object: params
    })
})

// Export router contents 
module.exports = router