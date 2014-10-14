var express = require("express"),
	http = require("http"),
	port = (process.env.PORT || 8001),
	server = module.exports = express(),
	path = require("path"),
	mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/my_database');

var Game = mongoose.model('Game', new mongoose.Schema({
	playerOne: {
		score: Number,
		tileRack: Array
	},
	playerTwo: {
		score: Number,
		tileRack: Array
	},
	tileBag: Array,
	availableSquares: Array,
	tiles: Array
}));

server.configure(function () {

	server.use(express["static"](__dirname + "/../public"));
	server.use(express.bodyParser());
	server.use(express.errorHandler({
		dumpExceptions:true,
		showStack:true
	}));
	server.use(server.router);
});

server.get('/api/games/:id', function(req, res){
	return Game.findById(req.params.id, function(err, game) {
		if (!err) {
			return res.send(game);
		}
	});
});

server.put('/api/games/:id', function(req, res){
	return Game.findById(req.params.id, function(err, game) {
		// game.playerOne = req.body.playerOne;
		// game.playerTwo = req.body.playerTwo;
		// game.tileBag = req.body.tileBag;
		// game.availableSquares = req.body.availableSquares;
		// game.tiles = req.body.tiles;
		return game.save(function(err) {
		if (!err) {
			console.log("updated");
		}
			return res.send(game);
		});
	});
});

server.post('/api/games', function(req, res){
	var game;
	game = new Game({
		playerOne: req.body.playerOne,
		playerTwo: req.body.playerTwo,
		tileBag: req.body.tileBag,
		availableSquares: req.body.availableSquares,
		tiles: req.body.tiles
	});
	game.save(function(err) {
		if (!err) {
			return console.log("created");
		}
	});
	return res.send(game);
});

server.delete('/api/games/:id', function(req, res){
	return Game.findById(req.params.id, function(err, game) {
		return game.remove(function(err) {
			if (!err) {
				console.log("removed");
				return res.send('')
			}
		});
	});
});

http.createServer(server).listen(port);
console.log('Running on localhost:8001');