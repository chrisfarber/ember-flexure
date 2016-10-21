import Errors from "./errors";
import Ember from "ember";

let Model = Ember.Object.extend(Ember.Copyable, {
  awaken: function() {
    // This method is called after the model has been fully set-up, including properties
    // Here we simply stub it out.
  },

  _verifyRequiredFields: function() {
  },

  tap: function(f) {
    f(this);
    return this;
  },

  _rawRead: function(k, makeDefault = () => null) {
    let data = this._data || (this._data = {});
    return data[k] || (data[k] = makeDefault());
  },

  _rawWrite: function(k, v) {
    let data = this._data || (this._data = {});
    return data[k] = v;
  },

  // hasID: function() {
  //   return !Ember.isEmpty(this.get("id"));
  // }.property("id"),

  attributes: function() {
    let attrs = []; //[{name: "id", value: this.get("id"), meta: {}}];
    this.constructor.eachComputedProperty((name, propertyMetadata) => {
      attrs.addObject({name: name, value: this.get(name), meta: propertyMetadata});
    });
    return attrs;
  },

  serialize: function() {
    let serialized = {};
    this.attributes().forEach((attr) => {
      if (attr.meta.EF_Attr) {// || attr.name === "id") {
        var serializedValue; // undefined;
        if (attr.meta.EF_Relationship) {
          if (attr.value) {
            serializedValue = attr.value.serialize();
          }
        }
        else {
          serializedValue = this.models.serialize(attr.meta.EF_Type, attr.value, attr.meta.EF_AllowNull);
        }
        serialized[attr.name] = serializedValue;
      }
    });
    return serialized;
  },

  copy: function() {
    return this.models.make(this.constructor, this.serialize());
  },

  errors: function() {
    return Errors.create();
  }.property().readOnly(),

  applyErrors: function(errorData) {
    if (errorData) {
      let errors = this.get("errors");

      this.beginPropertyChanges();
      errors.clear();
      this.attributes().forEach((attr) => {
        if (attr.meta.EF_Relationship) {
          if (attr.value) {
            let childErrors = errorData[attr.name] || {};
            attr.value.applyErrors(childErrors);
          }
        }
        else {
          errors.add(attr.name, errorData[attr.name]);
        }
      });
      this.endPropertyChanges();
    }
  }

});

Model.reopenClass({
  _create: Model.create,

  create: function() {
    throw new Ember.Error("You should not call create() on a model. Instead, create one via storage.createRecord().");
  }
});

export default Model;
