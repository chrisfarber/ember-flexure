import Transform from "../transform";

export default Transform.extend({

  serialize: function(deserialized) {
    return Boolean(deserialized);
  },

  deserialize: function(serialized) {
    let type = typeof serialized;

    if (type === "boolean") {
      return serialized;
    }
    else if (type === "string") {
      return serialized.match(/^true$|^t$|^1$/i) !== null;
    }
    else if (type === "number") {
      return serialized === 1;
    }
    else {
      return false;
    }
  }

});
