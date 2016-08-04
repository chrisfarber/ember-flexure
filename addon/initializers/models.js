import Models from "../models";
import Transform from "../transform";

export function initialize(application) {
  application.register("transform:_default", Transform);

  application.register("service:flexureModels", Models);
  application.inject("route", "models", "service:flexureModels");
  application.inject("controller", "models", "service:flexureModels");
  application.inject("api", "models", "service:flexureModels");
}

export default {
  name: "models",
  initialize: initialize
};
