define( [ 'App', 'marionette', 'handlebars', 'text!templates/player.html', 'config/constants'],
    function( App, Marionette, Handlebars, template, constants) {

        var playerView = Marionette.ItemView.extend( {

            template: Handlebars.compile(template),
            draggedElement: null,

            boardSquares: $('.square'),

            events: {
                'dragstart .tile-container': 'dragStart',
                'dragEnd': 'dragEnd'
            },

            dragStart: function(e) {
                var data = $(e.currentTarget).children().html();
                e.originalEvent.dataTransfer.setData('Text', data);
                e.originalEvent.dataTransfer.dropEffect = 'move';
            },

            dragEnd: function(e) {

            },

            onRender: function() {
            }

        });
        return playerView
    }
);