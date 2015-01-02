define( [ 'App', 'marionette', 'handlebars', 'text!templates/player.html', 'config/constants'],
    function( App, Marionette, Handlebars, template, constants) {

        var playerView = Marionette.ItemView.extend( {

            template: Handlebars.compile(template),
            draggedElement: null,

            boardSquares: $('.square'),

            events: {
                'dragstart .tile-container': 'dragStart',
                'dragend': 'dragEnd',
                'click .play-move' : 'playMove'

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
                // var draggedTileIndex = _.indexOf(this.model.get('tileRack'), this.draggedElement.children().html()),
                //     tileRack = this.model.get('tileRack'),
                //     droppedSquares = this.model.get('droppedSquares'),
                //     newTileRack;
                // // console.log($(e.currentTarget))
                // droppedSquares.push(droppedSquare);

                // newTileRack = tileRack.splice(draggedTileIndex, 1);

                // this.model.set({
                //     tileRack: newTileRack,
                //     droppedSquares: droppedSquares
                // });
                // console.log(newTileRack)
                // console.log(droppedSquares)
                // console.log(droppedSquare)

                // App.trigger('save:game:model', this.model);
                this.draggedElement.html('');
                this.draggedElement.draggable = false;
                this.draggedElement = null;
            },

            playMove: function(e) {
                e.preventDefault();
                App.trigger('play:move', this.model);
            },

            onRender: function() {
                this.$('.tile-container').css({
                    width: this.options.squareDimensions.width,
                    height: this.options.squareDimensions.height,
                    margin: this.options.squareDimensions.margin
                });
            }
        });
        return playerView
    }
);