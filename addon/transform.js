import Ember from "ember";

export default Ember.Object.extend({

  deserialize: function(serialized) {
    return serialized;
  },

  serialize: function(deserialized) {
    return deserialized;
  }

});
