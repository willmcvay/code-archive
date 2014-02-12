FIREWORKS = {};

FIREWORKS.fireworksArray = [];
FIREWORKS.explosionArray = [];
FIREWORKS.pageWidth = document.documentElement.clientWidth;
FIREWORKS.pageHeight = document.documentElement.clientHeight;
FIREWORKS.firework = {};
// FIREWORKS.singleExplosion = [];
FIREWORKS.explosionElement = {};
FIREWORKS.counter = 0;

if (FIREWORKS.counter < 20) {

	function bombsAway () {
		FIREWORKS.counter++;
		createFireWork();
		// console.log("Boom");
		setTimeout(bombsAway, 10000);
	}

	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function createFireWork () {
		
		FIREWORKS.firework.element = document.createElement('div');
		FIREWORKS.firework.startPointX = getRandomInt(0, FIREWORKS.pageWidth);
		// console.log(FIREWORKS.firework.startPointX);
		FIREWORKS.firework.startPointY = 0;
		// FIREWORKS.firework.element.style.webkitTransitionDuration = getRandomInt(1, 5) + "s";
		FIREWORKS.firework.element.style.left = FIREWORKS.firework.startPointX + "px";
		FIREWORKS.firework.element.style.bottom = FIREWORKS.firework.startPointY + "px";
		// console.log(FIREWORKS.firework.element.style.left);
		FIREWORKS.firework.element.style.width = "3px";
		FIREWORKS.firework.element.style.height = "3px";
		FIREWORKS.firework.element.style.background = "#fff";
		FIREWORKS.firework.element.className = "firework-divs";
		FIREWORKS.fireworksArray.push(FIREWORKS.firework);

		document.getElementById('container-fireworks').appendChild(FIREWORKS.firework.element);

		setTimeout(function(){
			launchFireWork();	
		},200)
		
	}

	function launchFireWork () {
		for (var i = 0; i < FIREWORKS.fireworksArray.length; i++) {
			FIREWORKS.fireworksArray[i].element.style.left = getRandomInt(0, FIREWORKS.pageWidth) + "px";
			FIREWORKS.fireworksArray[i].element.style.bottom = getRandomInt(0, FIREWORKS.pageHeight) + "px";
			FIREWORKS.fireworksArray[i].element.style.webkitTransform = "translate3d(" + getRandomInt(0, FIREWORKS.pageWidth) + "px," + getRandomInt(0, FIREWORKS.pageHeight) + "px, 0px)";

			// FIREWORKS.fireworksArray[i].element.style.webkitTransition = "all " + getRandomInt(1, 5) + "s ease-out;";
			// console.log("all " + getRandomInt(1, 5) + "s ease-out;");
		};
	createExplosionElements();
	}

	function createExplosionElements () {
		var singleExplosion = [];
		for (var i=0; i<50; i++) {
			FIREWORKS.explosionElement.element = document.createElement('div');
			singleExplosion.push(FIREWORKS.explosionElement);
		}
	addExplosionElementsToDom(singleExplosion);
	}

	function addExplosionElementsToDom (singleExplosion) {
		var explosionParent = document.createElement('div');
		for (var i = 0; i < singleExplosion.length; i++) {
			singleExplosion[i].element.style.left = FIREWORKS.fireworksArray[0].element.style.left;
			singleExplosion[i].element.style.bottom = FIREWORKS.fireworksArray[0].element.style.bottom;
			singleExplosion[i].element.style.width = "3px";
			singleExplosion[i].element.style.height = "3px";
			singleExplosion[i].element.style.background = "#fff";
			singleExplosion[i].element.style.className = "explosion-divs";
			// console.log(FIREWORKS.singleExplosion[i].element);
			explosionParent.appendChild(singleExplosion[i].element)
		};

		FIREWORKS.fireworksArray.shift();
				
		document.getElementById('container-fireworks').appendChild(explosionParent);

		// console.log(FIREWORKS.singleExplosion);
		setTimeout(function(){
			boom(singleExplosion);
		},200)
		
	}

	function boom (singleExplosion) {
		for (var i = 0; i < singleExplosion.length; i++) {
			console.log(i);
			singleExplosion[i].element.style.webkitTransform = "translate3d(" + getRandomInt(0, FIREWORKS.pageWidth) + "px," + getRandomInt(0, FIREWORKS.pageHeight) + "px, 0px)"; 
			// console.log(FIREWORKS.singleExplosion[i].element);
		};
	}	 
} else { 
	console.log("End of fun");
}

window.addEventListener( 'load', function() {
	console.log( 'window#load' );
	bombsAway();
});



// Below is first attempt - not very good!

// FIREWORKS = {};

// FIREWORKS.domDivs = [];
// FIREWORKS.domDivsParent = null;
// FIREWORKS.pageWidth = document.documentElement.clientWidth;
// FIREWORKS.pageHeight = document.documentElement.clientHeight;
// FIREWORKS.randomX = Math.floor(Math.random() * (FIREWORKS.pageWidth / 4));
// FIREWORKS.randomY = Math.floor(Math.random() * (FIREWORKS.pageHeight /4 ));
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
