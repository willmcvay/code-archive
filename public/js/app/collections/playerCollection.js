define(["jquery","backbone","models/playerModel"],
  function($, Backbone, playerModel) {

    var playerCollection = Backbone.Collection.extend({
      model: playerModel
    });

    return playerCollection;
  });