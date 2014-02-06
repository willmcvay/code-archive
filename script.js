var GLOBALS = {};

GLOBALS.cardOne = {};
GLOBALS.cardTwo = {};
GLOBALS.playerOne = {};
GLOBALS.playerTwo = {};
GLOBALS.loadStatusCalls = 0;
GLOBALS.seconds =-1.0;
GLOBALS.mins = 0;
GLOBALS.time;
GLOBALS.oneSecondsElapsed =  0;
GLOBALS.oneMinutesElapsed = 0;
GLOBALS.twoSecondsElapsed =  0;
GLOBALS.twoMinutesElapsed = 0;
GLOBALS.cardPostionsArray = [];
GLOBALS.currentCardNo = -1;
GLOBALS.transX = 0;
GLOBALS.transY =0;
// GLOBALS.cardPosition = {}
// below is a global required to test leaderboard - comment out in normal game
GLOBALS.allCardsDestroyed = 0;

function getPlayers() {

	GLOBALS.playerOne.selected = true;
	GLOBALS.playerTwo.selected = false;
	GLOBALS.playerOne.name = document.getElementById('player-one-input').value;
	GLOBALS.playerTwo.name = document.getElementById('player-two-input').value;
	GLOBALS.playerOne.label = document.getElementById('player-one');
	GLOBALS.playerTwo.label = document.getElementById('player-two');

	GLOBALS.playerOne.label.innerHTML = GLOBALS.playerOne.name;
	GLOBALS.playerTwo.label.innerHTML = GLOBALS.playerTwo.name;

	console.log("Players are: " + GLOBALS.playerOne.name + " & " + GLOBALS.playerTwo.name);

	makeDeck();
	pressToDeal();
	assignListener();
}

function hideLoadPage() {

	var loadingPage = document.getElementById("loading-page");
	var controls = document.getElementById("controls");
	controls.classList.remove('hide');
	loadingPage.className += ('hide');
}

function checkLoadStatus (deckToDeal) {
	var tempArray = [];
	tempArray.push(deckToDeal);
	GLOBALS.loadStatusCalls++;
	if (tempArray.length === GLOBALS.loadStatusCalls)  {
		setTimeout(function(){
			hideLoadPage();
			console.log("hiding load page");
		},2000)	
	}
}

function makeDeck () {

	var deck = [];
	var cardValuesArray = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];
	var cardSuitsArray = ["Clubs", "Spades", "Hearts", "Diamonds"];
	var mobileCardValuesArray = ["Ace","8", "9", "10", "Jack", "Queen", "King"];

	if (document.documentElement.clientWidth >= 600) {
		
		console.log("Desktop Game Selected, screen width: " +  document.documentElement.clientWidth);
		
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
	} else if ( document.documentElement.clientWidth < 599) {
		
		console.log("Mobile Game Selected, screen width: " +  document.documentElement.clientWidth);

		for (var j = 0; j < cardSuitsArray.length; j++) {
			var selectedSuit = cardSuitsArray[j]
			for (var i = 0; i < mobileCardValuesArray.length; i++) {
				var selectedValue = mobileCardValuesArray[i];
				var card = {};
				card.cardValue = selectedValue;
				card.cardSuit = selectedSuit;
				card.image = "";
				card.isSelected = false;
				deck.push(card);		
			};
		};
	}
	shuffleDeck(deck)
}

