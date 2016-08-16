import RelationshipArray from "./relationship_array";
import PolymorphicRelationshipArray from "./polymorphic_relationship_array";
import Ember from "ember";

export default Ember.Object.extend({
  make: function(nameOrClass, properties = {}) {
    var modelClass = nameOrClass;
    if (Ember.typeOf(nameOrClass) !== "class") {
      modelClass = this.findModel(nameOrClass);
    }

    return modelClass._create({
      models: this,
      owner: Ember.getOwner(this)
    }).tap((model) => {
      model.setProperties(properties);
      model._verifyRequiredFields();
      model.awaken();
    });
  },

  makeRelationshipArray: function(modelName, content) {
    let array = RelationshipArray.create({content: content, models: this});
    array.set("model", modelName);
    return array;
  },

  makePolymorphicRelationshipArray: function(modelDeterminator, content) {
    let array = PolymorphicRelationshipArray.create({content: content, models: this});
    array.set("modelDeterminator", modelDeterminator);
    return array;
  },

  findModel: function(name) {
    return Ember.getOwner(this).resolveRegistration(`model:${name}`);
  },

  ensureModel: function(name, object) {
    if (!!object && Ember.typeOf(object) !== "instance") {
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

    let t = Ember.getOwner(this).lookup(`transform:${type}`) ||
            Ember.getOwner(this).lookup("transform:_default");
    return t.deserialize(value);
  },

  serialize: function(type, value, allowNull = true) {
    if (allowNull && (value === undefined || value === null)) {
      return value;
    }

    if (Ember.isEmpty(type)) {
      type = "_default";
    }

    let t = Ember.getOwner(this).lookup(`transform:${type}`) ||
            Ember.getOwner(this).lookup("transform:_default");
    return t.serialize(value);
  }
});

