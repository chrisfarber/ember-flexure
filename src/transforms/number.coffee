`import Transform from "flexure/transforms/transform"`

NumberTransform = Transform.extend

  deserialize: (serialized) ->
    Number serialized

  serialize: (deserialized) ->
    Number deserialized

`export default NumberTransform`