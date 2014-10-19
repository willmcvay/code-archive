define(['App', 'marionette', 'handlebars', 'loadGameView', 'text!templates/loadGames.html'],
    function (App, Marionette, Handlebars, loadGameView, template) {

        var loadGamesView = Marionette.CompositeView.extend({

            itemView: loadGameView,
            template:Handlebars.compile(template)

        });
        return loadGamesView
    }
);