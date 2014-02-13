FIREWORKS = {};

FIREWORKS.fireworksArray = [];
FIREWORKS.explosionArray = [];
FIREWORKS.pageWidthCalc = document.documentElement.clientWidth / 2;
FIREWORKS.pageHeightCalc = document.documentElement.clientHeight / 2;
// FIREWORKS.firework = {};
// FIREWORKS.singleExplosion = [];
FIREWORKS.explosionElement = {};
FIREWORKS.counter = 0;

function bombsAway () {
	FIREWORKS.counter++;
	createFireWork();
	// console.log("Boom");
	if (FIREWORKS.counter < 5) {
		setTimeout(bombsAway, 1000);
	} else { 
		console.log("End of fun");
	}
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function placeDiv(x_pos, y_pos) {
// 	var d = document.getElementById('yourDivId');
// 	d.style.position = "absolute";
// 	d.style.left = x_pos+'px';
// 	d.style.top = y_pos+'px';
// }

function createFireWork () {
	firework = {};
	firework.element = document.createElement('div');
	console.log(firework.element);
	// firework.startPointY = getRandomInt(0, FIREWORKS.pageWidthCalc);
	// firework.startPointX = 0;
	// firework.element.style.bottom = firework.startPointX + "px";
	// firework.element.style.left = firework.startPointY + "px";
	firework.element.style.width = "5px";
	firework.element.style.height = "5px";
	firework.element.style.background = "#fff";
	firework.element.className = "firework-divs";
	firework.element.id = 'firework-number-' + FIREWORKS.counter;
	FIREWORKS.fireworksArray.push(firework);

	if (FIREWORKS.counter % 2 === 0) {
		document.getElementById('launch-position-a').appendChild(firework.element);
	} else {
		document.getElementById('launch-position-b').appendChild(firework.element);
	}

	setTimeout(function(){
		launchFireWork();	
	},100)	
}

function launchFireWork () {
	for (var i = 0; i < FIREWORKS.fireworksArray.length; i++) {
		FIREWORKS.fireworksArray[i].element.style.left = getRandomInt(0, FIREWORKS.pageWidthCalc) + "px";
		FIREWORKS.fireworksArray[i].element.style.bottom = getRandomInt(0, FIREWORKS.pageHeightCalc) + "px";
		FIREWORKS.fireworksArray[i].element.style.webkitTransform = "translate3d(" + -getRandomInt(FIREWORKS.pageHeightCalc, 0) + "px," + -getRandomInt(FIREWORKS.pageWidthCalc, 0) + "px, 0px)";
	};
	createExplosionElements();
}

function createExplosionElements () {
	var singleExplosion = [];
	for (var i=0; i<50; i++) {

		explosionElement = {};
		explosionElement.element = document.createElement('div');
		explosionElement.element.id = 'particle' + i;
		singleExplosion.push(explosionElement);
	}
	setTimeout(function(){
		addExplosionElementsToDom(singleExplosion);
	},200)
	
}

function addExplosionElementsToDom (singleExplosion) {
	var explosionParent = document.createElement('div');
	explosionParent.style.height = "0";
	explosionParent.style.width = "0";
	document.getElementById(FIREWORKS.fireworksArray[0].element.id).appendChild(explosionParent);
	for (var i = 0; i < singleExplosion.length; i++) {
		// singleExplosion[i].element.style.left = FIREWORKS.fireworksArray[0].element.style.left;
		// singleExplosion[i].element.style.bottom = FIREWORKS.fireworksArray[0].element.style.bottom;
		singleExplosion[i].element.style.width = "3px";
		singleExplosion[i].element.style.height = "3px";
		singleExplosion[i].element.style.background = "#fff";
		singleExplosion[i].element.className = "explosion-divs";
		singleExplosion[i].element.style.position = "absolute";
		explosionParent.appendChild(singleExplosion[i].element);
	};

	FIREWORKS.fireworksArray.shift();

	setTimeout(function(){
		boom(singleExplosion);
	},200)
	
}

function boom (singleExplosion) {
	for (var i = 0; i < singleExplosion.length; i++) {
		singleExplosion[i].element.style.webkitTransform = "translate3d(" + -getRandomInt(0, FIREWORKS.pageWidthCalc) + "px," + -getRandomInt(0, FIREWORKS.pageHeightCalc) + "px, 0px)"; 
	};
}	 


window.addEventListener( 'load', function() {
	console.log( 'window#load' );
	bombsAway();
});



// Below is first attempt - not very good!

// FIREWORKS = {};

// FIREWORKS.domDivs = [];
// FIREWORKS.domDivsParent = null;
// FIREWORKS.pageWidthCalc = document.documentElement.clientWidth;
// FIREWORKS.pageHeightCalc = document.documentElement.clientHeight;
// FIREWORKS.randomX = Math.floor(Math.random() * (FIREWORKS.pageWidthCalc / 4));
// FIREWORKS.randomY = Math.floor(Math.random() * (FIREWORKS.pageHeightCalc /4 ));
// FIREWORKS.randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
// FIREWORKS.cycleCounter = 0;

// FIREWORKS.fireworksStart = [];

// function createManyDivs () {
// 	console.log(FIREWORKS.cycleCounter);

// 	FIREWORKS.cycleCounter++;

// 	for (var i=0; i<200; i++) {
// 		var newDiv = document.createElement('div');
// 		FIREWORKS.domDivs.push(newDiv);
// 	}
// 	addDivsToDom();
// }


// function addDivsToDom () {

// 	var startPointX = FIREWORKS.randomX;
// 	var startPointY = FIREWORKS.randomY;

// 	FIREWORKS.domDivsParent = document.createElement( 'div' );

// 	if (FIREWORKS.cycleCounter === 1) {
// 		FIREWORKS.domDivsParent.id = "ones";
// 	} else if (FIREWORKS.cycleCounter === 2) {
// 		FIREWORKS.domDivsParent.id = "twos";
// 	} 
// 	// else if (FIREWORKS.cycleCounter === 3) {
// 	// 	FIREWORKS.domDivsParent.id = "threes";
// 	// }

// 	for (var i = 0; i < FIREWORKS.domDivs.length; i++) {
// 		var d = FIREWORKS.domDivs[i];
// 		d.className = "firework-divs";
// 		// d.style.left = startPointX + "px";
// 		// d.style.top = startPointY + "px";
// 		d.style.left = "25%";
// 		d.style.webkitTransform = "translate3d(" + startPointX + "px, " + startPointY + "px,"+"0"+"px)";
// 		d.style.background = FIREWORKS.randomColor;
// 		FIREWORKS.domDivsParent.appendChild( d );

		
// 		FIREWORKS.fireworksStart.push(d);


// 	};
	
// 	document.getElementById("container-fireworks").appendChild( FIREWORKS.domDivsParent );
// 	letThereBeFireworks();
// }

// function letThereBeFireworks () {
// 	// FIREWORKS.domDivsParent.style.display = 'none';

// 	for (var i = 0; i < FIREWORKS.fireworksStart.length; i++) {

// 		console.log(FIREWORKS.fireworksStart[i]);
// 		// console.log("Doesn't work without this console log!");

// 		if (i % 5 === 0) {
// 			var leftPos = Math.floor(Math.random() * -300);
// 			var topPos = Math.floor(Math.random() * 300	);
// 		} else if (i % 4 === 0) {
// 			var leftPos = Math.floor(Math.random() * 300);
// 			var topPos = Math.floor(Math.random() * -300);
// 		} else if (i % 2 === 0) {
// 			var leftPos = Math.floor(Math.random() * -300);
// 			var topPos = Math.floor(Math.random() * -300);
// 		} else {
// 			var leftPos = Math.floor(Math.random() * 300);
// 			var topPos = Math.floor(Math.random() * 300);
// 		}
// 		// var randomDeg = Math.floor(Math.random() * 360);
// 		// rotate(" + randomDeg + "deg)

// 		FIREWORKS.fireworksStart[i].style.webkitTransform = "translate3d(" + leftPos + "px, " + topPos + "px," + "0" + "px)";

// 	        	// var randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);

// 	        	// FIREWORKS.fireworksStart[i].style.background = 'rgba(0,0,0,0)'

// 	};

	
// 	setTimeout(function(){
// 		if (FIREWORKS.cycleCounter === 1) {
// 			if (document.getElementById('twos') !== null) {	
// 				var ones = document.getElementById('twos');
// 				var allFireworks = document.getElementById("container-fireworks");
// 				console.log("cycle 1");
// 				allFireworks.removeChild(twos);
// 			}
// 			createManyDivs();
			
// 		} else if (FIREWORKS.cycleCounter === 2) {
			
// 			var ones = document.getElementById('ones');
// 			var allFireworks = document.getElementById("container-fireworks");
// 			console.log("Cycle 2");
// 			allFireworks.removeChild(ones);
// 			FIREWORKS.cycleCounter = 0;
// 			createManyDivs();

// 		} 

// 	},500);	
// 	// else {
// 	// 	setTimeout(function(){
// 	// 		var ones = document.getElementById('threes');
// 	// 		var allFireworks = document.getElementById("container-fireworks");
// 	// 		console.log("Cycle 3");
// 	// 		allFireworks.removeChild(threes);
			
// 	// 		createManyDivs();
// 	// 	},500);	
// 	// }

// 	// else if (FIREWORKS.cycleCounter === 2) {
// 	// 	document.parentNode.removeChild();
// 	// } else if (FIREWORKS.cycleCounter === 3) {
// 	// 	FIREWORKS.domDivsParent.id = "threes";
// 	// }

// 	// if (FIREWORKS.cycleCounter === 3) {
// 	// 	FIREWORKS.domDivsParent.className += "threes";
// 	// 	FIREWORKS.cycleCounter === 0;
// 	// }
// 	// FIREWORKS.domDivsParent.style.display = 'block';

// 	// setTimeout(createManyDivs, 200);
// }
