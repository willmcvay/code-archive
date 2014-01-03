require("child_process")

child.stdout

var exec = require("child_process").exec
exec("./child", function(err,stdout,stderr){
    if(err) return console.error("failed %s", err)
        console.log("result of running child '%s'",stdout)
})

