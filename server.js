// load external modules
var express = require('express'); // imports the Express.js framework for server creation in Node.js
var app = express(); //express application instance to handle routes and middleware

var http = require('http'); // imports the built-in http module to create an HTTP server
var server = http.Server(app); // creates an HTTP server and ties it to Express app

// middleware serves static files located in the client folder 
// can be accessed directly in the browser
app.use(express.static('client')); 

// use of server.io to enable bidirectional communication
// initializes Socket.IO
var io = require('socket.io')(server); // (server) passesthe HTTP server instance to Socket.IO to listen for WebSocket connections
const list_msg = [];

// dynamically assign a port or use port 8080 locally
const PORT = process.env.PORT || 8080;

io.on('connection', function (socket){
    // Send the existing messages to the new client
    socket.emit('message', list_msg);

    socket.on('message', function (msg) {
        list_msg.push(msg);
        io.emit('message', list_msg); // broadcasts the message to all connected clients, including the sender
    });
});

// starts server on port 8080 (commonly used for local development)
server.listen(PORT, function() {
    console.log('Chat server running');
});