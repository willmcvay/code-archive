define([ 'marionette', 'handlebars', 'text!templates/playerForm.html', 'App', 'models/playerModel', 'collections/playerCollection'],
    function (Marionette, Handlebars, template, App, playerModel, playerCollection) {

        var welcomeView = Marionette.ItemView.extend({
            template:Handlebars.compile(template),
            playerModel: new playerModel(),
            playerCount: 1,

            events: {
            	'click #new-game' : 'newGame',
            	'click #start-game' : 'startGame',
               'click #add-player' : 'addPlayer',
               'click #load-game' : 'loadGame' 
            },

            newGame: function(e) {
                e.preventDefault();

               // App.trigger('loadGameView');
            },

            addPlayer: function(e) {
                e.preventDefault();
                var playerName = this.$('input#player-name').val(),
                    players = this.model.get('players');

                this.playerModel.set({
                    playerName: playerName,
                    playerNumber: this.playerCount
                });

                players.add(this.playerModel)

                this.model.set({
                    players: players
                })

                this.model.save();
                console.log(this.model)
                
            },

            loadGame: function(e) {

            },

            startGame: function(e) {
                e.preventDefault();
                App.trigger('saveGameModel');
            }
        });
        return welcomeView
    });