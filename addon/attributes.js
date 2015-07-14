import Ember from "ember";

export function attr(type = null, meta = {}) {
  if (Ember.typeOf(meta) !== "object") {
    meta = {default: meta};
  }

  if (meta.nullable === undefined) {
    meta.nullable = true;
  }

  let allowNull = !!meta.nullable;

  return Ember.computed({
    get(k) {
      return this._rawRead(k, () => meta.default);
    },

    set(k, v) {
      if (type && !(allowNull && (v === undefined || v === null))) {
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
  }).meta({
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

  let getStorage = (m, k) => {
    return m._rawRead(k, () => {
      return m.models.makeRelationshipArray(model, []);
    });
  };

  return Ember.computed({
    get(k) {
      return getStorage(this, k);
    },

    set(k, v) {
      return getStorage(this, k).set("[]", Ember.A(v));
    }
  }).meta({
    EF_Attr: true,
    EF_Relationship: true
  });
}

export function hasPolymorphic(modelDeterminator, ...dependentKeys) {
  var meta = {};
  return Ember.computed(...dependentKeys, {
    get(k) {
      let modelClassName = modelDeterminator.call(this);
      let val = this.models.ensureSpecificModel(modelClassName, this._rawRead(k, () => meta.default));
      return this._rawWrite(k, val);
    },

    set(k, v) {
      let modelClassName = modelDeterminator.call(this);
      if (meta.readOnly && this.get("__locked")) {
        Ember.assert(`Cannot set read-only property $(k) to $(v)`);
      }
      let val = this.models.ensureSpecificModel(modelClassName, v);
      return this._rawWrite(k, val);
    }
  }).meta({
    EF_Attr: true,
    EF_Relationship: true
  });
}
