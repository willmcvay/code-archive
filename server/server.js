var express = require("express"),
	http = require("http"),
	port = (process.env.PORT || 8001),
	server = module.exports = express(),
	path = require("path"),
	mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/my_database');

var Game = mongoose.model('Game', new mongoose.Schema({
	players: {},
	tileValues: {},
	tileBag: Array,
	availableSquares: Array,
	tiles: Array,
	gameName: String
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


server.get('/api/games/all', function(req, res){
	return Game.find().limit(20).execFind(function(err, game) {
		// console.log(game)
		if (!err) {
			return res.send(game);
		}
	});
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
		game.players = req.body.players;
		game.tileValues = req.body.tileValues;
		game.tileBag = req.body.tileBag;
		game.availableSquares = req.body.availableSquares;
		game.tiles = req.body.tiles;
		game.gameName = req.body.gameName;
		game.gameCurrent = req.body.gameCurrent;
		game.currentPlayer = req.body.currentPlayer;

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
		players: req.body.players,
		tileValues: req.body.tileValues,
		tileBag: req.body.tileBag,
		availableSquares: req.body.availableSquares,
		tiles: req.body.tiles,
		gameName: req.body.gameName,
		gameCurrent: req.body.gameCurrent,
		currentPlayer: req.body.currentPlayer
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