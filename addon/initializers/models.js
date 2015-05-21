import Models from "../models";
import Transform from "../transform";

export function initialize(container) {
  container.register("transform:_default", Transform);

  container.register("flexure:models", Models);
  container.injection("route", "models", "flexure:models");
  container.injection("controller", "models", "flexure:models");
  container.injection("api", "models", "flexure:models");
}

export default {
  name: "models",
  initialize: initialize
};
