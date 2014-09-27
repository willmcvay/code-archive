define( [ 'App', 'marionette', 'handlebars', 'models/gameModel', 'text!templates/game.html', 'config/constants'],
    function( App, Marionette, Handlebars, gameModel, template, constants) {

        var GameView = Marionette.ItemView.extend( {

            template: Handlebars.compile(template),
             model: new gameModel(),

            events: {
                'click .square' : 'playerMove',
                'click .tile' : 'selectTile'
                
            },

            playerMove: function(e) {
                console.log($(e.currentTarget))

            },

            selectTile: function(e) {
        
            },

            initialize: function() {
                 
            }

       
        });
        return GameView
    });