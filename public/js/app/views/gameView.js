define( [ 'App', 'marionette', 'handlebars', 'models/gameModel', 'text!templates/game.html', 'config/constants', 'config/game'],
    function( App, Marionette, Handlebars, gameModel, template, constants, game) {

        var GameView = Marionette.ItemView.extend( {

            template: Handlebars.compile(template),
            model: new gameModel(),

            events: {
                'click .square' : 'playerMove',
                'click .tile' : 'selectTile',
                'click #new-game' : 'newGame'
            },

            playerMove: function(e) {
                console.log($(e.currentTarget))

            },

            selectTile: function(e) {
        
            },

            newGame: function(e) {
                console.log(this.model)
            }
        });
        return GameView
    });