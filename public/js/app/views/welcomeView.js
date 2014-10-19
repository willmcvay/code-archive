define(['App', 'marionette', 'handlebars', 'text!templates/welcome.html'],
    function (App, Marionette, Handlebars, template) {

        var welcomeView = Marionette.Layout.extend({

            template:Handlebars.compile(template),
            playerCount: 1,

            regions: {
                newGameRegion: '#new-game'
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

                var self = this,
                    gettingGamesCollection,
                    loadGamesView;

                require(['views/loadGamesView'], function(loadGamesView){

                    gettingGamesCollection = App.trigger('loadGamesCollection');

                    $.when(gettingGamesCollection).done(function(gamesCollection){
                        loadGamesView = new loadGamesView({
                            collection: gamesCollection
                        });
                        console.log(self.collection)
                        self.newGameRegion.show(loadGamesView)
                    });
                });
            }
        });
        return welcomeView
    }
);