define(['App', 'backbone', 'marionette', 'views/gameView', 'views/HeaderView'],
    function (App, Backbone, Marionette, gameView, HeaderView) {
    return Backbone.Marionette.Controller.extend({
        initialize: function (options) {
            App.headerRegion.show(new HeaderView());
        },
        //gets mapped to in AppRouter's appRoutes
        index: function () {
            App.mainRegion.show(new gameView());
        }
    });
});