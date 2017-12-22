ember-flexure
=============

Flexure is a library for helping you manage data and communicate with servers
in Ember.js.

It's designed to fill the niche between when Ember Data is too heavy or
opinionated for your needs, but raw ajax and javascript objects are not
enough.

Its primary goal is to help you get your data into Ember objects that you
can do useful things with, like define computed properties or manage
simple relationships.

## Differences from Ember Data

- There is no identity map.
- There are no inverse relationships.
- Instead of abstracting away your interaction with the server, you are
  expected to semantically define your interactions.

## Installing

A bower component is forthcoming.

You should be using the new Ember resolver, preferably via ember-cli.

## Models

### Defining models

To define a model, create subclass EF.Model. For example,

```js
// app/models/person.js

export default EF.Model.extend({
  name: EF.attr("string"),
  hobbies: EF.hasMany("hobby"),
  isNice: EF.attr("boolean", {default: true}),

  isNotNice: Ember.computed.not("isNice"),
});


// app/models/hobby.js

export default EF.Model.extend({
  name: EF.attr("string"),
  skill: EF.attr("number"),
});
```

### Using models

In Ember Data, you would pull your models out of the store. Flexure, on the
other hand, does not have an identity map; the term "store" didn't feel right.
Flexure instead provides Models, a utility class for creating model instances.

This object is automatically injected into your routes and controllers as the
`models` property.

As a basic example,

```js
// app/routes/index.js

export default Ember.Route.extend({
  model: function() {
    this.models.make("person", {
      name: "Jereth",
      isNice: false,
      hobbies: [
        {
          name: "Ruling Goblins",
          skill: 7,
        },
        {
          name: "Babysitting",
          skill: 0,
        },
        {
          name: "Hair",
          skill: 10,
        },
      ]
    });
  }
});
```

Note that the objects under `hobbies` will automatically be converted into
instances of `model:hobby`, as defined in the previous section.

Models also provide basic support for managing:

- serializing
- error states

## Interacting with the server

Flexure also provides a utility object for communicating with your server.
To define it, subclass EF.API and register it as `api:application`. This object
is automatically injected into your routes and controllers, and has access to
`Models`.

```js
// app/apis/application.js

export default EF.API.extend({
  host: "//api.mydomain.com",

  headers: {
    "X-My-Auth-Token": "xxxx"
  }

  findPerson: function(name) {
    var models = this.models;

    return this.request({
      type: "GET", //default
      path: "person/" + name,
    }).then(function(data) {
      return models.make("person", data);
    });
  }

});
```

## License

MIT License.
