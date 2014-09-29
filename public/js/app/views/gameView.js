define( [ 'App', 'marionette', 'handlebars', 'models/gameModel', 'text!templates/game.html', 'config/constants'],
    function( App, Marionette, Handlebars, gameModel, template, constants) {

        var GameView = Marionette.ItemView.extend( {

            template: Handlebars.compile(template),
             model: new gameModel(),

            events: {
                'click .square' : 'playerMove',
                'click .tile' : 'selectTile'
                
            },

            modelEvents: {
                'change' : 'render'
            },

            playerMove: function(e) {
                console.log($(e.currentTarget))

            },

            saveGame: function(e) {
                e.preventDefault();

                this.model.save();
            },

            selectTile: function(e) {
                
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
                var tiles = this.model.get('tiles'),
                    playerOneTiles = this.model.get('playerOne').tileRack,
                    playerTwoTiles = this.model.get('playerTwo').tileRack,
                    tilesRequiredOne,
                    tilesToAddOne,
                    flattenedTilesOne,
                    tilesRequiredTwo,
                    tilesToAddTwo,
                    flattenedTiledTwo;

                if (playerOneTiles.length < 8) {
                    tilesRequiredOne = 8 - playerOneTiles.length;
                    tilesToAddOne = tiles.slice(0, tilesRequiredOne);
                    playerOneTiles.push(tilesToAddOne);
                    flattenedTilesOne = _.flatten(playerOneTiles);

                    this.model.set({
                        playerOne: {
                            score: this.model.get('playerOne').score,
                            tileRack: flattenedTilesOne
                        }
                    });
                    this.model.save();
                }

                if (playerTwoTiles.length < 8) {
                    tilesRequiredTwo = 8 - playerTwoTiles.length;
                    tilesToAddTwo = tiles.slice(0, tilesRequiredTwo);
                    playerTwoTiles.push(tilesToAddTwo);
                    flattenedTilesTwo = _.flatten(playerTwoTiles);

                    this.model.set({
                        playerTwo: {
                            score: this.model.get('playerTwo').score,
                            tileRack: flattenedTilesTwo
                        }
                    });
                    this.model.save();
                }
                
                return
            },

            onRender: function() {
                var availableSquares = [];

                 this.$('.square').each(function() {
                    availableSquares.push(this.id)
                });

                 this.model.set({
                    availableSquares: availableSquares
                 });

                 this.fillTileRack();
            },

            initialize: function() {
                var tiles = this.model.get('tiles'),
                    shuffledTiles = this.shuffleTiles(tiles),
                    self = this;
                
                this.model.set({
                    tiles: shuffledTiles
                });

                App.on('saveGameModel', function(){
                    self.model.save();
                })
            }       
        });
        return GameView
    });