define(['jquery', 'backbone', 'marionette', 'underscore', 'handlebars'],
    function ($, Backbone, Marionette, _, Handlebars) {
        var App = new Backbone.Marionette.Application();

        App.addRegions({
            headerRegion: "header",
            mainRegion: "#main",
            sidebarRegion: '#sidebar'
        });

        function isMobile() {
            var ua = (navigator.userAgent || navigator.vendor || window.opera, window, window.document);
            return (/iPhone|iPod|iPad|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
        }

        App.mobile = isMobile();

        App.addInitializer(function (options) {
            Backbone.history.start({trigger: true});
        });

        return App;
    }
);