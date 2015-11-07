import RelationshipArray from "./relationship_array";
import Ember from "ember";

export default Ember.Object.extend({

  make: function(nameOrClass, properties = {}) {
    let modelClass = nameOrClass;
    if (Ember.typeOf(nameOrClass) !== "class") {
      modelClass = this.findModel(nameOrClass);
    }

    return modelClass._create({
      models: this,
      container: this.container
    }).tap((model) => {
      model.setProperties(properties);
      model._verifyRequiredFields();
      model.awaken();
    });
  },

  makeRelationshipArray: function(modelName, content) {
    let array = RelationshipArray.create({ content: content, models: this });
    array.set("model", modelName);
    return array;
  },

  findModel: function(name) {
    return this.container.lookupFactory(`model:${name}`);
  },

  ensureModel: function(name, object) {
    if (Ember.typeOf(object) !== "instance") {
      return this.make(name, object);
    }
    else {
      return object;
    }
  },

  ensureSpecificModel: function(name, object = {}) {
    var modelClass = this.findModel(name);
    if (name && object) {
      if (Ember.typeOf(object) !== "instance") {
        return this.make(name, object);
      }
      else {
        if (object.constructor === modelClass) {
          return object;
        }
        else {
          return this.make(name);
        }
      }
    }
    else {
      return null;
    }
  },

  deserialize: function(type, value, allowNull = true) {
    if (allowNull && (value === undefined || value === null)) {
      return value;
    }

    if (Ember.isEmpty(type)) {
      type = "_default";
    }

    let t = this.container.lookup(`transform:${type}`) ||
            this.container.lookup("transform:_default");
    return t.deserialize(value);
  },

  serialize: function(type, value, allowNull = true) {
    if (allowNull && (value === undefined || value === null)) {
      return value;
    }

    if (Ember.isEmpty(type)) {
      type = "_default";
    }

    let t = this.container.lookup(`transform:${type}`) ||
            this.container.lookup("transform:_default");
    return t.serialize(value);
  }
});
