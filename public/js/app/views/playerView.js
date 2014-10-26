define( [ 'App', 'marionette', 'handlebars', 'text!templates/player.html', 'config/constants'],
    function( App, Marionette, Handlebars, template, constants) {

        var playerView = Marionette.ItemView.extend( {

            template: Handlebars.compile(template),
            draggedElement: null,

            boardSquares: $('.square'),

            events: {
                'dragstart .tile-container': 'dragStart',
                'dragend': 'dragEnd'
            },

            modelEvents: {
                'change' : 'render'
            },

            dragStart: function(e) {
                var data = $(e.currentTarget).children().html();

                this.draggedElement = $(e.currentTarget);
                e.originalEvent.dataTransfer.setData('Text', data);
                e.originalEvent.dataTransfer.dropEffect = 'move';
            },

            dragEnd: function(e) {
                // console.log(this.draggedElement)
                // console.log(this.model.get('tileRack'))
                var draggedTileIndex = _.indexOf(this.model.get('tileRack'), this.draggedElement.children().html()),
                    tileRack = this.model.get('tileRack');

                tileRack.splice(draggedTileIndex, 8);

                this.model.set({
                    tileRack: tileRack
                });

                this.model.save();

                this.draggedElement = null;
            },

            onRender: function() {
            }

        });
        return playerView
    }
);