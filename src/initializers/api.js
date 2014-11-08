import API from "flexure/api";

export default function setupAPI(container, application) {
  var applicationAPI = container.lookupFactory("api:application") || API;
  container.register("api:main", applicationAPI);

  container.injection("route", "api", "api:main");
  container.injection("controller", "api", "api:main");
};