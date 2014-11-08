import setupModels from "flexure/initializers/models";
import setupAPI from "flexure/initializers/api";

Ember.onLoad("Ember.Application", function(Application) {
  Application.initializer({
    name: "ember-flexure",
    initialize: function(container, application) {

      setupModels(container, application);
      setupAPI(container, application);

    }
  });
});
