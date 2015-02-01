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

                    if (self.playerCount > 1) {
                        self.$('#start-game').removeClass('hidden');
                    } 

                    player.set({
                        playerName: playerName,
                        playerNumber: self.playerCount
                    });

                    players.add(player);

                    self.model.set({
                        players: players,
                        gameCurrent: false
                    });

                    self.model.save({},{
                        success: function(response) {
                            self.playerCount++;
                            self.$('#player-name-header').append('<h4>' + playerName + '</h4>');
                            self.$('input#player-name').val('');
                            if (self.playerCount > 4) {
                                self.$('#players-form, #max-warning').toggleClass('hidden');
                            }
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
                        self.$('#game-name-header').html(gameName);
                        self.$('#name-form, #players-form, #player-name-header').toggleClass('hidden');
                    }
                });
            },

            startGame: function(e) {
                e.preventDefault();
                App.trigger('loadGameView', this.model);
            }
        });
        return newGameView;
    }
);