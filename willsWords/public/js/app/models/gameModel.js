define(["jquery", "backbone", 'collections/playerCollection', 'models/playerModel'],
    function ($, Backbone, playerCollection, playerModel) {

        var gameModel = Backbone.Model.extend({

        	idAttribute: "_id",

			getCustomUrl: function (method) {
				switch (method) {
				case 'read':
					return '/api/games/' + this.id;
				case 'create':
					return '/api/games';
				case 'update':
					return '/api/games/' + this.id;
				case 'delete':
					return '/api/games/' + this.id;
				}
			},

			sync: function (method, model, options) {
				options || (options = {});
				options.url = this.getCustomUrl(method.toLowerCase());
				return Backbone.sync.apply(this, arguments);
			},

            defaults:{
				tileBag: [],
				availableSquares: [],
				players: new playerCollection(),
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
				],
				binaryBoard:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],	
				squareValues: {
					square001: 'Triple Word Score',
					square002: '',
					square003: '',
					square004: 'Double Letter Score',
					square005: '',
					square006: '',
					square007: '',
					square008: 'Triple Word Score',
					square009: '',
					square010: '',
					square011: '',
					square012: 'Double Letter Score',
					square013: '',
					square014: '',
					square015: 'Triple Word Score',
					square016: '',
					square017: 'Double Word Score',
					square018: '',
					square019: '',
					square020: '',
					square021: 'Triple Letter Score',
					square022: '',
					square023: '',
					square024: '',
					square025: 'Triple Letter Score',
					square026: '',
					square027: '',
					square028: '',
					square029: 'Double Word Score',
					square030: '',
					square031: '',
					square032: '',
					square033: 'Double Word Score',
					square034: '',
					square035: '',
					square036: '',
					square037: 'Double Letter Score',
					square038: '',
					square039: 'Double Letter Score',
					square040: '',
					square041: '',
					square042: '',
					square043: 'Double Word Score',
					square044: '',
					square045: '',
					square046: 'Double Letter Score',
					square047: '',
					square048: '',
					square049: 'Double Word Score',
					square050: '',
					square051: '',
					square052: '',
					square053: 'Double Letter Score',
					square054: '',
					square055: '',
					square056: '',
					square057: 'Double Word Score',
					square058: '',
					square059: '',
					square060: 'Double Letter Score',
					square061: '',
					square062: '',
					square063: '',
					square064: '',
					square065: 'Double Word Score',
					square066: '',
					square067: '',
					square068: '',
					square069: '',
					square070: '',
					square071: 'Double Word Score',
					square072: '',
					square073: '',
					square074: '',
					square075: '',
					square076: '',
					square077: 'Triple Letter Score',
					square078: '',
					square079: '',
					square080: '',
					square081: 'Triple Letter Score',
					square082: '',
					square083: '',
					square084: '',
					square085: 'Triple Letter Score',
					square086: '',
					square087: '',
					square088: '',
					square089: 'Triple Letter Score',
					square090: '',
					square091: '',
					square092: '',
					square093: 'Double Letter Score',
					square094: '',
					square095: '',
					square096: '',
					square097: 'Double Letter Score',
					square098: '',
					square099: 'Double Letter Score',
					square100: '',
					square101: '',
					square102: '',
					square103: 'Double Letter Score',
					square104: '',
					square105: '',
					square106: 'Triple Word Score',
					square107: '',
					square108: '',
					square109: 'Double Letter Score',
					square110: '',
					square111: '',
					square112: '',
					square113: 'Start',
					square114: '',
					square115: '',
					square116: '',
					square117: 'Double Letter Score',
					square118: '',
					square119: '',
					square120: 'Triple Word Score',
					square121: '',
					square122: '',
					square123: 'Double Letter Score',
					square124: '',
					square125: '',
					square126: '',
					square127: 'Double Letter Score',
					square128: '',
					square129: 'Double Letter Score',
					square130: '',
					square131: '',
					square132: '',
					square133: 'Double Letter Score',
					square134: '',
					square135: '',
					square136: '',
					square137: 'Triple Letter Score',
					square138: '',
					square139: '',
					square140: '',
					square141: 'Triple Letter Score',
					square142: '',
					square143: '',
					square144: '',
					square145: 'Triple Letter Score',
					square146: '',
					square147: '',
					square148: '',
					square149: 'Triple Letter Score',
					square150: '',
					square151: '',
					square152: '',
					square153: '',
					square154: '',
					square155: 'Double Word Score',
					square156: '',
					square157: '',
					square158: '',
					square159: '',
					square160: '',
					square161: 'Double Word Score',
					square162: '',
					square163: '',
					square164: '',
					square165: '',
					square166: 'Double Letter Score',
					square167: '',
					square168: '',
					square169: 'Double Word Score',
					square170: '',
					square171: '',
					square172: '',
					square173: 'Double Letter Score',
					square174: '',
					square175: '',
					square176: '',
					square177: 'Double Word Score',
					square178: '',
					square179: '',
					square180: 'Double Letter Score',
					square181: '',
					square182: '',
					square183: 'Double Word Score',
					square184: '',
					square185: '',
					square186: '',
					square187: 'Double Letter Score',
					square188: '',
					square189: 'Double Letter Score',
					square190: '',
					square191: '',
					square192: '',
					square193: 'Double Word Score',
					square194: '',
					square195: '',
					square196: '',
					square197: 'Double Word Score',
					square198: '',
					square199: '',
					square200: '',
					square201: 'Triple Letter Score',
					square202: '',
					square203: '',
					square204: '',
					square205: 'Triple Letter Score',
					square206: '',
					square207: '',
					square208: '',
					square209: 'Double Word Score',
					square210: '',
					square211: 'Triple Word Score',
					square212: '',
					square213: '',
					square214: 'Double Letter Score',
					square215: '',
					square216: '',
					square217: '',
					square218: 'Triple Word Score',
					square219: '',
					square220: '',
					square221: '',
					square222: 'Double Letter Score',
					square223: '',
					square224: '',
					square225: 'Triple Word Score'
				}

            },

            parse: function(response) {
            	response.players = new playerCollection(response.players)
            	return response
            }
        });
        return gameModel;
    }
);