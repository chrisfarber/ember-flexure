import Ember from "ember";

export default Ember.ArrayProxy.extend({
  modelDeterminator: null,
  content: null,
  models: null,

  replaceContent: function(idx, amt, objects) {
    let modelDeterminator = this.get("modelDeterminator");
    let content = this.get("content");

    let newContent = objects.map((item) => {
      let modelName = modelDeterminator.call(this, item);
      return this.models.ensureModel(modelName, item);
    });
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

