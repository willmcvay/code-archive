var net = require("net")
var util = require("util")

var server = net.createServer()
server.on("connection",function(connection) {
  console.log("Got a connection")
  connection.on("data",function(sth) {
    console.log("Server heard: %s",sth)
    connection.write("pong")
  })
})
server.listen(9988,function() {
  console.log("Server up!")
})
server.on("error",function(err) {
  console.error("Error %s",err)
})
server.on("close",function(err) {
  // puts "Failed %s" % err
  console.error("Close %s",err)
})




