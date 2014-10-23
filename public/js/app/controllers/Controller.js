define(['App', 'backbone', 'marionette', 'views/gameView', 'views/headerView', 'views/welcomeView', 'views/sidebarView', 'models/gameModel', 'collections/gamesCollection'],
    function (App, Backbone, Marionette, gameView, headerView, welcomeView, sidebarView, gameModel, gamesCollection) {

    return Backbone.Marionette.Controller.extend({

        initialize: function (options) {
            App.mainRegion.show(new welcomeView());
            App.headerRegion.show(new headerView());
        },

        index: function () {


            App.on('loadGameView', function(gameModel){
                App.mainRegion.show(new gameView({
                    model: gameModel
                }));
                App.headerRegion.show(new headerView());
            });

            App.reqres.addHandler('load:games:collection', function(){
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

            App.on('load:sidebar:view', function(gameModel, squareDimensions){
                App.sidebarRegion.show(new sidebarView({
                    model: gameModel,
                    squareDimensions: squareDimensions
                }));
            });
        }
    });
});