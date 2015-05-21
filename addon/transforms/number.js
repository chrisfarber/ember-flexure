import Transform from "../transform";

export default Transform.extend({

  deserialize: function(serialized) {
    return Number(serialized);
  },

  serialize: function(deserialized) {
    return Number(deserialized);
  }

});
