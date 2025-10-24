import { Application } from "pixi.js";
import { WIDTH } from "./constants";
import { HEIGHT } from "./constants";
import { ShapeManager } from "./entities/shape-manager";

(async () => {
  const app = new Application();

  await app.init({
    background: "#FFFFFF",
    width: WIDTH,
    height: HEIGHT,
  });

  document.getElementById("pixi-container")!.appendChild(app.canvas);

  const shapeManager = new ShapeManager(app.stage);

  app.ticker.add((ticker) => {
    shapeManager.update(ticker.deltaTime);
  });
})();
