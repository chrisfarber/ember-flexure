import Ember from "ember";

export default Ember.ArrayProxy.extend({
  model: null,
  content: null,
  models: null,

  replaceContent: function(idx, amt, objects) {
    let model = this.get("model");
    let content = this.get("content");

    let newContent = objects.map((item) => this.models.ensureModel(model, item));
    content.replace(idx, amt, newContent);
  },

  serialize: function() {
    return this.map((item) => item.serialize());
  },

  applyErrors: function(errors) {
    this.forEach((model, idx) => {
      model.applyErrors(errors[idx] || {});
    });
  }
});

