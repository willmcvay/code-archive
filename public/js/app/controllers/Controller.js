define(['App', 'backbone', 'marionette', 'views/gameView', 'views/headerView', 'views/sidebarView', 'models/gameModel'],
    function (App, Backbone, Marionette, gameView, headerView, sidebarView, gameModel) {
    return Backbone.Marionette.Controller.extend({
        initialize: function (options) {
            App.mainRegion.show(new playerFormView());
        },
        //gets mapped to in AppRouter's appRoutes
        index: function () {

            App.on('loadGameView', function(playerCollection){
                App.mainRegion.show(new gameView({
                    model: new gameModel({
                        players: playerCollection
                    })
                }));
                App.headerRegion.show(new headerView());
            })   
        }
    });
});