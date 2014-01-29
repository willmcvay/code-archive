var cardValuesArray = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];
var cardSuitsArray = ["Clubs", "Spades", "Hearts", "Diamonds"];
var deck = [];
var randomDeck = [];
// var randomCardFromDeck = deck[Math.floor(Math.random() * deck.length)];
var domDivsParent = null;
var cardOne = {};
var cardTwo = {};
var cardsSelected = false;
var eventsAssigned = false;

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
		deckToDeal.innerHTML += randomDeck[i].cardValue + " " + randomDeck[i].cardSuit;
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
		cardOne.cardValue = clickedCard.innerHTML.split(" ")[0];
		cardOne.element = clickedCard;
		console.log("First Card Selected: " + cardOne.cardValue);

	} else if (cardTwo.cardValue === undefined && clickedCard !== undefined)  {
		cardTwo.cardValue = clickedCard.innerHTML.split(" ")[0];
		cardTwo.element = clickedCard;
		console.log("Both Cards selected: " + cardOne.cardValue + " " + cardTwo.cardValue);
		cardsSelected = true;
	}
	if (cardsSelected === true) {
		playGame();
	}
}

function playGame () {
	if (cardsSelected === true && cardOne.cardValue === cardTwo.cardValue) {
		console.log("cards will dissapear");
		cardOne.element.className += " destroy-card";
		cardTwo.element.className += " destroy-card";
		cardOne.cardValue = undefined;
		cardTwo.cardValue = undefined;
		cardsSelected = false;
	} else {
		console.log("Cards will do nothing");
		cardsSelected = false;
		cardOne.cardValue = undefined;
		cardTwo.cardValue = undefined;
	}

	var allCards = document.getElementsByClassName("card");
	if (allCards.length > 0) {
		selectCards();
		console.log("I am here");
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
	playGame();

});


