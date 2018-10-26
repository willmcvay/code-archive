var HAS_TOUCH = 'ontouchstart' in window,
	START_EVENT = HAS_TOUCH ? 'touchstart' : 'mousedown',
	MOVE_EVENT = HAS_TOUCH ? 'touchmove' : 'mousemove',
	END_EVENT = HAS_TOUCH ? 'touchend' : 'mouseup';

function TouchHandler (element){
	this.domElement = typeof element === "string" ? 
	document.querySelector(element) : element;

	this.domElement.addEventListener(START_EVENT, this, false);
	document.body.addEventListener(MOVE_EVENT, this, false);
	document.body.addEventListener(END_EVENT, this, false);

	this.isActive = false;

	this.startX = 0;
	this.startY = 0;

	this.currentX = 0;
	this.currentY = 0;
}

TouchHandler.prototype = {
	handleEvent: function (event) {
		switch (event.type){
			case START_EVENT:
				this.start(event);
				break;
			case MOVE_EVENT:
				this.move(event);
				break;
			case END_EVENT:
				this.end(event);
				break;
		}
	},

	start: function (event) {
		this.isActive = true;

	},
	move: function (event) {
		if ( this.isActive !== true ) {
			return;
		} 

		this.currentX = (HAS_TOUCH ? event.touches[0].pageX : event.pageX);
		this.currentY = (HAS_TOUCH ? event.touches[0].pageY : event.pageY);

		this.domElement.style.webkitTransform = 'translate(' + (this.currentX) + 'px, ' + (this.currentY) + 'px)';

	},
	end: function (event) {
		this.isActive = false;
		console.log("end");
	}

};