define( [ 'App', 'marionette', 'handlebars', 'models/gameModel', 'text!templates/game.html', 'config/constants'],
    function( App, Marionette, Handlebars, gameModel, template, constants) {

        var GameView = Marionette.ItemView.extend( {

            template: Handlebars.compile(template),
            thisTurnMoves: [],

            events: {
                'drop .square': 'drop',
                'dragover': 'dragOver',
                'dragenter': 'dragEnter',
                'dragleave': 'dragLeave'
            },

            // modelEvents: {
            //     'change' : 'render'
            // },

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
                var self = this,
                    currentMoveSquare = $(e.currentTarget),
                    currentMoveMultiplier;



                    // console.log(currentMoveMultiplier)

                this.thisTurnMoves.push(currentMoveSquare);
                currentMoveSquare.html(e.originalEvent.dataTransfer.getData('text'));
                currentMoveSquare.addClass('dropped')
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


            onRender: function() {

                var self = this;

                if (!this.model.get('gameCurrent')) {
                    this.getAllSquares();
                }

                console.log(this.model)
            },

            initialize: function() {
                var tiles = this.model.get('tiles'),
                    shuffledTiles = this.shuffleTiles(tiles),
                    players = this.model.get('players'),
                    self = this;

                players.each(function(player){
                    var tilesToAdd = self.model.get('tiles').splice(0, 8);

                    player.set({
                        tileRack: tilesToAdd
                    });
                });

                this.model.set({
                    tiles: shuffledTiles,
                    players: players
                });

                self.model.save({},{
                    success: function() {
                        var squareWidth = self.$('.square-container').width(),
                            squareMargin = self.$('.square-container').css('margin'),
                            squareDimensions = {
                                width: squareWidth,
                                height: squareWidth,
                                margin: squareMargin
                            }
                        App.trigger('load:sidebar:view', self.model, squareDimensions);
                        console.log('Model Saved')
                    }
                });

                App.on('save:game:model', function(playerModel){

                    var players = self.model.get('players'),
                        playerToUpdate = players.where({
                            playerName: playerModel.get('playerName')
                        })[0];

                    playerToUpdate.set(playerModel);
                    self.model.save();
                });

                App.on('play:move', function(playerModel){
                    var thisTurnScore = 0,
                        wordMultipliers = 0,
                        letter,
                        finalScore,
                        playerToUpdate;

                    for (var i = 0; i < self.thisTurnMoves.length; i++) {

                        console.log(self.thisTurnMoves[i])
                        if (self.thisTurnMoves[i].hasClass('double-letter')) {
                            letter = parseInt(self.thisTurnMoves[i].html()) * 2;
                            thisTurnScore += letter;
                            console.log(letter)
                        } else if (self.thisTurnMoves[i].hasClass('triple-letter')) {
                            letter = parseInt(self.thisTurnMoves[i].html()) * 3;
                            thisTurnScore += letter;
                        } else if (self.thisTurnMoves[i].hasClass('double-word') || self.thisTurnMoves[i].hasClass('start')) {
                            letter = parseInt(self.thisTurnMoves[i].html());
                            thisTurnScore += letter;
                            wordMultipliers += 2;
                        } else if (self.thisTurnMoves[i].hasClass('triple-word')) {
                            letter = parseInt(self.thisTurnMoves[i].html());
                            thisTurnScore += letter;
                            wordMultipliers += 3;
                        } else {
                            letter = parseInt(self.thisTurnMoves[i].html());
                            thisTurnScore += letter;
                            console.log(letter)
                        }
                    };
                    console.log(thisTurnScore)

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

                    console.log(self.model)
                    self.model.save();
                    self.thisTurnMoves = [];
                });
            }
        });
        return GameView
    });