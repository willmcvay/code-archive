define(['App', 'backbone', 'marionette', 'views/gameView', 'views/headerView', 'views/welcomeView', 'views/sidebarView', 'models/gameModel', 'collections/gamesCollection'],
    function (App, Backbone, Marionette, gameView, headerView, welcomeView, sidebarView, gameModel, gamesCollection) {

    return Backbone.Marionette.Controller.extend({

        initialize: function (options) {
            App.mainRegion.show(new welcomeView());
        },

        index: function () {

            App.on('loadGameView', function(gameModel){
                App.mainRegion.show(new gameView({
                    model: gameModel
                }));
                App.headerRegion.show(new headerView());
            });

            App.on('loadGamesCollection', function(){

                var games = new gamesCollection(),
                    defer = $.Deferred();

                games.fetch({
                    success: function(data) {
                        defer.resolve(data);
                    },
                    error: function(data, response) {
                        console.log('problem getting games')
                    }
                });
                return defer.promise()
            });

            App.on('load:sidebar:view', function(gameModel){
                // console.log(playersCollection)
                App.sidebarRegion.show(new sidebarView({
                    model: gameModel
                }));
            });
        }
    });
});