import Models from "flexure/models";
import Transform from "flexure/transforms/transform";
import BooleanTransform from "flexure/transforms/boolean";
import StringTransform from "flexure/transforms/string";
import NumberTransform from "flexure/transforms/number";

export default function setupModels(container, application) {
  container.register("transform:_default", Transform);
  container.register("transform:boolean", BooleanTransform);
  container.register("transform:string", StringTransform);
  container.register("transform:number", NumberTransform);

  container.register("flexure:models", Models);
  container.injection("route", "models", "flexure:models");
  container.injection("controller", "models", "flexure:models");
  container.injection("api", "models", "flexure:models");
};
