FIREWORKS = {};

FIREWORKS.pageWidthCalc = document.documentElement.clientWidth;
FIREWORKS.pageHeightCalc = document.documentElement.clientHeight;
FIREWORKS.canvas;
FIREWORKS.ctx;
FIREWORKS.startXGlobal = 0;
FIREWORKS.startYGlobal = 0;
FIREWORKS.particles = [];
FIREWORKS.explosions = [];
FIREWORKS.numParticles = 100;
FIREWORKS.counter = 0;
FIREWORKS.currentTime = 0;
FIREWORKS.deltaTime = 30;
FIREWORKS.previousTime = 0;

function drawCanvas (){
	FIREWORKS.canvas = document.querySelector("canvas");
	FIREWORKS.ctx = FIREWORKS.canvas.getContext("2d");
	FIREWORKS.canvas.width = FIREWORKS.pageWidthCalc;
	FIREWORKS.canvas.height = FIREWORKS.pageHeightCalc;
	constructParticles();
}

function loop () {
	currentTime = Date.now();
	dt = currentTime - previousTime;
	previousTime = currentTime;
	requestAnimationFrame(loop);
	drawFireworks( dt );
}

function constructParticles () {
	for (var i = 0; i < 30; i++) {
	var explosionArray = [];
		for(var j = 0; j < FIREWORKS.numParticles; j++){
			explosionArray.push(new createParticle());
		}
	FIREWORKS.explosions.push(explosionArray);
	}
}

function particle( x, y ) {
	this.x = x || 0;
	this.y = y || 0;
}

particle.prototype.lerpVectors = function(start, end, alpha){
		this.x = start.x + ((end.x - start.x) * alpha);
		this.y = start.y + ((end.y - start.y) * alpha);
}


function createParticle(x, y) {
	FIREWORKS.counter++;
	var r = Math.random()*255>>0;
	var g = Math.random()*255>>0;
	var b = Math.random()*255>>0;

	if (FIREWORKS.counter === 50) {
		FIREWORKS.startXGlobal = Math.floor(Math.random() * FIREWORKS.pageWidthCalc);
		FIREWORKS.startYGlobal = Math.floor(Math.random() * FIREWORKS.pageHeightCalc);
		FIREWORKS.counter = 0;
	}

	randomEndX = Math.floor(Math.random() * FIREWORKS.pageWidthCalc);
	randomEndY = Math.floor(Math.random() * FIREWORKS.pageHeightCalc);

	vX = randomEndX;
	vY = randomEndY;

	x = FIREWORKS.startXGlobal;
	y = FIREWORKS.startYGlobal;

	return {
		endPosition: new particle( vX, vY ),
		currentPosition: new particle( vX, vY ),
		startPosition: new particle(x, y),
		duration: Math.random() * 5000,
		age: 0,
		alive: true,
		color: "rgba("+r+", "+g+", "+b+", 1)",
		radius: 8
	}
}


function updateSingleFirework( particle, dt ) {
	var positionInTime = particle.age / particle.duration;

	particle.currentPosition.lerpVectors( particle.startPosition, particle.endPosition, positionInTime );

	particle.age += dt;

	if( particle.age > particle.duration ) {
		particle.alive = false;
	}
}

function drawSingleFirework( particle, dt ) {

	var gradient = FIREWORKS.ctx.createRadialGradient(particle.currentPosition.x, particle.currentPosition.y, 0, particle.currentPosition.x, particle.currentPosition.y, particle.radius);
	gradient.addColorStop(0, "white");
	gradient.addColorStop(0.4, "white");
	gradient.addColorStop(0.4, particle.color);
	gradient.addColorStop(1, "black");
	FIREWORKS.ctx.beginPath();
	FIREWORKS.ctx.fillStyle = gradient;
	FIREWORKS.ctx.arc(particle.currentPosition.x, particle.currentPosition.y, particle.radius, Math.PI*2, false);
	FIREWORKS.ctx.fill();
}


function drawFireworks( dt ) {

	FIREWORKS.ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
	FIREWORKS.ctx.fillRect(0, 0,FIREWORKS.pageWidthCalc, FIREWORKS.pageHeightCalc);
	
	for (var i = 0; i < FIREWORKS.explosions.length; i++) {
		    (function(i){
        			setTimeout(function(){
				var singleExplosion = FIREWORKS.explosions[i];

				for(var j = 0; j < singleExplosion.length; j++) {

					var particle = singleExplosion[j];
					
					if( particle.alive ) {
						updateSingleFirework( particle, dt );
						drawSingleFirework( particle, dt );
					}
				}
		        }, 1500 * i);
   		 }(i));
	}
}

function launchFireworksOne () {
	drawCanvas();
	previousTime = Date.now();
	requestAnimationFrame( loop );
}




