define(["jquery","backbone", 'models/gameModel'],
    function($, Backbone, gameModel) {

        var gamesCollection = Backbone.Collection.extend({
            url: '/api/games/all',
            parse: function(response) {
                console.log('parsing: ', response)
                return response
            }
        });

        return gamesCollection;
    }
);