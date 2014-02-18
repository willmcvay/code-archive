CLICKBOOM = {};

CLICKBOOM.pageWidthCalc = document.documentElement.clientWidth;
CLICKBOOM.pageHeightCalc = document.documentElement.clientHeight;
CLICKBOOM.canvas;
CLICKBOOM.ctx;
CLICKBOOM.explosions = [];
CLICKBOOM.numParticles = 50;
CLICKBOOM.currentTime = 0;
CLICKBOOM.deltaTime = 30;
CLICKBOOM.previousTime = 0;


window.addEventListener( 'load', function() {
	console.log( 'window#load' );
	var container = document.getElementById("container");
	container.addEventListener('click', launchClickBoom , false);
});

function launchClickBoom () {
	drawCanvasClick();
	previousTime = Date.now();
	requestAnimationFrame( loopClick );
}

function relMouseCoords(event){

	return {
		x: event.pageX,
		y: event.pageY

	}
}

function drawCanvasClick (){
	CLICKBOOM.canvas = document.querySelector("canvas");
	CLICKBOOM.ctx = CLICKBOOM.canvas.getContext("2d");
	CLICKBOOM.canvas.width = CLICKBOOM.pageWidthCalc;
	CLICKBOOM.canvas.height = CLICKBOOM.pageHeightCalc;
	constructParticlesClick();
	
}

function loopClick () {
	currentTime = Date.now();
	dt = currentTime - previousTime;
	previousTime = currentTime;
	requestAnimationFrame(loopClick);
	drawClickBoom( dt );
}

function constructParticlesClick (startX, startY) {
	for(var j = 0; j < CLICKBOOM.numParticles; j++){
		CLICKBOOM.explosions.push(new createParticleClick())
	}
}

function particleClick( x, y ) {
	this.x = x || 0;
	this.y = y || 0;
}

particleClick.prototype.lerpVectorsClick = function(start, end, alpha){
		this.x = start.x + ((end.x - start.x) * alpha);
		this.y = start.y + ((end.y - start.y) * alpha);
}


function createParticleClick(x, y) {
	CLICKBOOM.counter++;
	var r = Math.random()*255>>0;
	var g = Math.random()*255>>0;
	var b = Math.random()*255>>0;

	randomEndX = Math.floor(Math.random() * CLICKBOOM.pageWidthCalc);
	randomEndY = Math.floor(Math.random() * CLICKBOOM.pageHeightCalc);

	vX = randomEndX;
	vY = randomEndY;

	x =  relMouseCoords(event).x;
	y = relMouseCoords(event).y;

	return {
		endPosition: new particleClick( vX, vY ),
		currentPosition: new particleClick( vX, vY ),
		startPosition: new particleClick(x, y),
		duration: Math.random() * 5000,
		age: 0,
		alive: true,
		color: "rgba("+r+", "+g+", "+b+", 1)",
		radius: 8
	}
}

function updateSingleFireworkClick( particle, dt ) {
	var positionInTime = particle.age / particle.duration;

	particle.currentPosition.lerpVectorsClick( particle.startPosition, particle.endPosition, positionInTime );

	particle.age += dt;

	if( particle.age > particle.duration ) {
		particle.alive = false;
	}
}

function drawSingleFireworkClick( particle, dt ) {

	var gradient = CLICKBOOM.ctx.createRadialGradient(particle.currentPosition.x, particle.currentPosition.y, 0, particle.currentPosition.x, particle.currentPosition.y, particle.radius);
	gradient.addColorStop(0, "white");
	gradient.addColorStop(0.4, "white");
	gradient.addColorStop(0.4, particle.color);
	gradient.addColorStop(1, "black");
	CLICKBOOM.ctx.beginPath();
	CLICKBOOM.ctx.fillStyle = gradient;
	CLICKBOOM.ctx.arc(particle.currentPosition.x, particle.currentPosition.y, particle.radius, Math.PI*2, false);
	CLICKBOOM.ctx.fill();
}

function drawClickBoom( dt ) {

	CLICKBOOM.ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
	CLICKBOOM.ctx.fillRect(0, 0,CLICKBOOM.pageWidthCalc, CLICKBOOM.pageHeightCalc);
	
	for (var i = 0; i < CLICKBOOM.explosions.length; i++) {

		var particle = CLICKBOOM.explosions[i];
		
		if( particle.alive ) {
			updateSingleFireworkClick( particle, dt );
			drawSingleFireworkClick( particle, dt );
		}
	}
}






