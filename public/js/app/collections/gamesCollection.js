define(["jquery","backbone"],
    function($, Backbone) {

        var gamesCollection = Backbone.Collection.extend({
            url: '/api/games',
            parse: function(response) {
                console.log('parsing: ', response)
            }
        });

        return gamesCollection;
    }
);