import Models from "../models";
import Transform from "../transform";

function inject(app, type, name, path) {
  const fun = app.inject || app.injection;
  fun.bind(app)(type, name, path);
}

export function initialize(application) {
  application.register("transform:_default", Transform);

  application.register("service:flexureModels", Models);
  inject(application, "route", "models", "service:flexureModels");
  inject(application, "controller", "models", "service:flexureModels");
  inject(application, "api", "models", "service:flexureModels");
}

export default {
  name: "models",
  initialize: initialize
};
