var images = ["beach.jpg", "Beach1.jpg", "beach.jpg", "Beach1.jpg", "beach.jpg", "Beach1.jpg", "beach.jpg", "Beach1.jpg", "beach.jpg", "Beach1.jpg", "beach.jpg", "Beach1.jpg", "beach.jpg", "Beach1.jpg", "beach.jpg", "Beach1.jpg", "beach.jpg", "Beach1.jpg"];
var holdingPage = document.getElementById("holding-page");
var createdImages = [];
var loadStatusCalls = 0;

function loadImages (){

	for (var i = 0; i < images.length; i++) {
		var imageDiv = document.createElement("img");
		imageDiv.src = images[i];
		imageDiv.className = "loaded-picture";
		document.getElementById("wrapper").appendChild(imageDiv);
		createdImages.push(imageDiv);
		imageDiv.addEventListener("load", checkLoadStatus, false);
		// console.log(createdImages);
	};
	// setTimeout(function (){ 
		// imageDiv.addEventListener("load", hideHoldingPage, false);
	// }, 500);
}

function imageLoadCompleted () {
	
}

function checkLoadStatus () {
	loadStatusCalls++;
	console.log(loadStatusCalls);
	
	// var loadedPictures = document.getElementsByClassName("loaded-picture");

	// for (var i = 0; i < loadedPictures.length; i++) {
	// 	var imageStatusReady = createdImages[i].readyState;

	// console.log(imageStatusReady);
	// };

	// console.log(loadedPictures);

	

	if (createdImages.length === loadStatusCalls)  {
		hideHoldingPage();
	}
}

function hideHoldingPage() {
	document.getElementById("holding-page").className += ('hide');
	console.log("Hid the holding page");
}

window.addEventListener( 'load', function() {
	console.log( 'window#load' );
	loadImages();
});


