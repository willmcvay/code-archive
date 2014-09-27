define(['App', 'backbone', 'marionette', 'views/gameView', 'views/headerView', 'views/sidebarView'],
    function (App, Backbone, Marionette, gameView, headerView, sidebarView) {
    return Backbone.Marionette.Controller.extend({
        initialize: function (options) {
            App.headerRegion.show(new headerView());
        },
        //gets mapped to in AppRouter's appRoutes
        index: function () {
            App.on('loadGameView', function(){
                App.mainRegion.show(new gameView());
            })   
        }
    });
});