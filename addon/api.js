import Ember from "ember";
import ic from "ic-ajax";

export default Ember.Object.extend({
  host: null,
  baseURL: null,
  headers: {},

  __pathAdjuster: function() {
    var host = this.get("host");
    var baseURL = this.get("baseURL");
    var prefix = [host, baseURL].removeObject(null);
    return function (path) {
      return prefix.concat(path).join("/");
    };
  }.property("host", "baseURL"),

  request: function(opts = {}) {
    var absoluteURL = opts.absoluteURL;
    var fullURL = Ember.isPresent(absoluteURL) ? absoluteURL : this.get("__pathAdjuster")(opts.path);

    var ajaxOpts = {
      type: opts.type || "GET",
      url: fullURL,
      contentType: opts.contentType || "application/json",
      dataType: opts.dataType || "json",
      headers: this.get("headers")
    };
    if (opts.data) {
      if (opts.type === "POST" || opts.type === "PUT") {
        if (Ember.typeOf(opts.data.asObject) === "function") {
          ajaxOpts.data = JSON.stringify(opts.data.asObject());
        }
        else {
          ajaxOpts.data = JSON.stringify(opts.data);
        }
      }
      else {
        ajaxOpts.data = opts.data;
      }
    }
    return ic.ajax.request(ajaxOpts);
  }
});
