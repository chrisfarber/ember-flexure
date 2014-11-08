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

import API from "flexure/api";

import "flexure/flexure_initializer";

EF.Model = Model;
EF.Errors = Errors;

EF.attr = attr;
EF.hasOne = hasOne;
EF.hasMany = hasMany;
EF.hasPolymorphic = hasPolymorphic;

EF.RelationshipArray = RelationshipArray;

EF.Models = Models;

EF.Transform = Transform;
EF.BooleanTransform = BooleanTransform;
EF.StringTransform = StringTransform;
EF.NumberTransform = NumberTransform;

EF.API = API;

export default EF;
