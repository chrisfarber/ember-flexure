import EF from 'ember-flexure';

/**
 * Description
 *
 * @name <%= camelizedModuleName %>
 * @author <%= author %>
 */
let <%= camelizedModuleName %> = EF.Model.extend({
  // Attributes
  exString: EF.attr("string"),
  exNumber: EF.attr("number"),
  exBoolean: EF.attr("boolean"),
  exStringDefault: EF.attr("string", { default: "foo" }),

  // Relationships
  exHasMany: EF.hasMany("modelName"),
  exHasOne: EF.hasOne("modelName")
});


<%= camelizedModuleName %>.reopenClass({
});

export default <%= camelizedModuleName %>;
