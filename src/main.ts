import { Application } from "pixi.js";
import { ShapeManager } from "./entities/shape-manager";
import { InputManager } from "./entities/input-manager";
import { GameContainer } from "./entities/game-container";

(async () => {
  const app = new Application();

  await app.init({
    background: "#000000",
    resizeTo: window,
  });

  document.getElementById("pixi-container")!.appendChild(app.canvas);

  const gameContainer = new GameContainer();
  app.stage.addChild(gameContainer.getContainer());

  gameContainer.center(app.screen.width, app.screen.height);

  window.addEventListener("resize", () => {
    gameContainer.center(app.screen.width, app.screen.height);
  });

  const shapeManager = new ShapeManager(gameContainer.getContainer());
  new InputManager(gameContainer.getContainer(), shapeManager);

  app.ticker.add((ticker) => {
    shapeManager.update(ticker.deltaTime);
  });
})();
