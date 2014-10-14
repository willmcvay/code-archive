define(["jquery", "backbone"],
    function ($, Backbone) {

        var playerModel = Backbone.Model.extend({

            defaults:{
                score: 0,
                tileRack: []
            }
        });
    return playerModel;
    }
);