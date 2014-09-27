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

            initialize: function() {
                var tiles = this.model.get('tiles'),
                    shuffledTiles = this.shuffleTiles(tiles);
                
                this.model.set({
                    tiles: shuffledTiles
                });

                console.log(this.model)
            }       
        });
        return GameView
    });