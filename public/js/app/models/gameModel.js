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
		availableSquares: [],
		tiles: [
			'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a',
			'b', 'b',
			'c', 'c',
			'd', 'd', 'd', 'd',
			'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 
			'f', 'f',
			'g', 'g', 'g',
			'h', 'h',
			'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 
			'j',
			'k', 
			'l', 'l', 'l', 'l',
			'm', 'm',
			'n', 'n', 'n', 'n', 'n', 'n',
			'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 
			'p', 'p',
			'q', 
			'r', 'r', 'r', 'r', 'r', 'r',
			's', 's', 's', 's',
			't', 't', 't', 't', 't', 't',
			'u', 'u', 'u', 'u',
			'v', 'v',
			'w', 'w',
			'x', 
			'y', 'y',
			'z', 
			'blank', 'blank'
		]
            },

            // Get's called automatically by Backbone when the set and/or save methods are called (Add your own logic)
            validate:function (attrs) {

            }
        });

        return gameModel;
    }
);