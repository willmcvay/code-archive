define( [ 'App', 'marionette', 'handlebars', 'models/gameModel', 'text!templates/sidebar.html', 'config/constants', 'config/game'],
    function( App, Marionette, Handlebars, Model, template, constants, game) {

        var sidebarView = Marionette.ItemView.extend( {

            template: Handlebars.compile(template),
            model: new Model({
                mobile: App.mobile
            }),

     
        });
        return sidebarView
    });