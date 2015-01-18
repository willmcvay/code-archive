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
                e.stopPropagation();
                this.draggedElement.html('');
                this.draggedElement.draggable = false;
                this.draggedElement = null;
            },

            playMove: function(e) {
                e.preventDefault();
                console.log('here')
                this.options.gameView.gameEngine(this.model);
            },

            onRender: function() {
                var self = this;

                setTimeout(function(){
                    self.$('.tile-container').css({
                        width: $('.square-container').width(),
                        height: $('.square-container').width(),
                        margin: $('.square-container').css('margin')
                    });
                }, 100);  
            }
        });
        return playerView
    }
);