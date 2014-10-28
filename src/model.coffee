`import Errors from "flexure/errors"`

Model = Ember.Object.extend Ember.Copyable,
  awaken: ->
    # This method is called after the model has been fully set-up, including properties
    # Here we simply stub it out.

  _verifyRequiredFields: ->
    @constructor.eachComputedProperty (name, propertyMetadata) =>
      if propertyMetadata.EF_Required
        value = @get name
        Ember.assert "The field #{name} is required", value != undefined
    @set "__locked", true

  tap: (f) ->
    f @; @

  _rawRead: (k, makeDefault = -> null) ->
    (@._data ||= {})[k] ||= makeDefault()

  _rawWrite: (k, v) ->
    (@._data ||= {})[k] = v

  hasID: (->
    !Ember.isEmpty @get('id')
  ).property "id"

  attributes: ->
    attrs = [{name: "id", value: @get('id'), meta: {}}]
    @constructor.eachComputedProperty (name, propertyMetadata) =>
      attrs.addObject name: name, value: @get(name), meta: propertyMetadata
    attrs

  serialize: ->
    serialized = {}
    @attributes().forEach (attr) =>
      if attr.meta.EF_Attr || attr.name == 'id'
        serialized[attr.name] = if attr.meta.EF_Relationship
          attr.value?.serialize()
        else
          @models.serialize attr.meta.EF_Type, attr.value
    serialized

  copy: (deep) ->
    @models.make @constructor, @serialize()

  errors: (->
    errors = Errors.create()
    errors
  ).property().readOnly()

  applyErrors: (errorData) ->
    if errorData
      errors = @get "errors"

      @beginPropertyChanges()
      errors.clear()
      @attributes().forEach (attr) ->
        if attr.meta.EF_Relationship
          if attr.value
            childErrors = errorData[attr.name] || {}
            attr.value.applyErrors childErrors
        else
          errors.add attr.name, errorData[attr.name]
      @endPropertyChanges()

# Here we prevent instances from being created directly.
# Instances should only be created via Models, in order to ensure that they
# can be set up properly.

Model.reopenClass

  _create: Model.create

  create: ->
    throw new Ember.Error "You should not call create() on a model. Instead, create one via storage.createRecord()."

`export default Model`