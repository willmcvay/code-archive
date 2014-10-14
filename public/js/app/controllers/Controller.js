define(['App', 'backbone', 'marionette', 'views/gameView', 'views/headerView', 'views/welcomeView', 'views/sidebarView', 'models/gameModel', 'collections/playerCollection'],
    function (App, Backbone, Marionette, gameView, headerView, welcomeView, sidebarView, gameModel, playerCollection) {
    
    return Backbone.Marionette.Controller.extend({
        
        initialize: function (options) {
            App.mainRegion.show(new welcomeView({
                model: new gameModel({
                    players: new playerCollection()
                })
            }));
        },

        index: function () {
            App.on('loadGameView', function(gameModel){
                App.mainRegion.show(new gameView({
                    model: gameModel
                }));
                App.headerRegion.show(new headerView());
            })   
        }
    });
});