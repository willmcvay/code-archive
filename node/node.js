var net = require("net")

var util = require("util")

net.createServer(function(connection){
    console.log("got a connection")
})

server.listen("0.0.0.0:9988", function(){
    console.log("server up!")
})

server.on("error", function(err){
    console.error("failed %s", err)
})

server.on("close", function(err){
    console.error("close %s", err)
})