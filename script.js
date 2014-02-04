var cardValuesArray = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];
var cardSuitsArray = ["Clubs", "Spades", "Hearts", "Diamonds"];
var deck = [];
var randomDeck = [];
var domDivsParent = null;
var cardOne = {};
var cardTwo = {};
var eventsAssigned = false;
var playerOne = true;
var playerTwo = false;
var loadStatusCalls = 0;
var seconds =-1.0;
var mins = 0;
var time;
var oneSecondsElapsed =  0;
var oneMinutesElapsed = 0;
var twoSecondsElapsed =  0;
var twoMinutesElapsed = 0;

function hideLoadPage() {

	var loadingPage = document.getElementById("loading-page");
	var controls = document.getElementById("controls");
	controls.classList.remove('hide');
	loadingPage.className += ('hide');
}

function checkLoadStatus (deckToDeal) {
	var tempArray = [];
	tempArray.push(deckToDeal);
	loadStatusCalls++;
	if (tempArray.length === loadStatusCalls)  {
		setTimeout(function(){
			hideLoadPage();
			console.log("hiding load page");
		},2000)	
	}
}

function makeDeck () {

	for (var j = 0; j < cardSuitsArray.length; j++) {
		var selectedSuit = cardSuitsArray[j]
		for (var i = 0; i < cardValuesArray.length; i++) {
			var selectedValue = cardValuesArray[i];
			var card = {};
			card.cardValue = selectedValue;
			card.cardSuit = selectedSuit;
			card.image = "";
			card.isSelected = false;
			deck.push(card);		
		};
	};
}

function shuffleDeck() {

	var shuffled = deck.slice(0), i = deck.length, temp, index; while (i--) {
        		index = Math.floor((i + 1) * Math.random());
        		temp = shuffled[index];
        		shuffled[index] = shuffled[i];
        		shuffled[i] = temp;
        		randomDeck.push(shuffled[i]);
    	}
}

function pressToDeal(){
	
	var pressButton = document.getElementById("deal-deck");
	var playAgain = document.getElementById("play-again");
	
	pressButton.addEventListener("click", function() {
	window.location.reload();
	}, false);

	playAgain.addEventListener("click", function() {
	window.location.reload();
	}, false);
}

function dealDeck () {

	domDivsParent = document.createElement('div');
	domDivsParent.id = "inner-container";

	for (var i = 0; i < randomDeck.length; i++) {
		var deckToDeal = document.createElement('div');
		deckToDeal.className = "card";
		deckToDeal.id = "card" + i;
		// deckToDeal.innerHTML += "<p>" + " " + randomDeck[i].cardValue + " " + randomDeck[i].cardSuit + "</p>";
		deckToDeal.innerHTML += "<p style =" + "-webkit-transform:scaleX(-1)" + ">" + " " + randomDeck[i].cardValue + " " + randomDeck[i].cardSuit + "</p>";
		domDivsParent.appendChild(deckToDeal);
		domDivsParent.addEventListener("load", checkLoadStatus(deckToDeal), false);
	};
	document.getElementById("container").appendChild(domDivsParent);
}

function assignListener () {

	var allCards = document.getElementsByClassName("card");

	for (var i = 0; i < allCards.length; i++) {
		allCards[i].addEventListener("click", function(event) {
			selectCards(this);
		},false);	
	}
}

function startClock(){
	time = setInterval(timer, 1000);
	timer();
}

function displayTimer(x) {
	if (x<=9) { 
		x = ("0"+x); 
	}
	return parseInt(x);
}  

function timer(){

	if (playerOne === true) {

		seconds++;       
		if (seconds > 59) {
			mins++;
			document.getElementById("player-one-mins").innerHTML = displayTimer(mins) + oneMinutesElapsed + "m";
			seconds = 0;
		}
		document.getElementById("player-one-secs").innerHTML = displayTimer(seconds) + oneSecondsElapsed + "s";  
		
	} else if (playerTwo === true) {

		seconds++;       
		if (seconds > 59) {
			mins++;
			document.getElementById("player-two-mins").innerHTML = displayTimer(mins) + twoMinutesElapsed + "m";
			seconds = 0;
		}
		document.getElementById("player-two-secs").innerHTML = displayTimer(seconds) + twoSecondsElapsed + "s";  
	}
}

function pauseClock() {
	clearInterval(time);
	resetClock();
}

function resetClock(){
	seconds =-1.0;
}

function selectCards(clickedCard) {

	if (cardOne.cardValue === undefined && clickedCard !== undefined) {

	startClock();

		cardOne.cardValue = clickedCard.innerHTML.split(" ")[2];
		cardOne.cardSuit = clickedCard.innerHTML.split(" ")[3];
		cardOne.id = clickedCard.id;
		cardOne.element = clickedCard;
		cardOne.selected = true;

		if (cardOne.cardSuit === "Hearts</p>") {
			cardOne.element.className += " heart flip-card";
		} else if (cardOne.cardSuit === "Clubs</p>") {
			cardOne.element.className += " club flip-card";
		} else if (cardOne.cardSuit === "Diamonds</p>") {
			cardOne.element.className += " diamond flip-card";
		} else if (cardOne.cardSuit === "Spades</p>") {
			cardOne.element.className += " spade flip-card";
		}

		console.log("First Card Selected: " + cardOne.cardValue);

	} else if (cardTwo.cardValue === undefined && clickedCard !== undefined)  {
		cardTwo.cardValue = clickedCard.innerHTML.split(" ")[2];
		cardTwo.cardSuit = clickedCard.innerHTML.split(" ")[3];
		cardTwo.id = clickedCard.id;
		cardTwo.selected = true;
		cardTwo.element = clickedCard;

		if (cardTwo.cardSuit === "Hearts</p>") {
			cardTwo.element.className += " heart flip-card";
		} else if (cardTwo.cardSuit === "Clubs</p>") {
			cardTwo.element.className += " club flip-card";
		} else if (cardTwo.cardSuit === "Diamonds</p>") {
			cardTwo.element.className += " diamond flip-card";
		} else if (cardTwo.cardSuit === "Spades</p>") {
			cardTwo.element.className += " spade flip-card";
		}
		console.log("Both Cards selected: " + cardOne.cardValue + " " + cardTwo.cardValue);
	} 
	checkCardsUnique();
}

