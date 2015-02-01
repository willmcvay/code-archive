require.config({
    baseUrl:"./js/app",
    paths:{
        "jquery":"../libs/jquery",
        "jqueryui":"../libs/jqueryui",
        "underscore":"../libs/lodash",
        "backbone":"../libs/backbone",
        "marionette":"../libs/backbone.marionette",
        "handlebars":"../libs/handlebars",
        "backbone.validateAll":"../libs/plugins/Backbone.validateAll",
        "bootstrap":"../libs/plugins/bootstrap",
        "text":"../libs/plugins/text"
    },

    shim:{
        "bootstrap":["jquery"],
        "jqueryui":["jquery"],
        "backbone":{
            "deps":["underscore"],
            "exports":"Backbone"
        },
        "marionette":{
            "deps":["underscore", "backbone", "jquery"],
            "exports":"Marionette"
        },
        "handlebars":{
            "exports":"Handlebars"
        },
        "backbone.validateAll":["backbone"]
    }
});

require(["App", "routers/AppRouter", "controllers/Controller",  "jquery", "jqueryui", "bootstrap", "backbone.validateAll"],
    function (App, AppRouter, Controller) {
        App.appRouter = new AppRouter({
            controller:new Controller()
        });
        App.start();
    });