import { Application } from "pixi.js";
import { ShapeManager } from "./entities/shape-manager";
import { InputManager } from "./entities/input-manager";
import { GameContainer } from "./entities/game-container";
import { EStatsType, StatsFactory } from "./interfaces/stats/stats-factory";
import { PixiStats } from "./entities/pixi-stats";
import { GameControls } from "./entities/game-controls";

(async () => {
  const app = new Application();

  await app.init({
    background: "#000000",
    resizeTo: window,
  });

  document.getElementById("pixi-container")!.appendChild(app.canvas);

  const gameContainer = new GameContainer();
  app.stage.addChild(gameContainer.getWrapper());

  gameContainer.center(app.screen.width, app.screen.height);

  const resizeObserver = new ResizeObserver(() => {
    gameContainer.center(app.screen.width, app.screen.height);
  });

  resizeObserver.observe(app.canvas);

  const shapeManager = new ShapeManager(gameContainer.getContainer());
  new InputManager(gameContainer.getContainer(), shapeManager);

  const statsDisplay = StatsFactory.create(EStatsType.HTML);

  if (statsDisplay instanceof PixiStats) {
    gameContainer.addPixiStats(statsDisplay);
  }

  new GameControls(
    (rate) => shapeManager.setSpawnRate(rate),
    (gravity) => shapeManager.setGravity(gravity)
  );

  app.ticker.add((ticker) => {
    shapeManager.update(ticker.deltaTime);
    const shapeCount = shapeManager.getShapesCount();
    const area = shapeManager.getTotalArea();
    statsDisplay.update(shapeCount, area);
  });
})();
