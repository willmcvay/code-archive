define(['marionette', 'controllers/controller'], function(Marionette, Controller) {

	var controller = new Controller();

	return Marionette.AppRouter.extend({
		
		appRoutes: {
			'': 'index'
		},

		routes: {
			'game/:id': 'loadGame'
		},

       	loadGame: function(id) {
       		controller.loadGame(id);
    	}
	});
});