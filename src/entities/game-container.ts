import { Container, Graphics } from "pixi.js";
import { WIDTH, HEIGHT } from "../constants";
import { PixiStats } from "./pixi-stats";

class GameContainer {
  private wrapper: Container;
  private container: Container;

  constructor() {
    this.wrapper = new Container();
    this.container = new Container();

    this.wrapper.addChild(this.container);

    this.createBackground();
    this.createMask();
  }

  public getWrapper(): Container {
    return this.wrapper;
  }

  public getContainer(): Container {
    return this.container;
  }

  public addPixiStats(pixiStats: PixiStats): void {
    this.wrapper.addChild(pixiStats.getContainer());
  }

  public center(screenWidth: number, screenHeight: number) {
    this.wrapper.x = (screenWidth - WIDTH) / 2;
    this.wrapper.y = (screenHeight - HEIGHT) / 2;
  }

  private createBackground() {
    const background = new Graphics();

    background.rect(0, 0, WIDTH, HEIGHT);
    background.fill({ color: "#FFFFFF" });

    this.container.addChild(background);
  }

  private createMask() {
    const mask = new Graphics();

    mask.rect(0, 0, WIDTH, HEIGHT);
    mask.fill({ color: "#000000" });

    this.container.addChild(mask);
    this.container.mask = mask;
  }
}

export { GameContainer };
