import EF from 'ember-flexure';

/**
 * Description
 *
 * @name <%= moduleName %>
 * @author <%= author %>
 */
export default EF.Model.extend({
  // Attributes
  exString: EF.attr("string"),
  exNumber: EF.attr("number"),
  exBoolean: EF.attr("boolean"),
  exStringDefault: EF.attr("string", { default: "foo" }),

  // Relationships
  exHasMany: EF.hasMany("modelName"),
  exHasOne: EF.hasOne("modelName")
});
