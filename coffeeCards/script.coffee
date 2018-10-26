GLOBALS = {}
GLOBALS.cardOne = {}
GLOBALS.cardTwo = {}
GLOBALS.playerOne = {}
GLOBALS.playerTwo = {}
GLOBALS.loadStatusCalls = 0
GLOBALS.seconds =-1.0
GLOBALS.mins = 0
GLOBALS.time
GLOBALS.oneSecondsElapsed =  0
GLOBALS.oneMinutesElapsed = 0
GLOBALS.twoSecondsElapsed =  0
GLOBALS.twoMinutesElapsed = 0
GLOBALS.cardPostionsArray = []
GLOBALS.currentCardNo = -1
GLOBALS.transX = 0
GLOBALS.transY =0
GLOBALS.root = exports ? this

GLOBALS.root.getPlayers = ->
	buttonClicked = $("#start-button")
	if buttonClicked.class isnt "disabled"
		GLOBALS.playerOne.selected = true
		GLOBALS.playerTwo.selected = false
		GLOBALS.playerOne.name = $('#player-one-input').val()
		GLOBALS.playerTwo.name = $('#player-two-input').val()
		GLOBALS.playerOne.label = $('#player-one')
		GLOBALS.playerTwo.label = $('#player-two')
		GLOBALS.playerOne.label.html(GLOBALS.playerOne.name)
		GLOBALS.playerTwo.label.html(GLOBALS.playerTwo.name)
		console.log "Players are: " + GLOBALS.playerOne.name + " & " + 	GLOBALS.playerTwo.name 
		buttonClicked.addClass("disabled")
		if detectMob() is true
			setTimeout (->
				makeDeck()
				pressToDeal()
				assignListener()
				return
			),1000
		else if detectMob() is false 
			makeDeck()
			pressToDeal()
			assignListener()
	return

hideLoadPage = ->
	$('#loading-page').addClass('hide')
	$('#controls').removeClass('hide')
	
checkLoadStatus = (deckToDeal) ->
	tempArray = []
	tempArray.push deckToDeal
	GLOBALS.loadStatusCalls++
	if tempArray.length is GLOBALS.loadStatusCalls
		setTimeout (->
			hideLoadPage()
		), 100
		return

makeDeck = ->
	deck = []
	cardValuesArray = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"]
	cardSuitsArray = ["Club", "Spade", "Heart", "Diamond"]
	mobileCardValuesArray = ["Ace","8", "9", "10", "Jack", "Queen", "King"]
	if $( document ).width() >= 600 and detectMob() is false
		j = 0
		while j < cardSuitsArray.length
			selectedSuit = cardSuitsArray[j]
			i = 0
			while i < cardValuesArray.length
				selectedValue = cardValuesArray[i]
				card = {}
				card.cardValue = selectedValue
				card.cardSuit = selectedSuit
				card.image = ""
				card.isSelected = false
				deck.push card
				i++
			j++
	else if $( document ).width() < 599 and detectMob() is true
		j = 0
		while j < cardSuitsArray.length
			selectedSuit = cardSuitsArray[j]
			i = 0
			while i < mobileCardValuesArray.length
				selectedValue = mobileCardValuesArray[i]
				card = {}
				card.cardValue = selectedValue
				card.cardSuit = selectedSuit
				card.image = ""
				card.isSelected = false
				deck.push card
				i++
			j++
	shuffleDeck deck
	
shuffleDeck = (deck) ->
	randomDeck = []
	shuffled = deck.slice(0)
	i = deck.length
	temp = undefined
	index = undefined
	while i--
		index = Math.floor((i + 1) * Math.random())
		temp = shuffled[index]
		shuffled[index] = shuffled[i]
		shuffled[i] = temp
		randomDeck.push shuffled[i]
	dealDeck randomDeck
	return

pressToDeal = ->
	$('#new-game-inner').click ( ->
		window.location.reload()
		return
	), false
	$('#play-again').click ( ->
		window.location.reload()
		return
	), false

dealDeck = (randomDeck) ->
	domDivsParent = document.createElement('div')
	domDivsParent.id = "inner-container"
	
	i = 0
	while i < randomDeck.length
		deckToDeal = document.createElement('div')
		deckToDeal.className +=  "card"
		deckToDeal.id = "card" + i
		deckToDeal.innerHTML = "<p style =" + "-webkit-transform:scaleX(-1)" + ">" + " " + randomDeck[i].cardValue + " " + randomDeck[i].cardSuit + "</p>"
		domDivsParent.appendChild deckToDeal
		i++
		
	checkLoadStatus(deckToDeal)
	$('#container').append domDivsParent 
	dealtCards = $(".card")
	
	j = 0
	while j < dealtCards.length
		cardPosition =
			element: dealtCards[j].id
			topPosition: dealtCards[j].offsetTop
			leftPosition: dealtCards[j].offsetLeft
		x = -cardPosition.leftPosition
		y = -cardPosition.topPosition
		dealtCards[j].style.webkitTransform = "translate3d(" + x + "px," + y + "px ,0)"
		GLOBALS.cardPostionsArray.push cardPosition
		j++
		
	setTimeout (->
		dealACard()
	), 1500
	return

dealACard = ->
	GLOBALS.currentCardNo++
	dealtCards = $(".card")
	
	if GLOBALS.currentCardNo < dealtCards.length
		i = GLOBALS.currentCardNo
		leftFromArray = GLOBALS.cardPostionsArray[i].leftPosition
		topFromArray = GLOBALS.cardPostionsArray[i].topPosition
		idFromArray = GLOBALS.cardPostionsArray[i].element
		GLOBALS.transX = leftFromArray - leftFromArray
		GLOBALS.transY = topFromArray - topFromArray
		dealtCards[i].style.webkitTransform = "translate3d(" + GLOBALS.transX + "px," + GLOBALS.transY + "px, 0) rotate(180deg)"
		dealtCards[i].style.webkitTransition = "all 0.5s ease-in-out"
		setTimeout dealACard, 100
	else if GLOBALS.currentCardNo >= dealtCards.length
		console.log "Deck Dealt"














	

