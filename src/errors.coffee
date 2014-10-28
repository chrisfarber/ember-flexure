Errors = Ember.Object.extend Ember.Evented,

  add: (attribute, messages = []) ->
    @propertyWillChange attribute
    @_storageFor(attribute).pushObjects Ember.makeArray(messages)
    @propertyDidChange attribute

  remove: (attribute) ->
    @propertyWillChange attribute
    @_storageFor(attribute).set("[]", [])
    @propertyDidChange attribute

  has: (attribute) ->
    @_storageFor(attribute).get("length") > 0

  clear: ->
    content = @get "content"
    @beginPropertyChanges()
    for attribute, errors of content
      @propertyWillChange attribute
      errors.set "[]", []
      @propertyDidChange attribute
    @endPropertyChanges()

  errorsFor: (attribute) ->
    storage = @_storageFor attribute
    if Ember.isEmpty storage
      null
    else
      storage

  content: Ember.computed ->
    {}

  _storageFor: (attribute) ->
    @get("content")[attribute] ||= []

  unknownProperty: (attribute) ->
    @errorsFor attribute

`export default Errors`