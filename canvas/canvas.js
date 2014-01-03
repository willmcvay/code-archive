var canvas = document.querySelector("#canvas")
var context = canvas.getContext("2d")

context.beginPath()
context.moveTo(400,400)
context.lineTo(400,500)
context.lineTo(500,500)
context.lineTo(500,400)
context.lineTo(400,400)
context.lineWidth = 4

context.closePath()
context.stroke()

context.strokeRect(120,120,300,300)
context.beginPath()
context.lineTo(1000,1000)
context.lineTo(250,1000)
context.fill()