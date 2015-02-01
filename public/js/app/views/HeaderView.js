define([ 'marionette', 'handlebars', 'text!templates/header.html', 'App'],
    function (Marionette, Handlebars, template, App) {

        var headerView = Marionette.ItemView.extend({
            template:Handlebars.compile(template),

            events: {
            	'click #new-game' : 'newGame',
            	'click #save-game' : 'saveGame'
            },

            saveGame: function(e) {
        		e.preventDefault();
        		App.trigger('saveGameModel');
            },  

            newGame: function(e) {
                e.preventDefault();
                App.trigger('loadGameView');
            }
        });
        return headerView;
    }
);