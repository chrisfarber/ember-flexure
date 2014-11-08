attr = (type = null, meta = {}) ->
  if Ember.typeOf(meta) != "object"
    meta =
      default: meta
  prop = ((k, v) ->
    if arguments.length > 1
      if type
        v = @models.deserialize type, v
      if meta.readOnly && @get("__locked")
        Ember.assert "Cannot set read-only property #{k} to #{v}"
      if meta.class
        v = @models.ensureModel meta.class, v
      @get("errors").remove k
      @_rawWrite k, v
    else
      @_rawRead k, -> meta.default
  ).property().meta(EF_Required: meta.required, EF_Attr: true, EF_Relationship: meta.relationship, EF_Type: type)
  prop

hasOne = (relatedObjectName, meta={}) ->
  attr null, Ember.merge(meta, class: relatedObjectName, relationship: true)

hasMany = (model, meta={}) ->
  if Ember.typeOf(meta) != "object"
    meta = {}
  prop = ((k, v) ->
    storage = @_rawRead k, =>
      @models.makeRelationshipArray model, []
    if arguments.length > 1
      storage.set("[]", Ember.A(v))
    else
      storage
  ).property().meta(EF_Attr: true, EF_Relationship: true)
  prop

hasPolymorphic = (modelDeterminator, dependentKeys...) ->
  meta = {}
  prop = ((k, v) ->
    modelClassName = modelDeterminator.call this
    if arguments.length > 1
      if meta.readOnly && @get("__locked")
        Ember.assert "Cannot set read-only property #{k} to #{v}"
      v = @models.ensureSpecificModel modelClassName, v
      @_rawWrite k, v
    else
      v = @models.ensureSpecificModel modelClassName, @_rawRead(k, -> meta.default)
      @_rawWrite k, v
  ).property(dependentKeys...).meta(EF_Attr: true, EF_Relationship: true)
  prop

`export {attr, hasOne, hasMany, hasPolymorphic}`