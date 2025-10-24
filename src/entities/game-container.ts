import { Container, Graphics } from "pixi.js";
import { WIDTH, HEIGHT } from "../constants";

class GameContainer {
  private container: Container;

  constructor() {
    this.container = new Container();

    this.createBackground();
    this.createMask();
  }

  public getContainer(): Container {
    return this.container;
  }

  public center(screenWidth: number, screenHeight: number) {
    this.container.x = (screenWidth - WIDTH) / 2;
    this.container.y = (screenHeight - HEIGHT) / 2;
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
    mask.fill({ color: "#c5c5c5" });

    this.container.addChild(mask);
    this.container.mask = mask;
  }
}

export { GameContainer };
