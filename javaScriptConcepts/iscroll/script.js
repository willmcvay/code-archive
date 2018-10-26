var myScroll;

function loaded() {
	myScroll = new iScroll('wrapper', {
		snap: 'li',
		momentum: false,
		hScrollbar: false,
		vScrollbar: false,
		// zoom: true,
		onScrollEnd: function () {
			document.querySelector('#indicator > li.active').className = '';
			document.querySelector('#indicator > li:nth-child(' + (this.currPageX+1) + ')').className = 'active';
			console.log("I am here ");
			console.log(myScroll.currPageX);
		}

	 });

}

// function onCompletion () {

// 	setTimeout(function () {
// 		myScroll.refresh();
// 		console.log("Timeout refreshed");
// 	}, 0);
// };

window.addEventListener( 'load', function() {
	console.log( 'window#load' );

	loaded();
	// ajaxCall('index.html', onCompletion);

});

window.addEventListener( 'resize', function() {
	
	myScroll.scrollToPage(myScroll.currPageX, 0);
	console.log("resize triggered");

});

