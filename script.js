var cardValuesArray = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];
var cardSuitsArray = ["Clubs", "Spades", "Hearts", "Diamonds"];
var deck = [];
var randomDeck = [];
var domDivsParent = null;
var cardOne = {};
var cardTwo = {};
var cardsSelected = false;
var eventsAssigned = false;
var playerOne = true;
var playerTwo = false;

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
	pressButton.addEventListener("click", function() {
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
		deckToDeal.innerHTML += "<p> " + randomDeck[i].cardValue + " " + randomDeck[i].cardSuit + "</p>";
		domDivsParent.appendChild(deckToDeal);
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

function selectCards(clickedCard) {

	if (cardOne.cardValue === undefined && clickedCard !== undefined) {
		cardOne.cardValue = clickedCard.innerHTML.split(" ")[1];
		cardOne.element = clickedCard;
		cardOne.element.className += " flip-card";
		console.log("First Card Selected: " + cardOne.cardValue);

	} else if (cardTwo.cardValue === undefined && clickedCard !== undefined)  {
		cardTwo.cardValue = clickedCard.innerHTML.split(" ")[1];
		cardTwo.element = clickedCard;
		cardTwo.element.className += " flip-card";
		console.log("Both Cards selected: " + cardOne.cardValue + " " + cardTwo.cardValue);
		cardsSelected = true;
	}
	
	if (cardsSelected === true) {
		setTimeout(function(){
			playGame();
		},3000)
	}
}

function playGame () {

	var scoreOne = document.getElementById("player-one-score");
	var scoreTwo = document.getElementById("player-two-score");

	if (cardsSelected === true && cardOne.cardValue === cardTwo.cardValue) {
		console.log("Cards will destroy");
		cardOne.element.className += " destroy-card";
		cardTwo.element.className += " destroy-card";
		cardOne.cardValue = undefined;
		cardTwo.cardValue = undefined;
		cardsSelected = false;
		
		if (playerOne === true) {
			scoreOne.innerHTML++;

		} else if (playerTwo === true) {
			scoreTwo.innerHTML++;
		}

	} else {
		console.log("Cards will do nothing");
		cardsSelected = false;
		cardOne.element.classList.remove("flip-card");
		cardTwo.element.classList.remove("flip-card");
		cardOne.cardValue = undefined;
		cardTwo.cardValue = undefined;

		if (playerOne === true) {
			playerOne = false;
			playerTwo = true;

		} else if (playerTwo === true) {
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

	var allCards = document.getElementsByClassName("card");

	if (allCards.length > 0) {
		console.log("Play On");
	} else {
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


