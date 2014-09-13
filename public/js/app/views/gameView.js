define( [ 'App', 'marionette', 'handlebars', 'models/Model', 'text!templates/game.html', 'config/constants', 'config/game'],
    function( App, Marionette, Handlebars, Model, template, constants, game) {

        var GameView = Marionette.ItemView.extend( {

            template: Handlebars.compile(template),
            model: new Model({
                mobile: App.mobile
            }),

            events: {
                'click .square' : 'playerMove'
            },

            playerMove: function(e) {
                console.log($(e.currentTarget))
            }
        });
        return GameView
    });