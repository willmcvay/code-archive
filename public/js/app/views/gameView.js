define( [ 'App', 'marionette', 'handlebars', 'models/gameModel', 'text!templates/game.html', 'config/constants'],
    function( App, Marionette, Handlebars, gameModel, template, constants) {

        var GameView = Marionette.ItemView.extend( {

            template: Handlebars.compile(template),

            events: {
                'click .square' : 'playerMove',
                'click .tile' : 'selectTile'
            },

            // modelEvents: {
            //     'change' : 'render'
            // },

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

            // renderSideBar: function() {
            //     var self = this;

            //     require(['views/sidebarView'], function(sidebar){

            //         // $(document).ready(function(){
            //             var sidebarView = new sidebar({
            //                 collection: self.model.get('players')
            //             });
            //             console.log(self.$('#sidebar'))
            //             self.$('#sidebar').html(sidebarView.render().$el);
            //         // });
            //     });
            // },

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
                        App.trigger('load:sidebar:view', self.model);
                        console.log('Model Saved')
                    }
                });

                App.on('saveGameModel', function(){
                    self.model.save();
                })
            }
        });
        return GameView
    });