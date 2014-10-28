`import RelationshipArray from "flexure/relationship_array"`

Models = Ember.Object.extend

  make: (nameOrClass, properties = {}) ->
    modelClass = if Ember.typeOf(nameOrClass) == "class"
      nameOrClass
    else
      @findModel nameOrClass
    modelClass._create
      models: @
      container: @container
    .tap (model) =>
      model.setProperties properties
      model._verifyRequiredFields()
      model.awaken()

  makeRelationshipArray: (modelName, content) ->
    array = RelationshipArray.create content: content, models: @
    array.set "model", modelName
    array

  findModel: (name) ->
    @container.lookupFactory "model:#{name}"

  ensureModel: (name, object) ->
    if Ember.typeOf(object) != "instance"
      @make name, object
    else
      object

  ensureSpecificModel: (name, object = {}) ->
    modelClass = @findModel name
    if name && object
      if Ember.typeOf(object) != "instance"
        @make name, object
      else
        if object.constructor == modelClass
          object
        else
          @make name
    else
      null

  deserialize: (type, value) ->
    if Ember.isEmpty(type)
      type = "_default"

    t = @container.lookup("transform:#{type}") || @container.lookup("transform:_default")
    t.deserialize value

  serialize: (type, value) ->
    if Ember.isEmpty(type)
      type = "_default"

    t = @container.lookup("transform:#{type}") || @container.lookup("transform:_default")
    t.serialize value
