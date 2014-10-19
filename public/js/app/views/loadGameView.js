define(['App', 'marionette', 'handlebars', 'text!templates/loadGame.html'],
    function (App, Marionette, Handlebars, template) {

        var loadGameView = Marionette.ItemView.extend({

            template:Handlebars.compile(template),

            events: {
                'click #load-game' : 'loadGame'
            },

            loadGame: function(e) {
                e.preventDefault();
                App.trigger('loadGameView', this.model);
            }
        });
        return loadGameView
    }
);