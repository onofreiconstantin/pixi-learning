import { Container, Graphics } from "pixi.js";
import { WIDTH, HEIGHT } from "../constants";
import { PixiStats } from "./pixi-stats";

class GameContainer {
  private container: Container;
  private gameContainer: Container;

  constructor() {
    this.container = new Container();
    this.gameContainer = new Container();

    this.container.addChild(this.gameContainer);

    this.createBackground();
    this.createMask();
  }

  public getContainer(): Container {
    return this.container;
  }

  public getGameContainer(): Container {
    return this.gameContainer;
  }

  public addPixiStats(pixiStats: PixiStats): void {
    this.container.addChild(pixiStats.getContainer());
  }

  public center(screenWidth: number, screenHeight: number) {
    this.container.x = (screenWidth - WIDTH) / 2;
    this.container.y = (screenHeight - HEIGHT) / 2;
  }

  private createBackground() {
    const background = new Graphics();

    background.rect(0, 0, WIDTH, HEIGHT);
    background.fill({ color: "#FFFFFF" });

    this.gameContainer.addChild(background);
  }

  private createMask() {
    const mask = new Graphics();

    mask.rect(0, 0, WIDTH, HEIGHT);
    mask.fill({ color: "#000000" });

    this.gameContainer.addChild(mask);
    this.gameContainer.mask = mask;
  }
}

export { GameContainer };
