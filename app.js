var net = require('net');

var server = net.Server();
server.listen(3366, 'localhost');

server.on('connection', function(socket) {
  socket.write("Hi client!");

  socket.on('data', function(data) {
    console.log("data from client: " + data)
  });
});

setTimeout(function() {

  var connection = net.connect(3366, 'localhost', function() {
    connection.write("Hello server!");

    setInterval(function() {
      connection.write("ping")
    }, 2000);
    connection.on('data', function(data) {
      console.log("data from server: " + data);
    })
  });
}, 2000);
