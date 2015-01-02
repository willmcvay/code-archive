define( [ 'App', 'marionette', 'handlebars', 'text!templates/sidebar.html', 'config/constants', 'views/playerView'],
    function( App, Marionette, Handlebars, template, constants, playerView) {

        var sidebarView = Marionette.CompositeView.extend({

            itemView: playerView,
            itemViewContainer: '.tile-rack',
            template: Handlebars.compile(template),

            itemViewOptions: function() {
                return {
                    squareDimensions: this.options.squareDimensions
                }
            },

            initialize: function() {
                this.collection = this.model.get('players');

            }
        });
        return sidebarView
    }
);