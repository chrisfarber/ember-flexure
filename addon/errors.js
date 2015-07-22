import Ember from "ember";

export default Ember.Object.extend(Ember.Evented, {
  add: function(attribute, messages = []) {
    this.propertyWillChange(attribute);
    this._storageFor(attribute).pushObjects(Ember.makeArray(messages));
    this.propertyDidChange(attribute);
  },

  remove: function(attribute) {
    this.propertyWillChange(attribute);
    this._storageFor(attribute).set("[]", []);
    this.propertyDidChange(attribute);
  },

  has: function(attribute) {
    return this._storageFor(attribute).get("length") > 0;
  },

  clear: function() {
    let content = this.get("content");
    this.beginPropertyChanges();
    for (var attribute in content) {
      let errors = content[attribute];
      this.propertyWillChange(attribute);
      errors.set("[]", []);
      this.propertyDidChange(attribute);
    }
    this.endPropertyChanges();
  },

  errorsFor: function(attribute) {
    let storage = this._storageFor(attribute);
    if (Ember.isEmpty(storage)) {
      return null;
    }
    else {
      return storage;
    }
  },

  content: function() {
    return {};
  }.property().readOnly(),

  _storageFor: function(attribute) {
    let content = this.get("content");
    if (!content[attribute]) {
      content[attribute] = [];
    }
    return content[attribute];
  },

  unknownProperty: function(attribute) {
    return this.errorsFor(attribute);
  }
});