function checkCardsUnique () {

	 if (cardOne.id === cardTwo.id){
		cardTwo.cardValue = undefined;
		cardTwo.id = undefined;
		cardTwo.selected = undefined;
		document.getElementById("duplicate-alert").classList.remove("hide");
		selectCards();
		setTimeout(function(){
			document.getElementById("duplicate-alert").className += "hide";	
		},2000)

	} else if (cardOne.selected === true && cardTwo.selected === true && cardOne.id !== cardTwo.id ) {
		setTimeout(function(){
			playGame();
		},2000)
	}
}

function playGame () {

	var scoreOne = document.getElementById("player-one-score");
	var scoreTwo = document.getElementById("player-two-score");
	var turnsOne = document.getElementById("player-one-turns");
	var turnsTwo = document.getElementById("player-two-turns");

	if (cardOne.selected === true && cardTwo.selected === true && cardOne.cardValue === cardTwo.cardValue) {
		console.log("Cards will destroy");
		cardOne.element.className += " destroy-card";
		cardTwo.element.className += " destroy-card";


		// var duplicateOne = document.getElementById(cardOne.element.id).cloneNode(true);

		// console.log(duplicateOne);


		cardOne.cardValue = undefined;
		cardTwo.cardValue = undefined;
		cardOne.selected = false;
		cardTwo.selected = false;
		
		if (playerOne === true) {
			scoreOne.innerHTML++;

		} else if (playerTwo === true) {
			scoreTwo.innerHTML++;
		}

	} else {
		console.log("Cards will do nothing");
		
		var duplicateOne = document.getElementById(cardOne.element.id).cloneNode(false);

		duplicateOne.className += " duplicate";

		document.getElementById(cardOne.element.id).appendChild(duplicateOne);

		console.log(duplicateOne);

		// document.getElementById('image_1').offsetTop

		var allDuplicates = document.getElementsByClassName('duplicate');

		for (var i = 0; i < allDuplicates.length; i++) {
			// var style = window.getComputedStyle(allDuplicates[i]);
			// var top = style.getPropertyValue('top');

			// allDuplicates[i].style.top = '100px'

			console.log(top);
		};
		
		

		// style = window.getComputedStyle(element);

		
		// 

		//     console.log(top);

		
		cardOne.selected = false;
		cardTwo.selected = false;
		cardOne.element.classList.remove("flip-card");
		cardTwo.element.classList.remove("flip-card");
		cardOne.cardValue = undefined;
		cardTwo.cardValue = undefined;

		if (playerOne === true) {
			turnsOne.innerHTML++;
			playerOne = false;
			playerTwo = true;

		} else if (playerTwo === true) {
			turnsTwo.innerHTML++;
			playerTwo = false;
			playerOne = true;
		}
	}

	var one = document.getElementById("player-one");
	var two = document.getElementById("player-two");

	if (playerOne === true && one.className !== "selected") {
		one.className += "selected";
		if (two.className === "selected"){
			two.classList.remove("selected");
		}

	} else if (playerTwo === true && two.className !== "selected") {
		two.className += "selected";
		if (one.className === "selected"){
			one.classList.remove("selected");
		}
	}

	var allCardsDestroyed = document.getElementsByClassName("destroy-card");

// necessary to test 'game over' screen
	// var allCardsDestroyed = [];
	// allCardsDestroyed.length = 52;

	if (allCardsDestroyed.length < 52 && scoreOne.innerHTML < 14 && scoreTwo.innerHTML < 14) {

		if (playerOne === true) {
			oneSecondsElapsed =  parseInt(document.getElementById("player-one-secs").innerHTML);
			oneMinutesElapsed = parseInt(document.getElementById("player-one-mins").innerHTML);
		} else if (playerTwo === true)
			twoSecondsElapsed =  parseInt(document.getElementById("player-two-secs").innerHTML);
			twoMinutesElapsed = parseInt(document.getElementById("player-two-mins").innerHTML);
		
		console.log("Play On");
		pauseClock();

	} else {
		document.getElementById("game-over").classList.remove("hide");

		var p1 = "Player 1";
		var p2 = "Player 2";
		var winner = document.createElement('h2');

		if (scoreOne.innerHTML > scoreTwo.innerHTML) {
			winner.innerHTML += p1 + " is the Winner, with " + scoreOne.innerHTML + " points in " + turnsOne + " turns!";
		} else if (scoreTwo.innerHTML > scoreOne.innerHTML) {
			winner.innerHTML += p2 + " is the Winner, with " + scoreTwo.innerHTML + " points in " + turnsTwo + " turns!";
		}	
		document.getElementById("game-over").appendChild(winner);

		console.log("Game Over");
	}
}

window.addEventListener( 'load', function() {
	console.log( 'window#load' );
	makeDeck();
	shuffleDeck();
	dealDeck();
	pressToDeal();
	assignListener();
});


