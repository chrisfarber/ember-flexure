RelationshipArray = Ember.ArrayProxy.extend
  model: null
  content: null
  models: null

  replaceContent: (idx, amt, objects) ->
    model = @get "model"
    content = @get "content"

    content.replace idx, amt, objects.map (item) =>
      @models.ensureModel model, item

  serialize: ->
    @map (item) ->
      item.serialize()

  applyErrors: (errors) ->
    @forEach (model, idx) =>
      modelErrors = errors[idx] || {}
      model.applyErrors modelErrors

`export default RelationshipArray`