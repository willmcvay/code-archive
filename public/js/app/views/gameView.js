define( [ 'App', 'marionette', 'handlebars', 'models/gameModel', 'text!templates/game.html', 'config/constants'],
    function( App, Marionette, Handlebars, gameModel, template, constants) {

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
                currentDropped.push(currentMoveSquare);

                playerToUpdate.set({
                    tileRack: tileRack,
                    droppedSquares: currentDropped
                });

                this.model.save();
                $(document).trigger('dragend');
            },

            saveGame: function(e) {
                e.preventDefault();
                this.model.save();
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
                for (var i = 1; i < this.model.get('numberPlayers'); i++) {
                    var tiles = this.model.get('tiles'),
                        tilesRequired,
                        tilesToAdd,
                        flattenedTiles,
                        playerName = 'player' + [i],
                        playerTiles = this.model.get(playerName).tileRack;

                    if (playerTiles.length < 8) {
                        tilesRequired = 8 - playerTiles.length;
                        tilesToAdd = tiles.slice(0, tilesRequired);
                        playerTiles.push(tilesToAdd);
                        flattenedTiles = _.flatten(playerTiles);

                        this.model.save();
                    }
                };
                return
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

                this.model.save();
                return
            },

            moveScorer: function(playerModel) {
                var thisTurnScore = 0,
                        wordMultipliers = 0,
                        letter,
                        letterValue,
                        finalScore,
                        playerToUpdate,
                        players = this.model.get('players'),
                        thisTurnMoves = playerModel.get('droppedSquares');

                for (var i = 0; i < thisTurnMoves.length; i++) {
                    if (thisTurnMoves[i].hasClass('double-letter')) {
                        letter = constants.tileValues[thisTurnMoves[i].html()];
                        letterValue = parseInt(letter) * 2;
                        thisTurnScore += letterValue;
                    } else if (thisTurnMoves[i].hasClass('triple-letter')) {
                        letter = constants.tileValues[thisTurnMoves[i].html()]
                        letterValue = parseInt(letter) * 3;
                        thisTurnScore += letterValue;
                    } else if (thisTurnMoves[i].hasClass('double-word') || thisTurnMoves[i].hasClass('start')) {
                        letter = constants.tileValues[thisTurnMoves[i].html()];
                        letterValue = parseInt(letter);
                        thisTurnScore += letterValue;
                        wordMultipliers += 2;
                    } else if (thisTurnMoves[i].hasClass('triple-word')) {
                        letter = constants.tileValues[thisTurnMoves[i].html()];
                        letterValue = parseInt(letter);
                        thisTurnScore += letterValue;
                        wordMultipliers += 3;
                    } else {
                        letter = constants.tileValues[thisTurnMoves[i].html()];
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
                    score: finalScore,
                    droppedSquares: []
                });

                this.model.set({
                    players: players
                });

                this.model.save();
            },

            gameEngine: function(playerModel) {
                this.moveScorer(playerModel);
            },

            loadSidebar: function() {
                var self = this;
                App.trigger('load:sidebar:view', this.model);
                
            },

            onRender: function() {
                if (!this.model.get('gameCurrent')) {
                    this.getAllSquares();
                }
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

                    this.model.save();
                }

                App.on('save:game:model', function(playerModel){

                    var players = self.model.get('players'),
                        playerToUpdate = players.where({
                            playerName: playerModel.get('playerName')
                        })[0];

                    playerToUpdate.set(playerModel);
                    self.model.save();
                });

                App.on('play:move', function(playerModel){
                    self.gameEngine(playerModel);
                });
            }
        });
        return GameView;
    });