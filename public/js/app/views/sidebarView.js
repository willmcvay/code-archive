define( [ 'App', 'marionette', 'handlebars', 'text!templates/sidebar.html', 'config/constants', 'views/playerView'],
    function( App, Marionette, Handlebars, template, constants, playerView) {

        var sidebarView = Marionette.CompositeView.extend({

            itemView: playerView,
            itemViewContainer: '.tile-rack',
            template: Handlebars.compile(template),

            initialize: function() {
                this.collection = this.model.get('players');

            },
            onRender: function() {
                this.$('.tile-container').css({
                    width: this.options.squareDimensions.width,
                    height: this.options.squareDimensions.height,
                    margin: this.options.squareDimensions.margin
                });
                console.log('rendering', this.collection)
            }

        });

        return sidebarView
    }
);