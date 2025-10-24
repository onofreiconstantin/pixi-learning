import { Application } from "pixi.js";
import { WIDTH } from "./constants";
import { HEIGHT } from "./constants";
import Shape from "./entities/shape";

(async () => {
  const app = new Application();

  await app.init({
    background: "#FFFFFF",
    width: WIDTH,
    height: HEIGHT,
  });

  const shape = new Shape();

  app.stage.addChild(shape.getGraphics());

  document.getElementById("pixi-container")!.appendChild(app.canvas);
})();
