define(['App', 'backbone', 'marionette', 'views/gameView', 'views/headerView', 'views/welcomeView', 'views/sidebarView', 'models/gameModel', 'collections/gamesCollection'],
    function (App, Backbone, Marionette, gameView, headerView, welcomeView, sidebarView, gameModel, gamesCollection) {

    return Backbone.Marionette.Controller.extend({

        initialize: function (options) {
            App.headerRegion.show(new headerView());

            App.on('load:sidebar:view', function(gameModel, squareDimensions){
                App.sidebarRegion.show(new sidebarView({
                    model: gameModel,
                    squareDimensions: squareDimensions
                }));
            });

            App.on('loadGameView', function(gameModel){
                Backbone.history.navigate('/game/' + gameModel.get('_id'));
                App.mainRegion.show(new gameView({
                    model: gameModel
                }));
            });
        },

        index: function () {
            
            App.mainRegion.show(new welcomeView());

            App.reqres.addHandler('load:games:collection', function(){
                var games = new gamesCollection(),
                    defer = $.Deferred();

                games.fetch({
                    success: function(data) {
                        data.each(function(model){
                            var players = new Backbone.Collection(model.get('players'));

                            model.set({
                                players: players
                            });
                        });
                        defer.resolve(data);
                    },
                    error: function(data, response) {
                        console.log('problem getting games')
                    }
                });
                return defer.promise()
            });
        },

        loadGame: function(gameId) {
            
            var fetchingGame;

            App.reqres.addHandler('load:game:model', function(gameId){
                var game = new Backbone.Model(),
                defer = $.Deferred();

                game.fetch({
                    url: 'api/games/' + gameId,
                    success: function(data) {
             
                        var players = new Backbone.Collection(data.get('players'));

                        data.set({
                            players: players
                        });
        
                        defer.resolve(data);
                    },
                    error: function(data, response) {
                        console.log('problem getting game')
                    }
                });
                return defer.promise()
            });

            fetchingGame = App.request('load:game:model', gameId);

            $.when(fetchingGame).done(function(game){
                App.mainRegion.show(new gameView({
                    model: game
                }));
            });            
        }
    });
});