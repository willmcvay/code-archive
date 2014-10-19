define( [ 'App', 'marionette', 'handlebars', 'text!templates/sidebar.html', 'config/constants'],
    function( App, Marionette, Handlebars, template, constants) {


        var sidebarView = Marionette.CompositeView.extend({

            template: Handlebars.compile(template),
            initialize: function() {

            },
            onRender: function() {
                require(['views/playerView'], function(playerView) {
                    this.itemView = new playerView();
                    this.itemViewContainer = $('.tile-rack');
                });
                console.log('rendering', this.collection)
            }

        });

        return sidebarView
    }
);