// set up ========================
var express  = require('express');
var app      = express();                   // create our app w/ express
var mongoose = require('mongoose');         // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var mongoose = require('mongoose');   // User model connection with mongoose
var User = require('./models/User.js');

// configuration ================

//mongoose.connect('mongodb://localhost/login');     // connect to local mongoDB database on modulus.io
mongoose.connect('mongodb://admin:admin@ds053944.mongolab.com:53944/multiversion'); 


app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

app.get('*', function(req, res) {
    res.sendfile('./public/register.html'); // load the single view file (angular will handle the page changes on the front-end)
});

// routing
app.post('/', function(req, res){
    console.log('----- inside creation of user------'+req);
    console.log('----- inside creation of user------'+req.body.firstName);
    var user = new User();
    user.firstName = req.body.firstName;
    user.lastName  = req.body.lastName;
    user.userName  = req.body.userName;
    user.password  = req.body.password;
    user.email     = req.body.email;
    user.save(function(err, updatedUser){
        if(err) 
            res.send(err);
        else 
            res.json('successfully registered');
        // retieve all users after created a user
        /*User.find(function(err, users){
            if(err)
                res.send(err);
            res.setHeader('Content-Type', 'application/json');
            console.log('no of users:'+users.length);
            console.log(users);
            res.json(users);
        });*/
    });
});

app.post('/listusers', function(req, res){
    console.log('----- inside getting all users------');
    User.find(function(err, users){
            if(err)
                res.send(err);
            console.log('no of users:'+users.length);
            console.log(users);
            res.json(users);
        });
})

// listen (start app with node server.js) ======================================
var port = normalizePort(process.env.PORT || '8080');
app.set('port', port);
app.listen(port);
console.log("App listening on port 8080");


function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}