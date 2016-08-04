export function initialize(application) {
  application.inject("route", "api", "api:main");
  application.inject("controller", "api", "api:main");
}

export default {
  name: "api",
  initialize: initialize
};
