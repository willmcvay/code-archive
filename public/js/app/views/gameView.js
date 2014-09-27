define( [ 'App', 'marionette', 'handlebars', 'models/gameModel', 'text!templates/game.html', 'config/constants'],
    function( App, Marionette, Handlebars, gameModel, template, constants) {

        var GameView = Marionette.ItemView.extend( {

            template: Handlebars.compile(template),
             model: new gameModel(),

            events: {
                'click .square' : 'playerMove',
                'click .tile' : 'selectTile'
                
            },

            playerMove: function(e) {
                console.log($(e.currentTarget))

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
                    tilesRequired,
                    tilesToAdd;

                if (playerOneTiles.length < 8) {
                    tilesRequired = 8 - playerOneTiles.length;
                    tilesToAdd = tiles.slice(0, tilesRequired);
                    playerOneTiles.push(tilesToAdd);

                    this.model.set({
                        playerOne: {
                            score: this.model.get('playerOne').score,
                            tileRack: playerOneTiles
                        }
                    });
                }

                if (playerTwoTiles.length < 8) {
                    tilesRequired = 8 - playerTwoTiles.length;
                    tilesToAdd = tiles.slice(0, tilesRequired);
                    playerTwoTiles.push(tilesToAdd);

                    this.model.set({
                        playerTwo: {
                            score: this.model.get('playerTwo').score,
                            tileRack: playerTwoTiles
                        }
                    });
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
                 console.log(this.model)
            },

            initialize: function() {
                var tiles = this.model.get('tiles'),
                    shuffledTiles = this.shuffleTiles(tiles);
                
                this.model.set({
                    tiles: shuffledTiles
                });
            }       
        });
        return GameView
    });