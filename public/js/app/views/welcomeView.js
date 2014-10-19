define(['App', 'marionette', 'handlebars', 'text!templates/welcome.html'],
    function (App, Marionette, Handlebars, template) {

        var welcomeView = Marionette.Layout.extend({

            template:Handlebars.compile(template),
            playerCount: 1,

            regions: {
                newGameRegion: '#new-game',
                loadGameRegion: '#load-game'
            },

            events: {
                'click #new-game-btn' : 'newGame',
                'click #load-game-btn' : 'loadGame'
            },

            newGame: function(e) {
                e.preventDefault();
                var self = this;
                require(['models/gameModel', 'views/newGameView'], function(gameModel, newGameView){

                    var newGameView = new newGameView({
                        model: new gameModel()
                    });

                    self.newGameRegion.show(newGameView);
                });
            },

            loadGame: function(e) {
                e.preventDefault();

                App.trigger('loadGamesCollection');
            }
        });
        return welcomeView
    }
);