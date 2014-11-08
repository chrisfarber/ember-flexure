API = Ember.Object.extend

  host: null
  baseURL: null
  headers: {}

  __pathAdjuster: (->
    host = @get "host"
    baseURL = @get "baseURL"
    prefix = [host, baseURL].removeObject(null)
    (path) ->
      prefix.concat(path).join("/")
  ).property "host", "baseURL"

  request: (opts = {}) ->
    absoluteURL = opts.absoluteURL

    fullURL = if Ember.isPresent(absoluteURL)
      absoluteURL
    else
      @get("__pathAdjuster")(opts.path)

    ajaxOpts =
      type: opts.type || "GET"
      url: fullURL
      contentType: opts.contentType || "application/json"
      dataType: opts.dataType || "json"
      headers: @get "headers"
    if opts.data
      if (opts.type == "POST" || opts.type == "PUT")
        if Em.typeOf(opts.data.asObject) == "function"
          ajaxOpts.data = JSON.stringify opts.data.asObject()
        else
          ajaxOpts.data = JSON.stringify opts.data
      else
        ajaxOpts.data = opts.data
    $.ajax(ajaxOpts)

`export default API`