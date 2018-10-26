define(["jquery","backbone", 'models/gameModel'],
    function($, Backbone, gameModel) {

        var gamesCollection = Backbone.Collection.extend({
            url: '/api/games',
            parse: function(response) {
                return response
            }
        });

        return gamesCollection;
    }
);