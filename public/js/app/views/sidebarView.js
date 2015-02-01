define([ 'App', 'marionette', 'handlebars', 'text!templates/sidebar.html', 'config/constants', 'views/playerView'],
    function( App, Marionette, Handlebars, template, constants, playerView) {

        var sidebarView = Marionette.CompositeView.extend({

            template: Handlebars.compile(template),

            onRender: function() {
                var itemView,
                    currentPlayerNumber = this.model.get('currentPlayer'),
                    currentPlayer = this.model.get('players').where({
                        playerNumber: currentPlayerNumber
                    })[0];

                itemView = new playerView({
                    model: currentPlayer,
                    gameView: this.options.gameView
                });

                this.$('.tile-rack').html(itemView.render().el);
            }
        });
        return sidebarView;
    }
);