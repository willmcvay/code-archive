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


function getPlayers() {
	var playerOneName = document.getElementById('player-one-input').value;
	var playerTwoName = document.getElementById('player-two-input').value;
	var playerOneLabel = document.getElementById('player-one');
	var playerTwoLabel = document.getElementById('player-two');

	playerOneLabel.innerHTML = playerOneName;
	playerTwoLabel.innerHTML = playerTwoName;

	console.log("Players are: " + playerOneName + " & " + playerTwoName);
	makeDeck();
	shuffleDeck();
	dealDeck();
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

	updateScores();
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
	checkCardsUnique(clickedCard);
}

function checkCardsUnique (clickedCard) {

	 if (cardOne.id === cardTwo.id){
		cardTwo.cardValue = undefined;
		cardTwo.id = undefined;
		cardTwo.selected = undefined;
		
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

	} else if (cardOne.selected === true && cardTwo.selected === true && cardOne.id !== cardTwo.id ) {
		
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

	if (cardOne.selected === true && cardTwo.selected === true && cardOne.cardValue === cardTwo.cardValue) {
		console.log("Cards will destroy");
		cardOne.element.className += " destroy-card";
		cardTwo.element.className += " destroy-card";

// Some work in progress: working on transitioning destroyed cards to burned cards pile

		// var duplicateOne = document.getElementById(cardOne.element.id).cloneNode(false);

		// duplicateOne.className += " duplicate";

		// document.getElementById(cardOne.element.id).appendChild(duplicateOne);

		// var allDuplicates = document.getElementsByClassName('duplicate');

		// for (var i = 0; i < allDuplicates.length; i++) {
		// 	allDuplicates[i].classList.remove("flip-card");
		// 	allDuplicates[i].className += " burned-cards"
		// 	document.getElementById('burned-cards').appendChild(allDuplicates[i]);

		// };
		// document.getElementsByClassName('burned-cards').classList.remove("duplicate");


		cardOne.cardValue = undefined;
		cardTwo.cardValue = undefined;
		cardOne.selected = false;
		cardTwo.selected = false;
		
		if (playerOne === true) {
			pairsMatchedOne.innerHTML++;

		} else if (playerTwo === true) {
			pairsMatchedTwo.innerHTML++;
		}

	} else {
		console.log("Cards will do nothing");
		
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

	// var allCardsDestroyed = document.getElementsByClassName("destroy-card");

// necessary to test 'game over' screen
	var allCardsDestroyed = [];
	allCardsDestroyed.length = 52;

	if (allCardsDestroyed.length < 52) {

		if (playerOne === true) {
			oneSecondsElapsed =  parseInt(document.getElementById("player-one-secs").innerHTML);
			oneMinutesElapsed = parseInt(document.getElementById("player-one-mins").innerHTML);
				
			console.log("Play On");
			pauseClock();

		} else if (playerTwo === true) {
			twoSecondsElapsed =  parseInt(document.getElementById("player-two-secs").innerHTML);
			twoMinutesElapsed = parseInt(document.getElementById("player-two-mins").innerHTML);
		
			console.log("Play On");
			pauseClock();
		}

	} else {
		document.getElementById("game-over").classList.remove("hide");

		var p1 = document.getElementById("player-one").innerHTML;
		var p2 = document.getElementById("player-two").innerHTML;
		var winner = document.createElement('h2');
		var winningScore = null;

		if (scoreOne.innerHTML <= scoreTwo.innerHTML) {
			winner.innerHTML += p1 + " is the Winner, with " + scoreOne.innerHTML + " points!";
			winningScore = p1 + " " + scoreOne.innerHTML;
			console.log(winningScore);
		} else if (scoreTwo.innerHTML > scoreOne.innerHTML) {
			winner.innerHTML += p2 + " is the Winner, with " + scoreTwo.innerHTML + " points!";
			winningScore = p2 + " " + scoreTwo.innerHTML;
		}	
		document.getElementById("game-over").appendChild(winner);
		
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
	
	var winnerName = winningScore.split(' ')[0];
	var winnerScore = winningScore.split(' ')[1];
	console.log(winnerName);
	console.log(winnerScore);

	var leaderboardArray = [];

	var winnersPairs = {}

	winnersPairs.winnerNameStored = winnerName;
	winnersPairs.winnerScoreStored = winnerScore;

	leaderboardArray.push(winnersPairs);

		var retrievedWinners = localStorage.getItem('leaderboardArray');
		var parsedWinners = JSON.parse(retrievedWinners);
		console.log(parsedWinners);

		for (var i = 0; i < parsedWinners.length; i++) {
			leaderboardArray.push(parsedWinners[i]);
			console.log(leaderboardArray.length);
		};


	localStorage.setItem('leaderboardArray', JSON.stringify(leaderboardArray));



	var retrievedData = localStorage.getItem('leaderboardArray');

	console.log(retrievedData);

	// for (var i = 0; i < retrievedData.length; i++) {
	// 	console.log(retrievedData[i]); 
	// };
	

	

	// console.log(retrieveLocalStorage());

	// var retrievedWinners = localStorage.getItem('leaderboardArray');
	
	// var parsedWinners = JSON.parse(retrievedWinners);

	// console.log(parsedWinners);

	// document.getElementById("leaderboard").innerHTML = parsedWinners;
	// window.localStorage.clear()
}

window.addEventListener( 'load', function() {
	console.log( 'window#load' );
});


