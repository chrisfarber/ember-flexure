import Transform from "../transform";
import Ember from "ember";

export default Transform.extend({

  deserialize: function(serialized) {
    if (!serialized) {
      return "";
    }
    return String(serialized);
  },

  serialize: function(deserialized) {
    if (Ember.isEmpty(deserialized)) {
      return null;
    }
    else {
      return String(deserialized);
    }
  }

});

