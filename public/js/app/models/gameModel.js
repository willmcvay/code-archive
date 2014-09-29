define(["jquery", "backbone"],
    function ($, Backbone) {
    	
        var gameModel = Backbone.Model.extend({

            	initialize:function () {

            	},

            	idAttribute: "ID",

	getCustomUrl: function (method) {
		switch (method) {
		case 'read':
			return '/api/games/' + this.id;
			break;
		case 'create':
			return '/api/games';
			break;
		case 'update':
			return '/api/games/' + this.id;
			break;
		case 'delete':
			return '/api/games/' + this.id;
			break;
		}
	},

	sync: function (method, model, options) {
		options || (options = {});
		options.url = this.getCustomUrl(method.toLowerCase());
		return Backbone.sync.apply(this, arguments);
	},

            defaults:{
		playerOne: {
			score: 0,
			tileRack: []
		},
		playerTwo: {
			score: 0,
			tileRack: []
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

            validate:function (attrs) {

            }
        });

        return gameModel;
    }
);