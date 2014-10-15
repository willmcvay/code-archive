define(['App', 'marionette', 'handlebars', 'text!templates/playerForm.html'],
    function (App, Marionette, Handlebars, template) {

        var welcomeView = Marionette.ItemView.extend({
            
            template:Handlebars.compile(template),
            playerCount: 1,

            events: {
            	'click #new-game' : 'newGame',
            	'click #start-game' : 'startGame',
               'click #add-player' : 'addPlayer',
               'click #load-game' : 'loadGame' 
            },

            newGame: function(e) {
                e.preventDefault();
            },

            addPlayer: function(e) {
                e.preventDefault();
                var self = this;

                require(['models/playerModel'], function(playerModel){
                    
                    var playerName = this.$('input#player-name').val(),
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

                    self.model.save();
                    console.log(self.model)
                });
            },

            loadGame: function(e) {

            },

            startGame: function(e) {
                e.preventDefault();
                App.trigger('loadGameView', this.model);
            }
        });
        return welcomeView
    });