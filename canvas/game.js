main()

function main() {
  var canvas = document.querySelector("#canvas")
  var context = canvas.getContext("2d")
  var player = {x:50,y:50,targetPosition:{x:100,y:100},speedInPxPerMilli: 0.05}

  listenMouse(canvas,player)  
  loop(function(ellapsedMills) {
    context.clearRect(0,0,canvas.width,canvas.height)
    updateFollowing(player,ellapsedMills)
    drawPlayer(context,player,ellapsedMills)
  })
}

function listenMouse(canvas,player) {
  canvas.addEventListener("mousemove",function(event) {
    player.targetPosition.x = event.offsetX
    player.targetPosition.y = event.offsetY
  })
}

function updateFollowing(player,ellapsedMills) {
  // target position, current position
  // move towards target from current
  var target = player.targetPosition
  var disY = target.y - player.y
  var disX = target.x - player.x
  if(Math.sqrt(disX * disX + disY * disY) < 20) return
  var radians = angleBetween(player,target)
  var dx = Math.cos(radians) * player.speedInPxPerMilli * ellapsedMills
  var dy = Math.sin(radians) * player.speedInPxPerMilli * ellapsedMills
  player.x += dx
  player.y += dy
}

function angleBetween(a,b) {
  return Math.atan2(b.y - a.y,b.x - a.x)
}

function updateDriving(player,ellapsedMills) {
  // ellapsedMills = 16
  // speedInPxPerMilli 0.5
  // speedInPxPerMilli * ellapsedMills = 8
  if(ellapsedMills > 50) console.log(ellapsedMills)
  player.x += ellapsedMills * player.speedInPxPerMilli * player.direction[0]
  player.y += ellapsedMills * player.speedInPxPerMilli * player.direction[1]
}

function listenKeyboard(player) {
  var LEFT = 37
  var UP = 38
  var RIGHT = 39
  var DOWN = 40
  var DIRECTIONS = Object.create(null)
  DIRECTIONS[LEFT] =  [-1,0]
  DIRECTIONS[RIGHT] = [1,0]
  DIRECTIONS[UP] =    [0,-1]
  DIRECTIONS[DOWN] =  [0,1]
  document.addEventListener("keydown",function(event) {
    if(!(event.keyCode in DIRECTIONS)) return
    player.direction[0] += DIRECTIONS[event.keyCode][0]
    player.direction[1] += DIRECTIONS[event.keyCode][1]
    player.direction[0] = within(player.direction[0],-1,1)
    player.direction[1] = within(player.direction[1],-1,1)
    console.log(player.direction)
  })
}

function within(x,min,max) {
  if(x > max) return max
  if(x < min) return min
  return x
}

function drawPlayer(context,player) {
  var w = 30
  var h = 20
  var radians = angleBetween(player,player.targetPosition)
  context.save()
  context.translate(player.x+ w/2, player.y+h/2 );
  context.rotate(radians)
  context.fillRect(0,0,-w/2,-h/2)
  context.restore()
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