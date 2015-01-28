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
                    tileRack = playerToUpdate.get('tileRack'),
                    draggedTileIndex = _.indexOf(tileRack, e.originalEvent.dataTransfer.getData('text'));
                
                tileRack.splice(draggedTileIndex, 1);

                currentMoveSquare.html(e.originalEvent.dataTransfer.getData('text'));
                currentMoveSquare.addClass('dropped');
                currentDropped.push(currentMoveSquare.attr('id'));

                playerToUpdate.set({
                    tileRack: tileRack,
                    droppedSquares: currentDropped
                });

                // this.model.save();
                $(document).trigger('dragend');
            },

            saveGame: function(e) {
                e.preventDefault();
                // this.model.save();
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

            fillTileRack: function() {

                var players = this.model.get('players'),
                    self = this;

                players.each(function(player){
                    var tiles = self.model.get('tiles'),
                        tilesRequired,
                        tilesToAdd,
                        flattenedTiles,
                        playerTiles = player.get('tileRack');

                    if (playerTiles.length < 8) {
                        tilesRequired = 8 - playerTiles.length;
                        tilesToAdd = tiles.splice(0, tilesRequired);
                        playerTiles.push(tilesToAdd);
                        flattenedTiles = _.flatten(playerTiles);  

                        player.set({
                            tileRack: flattenedTiles
                        });

                        self.model.set({
                            tiles: tiles
                        });   
                    }
                });
                this.model.save();
            },

            getAllSquares: function() {
                var availableSquares = [];

                this.$('.square').each(function() {
                    availableSquares.push(this.id)
                });

                this.model.set({
                    availableSquares: availableSquares,
                    gameCurrent: true,
                    currentPlayer: 1
                });

                // this.model.save();
                return
            },

            moveValidator: function(playerModel) {
                return true;  
            },

            updateBoard: function(playerModel) {

                var squareValues = this.model.get('squareValues'),
                    currentMove = playerModel.get('droppedSquares'),
                    availableSquares = this.model.get('availableSquares'),
                    moveToGetIndex,
                    currentTile,
                    squareValuesKey
        
                for (var i = 0; i < currentMove.length; i++) {
                    currentTile = this.$('#' + currentMove[i]).html();
                    squareValuesKey = 'square' + currentMove[i];
                    squareValues[squareValuesKey] = currentTile;
                    moveToGetIndex = currentMove[i].toString();
                    availableSquares.splice(availableSquares.indexOf(moveToGetIndex), 1);
                };

                this.model.set({
                    squareValues: squareValues,
                    availableSquares: availableSquares
                });

                currentMove = [];

                playerModel.set({
                    droppedSquares: currentMove
                });

                this.model.save();
                this.fillTileRack();
            },

            moveScorer: function(playerModel) {
                var thisTurnScore = 0,
                    wordMultipliers = 0,
                    letter,
                    letterValue,
                    finalScore,
                    playerToUpdate,
                    players = this.model.get('players'),
                    thisTurnMoves = playerModel.get('droppedSquares'),
                    currentSquare;

                for (var i = 0; i < thisTurnMoves.length; i++) {
                    currentSquare = this.$('#' + thisTurnMoves[i]);

                    if (currentSquare.hasClass('double-letter')) {
                        letter = constants.tileValues[currentSquare.html()];
                        letterValue = parseInt(letter) * 2;
                        thisTurnScore += letterValue;
                    } else if (currentSquare.hasClass('triple-letter')) {
                        letter = constants.tileValues[currentSquare.html()]
                        letterValue = parseInt(letter) * 3;
                        thisTurnScore += letterValue;
                    } else if (currentSquare.hasClass('double-word') || currentSquare.hasClass('start')) {
                        letter = constants.tileValues[currentSquare.html()];
                        letterValue = parseInt(letter);
                        thisTurnScore += letterValue;
                        wordMultipliers += 2;
                    } else if (currentSquare.hasClass('triple-word')) {
                        letter = constants.tileValues[currentSquare.html()];
                        letterValue = parseInt(letter);
                        thisTurnScore += letterValue;
                        wordMultipliers += 3;
                    } else {
                        letter = constants.tileValues[currentSquare.html()];
                        letterValue = parseInt(letter);
                        thisTurnScore += letterValue;
                    }
                }

                if (wordMultipliers !== 0) {
                    finalScore = thisTurnScore * wordMultipliers;
                } else {
                    finalScore = thisTurnScore;
                }

                playerToUpdate = players.where({
                    playerName: playerModel.get('playerName')
                })[0];

                playerToUpdate.set({
                    score: finalScore
                });

                this.model.set({
                    players: players
                });

                // this.model.save();
                this.updateBoard(playerModel);
            },

            gameEngine: function(playerModel) {
                if (this.moveValidator(playerModel)) {
                    this.moveScorer(playerModel);
                }
            },

            loadSidebar: function() {
                var self = this;

                App.sidebarRegion.show(new sidebarView({
                    model: this.model,
                    gameView: this
                }));
                
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
                
                this.loadSidebar();
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