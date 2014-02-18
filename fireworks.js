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

window.addEventListener( 'load', function() {
	console.log( 'window#load' );
	drawCanvas();
	previousTime = Date.now();
	requestAnimationFrame( loop );
});


// Fireworks for leaderboard screen - some definite performace issues with removing divs from DOM. Would be much better in Canvas!!

// FIREWORKS = {};

// FIREWORKS.fireworksArray = [];
// FIREWORKS.explosionArray = [];
// FIREWORKS.pageWidthCalc = document.documentElement.clientWidth / 2;
// FIREWORKS.pageHeightCalc = document.documentElement.clientHeight / 2;
// FIREWORKS.explosionElement = {};
// FIREWORKS.counter = 0;

// function bombsAway () {
// 	FIREWORKS.counter++;
// 	createFireWork();
// 	if (FIREWORKS.counter < 50) {
// 		setTimeout(bombsAway, 100);
// 	} else { 
// 		console.log("End of fun");
// 	}
// }

// function getRandomInt(min, max) {
// 	return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// function createFireWork () {
// 	var firework = {};
// 	firework.element = document.createElement('div');
// 	firework.element.style.width = "5px";
// 	firework.element.style.height = "5px";

// 	// if (FIREWORKS.counter % 5 === 0){
// 	// 	firework.element.style.background =  '#' + Math.floor(Math.random() * 16777215).toString(16);
// 	// } else {
// 	firework.element.style.background = "#fff";
// 	// }

// 	firework.element.style.background = "#fff";
// 	firework.element.className = "firework-divs";
// 	firework.element.id = 'firework-number-' + FIREWORKS.counter;
// 	FIREWORKS.fireworksArray.push(firework);

// 	if (FIREWORKS.counter % 2 === 0) {
// 		document.getElementById('launch-position-b').appendChild(firework.element);
// 	} else {
// 		document.getElementById('launch-position-a').appendChild(firework.element);
// 	}

// 	// firework.element.addEventListener( 'webkitTransitionEnd', function( event ) { 
// 	// 	onLaunchEnd(this)
// 	// }, false );

// 	setTimeout(function(){
// 		launchFireWork();	
// 	},100)	
// }

// function launchFireWork () {
// 	for (var i = 0; i < FIREWORKS.fireworksArray.length; i++) {
// 		var specificEl = FIREWORKS.fireworksArray[i].element
// 		specificEl.style.left = getRandomInt(0, FIREWORKS.pageWidthCalc) + "px";
// 		specificEl.style.top = getRandomInt(0, FIREWORKS.pageHeightCalc) + "px";

// 		if (FIREWORKS.counter % 2 === 0) {
// 			specificEl.style.webkitTransform = "translate3d(" + -getRandomInt(FIREWORKS.pageHeightCalc, 0) + "px," + -getRandomInt(FIREWORKS.pageWidthCalc, 0) + "px, 0px)";
// 		} else {
// 			specificEl.style.webkitTransform = "translate3d(" + getRandomInt(FIREWORKS.pageHeightCalc, 0) + "px," + -getRandomInt(FIREWORKS.pageWidthCalc, 0) + "px, 0px)";
// 		}
// 	};
// 	createExplosionElements();
// }

// function createExplosionElements () {
// 	var singleExplosion = [];
// 	for (var i=0; i<50; i++) {
// 		explosionElement = {};
// 		explosionElement.element = document.createElement('div');
// 		explosionElement.element.id = 'particle' + i;
// 		singleExplosion.push(explosionElement);
// 	}
// 	setTimeout(function(){
// 		addExplosionElementsToDom(singleExplosion);
// 	},200)
	
// }

// function addExplosionElementsToDom (singleExplosion) {
// 	var explosionParent = document.createElement('div');
// 	explosionParent.id = "explosion-parent";
// 	explosionParent.style.height = "0";
// 	explosionParent.style.width = "0";
// 	document.getElementById(FIREWORKS.fireworksArray[0].element.id).appendChild(explosionParent);

// 	for (var i = 0; i < singleExplosion.length; i++) {
// 		singleExplosion[i].element.style.width = "3px";
// 		singleExplosion[i].element.style.height = "3px";
// 		singleExplosion[i].element.style.background = "#fff";
// 		singleExplosion[i].element.className = "explosion-divs";
// 		singleExplosion[i].element.style.position = "absolute";
// 		explosionParent.appendChild(singleExplosion[i].element);
// 	};

// 	FIREWORKS.fireworksArray.shift();

// 	setTimeout(function(){
// 		boom(singleExplosion);
// 	},200)
// }

// function boom (singleExplosion) {
// 	for (var i = 0; i < singleExplosion.length; i++) {
// 		singleExplosion[i].element.style.opacity = "0";
		
// 		if (FIREWORKS.counter % 2 === 0) {
// 			singleExplosion[i].element.style.webkitTransform = "translate3d(" + -getRandomInt(0, FIREWORKS.pageWidthCalc) + "px," + -getRandomInt(0, FIREWORKS.pageHeightCalc) + "px, 0px) scale( 10 )"; 

// 		} else {
// 			singleExplosion[i].element.style.webkitTransform = "translate3d(" + getRandomInt(0, FIREWORKS.pageWidthCalc) + "px," + -getRandomInt(0, FIREWORKS.pageHeightCalc) + "px, 0px) scale( 10 )"; 
// 		}
// 	};

// 	singleExplosion[49].element.addEventListener( 'webkitTransitionEnd', function( event ) { 
// 		onTransitionEnd(this)
// 	}, false );
// }	 

// // function onLaunchEnd (launchedFirework) {
// // 	launchedFirework.style.opacity = "0";
// // }

// function onTransitionEnd (transitionedEl) {

// 	transitionedEl.style.opacity = "0";

// 	var fireworkToDestroy = transitionedEl.parentNode.parentNode;

// 	if (fireworkToDestroy.parentNode.id === "launch-position-a") {
// 		fireworkToDestroy.parentNode.removeChild(fireworkToDestroy);

// 	} else if (fireworkToDestroy.parentNode.id === "launch-position-b")  {
// 		fireworkToDestroy.parentNode.removeChild(fireworkToDestroy);
// 	}
// }

// window.addEventListener( 'load', function() {
// 	console.log( 'window#load' );
// 	bombsAway();
// 	// drawCanvas();
// });
