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
                for (var i = 1; i < this.model.get('numberPlayers'); i++) {
                    console.log(this.model)
                    console.log(i)
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


                        this.model.set({
                            this.model.get(playerName): {
                                score: this.model.get(playerName).score,
                                tileRack: flattenedTiles
                                
                        });
                        this.model.save();
                    }
                };
                return
            },

            onRender: function() {
                var availableSquares = [],
                    players = [];

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