import Ember from "ember";
import ajax from "ic-ajax";

export default Ember.Object.extend({
  host: null,
  baseURL: null,
  headers: {},

  __pathAdjuster: function() {
    let host = this.get("host");
    let baseURL = this.get("baseURL");
    let prefix = [host, baseURL].removeObject(null);
    return function (path) {
      return prefix.concat(path).join("/");
    };
  }.property("host", "baseURL"),

  request: function(opts = {}) {
    let absoluteURL = opts.absoluteURL;
    let fullURL = Ember.isPresent(absoluteURL) ? absoluteURL : this.get("__pathAdjuster")(opts.path);

    let ajaxOpts = {
      type: opts.type || "GET",
      cache: !!opts.cache,
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
    return ajax(ajaxOpts);
  }
});
