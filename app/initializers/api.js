export function initialize(container) {
  container.injection("route", "api", "api:main");
  container.injection("controller", "api", "api:main");
}

export default {
  name: "api",
  initialize: initialize
};
