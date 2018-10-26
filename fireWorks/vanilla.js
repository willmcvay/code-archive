VANILLA = {};

VANILLA.fireworksArray = [];
VANILLA.explosionArray = [];
VANILLA.pageWidthCalc = document.documentElement.clientWidth / 2;
VANILLA.pageHeightCalc = document.documentElement.clientHeight / 2;
VANILLA.explosionElement = {};
VANILLA.counter = 0;

function launchFireworksTwo () {
	bombsAway();
}

function bombsAway () {
	VANILLA.counter++;
	createFireWork();
	if (VANILLA.counter < 50) {
		setTimeout(bombsAway, 100);
	} else { 
		console.log("End of fun");
	}
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createFireWork () {
	var firework = {};
	firework.element = document.createElement('div');
	firework.element.style.width = "5px";
	firework.element.style.height = "5px";
	firework.element.style.background = "#fff";

	firework.element.style.background = "#fff";
	firework.element.className = "firework-divs";
	firework.element.id = 'firework-number-' + VANILLA.counter;
	VANILLA.fireworksArray.push(firework);

	if (VANILLA.counter % 2 === 0) {
		document.getElementById('launch-position-b').appendChild(firework.element);
	} else {
		document.getElementById('launch-position-a').appendChild(firework.element);
	}


	setTimeout(function(){
		launchFireWork();	
	},100)	
}

function launchFireWork () {
	for (var i = 0; i < VANILLA.fireworksArray.length; i++) {
		var specificEl = VANILLA.fireworksArray[i].element
		specificEl.style.left = getRandomInt(0, VANILLA.pageWidthCalc) + "px";
		specificEl.style.top = getRandomInt(0, VANILLA.pageHeightCalc) + "px";

		if (VANILLA.counter % 2 === 0) {
			specificEl.style.webkitTransform = "translate3d(" + -getRandomInt(VANILLA.pageHeightCalc, 0) + "px," + -getRandomInt(VANILLA.pageWidthCalc, 0) + "px, 0px)";
		} else {
			specificEl.style.webkitTransform = "translate3d(" + getRandomInt(VANILLA.pageHeightCalc, 0) + "px," + -getRandomInt(VANILLA.pageWidthCalc, 0) + "px, 0px)";
		}
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
	explosionParent.id = "explosion-parent";
	explosionParent.style.height = "0";
	explosionParent.style.width = "0";
	document.getElementById(VANILLA.fireworksArray[0].element.id).appendChild(explosionParent);

	for (var i = 0; i < singleExplosion.length; i++) {
		singleExplosion[i].element.style.width = "3px";
		singleExplosion[i].element.style.height = "3px";
		singleExplosion[i].element.style.background = "#fff";
		singleExplosion[i].element.className = "explosion-divs";
		singleExplosion[i].element.style.position = "absolute";
		explosionParent.appendChild(singleExplosion[i].element);
	};

	VANILLA.fireworksArray.shift();

	setTimeout(function(){
		boom(singleExplosion);
	},200)
}

function boom (singleExplosion) {
	for (var i = 0; i < singleExplosion.length; i++) {
		singleExplosion[i].element.style.opacity = "0";
		
		if (VANILLA.counter % 2 === 0) {
			singleExplosion[i].element.style.webkitTransform = "translate3d(" + -getRandomInt(0, VANILLA.pageWidthCalc) + "px," + -getRandomInt(0, VANILLA.pageHeightCalc) + "px, 0px) scale( 10 )"; 

		} else {
			singleExplosion[i].element.style.webkitTransform = "translate3d(" + getRandomInt(0, VANILLA.pageWidthCalc) + "px," + -getRandomInt(0, VANILLA.pageHeightCalc) + "px, 0px) scale( 10 )"; 
		}
	};

	singleExplosion[49].element.addEventListener( 'webkitTransitionEnd', function( event ) { 
		onTransitionEnd(this)
	}, false );
}	 

function onTransitionEnd (transitionedEl) {

	transitionedEl.style.opacity = "0";

	var fireworkToDestroy = transitionedEl.parentNode.parentNode;

	if (fireworkToDestroy.parentNode.id === "launch-position-a") {
		fireworkToDestroy.parentNode.removeChild(fireworkToDestroy);

	} else if (fireworkToDestroy.parentNode.id === "launch-position-b")  {
		fireworkToDestroy.parentNode.removeChild(fireworkToDestroy);
	}
}