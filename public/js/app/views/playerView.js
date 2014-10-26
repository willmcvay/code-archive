define([ 'App', 'marionette', 'handlebars', 'text!templates/player.html', 'config/constants'],
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
                e.originalEvent.dataTransfer.setData('Text', 'Hi there');
                e.originalEvent.dataTransfer.dropEffect = 'move';
            },

            dragEnd: function(e) {
                this.$el.removeClass('dragging');
                App.draggableObject = null;
            },

            onRender: function() {
            }

        });
        return playerView
    }
);