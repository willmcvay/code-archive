net = require("net")

var connection = net.connect(9988,function() {
  console.log("connected")
  connection.write("ping","utf8")
  connection.on("data",function(sth) {
    console.log("Client heard: %s",sth)
    connection.end()
  })
})



