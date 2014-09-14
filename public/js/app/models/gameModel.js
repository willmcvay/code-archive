define(["jquery", "backbone"],
    function ($, Backbone) {
        // Creates a new Backbone Model class object
        var gameModel = Backbone.Model.extend({
            initialize:function () {

            },

            // Default values for all of the Model attributes
            defaults:{
		playerOne: {
			score: 0
		},
		playerTwo: {
			score: 0
		},
		tileBag: [],
		availableSquares: []
            },

            // Get's called automatically by Backbone when the set and/or save methods are called (Add your own logic)
            validate:function (attrs) {

            }
        });

        return gameModel;
    }
);