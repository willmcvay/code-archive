var domDivs = [];
var domDivsParent = null;
var myScroll;

function createManyDivs () {
	for (var i=0; i<20; i++) {
		var newDiv = document.createElement('div');
		domDivs.push(newDiv);
	}
}

function addDivsToDom () {
	for (var i = 0; i < domDivs.length; i++) {
		var d = domDivs[i];
		d.className = "draggable-box";
		document.getElementById("container").appendChild(d);
	};
}

function positionBoxes () {
	for (var i = 0; i < domDivs.length; i++) {
		var leftPos = Math.floor(Math.random() * 800);
		var topPos = Math.floor(Math.random() * 800);
		domDivs[i].style.webkitTransform = "translate3d(" + leftPos+ "px, " + topPos + "px,"+"0"+"px)";
	        	var randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
	        	domDivs[i].style.background = randomColor;
	};
}

function addEvents() {
	var allElements = document.querySelectorAll(".draggable-box");
	var elementsArray = [];
	var el = null;
	for (i = 0; i < allElements.length; i++) {
		allElements[ i ].addEventListener( "touchmove", touchMove, false);
	}
}

function touchMove(event) {
    	event.preventDefault();
    	event.stopPropagation();
    		curX = event.targetTouches[0].pageX - 65;
    		curY = event.targetTouches[0].pageY - 65;
    	event.targetTouches[0].target.style.webkitTransform = 'translate(' + curX + 'px, ' + curY + 'px)';
}

function scroller () {
	myScroll = new iScroll('container', {
	 	// hScrollbar: true, 
	 	// vScrollbar: true,
	 	// zoom: true,
	 	scrollbarClass: 'myScrollbar'
	});
	console.log("I am here ");
}

window.addEventListener( 'load', function() {
	console.log( 'window#load' );
	createManyDivs();
	addDivsToDom();
	addEvents();
	positionBoxes();
	scroller();
});












