import EF from "flexure/core";

import Model from "flexure/model";
import Errors from "flexure/errors";
import RelationshipArray from "flexure/relationship_array";

import {
  attr,
  hasOne,
  hasMany,
  hasPolymorphic
} from "flexure/attributes";

import Models from "flexure/models";

import Transform from "flexure/transforms/transform";
import BooleanTransform from "flexure/transforms/boolean";
import StringTransform from "flexure/transforms/string";
import NumberTransform from "flexure/transforms/number";

EF.Model = Model;
EF.Errors = Errors;

EF.attr = attr;
EF.hasOne = hasOne;
EF.hasMany = hasMany;
EF.hasPolymorphic = hasPolymorphic;

EF.RelationshipArray = RelationshipArray;

EF.Transform = Transform;
EF.BooleanTransform = BooleanTransform;
EF.StringTransform = StringTransform;
EF.NumberTransform = NumberTransform;

window.EF = EF;

Ember.Application.initializer({
  name: "ember-flexure",
  initialize: function(container) {
    container.register("transform:_default", EF.Transform);
    container.register("transform:boolean", EF.BooleanTransform);
    container.register("transform:string", EF.StringTransform);
    container.register("transform:number", EF.NumberTransform);

    container.register("flexure:models", EF.Models);
    container.inject("route", "models", "flexure:models");
    container.inject("controller", "models", "flexure:models");
  }
});