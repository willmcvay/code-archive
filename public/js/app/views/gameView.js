define( [ 'App', 'marionette', 'handlebars', 'models/gameModel', 'text!templates/game.html', 'config/constants', 'views/sidebarView'],
    function( App, Marionette, Handlebars, gameModel, template, constants, sidebarView) {

        var GameView = Marionette.ItemView.extend( {

            template: Handlebars.compile(template),

            events: {
                'drop .square': 'drop',
                'dragover': 'dragOver',
                'dragenter': 'dragEnter',
                'dragleave': 'dragLeave'
            },

            dragOver: function(e) {
                e.stopPropagation();
                e.preventDefault();
            },

            dragEnter: function(e) {
                e.stopPropagation();
                e.preventDefault();
            },

            dragLeave: function(e) {
                e.stopPropagation();
                e.preventDefault();
            },

            drop: function(e) {
                e.stopPropagation();
                e.preventDefault();

                var currentMoveSquare = $(e.currentTarget),
                    playerToUpdate = this.model.get('players').where({
                        playerNumber: this.model.get('currentPlayer')
                    })[0],
                    currentDropped = playerToUpdate.get('droppedSquares'),
                    droppedLetters = playerToUpdate.get('droppedLetters'),
                    tileRack = playerToUpdate.get('tileRack'),
                    draggedTileIndex = _.indexOf(tileRack, e.originalEvent.dataTransfer.getData('text'));
                
                tileRack.splice(draggedTileIndex, 1);

                currentMoveSquare.html(e.originalEvent.dataTransfer.getData('text'));
                currentMoveSquare.addClass('dropped');
                currentDropped.push(currentMoveSquare.attr('id'));
                droppedLetters.push(e.originalEvent.dataTransfer.getData('text'));

                playerToUpdate.set({
                    tileRack: tileRack,
                    droppedSquares: currentDropped,
                    droppedLetters: droppedLetters
                });

                $(document).trigger('dragend');
            },

            shuffleTiles: function(tiles) {
                for (var i = tiles.length - 1; i > 0; i--) {
                    var j = Math.floor(Math.random() * (i + 1));
                    var temp = tiles[i];
                    tiles[i] = tiles[j];
                    tiles[j] = temp;
                }
                return tiles;
            },

            switchPlayer: function(playerModel) {
                var currentPlayer = this.model.get('currentPlayer'),
                    players = this.model.get('players');

                currentPlayer < players.length ? currentPlayer++ : currentPlayer = 1;

                this.model.set({
                    currentPlayer: currentPlayer
                });

                this.model.save({},{
                    success: function() {
                        App.sidebarView.render();
                    }
                });
            },

            fillTileRack: function(playerModel) {
    
                var tiles = this.model.get('tiles'),
                    tilesRequired,
                    tilesToAdd,
                    flattenedTiles,
                    self = this,
                    playerTiles = playerModel.get('tileRack');

                if (playerTiles.length < 8) {
                    tilesRequired = 8 - playerTiles.length;
                    tilesToAdd = tiles.splice(0, tilesRequired);
                    playerTiles.push(tilesToAdd);
                    flattenedTiles = _.flatten(playerTiles);  

                    playerModel.set({
                        tileRack: flattenedTiles
                    });

                    this.model.set({
                        tiles: tiles
                    });   
                }

                this.model.save({}, {
                    success: function () {
                        self.switchPlayer(playerModel);  
                    }
                }); 
            },

            getAllSquares: function() {
                var availableSquares = [];

                this.$('.square').each(function() {
                    availableSquares.push(this.id);
                });

                this.model.set({
                    availableSquares: availableSquares,
                    gameCurrent: true,
                    currentPlayer: 1
                });
                return;
            },

            moveValidator: function(playerModel) {
                return true;  
            },

            updateBoard: function(playerModel) {

                var squareValues = this.model.get('squareValues'),
                    currentMove = playerModel.get('droppedSquares'),
                    currentMoveSquares = playerModel.get('droppedLetters'),
                    availableSquares = this.model.get('availableSquares'),
                    moveToGetIndex,
                    currentTile,
                    squareValuesKey;
        
                for (var i = 0; i < currentMove.length; i++) {
                    currentTile = currentMoveSquares[i];
                    squareValuesKey = 'square' + currentMove[i];
                    squareValues[squareValuesKey] = currentTile;
                    moveToGetIndex = currentMove[i].toString();
                    availableSquares.splice(availableSquares.indexOf(moveToGetIndex), 1);
                }

                this.model.set({
                    squareValues: squareValues,
                    availableSquares: availableSquares
                });

                currentMove = [];
                currentMoveSquares = [];
                playerModel.set({
                    droppedLetters: currentMoveSquares,
                    droppedSquares: currentMove
                });

                this.fillTileRack(playerModel);
            },

            moveScorer: function(playerModel) {
                var thisTurnScore = 0,
                    wordMultipliers = 0,
                    letter,
                    currentScore = playerModel.get('score'),
                    letterValue,
                    finalScore,
                    playerToUpdate,
                    finalLetterValue,
                    thisTurnMoves = playerModel.get('droppedSquares'),
                    thisTurnLetters = playerModel.get('droppedLetters'),
                    currentSquare;

                for (var i = 0; i < thisTurnMoves.length; i++) {
                    currentSquare = this.$('#' + thisTurnMoves[i]);
                    letter = thisTurnLetters[i];
                    letterValue = constants.tileValues[letter];
    
                    if (currentSquare.hasClass('double-letter')) {
                        finalLetterValue = parseInt(letterValue) * 2;
                    } else if (currentSquare.hasClass('triple-letter')) {
                        finalLetterValue = parseInt(letterValue) * 3;
                    } else if (currentSquare.hasClass('double-word') || currentSquare.hasClass('start')) {
                        finalLetterValue = parseInt(letterValue);
                        wordMultipliers += 2;
                    } else if (currentSquare.hasClass('triple-word')) {
                        finalLetterValue = parseInt(letterValue);
                        wordMultipliers += 3;
                    } else {
                        finalLetterValue = parseInt(letterValue);
                    }
                    thisTurnScore += finalLetterValue;
                }

                if (wordMultipliers !== 0) {
                    finalScore = thisTurnScore * wordMultipliers;
                } else {
                    finalScore = thisTurnScore;
                }

                finalScore = finalScore + currentScore;

                playerModel.set({
                    score: finalScore
                });

                this.updateBoard(playerModel);
            },

            gameEngine: function(playerModel) {
                if (this.moveValidator(playerModel)) {
                    this.moveScorer(playerModel);
                }
            },

            loadSidebar: function() {
                var self = this;

                App.sidebarView = new sidebarView({
                    model: this.model,
                    gameView: this
                });

                App.sidebarRegion.show(App.sidebarView);
            },

            onRender: function() {
                var self = this;

                if (!this.model.get('gameCurrent')) {
                    this.getAllSquares();
                }

                function isInAvailableSquares(value) {
                    return self.model.get('availableSquares').indexOf(value) > -1;
                }

                this.$('.square').each(function(i, obj) {
                    if (!isInAvailableSquares(obj.id) ) {
                        self.$('#' + obj.id).addClass('yellow');
                    }
                });
                
                if (!App.sidebarView) {
                    this.loadSidebar();
                } else {
                   App.sidebarView.render(); 
                }
            },

            initialize: function() {
                var tiles,
                    shuffledTiles,
                    players,
                    self = this;

                if (!this.model.get('gameInitialized')) {

                    tiles = this.model.get('tiles');
                    shuffledTiles = this.shuffleTiles(tiles);
                    players = this.model.get('players');

                    players.each(function(player){
                        var tilesToAdd = self.model.get('tiles').splice(0, 8);

                        player.set({
                            tileRack: tilesToAdd
                        });
                    });

                    this.model.set({
                        tiles: shuffledTiles,
                        players: players,
                        gameInitialized: true
                    });
                }
            }
        });
        return GameView;
    });