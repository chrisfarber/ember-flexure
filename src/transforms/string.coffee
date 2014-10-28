`import Transform from "flexure/transforms/transform"`

StringTransform = Transform.extend

  deserialize: (serialized) ->
    serialized = "" if serialized == null
    String serialized

  serialize: (deserialized) ->
    if Ember.isEmpty deserialized
      null
    else
      String deserialized

`export default StringTransform`