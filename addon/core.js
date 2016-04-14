import Ember from "ember";

import API from "ember-flexure/api";
import Model from "ember-flexure/model";
import { attr, hasOne, hasMany, hasManyPolymorphic, hasPolymorphic } from "ember-flexure/attributes";

let EmberFlexure = Ember.Namespace.create({
  API: API,
  Model: Model,

  attr: attr,
  hasOne: hasOne,
  hasMany: hasMany,
  hasPolymorphic: hasPolymorphic,
  hasManyPolymorphic: hasManyPolymorphic
});

export default EmberFlexure;