function shuffleDeck(deck) {

	var randomDeck = [];

	var shuffled = deck.slice(0), i = deck.length, temp, index; while (i--) {
        		index = Math.floor((i + 1) * Math.random());
        		temp = shuffled[index];
        		shuffled[index] = shuffled[i];
        		shuffled[i] = temp;
        		randomDeck.push(shuffled[i]);
    	}
    	dealDeck(randomDeck);
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

function dealDeck (randomDeck) {

	var domDivsParent = document.createElement('div');
	domDivsParent.id = "inner-container";

	for (var i = 0; i < randomDeck.length; i++) {
		var deckToDeal = document.createElement('div');
		deckToDeal.className = "card";
		deckToDeal.id = "card" + i;
		deckToDeal.innerHTML += "<p style =" + "-webkit-transform:scaleX(-1)" + ">" + " " + randomDeck[i].cardValue + " " + randomDeck[i].cardSuit + "</p>";
		domDivsParent.appendChild(deckToDeal);
		domDivsParent.addEventListener("load", checkLoadStatus(deckToDeal), false);

	};
	document.getElementById("container").appendChild(domDivsParent);

	var dealtCards = document.getElementsByClassName("card");


	for (var i = 0; i < dealtCards.length; i++) {
		var cardPosition = {};
			cardPosition.element = dealtCards[i].id;
			cardPosition.topPosition = dealtCards[i].offsetTop;
			cardPosition.leftPosition = dealtCards[i].offsetLeft;

			var y = -cardPosition.topPosition;
			var x = -cardPosition.leftPosition;

		dealtCards[i].style.webkitTransform = "translate3d(" + x + "px," + y + "px ,0)";

		GLOBALS.cardPostionsArray.push(cardPosition);
	};

	setTimeout(function(){
		dealACard();
	},3000)
	
}

function dealACard(){

	GLOBALS.currentCardNo++;
	var dealtCards = document.getElementsByClassName("card");
	
	if(GLOBALS.currentCardNo < dealtCards.length ){

		console.log(dealtCards.length);
		console.log(GLOBALS.currentCardNo);

		var k = GLOBALS.currentCardNo;
		
		var leftFromArray = GLOBALS.cardPostionsArray[k].leftPosition;
		var topFromArray = GLOBALS.cardPostionsArray[k].topPosition;
		var idFromArray = GLOBALS.cardPostionsArray[k].element;

		GLOBALS.transX = leftFromArray - leftFromArray;
		GLOBALS.transY = topFromArray - topFromArray;

		dealtCards[k].style.webkitTransform = "translate3d(" + GLOBALS.transX + "px," + GLOBALS.transY + "px, 0) rotate(180deg)";
		dealtCards[k].style.webkitTransition = "all 0.5s ease-in-out";

		setTimeout(dealACard, 100);

	} else if (GLOBALS.currentCardNo >= dealtCards.length) {
		console.log("Deck dealt!");
	}
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
	GLOBALS.time = setInterval(timer, 1000);
	timer();
}

function displayTimer(x) {
	if (x<=9) { 
		x = ("0"+x); 
	}
	return parseInt(x);
}  

function timer(){

	if (GLOBALS.playerOne.selected === true) {

		GLOBALS.seconds++;       
		if (GLOBALS.seconds > 59) {
			GLOBALS.mins++;
			document.getElementById("player-one-mins").innerHTML = displayTimer(GLOBALS.mins) + GLOBALS.oneMinutesElapsed + "m";
			GLOBALS.seconds = 0;
		}
		document.getElementById("player-one-secs").innerHTML = displayTimer(GLOBALS.seconds) + GLOBALS.oneSecondsElapsed + "s";  
		
	} else if (GLOBALS.playerTwo.selected === true) {

		GLOBALS.seconds++;       
		if (GLOBALS.seconds > 59) {
			GLOBALS.mins++;
			document.getElementById("player-two-mins").innerHTML = displayTimer(GLOBALS.mins) + GLOBALS.twoMinutesElapsed + "m";
			GLOBALS.seconds = 0;
		}
		document.getElementById("player-two-secs").innerHTML = displayTimer(GLOBALS.seconds) + GLOBALS.twoSecondsElapsed + "s";  
	}
}

function pauseClock() {
	clearInterval(GLOBALS.time);

	updateScores();
	resetClock();
}

function resetClock(){
	GLOBALS.seconds =-1.0;
}

function selectCards(clickedCard) {

	var allCards = document.getElementsByClassName('card');

	for (var i = 0; i < allCards.length; i++) {
		allCards[i].style.removeProperty('-webkit-transform');
	};

	if (GLOBALS.cardOne.cardValue === undefined && clickedCard !== undefined) {

	startClock();

		GLOBALS.cardOne.cardValue = clickedCard.innerHTML.split(" ")[2];
		GLOBALS.cardOne.cardSuit = clickedCard.innerHTML.split(" ")[3];
		GLOBALS.cardOne.id = clickedCard.id;
		GLOBALS.cardOne.element = clickedCard;
		GLOBALS.cardOne.selected = true;

		if (GLOBALS.cardOne.cardSuit === "Hearts</p>") {
			GLOBALS.cardOne.element.className += " heart flip-card";
		} else if (GLOBALS.cardOne.cardSuit === "Clubs</p>") {
			GLOBALS.cardOne.element.className += " club flip-card";
		} else if (GLOBALS.cardOne.cardSuit === "Diamonds</p>") {
			GLOBALS.cardOne.element.className += " diamond flip-card";
		} else if (GLOBALS.cardOne.cardSuit === "Spades</p>") {
			GLOBALS.cardOne.element.className += " spade flip-card";
		}

		console.log("First Card Selected: " + GLOBALS.cardOne.cardValue);

	} else if (GLOBALS.cardTwo.cardValue === undefined && clickedCard !== undefined)  {
		GLOBALS.cardTwo.cardValue = clickedCard.innerHTML.split(" ")[2];
		GLOBALS.cardTwo.cardSuit = clickedCard.innerHTML.split(" ")[3];
		GLOBALS.cardTwo.id = clickedCard.id;
		GLOBALS.cardTwo.selected = true;
		GLOBALS.cardTwo.element = clickedCard;

		if (GLOBALS.cardTwo.cardSuit === "Hearts</p>") {
			GLOBALS.cardTwo.element.className += " heart flip-card";
		} else if (GLOBALS.cardTwo.cardSuit === "Clubs</p>") {
			GLOBALS.cardTwo.element.className += " club flip-card";
		} else if (GLOBALS.cardTwo.cardSuit === "Diamonds</p>") {
			GLOBALS.cardTwo.element.className += " diamond flip-card";
		} else if (GLOBALS.cardTwo.cardSuit === "Spades</p>") {
			GLOBALS.cardTwo.element.className += " spade flip-card";
		}
		console.log("Both Cards selected: " + GLOBALS.cardOne.cardValue + " " + GLOBALS.cardTwo.cardValue);
	} 
	checkCardsUnique(clickedCard);
}

function checkCardsUnique (clickedCard) {

	 if (GLOBALS.cardOne.id === GLOBALS.cardTwo.id){
		GLOBALS.cardTwo.cardValue = undefined;
		GLOBALS.cardTwo.id = undefined;
		GLOBALS.cardTwo.selected = undefined;
		
		var duplicate = document.getElementById("duplicate-alert");

		if (duplicate.className === "hide"){
			duplicate.classList.remove("hide");
		}

		selectCards();

		setTimeout(function(){
			if (duplicate.className !== "hide"){
				duplicate.className += "hide";
			}	
		},2000)

	} else if (GLOBALS.cardOne.selected === true && GLOBALS.cardTwo.selected === true && GLOBALS.cardOne.id !== GLOBALS.cardTwo.id ) {
		
		var selectedCards = document.getElementById("selected-alert");

		if (selectedCards.className === "hide"){
			selectedCards.classList.remove("hide");
		}
		
		setTimeout(function(){
			if (selectedCards.className !== "hide"){
				selectedCards.className += "hide";
			}
			playGame();
		},2000)				
	}
}

function playGame () {

	var scoreOne = document.getElementById("player-one-score");
	var scoreTwo = document.getElementById("player-two-score");
	var turnsOne = document.getElementById("player-one-turns");
	var turnsTwo = document.getElementById("player-two-turns");
	var pairsMatchedOne = document.getElementById("pairs-matched-one");
	var pairsMatchedTwo = document.getElementById("pairs-matched-two");

	if (GLOBALS.cardOne.selected === true && GLOBALS.cardTwo.selected === true && GLOBALS.cardOne.cardValue === GLOBALS.cardTwo.cardValue) {
		console.log("Cards will destroy");
		GLOBALS.cardOne.element.className += " destroy-card";
		GLOBALS.cardTwo.element.className += " destroy-card";

// Some work in progress: working on transitioning destroyed cards to burned cards pile

		// var duplicateOne = document.getElementById(GLOBALS.cardOne.element.id).cloneNode(false);

		// duplicateOne.className += " duplicate";

		// document.getElementById(GLOBALS.cardOne.element.id).appendChild(duplicateOne);

		// var allDuplicates = document.getElementsByClassName('duplicate');

		// for (var i = 0; i < allDuplicates.length; i++) {
		// 	allDuplicates[i].classList.remove("flip-card");
		// 	allDuplicates[i].className += " burned-cards"
		// 	document.getElementById('burned-cards').appendChild(allDuplicates[i]);

		// };
		// document.getElementsByClassName('burned-cards').classList.remove("duplicate");



		GLOBALS.cardOne.cardValue = undefined;
		GLOBALS.cardTwo.cardValue = undefined;
		GLOBALS.cardOne.selected = false;
		GLOBALS.cardTwo.selected = false;
		
		if (GLOBALS.playerOne.selected === true) {
			pairsMatchedOne.innerHTML++;

		} else if (GLOBALS.playerTwo.selected === true) {
			pairsMatchedTwo.innerHTML++;
		}

	} else {
		console.log("Cards will do nothing");

		var allCards = document.getElementsByClassName('card');

		for (var i = 0; i < allCards.length; i++) {
			allCards[i].style.removeProperty('-webkit-transform');
		};

		var burnedY = document.getElementById('burned-cards').offsetTop;
		var burnedX = document.getElementById('burned-cards').offsetLeft;

		console.log(burnedX);
		console.log(burnedY);


		var duplicateOne = document.getElementById(GLOBALS.cardOne.element.id).cloneNode(false);

		duplicateOne.className += " duplicate";

		document.getElementById(GLOBALS.cardOne.element.id).appendChild(duplicateOne);

		var allDuplicates = document.getElementsByClassName('duplicate');

		for (var i = 0; i < allDuplicates.length; i++) {
			allDuplicates[i].classList.remove("flip-card");
			allDuplicates[i].className += " burned-cards"
			allDuplicates[i].style.webkitTransform = "translate3d(" + burnedX + "px," + burnedY + "px, 0) rotate(180deg)";
			allDuplicates[i].style.webkitTransition = "all 0.5s ease-in-out";
			// document.getElementById('burned-cards').appendChild(allDuplicates[i]);
		};

		document.getElementsByClassName('burned-cards').classList.remove("duplicate");

		
		GLOBALS.cardOne.selected = false;
		GLOBALS.cardTwo.selected = false;
		GLOBALS.cardOne.element.classList.remove("flip-card");
		GLOBALS.cardTwo.element.classList.remove("flip-card");
		GLOBALS.cardOne.cardValue = undefined;
		GLOBALS.cardTwo.cardValue = undefined;

		if (GLOBALS.playerOne.selected === true) {
			turnsOne.innerHTML++;
			GLOBALS.playerOne.selected = false;
			GLOBALS.playerTwo.selected = true;

		} else if (GLOBALS.playerTwo.selected === true) {
			turnsTwo.innerHTML++;
			GLOBALS.playerTwo.selected = false;
			GLOBALS.playerOne.selected = true;
		}
	}

	var one = document.getElementById("player-one");
	var two = document.getElementById("player-two");

	if (GLOBALS.playerOne.selected === true && one.className !== "selected") {
		one.className += "selected";
		if (two.className === "selected"){
			two.classList.remove("selected");
		}

	} else if (GLOBALS.playerTwo.selected === true && two.className !== "selected") {
		two.className += "selected";
		if (one.className === "selected"){
			one.classList.remove("selected");	
		}
	}

	// var allCardsDestroyed = document.getElementsByClassName("destroy-card");

// necessary to test 'game over' screen - comment out in normal play
	GLOBALS.allCardsDestroyed++;
	if (GLOBALS.allCardsDestroyed < 4) {

	// if (allCardsDestroyed.length < 52) {

	if (GLOBALS.playerOne.selected === true) {
		GLOBALS.oneSecondsElapsed =  parseInt(document.getElementById("player-one-secs").innerHTML);
		GLOBALS.oneMinutesElapsed = parseInt(document.getElementById("player-one-mins").innerHTML);
			
		console.log("Play On");
		pauseClock();

	} else if (GLOBALS.playerTwo.selected === true) {
		GLOBALS.twoSecondsElapsed =  parseInt(document.getElementById("player-two-secs").innerHTML);
		GLOBALS.twoMinutesElapsed = parseInt(document.getElementById("player-two-mins").innerHTML);
	
		console.log("Play On");
		pauseClock();
	}

	} else {
		document.getElementById("game-over").classList.remove("hide");

		var winner = document.createElement('h2');
		winner.id = "winner";
		var winningScore = null;

		if (scoreOne.innerHTML < scoreTwo.innerHTML) {
			winner.innerHTML += GLOBALS.playerOne.name + " is the Winner, with " + scoreOne.innerHTML + " points!";
			
			winningScore = {
				name: GLOBALS.playerOne.name, 
				points: scoreOne.innerHTML
			}

		} else if (scoreTwo.innerHTML < scoreOne.innerHTML) {
			winner.innerHTML += GLOBALS.playerTwo.name + " is the Winner, with " + scoreTwo.innerHTML + " points!";
			
			winningScore = {
				name: GLOBALS.playerTwo.name, 
				points: scoreTwo.innerHTML
			}

		} else {
			winner.innerHTML += "Game is a draw; both players have " + scoreOne.innerHTML + "points!";
			
			winningScore = {
				name: "Draw", 
				points: scoreOne.innerHTML
			}

		}

		document.getElementById("game-over-winner").appendChild(winner);
		
		updateLeaderBoard(winningScore);
		console.log("Game Over");
	}
}

function updateScores(){

	var scoreOne = document.getElementById("player-one-score");
	var scoreTwo = document.getElementById("player-two-score");
	var turnsOne = parseInt(document.getElementById("player-one-turns").innerHTML);
	var turnsTwo = parseInt(document.getElementById("player-two-turns").innerHTML);
	var pairsMatchedOne = parseInt(document.getElementById("pairs-matched-one").innerHTML);
	var pairsMatchedTwo = parseInt(document.getElementById("pairs-matched-two").innerHTML);
	var secsOne = parseInt(document.getElementById("player-one-secs").innerHTML);
	var secsTwo = parseInt(document.getElementById("player-two-secs").innerHTML);
	var minsOne = parseInt(document.getElementById("player-one-mins").innerHTML);
	var minsTwo = parseInt(document.getElementById("player-two-mins").innerHTML);

	scoreOne.innerHTML = (turnsOne * 10) + secsOne + (minsOne * 60) - (pairsMatchedOne * 20);
	scoreTwo.innerHTML = (turnsTwo * 10) + secsTwo + (minsTwo * 60) - (pairsMatchedTwo * 20);
}

function updateLeaderBoard(winningScore){

	var leaderboardArray = [];
	var winnersPairs = {}

	winnersPairs.winnerNameStored = winningScore.name;
	winnersPairs.winnerScoreStored = winningScore.points;

	leaderboardArray.push(winnersPairs);

	var retrievedWinners = localStorage.getItem('leaderboardArray');
	var parsedWinners = JSON.parse(retrievedWinners);

	if (parsedWinners !== null) {
		for (var i = 0; i < parsedWinners.length; i++) {
			leaderboardArray.push(parsedWinners[i]);
		};
	};

	localStorage.setItem('leaderboardArray', JSON.stringify(leaderboardArray));
	var retrievedData = localStorage.getItem('leaderboardArray');
	var displayData = JSON.parse(retrievedData);

	function compare(a,b) {
		if (a.winnerScoreStored > b.winnerScoreStored) {
			return -1;
		} else if (a.winnerScoreStored  < b.winnerScoreStored)  {
			return 1;
			return 0;
		}
	}

	var sortedData = displayData.sort(compare);
	var reversed = sortedData.reverse(); 
	var sliced = reversed.slice(0, 10);

	// below required to clear leaderboard - comment out in normal play
	// localStorage.clear();
	
	for (var i = 0; i < sliced.length; i++) {
		var leaderboardToDisplay = document.createElement('div');
		leaderboardToDisplay.className = "leaders";
		leaderboardToDisplay.innerHTML = "Name: " + sliced[i].winnerNameStored + ",  Points: " + sliced[i].winnerScoreStored;
		document.getElementById("leaderboard").appendChild(leaderboardToDisplay);
	};
}

window.addEventListener( 'load', function() {
	console.log( 'window#load' );
	console.log(document.documentElement.clientWidth);
});


