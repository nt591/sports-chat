var net = require('net');
var path = require('path');
var express = require('express');
var io = require('socket.io');
var _ = require('underscore');

var chatti = require('sports-server');
var app = express();
var http = require('http').createServer(app);

var io = require('socket.io').listen(http);

var args = process.argv.slice(2);

var server = chatti.createServer({
  // httpServer: http,
  tcpHost: args[0],
  tcpPort: args[1]
});

server.start();

var mgr = chatti.createManager();

server.on('client connected', function(socket) {
  var client = chatti.transformSocket(socket);

  client.emit('message', {
    message: 'hi you thing'
  })
  mgr.add(client);

  client.broadcast('message', {
    message: 'someone connected'
  })
});

mgr.on('client message', function(data) {
  data.client.broadcast('message', data.data)
});

app.use(express.static(path.join(__dirname, 'static')));

http.listen(args[2]);

// io.sockets.on('connection', function(socket) {
//   socket.emit('message', 'hi there client');

//   socket.on('message', function(data) {
//     console.log("Data from socket.io client: " + data)
//   });
// });


// 

// var server = net.Server();
// server.listen(3366, 'localhost');

// server.on('connection', function(socket) {
//   socket.write("Hi client!");

//   socket.on('data', function(data) {
//     console.log("data from client: " + data)
//   });
// });

// setTimeout(function() {

//   var connection = net.connect(3366, 'localhost', function() {
//     // connection.write("Hello server!");

//     // setInterval(function() {
//     //   connection.write("ping")
//     // }, 2000);
//     // connection.on('data', function(data) {
//     //   console.log("data from server: " + data);
//     // })
//   });
// }, 2000);
