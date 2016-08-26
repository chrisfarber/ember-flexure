function inject(app, type, name, path) {
  const fun = app.inject || app.injection;
  fun.bind(app)(type, name, path);
}

export function initialize(application) {
  inject(application, "route", "api", "api:main");
  inject(application, "controller", "api", "api:main");
}

export default {
  name: "api",
  initialize: initialize
};
