define(['App', 'marionette', 'handlebars','text!templates/new.html'],
    function (App, Marionette, Handlebars, template) {

        var newGameView = Marionette.ItemView.extend({

            template:Handlebars.compile(template),
            playerCount: 1,

            events: {
                'click #start-game' : 'startGame',
                'click #add-player' : 'addPlayer',
                'click #add-game-name' : 'addGameName'
            },

            addPlayer: function(e) {
                e.preventDefault();
                var self = this;

                require(['models/playerModel'], function(playerModel){

                    var playerName = self.$('input#player-name').val(),
                        player = new playerModel(),
                        players = self.model.get('players');

                    player.set({
                        playerName: playerName,
                        playerNumber: self.playerCount
                    });

                    self.playerCount++;

                    players.add(player);

                    self.model.set({
                        players: players
                    });

                    self.model.save({},{
                        success: function(response) {
                            self.$('#current-players').append('<p>' + playerName + '</p>');
                            self.$('input#player-name').val('');
                        }
                    });

                });
            },

            addGameName: function(e) {
                e.preventDefault(e);

                var self = this,
                    gameName = this.$('input#game-name').val();

                this.model.set({
                    gameName: gameName
                });

                this.model.save({},{
                    success: function(response) {
                        self.$('#game-name').append('<p>' + gameName + '</p>');
                        self.$('input#game-name').val('');
                    }
                });
            },

            startGame: function(e) {
                e.preventDefault();
                App.trigger('loadGameView', this.model);
            }
        });
        return newGameView
    }
);