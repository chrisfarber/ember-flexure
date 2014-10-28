`import Transform from "flexure/transforms/transform"`

BooleanTransform = Transform.extend

  deserialize: (serialized) ->
    type = typeof serialized

    if type == "boolean"
      serialized
    else if type == "string"
      serialized.match(/^true$|^t$|^1$/i) != null
    else if type == "number"
      serialized == 1
    else
      false

  serialize: (deserialized) ->
    Boolean deserialized

`export default BooleanTransform`