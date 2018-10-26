main()

function main() {
  var canvas = document.querySelector("#canvas")
  var context = canvas.getContext("2d")
  spinner(context,250,200,200,200,Math.PI / 8)
}

function loop(fn) {
  var lastFrame = Date.now()
  function frame() {
    (window.requestAnimationFrame || setTimeout)(function() {
      var now = Date.now()
      fn(now - lastFrame)
      lastFrame = now
      frame()
    },1000/60)
  }
  frame()
}

function spinner(ctx,timeForCircleInMillis,radius,x,y,sizeRadians) {
  var position = 0
  loop(function(frameMills) {
    ctx.clearRect(0,0,800,800)
    ctx.beginPath()
    ctx.arc(x,y,radius,position,position + sizeRadians)
    ctx.lineWidth = 8
    ctx.strokeStyle = "#444"
    ctx.stroke()
    position += frameMills/timeForCircleInMillis
  })
}
