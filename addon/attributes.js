import Ember from "ember";

export function attr(type = null, meta = {}) {
  if (Ember.typeOf(meta) !== "object") {
    meta = {default: meta};
  }
  return function(k, v) {
    if (arguments.length > 1) {
      if (type) {
        v = this.models.deserialize(type, v);
      }
      if (meta.readOnly && this.get("__locked")) {
        Ember.assert(`Cannot set read-only property $(k) to $(v)`);
      }
      if (meta.class) {
        v = this.models.ensureModel(meta.class, v);
      }
      return this._rawWrite(k, v);
    }
    else {
      return this._rawRead(k, function() { return meta.default; });
    }
  }.property().meta({
    EF_Required: meta.required,
    EF_Attr: true,
    EF_Relationship: meta.relationship,
    EF_Type: type
  });
}

export function hasOne(relatedObjectName, meta = {}) {
  return attr(null, Ember.merge(meta, {
    class: relatedObjectName,
    relationship: true
  }));
}

export function hasMany(model, meta = {}) {
  if (Ember.typeOf(meta) !== "object") {
    meta = {};
  }

  return function(k, v) {
    var storage = this._rawRead(k, () => {
      return this.models.makeRelationshipArray(model, []);
    });
    if (arguments.length > 1) {
      return storage.set("[]", Ember.A(v));
    }
    else {
      return storage;
    }
  }.property().meta({
    EF_Attr: true,
    EF_Relationship: true
  });
}

export function hasPolymorphic(modelDeterminator, ...dependentKeys) {
  var meta = {};
  return function(k, v) {
    var modelClassName = modelDeterminator.call(this);
    var val;
    if (arguments.length > 1) {
      if (meta.readOnly && this.get("__locked")) {
        Ember.assert(`Cannot set read-only property $(k) to $(v)`);
      }
      val = this.models.ensureSpecificModel(modelClassName, v);
      return this._rawWrite(k, val);
    }
    else {
      val = this.models.ensureSpecificModel(modelClassName, this._rawRead(k, () => meta.default));
      return this._rawWrite(k, val);
    }
  }.property(...dependentKeys).meta({
    EF_Attr: true,
    EF_Relationship: true
  });
}
